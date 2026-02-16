/**
 * PDF Processor - Background PDF Generation
 * 
 * This module handles async PDF generation in the background.
 * It updates the PdfExportJob status as it progresses.
 */

import { prisma } from '@/lib/db';
import { CoverPageConfig, CoverElement, PdfThemeConfig } from '@/lib/types';
import { createTimer } from '@/lib/performance';

// Format number with thousand separators
const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

// Default theme configuration - lavender/purple brand colors
const getDefaultThemeConfig = (): PdfThemeConfig => ({
  header: {
    borderColor: '#7c3aed',
    titleColor: '#7c3aed',
    subtitleColor: '#666666',
  },
  categoryHeader: {
    backgroundPrimary: '#7c3aed',
    backgroundSecondary: '#8b5cf6',
    textColor: '#ffffff',
  },
  table: {
    headerBackground: '#f5f3ff',
    headerTextColor: '#6b7280',
    borderColor: '#e5e7eb',
    bodyTextColor: '#333333',
  },
  subtotalRow: {
    background: '#f5f3ff',
    borderColor: '#8b5cf6',
    textColor: '#333333',
  },
  noteRow: {
    background: '#fffbeb',
    textColor: '#92400e',
  },
  totals: {
    finalTotalBackground: '#7c3aed',
    finalTotalTextColor: '#ffffff',
  },
});

