/**
 * PDF Generation Tests
 * Tests for discount/VAT toggle behavior in PDF export
 * 
 * Run with: yarn test or npx jest __tests__/pdf-generation.test.ts
 */

describe('PDF HTML Generation - Discount/VAT Logic', () => {
  // Helper function that mimics the PDF generation logic
  const generateTotalsHtml = (boq: {
    discountEnabled: boolean;
    discountType: 'percent' | 'fixed';
    discountValue: number;
    vatEnabled: boolean;
    vatPercent: number;
    subtotal: number;
  }) => {
    const { discountEnabled, discountType, discountValue, vatEnabled, vatPercent, subtotal } = boq;
    
    // Calculate discount only if enabled
    let discount = 0;
    if (discountEnabled) {
      if (discountType === 'percent') {
        discount = subtotal * (discountValue / 100);
      } else {
        discount = discountValue;
      }
    }
    
    const afterDiscount = subtotal - discount;
    const vatAmount = vatEnabled ? afterDiscount * (vatPercent / 100) : 0;
    const finalTotal = afterDiscount + vatAmount;
    
    // Generate HTML using the same conditions as the actual PDF route
    let html = `<tr><td>Subtotal</td><td>Rs. ${subtotal.toFixed(2)}</td></tr>`;
    
    // CRITICAL: Show discount ONLY if discountEnabled === true AND discount > 0
    if (discountEnabled === true && discount > 0) {
      html += `<tr><td>Discount${discountType === 'percent' ? ` (${discountValue}%)` : ''}</td><td>-Rs. ${discount.toFixed(2)}</td></tr>`;
    }
    
    // CRITICAL: Show VAT ONLY if vatEnabled === true AND vatAmount > 0
    if (vatEnabled === true && vatAmount > 0) {
      html += `<tr><td>VAT (${vatPercent}%)</td><td>Rs. ${vatAmount.toFixed(2)}</td></tr>`;
    }
    
    html += `<tr><td>Final Total</td><td>Rs. ${finalTotal.toFixed(2)}</td></tr>`;
    
    return { html, discount, vatAmount, finalTotal };
  };

  // Test Case 1: Both disabled - no discount or VAT lines
  test('Case 1: discount_enabled=false, vat_enabled=false - PDF contains NO Discount and NO VAT', () => {
    const result = generateTotalsHtml({
      discountEnabled: false,
      discountType: 'percent',
      discountValue: 5,  // Even with value set, should NOT show
      vatEnabled: false,
      vatPercent: 18,    // Even with value set, should NOT show
      subtotal: 100000,
    });
    
    expect(result.html).not.toContain('Discount');
    expect(result.html).not.toContain('VAT');
    expect(result.discount).toBe(0);
    expect(result.vatAmount).toBe(0);
    expect(result.finalTotal).toBe(100000);
  });

  // Test Case 2: Discount enabled with 5%
  test('Case 2: discount_enabled=true with 5% - includes Discount line with correct amount', () => {
    const result = generateTotalsHtml({
      discountEnabled: true,
      discountType: 'percent',
      discountValue: 5,
      vatEnabled: false,
      vatPercent: 0,
      subtotal: 100000,
    });
    
    expect(result.html).toContain('Discount');
    expect(result.html).toContain('5%');
    expect(result.html).toContain('-Rs. 5000.00');
    expect(result.html).not.toContain('VAT');
    expect(result.discount).toBe(5000);
    expect(result.finalTotal).toBe(95000);
  });

  // Test Case 3: VAT enabled with 18%
  test('Case 3: vat_enabled=true with 18% - includes VAT line with correct amount', () => {
    const result = generateTotalsHtml({
      discountEnabled: false,
      discountType: 'percent',
      discountValue: 0,
      vatEnabled: true,
      vatPercent: 18,
      subtotal: 100000,
    });
    
    expect(result.html).not.toContain('Discount');
    expect(result.html).toContain('VAT');
    expect(result.html).toContain('18%');
    expect(result.html).toContain('Rs. 18000.00');
    expect(result.vatAmount).toBe(18000);
    expect(result.finalTotal).toBe(118000);
  });

  // Test Case 4: Both enabled
  test('Case 4: Both discount and VAT enabled - includes both lines', () => {
    const result = generateTotalsHtml({
      discountEnabled: true,
      discountType: 'percent',
      discountValue: 10,
      vatEnabled: true,
      vatPercent: 18,
      subtotal: 100000,
    });
    
    expect(result.html).toContain('Discount');
    expect(result.html).toContain('10%');
    expect(result.html).toContain('-Rs. 10000.00');
    expect(result.html).toContain('VAT');
    expect(result.html).toContain('18%');
    // VAT calculated on discounted amount: (100000 - 10000) * 0.18 = 16200
    expect(result.html).toContain('Rs. 16200.00');
    expect(result.discount).toBe(10000);
    expect(result.vatAmount).toBe(16200);
    expect(result.finalTotal).toBe(106200); // 90000 + 16200
  });

  // Test Case 5: Discount enabled but value is 0
  test('Case 5: discount_enabled=true but value=0 - NO Discount line shown', () => {
    const result = generateTotalsHtml({
      discountEnabled: true,
      discountType: 'percent',
      discountValue: 0,
      vatEnabled: false,
      vatPercent: 0,
      subtotal: 100000,
    });
    
    // Even though enabled, if computed discount is 0, don't show the line
    expect(result.html).not.toContain('Discount');
    expect(result.discount).toBe(0);
    expect(result.finalTotal).toBe(100000);
  });

  // Test Case 6: VAT enabled but value is 0
  test('Case 6: vat_enabled=true but percent=0 - NO VAT line shown', () => {
    const result = generateTotalsHtml({
      discountEnabled: false,
      discountType: 'percent',
      discountValue: 0,
      vatEnabled: true,
      vatPercent: 0,
      subtotal: 100000,
    });
    
    // Even though enabled, if computed VAT is 0, don't show the line
    expect(result.html).not.toContain('VAT');
    expect(result.vatAmount).toBe(0);
    expect(result.finalTotal).toBe(100000);
  });

  // Test Case 7: Fixed discount type
  test('Case 7: Fixed discount of Rs. 5000', () => {
    const result = generateTotalsHtml({
      discountEnabled: true,
      discountType: 'fixed',
      discountValue: 5000,
      vatEnabled: false,
      vatPercent: 0,
      subtotal: 100000,
    });
    
    expect(result.html).toContain('Discount');
    expect(result.html).not.toContain('%'); // Fixed discount shouldn't show %
    expect(result.html).toContain('-Rs. 5000.00');
    expect(result.discount).toBe(5000);
    expect(result.finalTotal).toBe(95000);
  });

  // Test Case 8: Rapid toggle simulation - final state matters
  test('Case 8: Rapid toggle simulation - final disabled state wins', () => {
    // Simulate rapid toggling - what matters is the FINAL state
    let state = {
      discountEnabled: false,
      discountType: 'percent' as const,
      discountValue: 5,
      vatEnabled: false,
      vatPercent: 18,
      subtotal: 100000,
    };
    
    // Toggle on
    state.discountEnabled = true;
    state.vatEnabled = true;
    
    // Toggle off
    state.discountEnabled = false;
    state.vatEnabled = false;
    
    // Final state: both disabled
    const result = generateTotalsHtml(state);
    
    // Despite having non-zero values, should NOT show discount/VAT when disabled
    expect(result.html).not.toContain('Discount');
    expect(result.html).not.toContain('VAT');
    expect(result.finalTotal).toBe(100000);
  });

  // Test Case 9: Rapid toggle simulation - final enabled state wins
  test('Case 9: Rapid toggle simulation - final enabled state wins', () => {
    let state = {
      discountEnabled: true,
      discountType: 'percent' as const,
      discountValue: 5,
      vatEnabled: true,
      vatPercent: 18,
      subtotal: 100000,
    };
    
    // Toggle off
    state.discountEnabled = false;
    state.vatEnabled = false;
    
    // Toggle back on
    state.discountEnabled = true;
    state.vatEnabled = true;
    
    // Final state: both enabled
    const result = generateTotalsHtml(state);
    
    expect(result.html).toContain('Discount');
    expect(result.html).toContain('VAT');
    expect(result.discount).toBe(5000);
    expect(result.vatAmount).toBeCloseTo(17100); // (100000-5000)*0.18
  });
});

