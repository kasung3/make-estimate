export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

// Format number with thousand separators
const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;

    const [boq, company] = await Promise.all([
      prisma.boq.findFirst({
        where: {
          id: params?.id,
          companyId,
        },
        include: {
          customer: true,
          categories: {
            include: { items: { orderBy: { sortOrder: 'asc' } } },
            orderBy: { sortOrder: 'asc' },
          },
        },
      }),
      prisma.company.findUnique({
        where: { id: companyId },
      }),
    ]);

    if (!boq) {
      return NextResponse.json({ error: 'BOQ not found' }, { status: 404 });
    }

    const currencySymbol = company?.currencySymbol ?? 'Rs.';
    const currencyPosition = company?.currencyPosition ?? 'left';

    const formatCurrency = (amount: number): string => {
      const formatted = formatNumber(amount ?? 0, 2);
      return currencyPosition === 'left'
        ? `${currencySymbol} ${formatted}`
        : `${formatted} ${currencySymbol}`;
    };

    // Calculate totals
    let subtotal = 0;
    (boq?.categories ?? []).forEach((cat) => {
      (cat?.items ?? []).forEach((item) => {
        if (item?.isNote) return; // Skip notes in calculations
        const qty = item?.quantity ?? 0;
        if (qty > 0) {
          const unitPrice = (item?.unitCost ?? 0) * (1 + (item?.markupPct ?? 0) / 100);
          subtotal += unitPrice * qty;
        }
      });
    });

    // Apply discount only if enabled
    let discount = 0;
    if (boq?.discountEnabled) {
      if (boq?.discountType === 'percent') {
        discount = subtotal * ((boq?.discountValue ?? 0) / 100);
      } else {
        discount = boq?.discountValue ?? 0;
      }
    }

    const afterDiscount = subtotal - discount;
    const vatAmount = boq?.vatEnabled ? afterDiscount * ((boq?.vatPercent ?? 0) / 100) : 0;
    const finalTotal = afterDiscount + vatAmount;

    // Generate HTML
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 11px;
      line-height: 1.4;
      color: #333;
    }
    .cover-page {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      page-break-after: always;
    }
    .cover-title {
      font-size: 36px;
      font-weight: bold;
      color: #0891b2;
      margin-bottom: 20px;
    }
    .cover-subtitle {
      font-size: 18px;
      color: #666;
      margin-bottom: 10px;
    }
    .cover-company {
      font-size: 16px;
      color: #333;
      margin-top: 40px;
    }
    .content-page {
      padding: 20px 30px;
    }
    .header {
      border-bottom: 2px solid #0891b2;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .header h1 {
      font-size: 18px;
      color: #0891b2;
    }
    .header p {
      font-size: 11px;
      color: #666;
    }
    .category {
      margin-bottom: 25px;
    }
    .category-header {
      background: linear-gradient(135deg, #0891b2, #14b8a6);
      color: white;
      padding: 8px 12px;
      font-weight: bold;
      font-size: 12px;
      border-radius: 4px 4px 0 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #e5e7eb;
      padding: 6px 8px;
      text-align: left;
    }
    th {
      background-color: #f9fafb;
      font-weight: 600;
      font-size: 10px;
      text-transform: uppercase;
      color: #6b7280;
    }
    td {
      font-size: 11px;
    }
    .text-right {
      text-align: right;
    }
    .subtotal-row {
      background-color: #f0fdfa;
      font-weight: bold;
    }
    .subtotal-row td {
      border-top: 2px solid #14b8a6;
    }
    .note-row {
      background-color: #fffbeb;
      font-style: italic;
    }
    .note-row td {
      color: #92400e;
    }
    .totals-section {
      margin-top: 30px;
      page-break-inside: avoid;
    }
    .totals-table {
      width: 300px;
      margin-left: auto;
    }
    .totals-table td {
      padding: 8px 12px;
    }
    .totals-table .label {
      text-align: left;
      font-weight: 500;
    }
    .totals-table .value {
      text-align: right;
      font-weight: bold;
    }
    .final-total {
      background-color: #0891b2;
      color: white;
    }
    .final-total td {
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="cover-page">
    <h1 class="cover-title">${boq?.projectName ?? 'Project'}</h1>
    <p class="cover-subtitle">Bill of Quantities</p>
    ${boq?.customer ? `<p class="cover-subtitle">Prepared for: ${boq.customer.name}</p>` : ''}
    <p class="cover-company">${company?.name ?? 'Company'}</p>
  </div>

  <div class="content-page">
    <div class="header">
      <h1>${boq?.projectName ?? 'Project'}</h1>
      ${boq?.customer ? `<p>Customer: ${boq.customer.name}</p>` : ''}
    </div>

    ${(boq?.categories ?? []).map((category, catIndex) => {
      // Filter items: include items with qty > 0, and notes with includeInPdf = true
      const visibleItems = (category?.items ?? []).filter((item) => {
        if (item?.isNote) {
          return item?.includeInPdf;
        }
        return (item?.quantity ?? 0) > 0;
      });
      
      if (visibleItems.length === 0) return '';

      let categorySubtotal = 0;
      let itemNumber = 0;
      
      const itemRows = visibleItems.map((item) => {
        if (item?.isNote) {
          // Note row - spans across columns, no item number
          // Note content may contain HTML formatting (bold, italic, underline)
          const noteContent = item?.noteContent ?? '';
          return `
            <tr class="note-row">
              <td></td>
              <td colspan="5" style="font-style: normal;">${noteContent}</td>
            </tr>
          `;
        }
        
        // Regular item row
        itemNumber++;
        const unitPrice = (item?.unitCost ?? 0) * (1 + (item?.markupPct ?? 0) / 100);
        const amount = unitPrice * (item?.quantity ?? 0);
        categorySubtotal += amount;
        return `
          <tr>
            <td>${catIndex + 1}.${itemNumber}</td>
            <td>${item?.description ?? ''}</td>
            <td>${item?.unit ?? ''}</td>
            <td class="text-right">${formatNumber(item?.quantity ?? 0, 2)}</td>
            <td class="text-right">${formatNumber(unitPrice, 2)}</td>
            <td class="text-right">${formatNumber(amount, 2)}</td>
          </tr>
        `;
      }).join('');

      return `
        <div class="category">
          <div class="category-header">${catIndex + 1}. ${category?.name ?? 'Category'}</div>
          <table>
            <thead>
              <tr>
                <th style="width: 60px;">Item No</th>
                <th>Description</th>
                <th style="width: 60px;">Unit</th>
                <th style="width: 70px;" class="text-right">Quantity</th>
                <th style="width: 90px;" class="text-right">Rate (${currencySymbol})</th>
                <th style="width: 100px;" class="text-right">Amount (${currencySymbol})</th>
              </tr>
            </thead>
            <tbody>
              ${itemRows}
              <tr class="subtotal-row">
                <td colspan="5" class="text-right">Subtotal</td>
                <td class="text-right">${formatCurrency(categorySubtotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }).join('')}

    <div class="totals-section">
      <table class="totals-table">
        <tr>
          <td class="label">Subtotal</td>
          <td class="value">${formatCurrency(subtotal)}</td>
        </tr>
        ${boq?.discountEnabled === true && (boq?.discountValue ?? 0) > 0 ? `
        <tr>
          <td class="label">Discount${boq?.discountType === 'percent' ? ` (${boq?.discountValue}%)` : ''}</td>
          <td class="value">-${formatCurrency(discount)}</td>
        </tr>
        ` : ''}
        ${boq?.vatEnabled === true && (boq?.vatPercent ?? 0) > 0 ? `
        <tr>
          <td class="label">VAT (${boq?.vatPercent}%)</td>
          <td class="value">${formatCurrency(vatAmount)}</td>
        </tr>
        ` : ''}
        <tr class="final-total">
          <td class="label">Final Total</td>
          <td class="value">${formatCurrency(finalTotal)}</td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
    `;

    // Generate PDF using the HTML2PDF API
    const createResponse = await fetch('https://apps.abacus.ai/api/createConvertHtmlToPdfRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deployment_token: process.env.ABACUSAI_API_KEY,
        html_content: html,
        pdf_options: {
          format: 'A4',
          margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
          print_background: true,
        },
        base_url: process.env.NEXTAUTH_URL || '',
      }),
    });

    if (!createResponse.ok) {
      const error = await createResponse.json().catch(() => ({ error: 'Failed to create PDF request' }));
      return NextResponse.json({ success: false, error: error?.error }, { status: 500 });
    }

    const { request_id } = await createResponse.json();
    if (!request_id) {
      return NextResponse.json({ success: false, error: 'No request ID returned' }, { status: 500 });
    }

    // Poll for status until completion
    const maxAttempts = 300;
    let attempts = 0;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const statusResponse = await fetch('https://apps.abacus.ai/api/getConvertHtmlToPdfStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request_id: request_id, deployment_token: process.env.ABACUSAI_API_KEY }),
      });

      const statusResult = await statusResponse.json();
      const status = statusResult?.status || 'FAILED';
      const result = statusResult?.result || null;

      if (status === 'SUCCESS') {
        if (result && result.result) {
          const pdfBuffer = Buffer.from(result.result, 'base64');
          return new NextResponse(pdfBuffer, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': `attachment; filename="${boq?.projectName ?? 'BOQ'}.pdf"`,
            },
          });
        } else {
          return NextResponse.json({ success: false, error: 'PDF generation completed but no result data' }, { status: 500 });
        }
      } else if (status === 'FAILED') {
        const errorMsg = result?.error || 'PDF generation failed';
        return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
      }
      attempts++;
    }

    return NextResponse.json({ success: false, error: 'PDF generation timed out' }, { status: 500 });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