// Default cover template configuration
const getDefaultCoverConfig = (): CoverPageConfig => ({
  page: {
    backgroundColor: '#ffffff',
    padding: 40,
    defaultFontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  elements: [
    {
      id: 'project_name',
      type: 'project_name',
      enabled: true,
      style: {
        fontSize: 36,
        fontWeight: 'bold',
        italic: false,
        underline: false,
        color: '#7c3aed',
        align: 'center',
        marginTop: 0,
        marginBottom: 20,
      },
    },
    {
      id: 'subtitle',
      type: 'subtitle',
      enabled: true,
      text: 'Bill of Quantities',
      style: {
        fontSize: 18,
        fontWeight: 'normal',
        italic: false,
        underline: false,
        color: '#666666',
        align: 'center',
        marginTop: 0,
        marginBottom: 10,
      },
    },
    {
      id: 'prepared_for',
      type: 'prepared_for',
      enabled: true,
      style: {
        fontSize: 18,
        fontWeight: 'normal',
        italic: false,
        underline: false,
        color: '#666666',
        align: 'center',
        marginTop: 0,
        marginBottom: 40,
      },
    },
    {
      id: 'company_name',
      type: 'company_name',
      enabled: true,
      style: {
        fontSize: 16,
        fontWeight: 'normal',
        italic: false,
        underline: false,
        color: '#333333',
        align: 'center',
        marginTop: 0,
        marginBottom: 0,
      },
    },
  ],
});

// Generate cover page HTML from template config
function generateCoverPageHtml(
  config: CoverPageConfig,
  projectName: string,
  customerName: string | null,
  companyName: string,
  dateMode: string,
  preparationDate: Date | string | null
): string {
  const renderElement = (element: CoverElement): string => {
    if (!element.enabled) return '';

    const style = `
      font-size: ${element.style.fontSize}px;
      font-weight: ${element.style.fontWeight};
      font-style: ${element.style.italic ? 'italic' : 'normal'};
      text-decoration: ${element.style.underline ? 'underline' : 'none'};
      color: ${element.style.color};
      text-align: ${element.style.align};
      margin-top: ${element.style.marginTop}px;
      margin-bottom: ${element.style.marginBottom}px;
    `;

    let content = '';

    switch (element.type) {
      case 'project_name':
        content = projectName || 'Project';
        break;
      case 'subtitle':
        content = element.text || 'Bill of Quantities';
        break;
      case 'prepared_for':
        if (customerName) {
          content = `Prepared for: ${customerName}`;
        } else {
          return '';
        }
        break;
      case 'company_name':
        content = companyName || 'Company';
        break;
      case 'logo':
        if (element.logoUrl) {
          const logoWidth = element.logoWidth || 200;
          const logoMaxWidth = element.logoMaxWidthPercent ? `${element.logoMaxWidthPercent}%` : `${logoWidth}px`;
          return `<div style="${style}; display: flex; justify-content: ${element.style.align};">
            <img src="${element.logoUrl}" alt="Logo" style="max-width: ${logoMaxWidth}; width: ${logoWidth}px; height: auto;" />
          </div>`;
        }
        return '';
      case 'date':
        if (dateMode === 'preparation_date' && preparationDate) {
          const date = new Date(preparationDate);
          content = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
        } else {
          const today = new Date();
          content = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
        }
        break;
      case 'prepared_by':
        content = element.text || '';
        if (!content) return '';
        break;
      case 'custom_text':
        content = element.text || '';
        if (!content) return '';
        break;
    }

    return `<div style="${style}">${content}</div>`;
  };

  const elementsHtml = config.elements.map(renderElement).join('');

  return `
    <div class="cover-page" style="
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      page-break-after: always;
      background-color: ${config.page.backgroundColor || '#ffffff'};
      padding: ${config.page.padding || 40}px;
      font-family: ${config.page.defaultFontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
    ">
      ${elementsHtml}
    </div>
  `;
}

/**
 * Process a PDF export job in the background
 */
export async function processPdfExport(
  jobId: string,
  boqId: string,
  companyId: string,
  watermarkOptions?: { enabled: boolean; text: string | null }
): Promise<void> {
  const timer = createTimer();
  
  try {
    // Mark job as processing
    await prisma.pdfExportJob.update({
      where: { id: jobId },
      data: { status: 'processing', startedAt: new Date() },
    });

    console.log(`[PDF_PROCESSOR_START] Job: ${jobId}, BOQ: ${boqId}, Watermark: ${watermarkOptions?.enabled ? 'yes' : 'no'}`);

    // Fetch BOQ and company data
    const [boq, company] = await Promise.all([
      prisma.boq.findFirst({
        where: { id: boqId, companyId },
        include: {
          customer: true,
          coverTemplate: true,
          pdfTheme: true,
          categories: {
            include: { items: { orderBy: { sortOrder: 'asc' } } },
            orderBy: { sortOrder: 'asc' },
          },
        },
      }),
      prisma.company.findUnique({
        where: { id: companyId },
        include: {
          pdfCoverTemplates: { where: { isDefault: true }, take: 1 },
          pdfThemes: { where: { isDefault: true }, take: 1 },
        },
      }),
    ]);

    if (!boq) {
      throw new Error('BOQ not found');
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
        if (item?.isNote) return;
        const qty = item?.quantity ?? 0;
        if (qty > 0) {
          const unitPrice = (item?.unitCost ?? 0) * (1 + (item?.markupPct ?? 0) / 100);
          subtotal += unitPrice * qty;
        }
      });
    });

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

    // Get cover template config
    let coverConfig: CoverPageConfig;
    if (boq.coverTemplate?.configJson) {
      coverConfig = boq.coverTemplate.configJson as unknown as CoverPageConfig;
    } else if (company?.pdfCoverTemplates?.[0]?.configJson) {
      coverConfig = company.pdfCoverTemplates[0].configJson as unknown as CoverPageConfig;
    } else {
      coverConfig = getDefaultCoverConfig();
    }

    // Get PDF theme config
    let themeConfig: PdfThemeConfig;
    if (boq.pdfTheme?.configJson) {
      themeConfig = boq.pdfTheme.configJson as unknown as PdfThemeConfig;
    } else if (company?.pdfThemes?.[0]?.configJson) {
      themeConfig = company.pdfThemes[0].configJson as unknown as PdfThemeConfig;
    } else {
      themeConfig = getDefaultThemeConfig();
    }

    // Generate cover page HTML
    const coverPageHtml = generateCoverPageHtml(
      coverConfig,
      boq?.projectName ?? 'Project',
      boq?.customer?.name ?? null,
      company?.name ?? 'Company',
      boq?.dateMode ?? 'export_date',
      boq?.preparationDate ?? null
    );

    // Generate full HTML (same as sync version)
    const html = generateFullHtml(boq, company, coverPageHtml, themeConfig, currencySymbol, formatCurrency, formatNumber, watermarkOptions);

    // Generate PDF using Puppeteer
    const { generatePdfBase64 } = await import('@/lib/pdf-puppeteer');
    const pdfBase64 = await generatePdfBase64(html, {
      format: 'A4',
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
      printBackground: true,
    });

    const pdfDataUrl = `data:application/pdf;base64,${pdfBase64}`;

    await prisma.pdfExportJob.update({
      where: { id: jobId },
      data: {
        status: 'completed',
        pdfUrl: pdfDataUrl,
        completedAt: new Date(),
      },
    });

    console.log(`[PDF_PROCESSOR_SUCCESS] Job: ${jobId}, Time: ${timer.elapsed()}ms`);
    return;
  } catch (error) {
    console.error(`[PDF_PROCESSOR_ERROR] Job: ${jobId}, Error:`, error);

    // Mark job as failed
    await prisma.pdfExportJob.update({
      where: { id: jobId },
      data: {
        status: 'failed',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        completedAt: new Date(),
      },
    });
  }
}

/**
 * Generate the full HTML for PDF (extracted for reuse)
 */
