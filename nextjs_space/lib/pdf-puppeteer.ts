/**
 * PDF Generation via Puppeteer
 * Replaces the Abacus AI HTML2PDF API
 */

import puppeteer from 'puppeteer';

let browserInstance: any = null;

async function getBrowser() {
  if (browserInstance && browserInstance.isConnected()) {
    return browserInstance;
  }
  browserInstance = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
    ],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  });
  return browserInstance;
}

export interface PdfOptions {
  format?: 'A4' | 'Letter';
  margin?: { top?: string; right?: string; bottom?: string; left?: string };
  printBackground?: boolean;
}

/**
 * Generate PDF from HTML string using Puppeteer
 * @param html - Full HTML content
 * @param options - PDF generation options
 * @returns PDF as Buffer
 */
export async function generatePdfFromHtml(
  html: string,
  options: PdfOptions = {}
): Promise<Buffer> {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });

    const pdfBuffer = await page.pdf({
      format: options.format || 'A4',
      margin: options.margin || {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
      printBackground: options.printBackground !== false,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await page.close();
  }
}

/**
 * Generate PDF and return as base64 string
 */
export async function generatePdfBase64(
  html: string,
  options: PdfOptions = {}
): Promise<string> {
  const buffer = await generatePdfFromHtml(html, options);
  return buffer.toString('base64');
}