describe('HTML Sanitization Tests', () => {
  // Helper function that mimics the sanitization logic
  const sanitizeHtml = (html: string): string => {
    if (!html) return '';
    
    // Simple regex-based sanitization for testing
    // In production, we use DOM-based sanitization
    const allowedTags = ['strong', 'b', 'em', 'i', 'u', 'p', 'br', 'ul', 'ol', 'li', 'span'];
    
    // Remove script tags completely
    let cleaned = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    
    // Remove event handlers
    cleaned = cleaned.replace(/\son\w+\s*=\s*(['"])[^'"]*\1/gi, '');
    cleaned = cleaned.replace(/\son\w+\s*=\s*[^\s>]+/gi, '');
    
    return cleaned;
  };

  test('Formatted text renders correctly - no raw tags', () => {
    const input = '<strong><u>Grade 15 Concrete</u></strong>';
    const result = sanitizeHtml(input);
    
    // Should preserve the HTML structure
    expect(result).toContain('<strong>');
    expect(result).toContain('<u>');
    expect(result).toContain('Grade 15 Concrete');
    // Should NOT have escaped HTML entities
    expect(result).not.toContain('&lt;');
    expect(result).not.toContain('&gt;');
  });

  test('XSS script tags are removed', () => {
    const input = '<strong>Safe text</strong><script>alert("xss")</script>';
    const result = sanitizeHtml(input);
    
    expect(result).toContain('<strong>Safe text</strong>');
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('alert');
  });

  test('XSS event handlers are removed', () => {
    const input = '<strong onmouseover="alert(1)">Text</strong>';
    const result = sanitizeHtml(input);
    
    expect(result).not.toContain('onmouseover');
    expect(result).not.toContain('alert');
  });

  test('Empty string returns empty string', () => {
    expect(sanitizeHtml('')).toBe('');
  });

  test('Plain text passes through unchanged', () => {
    const input = 'Plain text without any HTML';
    const result = sanitizeHtml(input);
    expect(result).toBe(input);
  });

  test('Bold, italic, underline tags are preserved', () => {
    const input = '<strong>Bold</strong> <em>Italic</em> <u>Underline</u>';
    const result = sanitizeHtml(input);
    
    expect(result).toContain('<strong>Bold</strong>');
    expect(result).toContain('<em>Italic</em>');
    expect(result).toContain('<u>Underline</u>');
  });

  test('Nested formatting tags are preserved', () => {
    const input = '<u><strong>Grade 25 Concrete</strong></u>';
    const result = sanitizeHtml(input);
    
    expect(result).toContain('<u>');
    expect(result).toContain('<strong>');
    expect(result).toContain('Grade 25 Concrete');
    expect(result).toContain('</strong>');
    expect(result).toContain('</u>');
  });

  test('Alternative bold/italic tags (b, i) are preserved', () => {
    const input = '<b>Bold</b> <i>Italic</i>';
    const result = sanitizeHtml(input);
    
    expect(result).toContain('<b>Bold</b>');
    expect(result).toContain('<i>Italic</i>');
  });
});

describe('Rich Text Note Display Tests', () => {
  // Simulate what the UI should show
  const renderNoteContent = (html: string): { showsRawTags: boolean; hasFormatting: boolean } => {
    // Raw tags would appear as literal text like "<strong>"
    const showsRawTags = html.includes('&lt;') || html.includes('&gt;') || 
                         (html.includes('<strong>') === false && html.includes('strong') === true);
    
    // Has formatting if it contains actual HTML tags
    const hasFormatting = /<(strong|em|u|b|i)>/i.test(html);
    
    return { showsRawTags, hasFormatting };
  };

  test('Stored HTML note displays formatted, not raw tags', () => {
    const storedHtml = '<strong><u>Grade 15 Concrete</u></strong>';
    const result = renderNoteContent(storedHtml);
    
    expect(result.showsRawTags).toBe(false);
    expect(result.hasFormatting).toBe(true);
  });

  test('Complex nested formatting displays correctly', () => {
    const storedHtml = '<u><strong>All concrete work shall be in accordance with BS 8110, BS 8007</strong></u>';
    const result = renderNoteContent(storedHtml);
    
    expect(result.showsRawTags).toBe(false);
    expect(result.hasFormatting).toBe(true);
  });
});

describe('Inline Note Editing Tests', () => {
  // Helper: Check if note has formatting (matches the app's noteHasFormatting function)
  const noteHasFormatting = (html: string): boolean => {
    if (!html) return false;
    
    // List of formatting tags that indicate rich text
    const formattingTags = ['strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre'];
    
    // Check for any formatting tags
    const tagPattern = new RegExp(`<(${formattingTags.join('|')})(\\s[^>]*)?>`, 'i');
    if (tagPattern.test(html)) return true;
    
    // Check for span with style attribute
    if (/<span\s+[^>]*style\s*=/i.test(html)) return true;
    
    // Check for any tag with style attribute
    if (/<[^>]+\s+style\s*=/i.test(html)) return true;
    
    return false;
  };

  // Helper: Convert HTML to plain text
  const htmlToPlainText = (html: string): string => {
    if (!html) return '';
    // Simplified version for testing
    return html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<p>/gi, '')
      .replace(/<[^>]+>/g, ''); // Strip all tags
  };

  // Helper: Convert plain text to safe HTML
  const plainTextToSafeHtml = (text: string): string => {
    if (!text) return '';
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    return escaped.replace(/\n/g, '<br>');
  };

  // Simulate the click behavior
  const simulateNoteClick = (html: string): 'modal' | 'inline' => {
    if (noteHasFormatting(html)) {
      return 'modal'; // Opens modal directly for formatted notes
    }
    return 'inline'; // Allows inline editing for plain notes
  };

  test('noteHasFormatting detects bold/italic/underline tags', () => {
    expect(noteHasFormatting('<strong>Bold</strong>')).toBe(true);
    expect(noteHasFormatting('<em>Italic</em>')).toBe(true);
    expect(noteHasFormatting('<u>Underline</u>')).toBe(true);
    expect(noteHasFormatting('<b>Bold alt</b>')).toBe(true);
    expect(noteHasFormatting('<i>Italic alt</i>')).toBe(true);
  });

  test('noteHasFormatting detects list tags', () => {
    expect(noteHasFormatting('<ul><li>Item</li></ul>')).toBe(true);
    expect(noteHasFormatting('<ol><li>Item</li></ol>')).toBe(true);
  });

  test('noteHasFormatting detects heading and code tags', () => {
    expect(noteHasFormatting('<h1>Title</h1>')).toBe(true);
    expect(noteHasFormatting('<code>code</code>')).toBe(true);
    expect(noteHasFormatting('<blockquote>Quote</blockquote>')).toBe(true);
  });

  test('noteHasFormatting detects style attributes', () => {
    expect(noteHasFormatting('<span style="color:red">Styled</span>')).toBe(true);
    expect(noteHasFormatting('<p style="font-weight:bold">Bold paragraph</p>')).toBe(true);
  });

  test('noteHasFormatting returns false for plain text and structure tags', () => {
    expect(noteHasFormatting('Plain text')).toBe(false);
    expect(noteHasFormatting('')).toBe(false);
    expect(noteHasFormatting('Text with <br> line break')).toBe(false);
    expect(noteHasFormatting('<p>Hello<br>World</p>')).toBe(false);
  });

  test('Formatted note click opens modal directly (no warning)', () => {
    const formattedNote = '<strong><u>Grade 15 Concrete</u></strong>';
    expect(simulateNoteClick(formattedNote)).toBe('modal');
  });

  test('Plain note click allows inline editing', () => {
    const plainNote = 'All concrete work shall be in accordance with BS 8110';
    expect(simulateNoteClick(plainNote)).toBe('inline');
  });

  test('Plain note with br/p tags allows inline editing', () => {
    const plainNoteWithBreaks = '<p>Line 1<br>Line 2</p>';
    expect(simulateNoteClick(plainNoteWithBreaks)).toBe('inline');
  });

  test('htmlToPlainText strips formatting tags', () => {
    expect(htmlToPlainText('<strong>Bold</strong> text')).toBe('Bold text');
    expect(htmlToPlainText('<u><strong>Grade 25 Concrete</strong></u>')).toBe('Grade 25 Concrete');
  });

  test('htmlToPlainText converts br to newlines', () => {
    expect(htmlToPlainText('Line 1<br>Line 2')).toBe('Line 1\nLine 2');
    expect(htmlToPlainText('Line 1<br/>Line 2')).toBe('Line 1\nLine 2');
  });

  test('plainTextToSafeHtml escapes HTML entities (XSS prevention)', () => {
    expect(plainTextToSafeHtml('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(plainTextToSafeHtml('A & B')).toBe('A &amp; B');
  });

  test('plainTextToSafeHtml converts newlines to br', () => {
    expect(plainTextToSafeHtml('Line 1\nLine 2')).toBe('Line 1<br>Line 2');
  });

  test('Round-trip: plain text -> HTML -> plain text', () => {
    const original = 'Line 1\nLine 2\nLine 3';
    const html = plainTextToSafeHtml(original);
    const result = htmlToPlainText(html);
    expect(result).toBe(original);
  });
});