function generateFullHtml(
  boq: any,
  company: any,
  coverPageHtml: string,
  themeConfig: PdfThemeConfig,
  currencySymbol: string,
  formatCurrency: (amount: number) => string,
  formatNumber: (num: number, decimals?: number) => string,
  watermarkOptions?: { enabled: boolean; text: string | null }
): string {
  // Calculate totals
  let subtotal = 0;
  (boq?.categories ?? []).forEach((cat: any) => {
    (cat?.items ?? []).forEach((item: any) => {
      if (item?.isNote) return;
      const qty = item?.quantity ?? 0;
      if (qty > 0) {
        const unitPrice = (item?.unitCost ?? 0) * (1 + (item?.markupPct ?? 0) / 100);
        subtotal += unitPrice * qty;
      }
    });
  });

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

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 11px;
      line-height: 1.4;
      color: ${themeConfig.table.bodyTextColor};
    }
    .content-page { padding: 20px 30px; }
    .header {
      border-bottom: 2px solid ${themeConfig.header.borderColor};
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .header h1 { font-size: 18px; color: ${themeConfig.header.titleColor}; }
    .header p { font-size: 11px; color: ${themeConfig.header.subtitleColor}; }
    .category { margin-bottom: 25px; }
    .category-header {
      background: linear-gradient(135deg, ${themeConfig.categoryHeader.backgroundPrimary}, ${themeConfig.categoryHeader.backgroundSecondary});
      color: ${themeConfig.categoryHeader.textColor};
      padding: 8px 12px;
      font-weight: bold;
      font-size: 12px;
      border-radius: 4px 4px 0 0;
    }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid ${themeConfig.table.borderColor}; padding: 6px 8px; text-align: left; }
    th {
      background-color: ${themeConfig.table.headerBackground};
      font-weight: 600;
      font-size: 10px;
      text-transform: uppercase;
      color: ${themeConfig.table.headerTextColor};
    }
    td { font-size: 11px; }
    .text-right { text-align: right; }
    .subtotal-row {
      background-color: ${themeConfig.subtotalRow.background};
      font-weight: bold;
      color: ${themeConfig.subtotalRow.textColor};
    }
    .subtotal-row td { border-top: 2px solid ${themeConfig.subtotalRow.borderColor}; }
    .note-row { background-color: ${themeConfig.noteRow.background}; font-style: italic; }
    .note-row td { color: ${themeConfig.noteRow.textColor}; }
    .totals-section { margin-top: 30px; page-break-inside: avoid; }
    .totals-table { width: 300px; margin-left: auto; }
    .totals-table td { padding: 8px 12px; }
    .totals-table .label { text-align: left; font-weight: 500; }
    .totals-table .value { text-align: right; font-weight: bold; }
    .final-total {
      background-color: ${themeConfig.totals.finalTotalBackground};
      color: ${themeConfig.totals.finalTotalTextColor};
    }
    .final-total td { font-size: 14px; }
    ${watermarkOptions?.enabled ? `
    /* Branding footer strip */
    .watermark {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 10px;
      color: #7c3aed;
      font-weight: 600;
      letter-spacing: 0.5px;
      padding: 6px 0;
      background: linear-gradient(90deg, #f5f3ff 0%, #ede9fe 50%, #f5f3ff 100%);
      border-top: 1.5px solid #c4b5fd;
      z-index: 1000;
    }
    .watermark a {
      color: #7c3aed;
      text-decoration: none;
    }
    @media print {
      .watermark {
        position: fixed;
        bottom: 0;
      }
    }
    ` : ''}
  </style>
</head>
<body>
  ${watermarkOptions?.enabled && watermarkOptions?.text ? `<div class="watermark">📄 ${watermarkOptions.text} &nbsp;|&nbsp; Create your own BOQs free at <a href="https://makeestimate.com">MakeEstimate.com</a></div>` : ''}
  ${coverPageHtml}

  <div class="content-page">
    <div class="header">
      <h1>${boq?.projectName ?? 'Project'}</h1>
      ${boq?.customer ? `<p>Customer: ${boq.customer.name}</p>` : ''}
    </div>

    ${(boq?.categories ?? []).map((category: any, catIndex: number) => {
      const visibleItems = (category?.items ?? []).filter((item: any) => {
        if (item?.isNote) return item?.includeInPdf;
        return (item?.quantity ?? 0) > 0;
      });
      
      if (visibleItems.length === 0) return '';

      let categorySubtotal = 0;
      let itemNumber = 0;
      
      const itemRows = visibleItems.map((item: any) => {
        if (item?.isNote) {
          const noteContent = item?.noteContent ?? '';
          return `
            <tr class="note-row">
              <td></td>
              <td colspan="5" style="font-style: normal;">${noteContent}</td>
            </tr>
          `;
        }
        
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
}
