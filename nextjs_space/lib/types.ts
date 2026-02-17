import { Role, DiscountType, DateMode, PlanKey, SubscriptionStatus, CouponType, GrantType, SeatModel, BillingInterval } from '@prisma/client';

export type { Role, DiscountType, DateMode, PlanKey, SubscriptionStatus, CouponType, GrantType, SeatModel, BillingInterval };

// Billing Types
export interface BillingStatus {
  hasActiveSubscription: boolean;
  isBlocked: boolean;
  planKey: string | null;
  status: string | null;
  billingInterval?: BillingInterval;
  seatQuantity?: number;
  currentPeriodStart: Date | string | null;
  currentPeriodEnd: Date | string | null;
  cancelAtPeriodEnd: boolean;
  boqsUsedThisPeriod: number;
  boqLimit: number | null;
  canCreateBoq: boolean;
  hasAdminGrant?: boolean;
  hasTrialGrant?: boolean;
  trialEndsAt?: Date | string | null;
  accessSource?: 'subscription' | 'grant' | 'admin_override' | null;
  accessOverride?: string | null;
  isAdmin?: boolean;
  planInfo?: BillingPlanInfo | null;
  plans?: Record<string, BillingPlanInfo>;
  userBlocked?: boolean;
  companyBlocked?: boolean;
  blockReason?: string | null;
  // Template limits
  boqTemplatesLimit?: number | null;
  boqPresetsLimit?: number | null;
  coverTemplatesLimit?: number | null;
  logoUploadAllowed?: boolean;
  sharingAllowed?: boolean;
  // Free plan specific
  boqItemsLimit?: number | null;  // Max items per BOQ (null = unlimited)
  watermarkEnabled?: boolean;      // Whether PDFs have watermark
  watermarkText?: string | null;   // Custom watermark text
}

export interface BillingPlanInfo {
  id?: string;
  planKey: string;
  name: string;
  priceMonthlyUsdCents: number;
  priceAnnualUsdCents: number | null;
  seatModel: SeatModel;
  boqLimitPerPeriod: number | null;
  boqItemsLimit: number | null;        // Max items per BOQ (null = unlimited)
  boqTemplatesLimit: number | null;
  boqPresetsLimit?: number | null;
  coverTemplatesLimit: number | null;
  logoUploadAllowed: boolean;
  sharingAllowed: boolean;
  watermarkEnabled: boolean;           // Whether PDFs have watermark
  watermarkText: string | null;        // Custom watermark text
  maxActiveMembers: number;
  features: string[];
  isMostPopular: boolean;
  sortOrder: number;
  active: boolean;
  stripeProductId: string | null;
  stripePriceIdMonthly: string | null;
  stripePriceIdAnnual: string | null;
}

// Legacy PlanInfo for backward compatibility
export interface PlanInfo {
  key: string;
  name: string;
  priceId: string;
  price: number;
  boqLimit: number | null;
  description: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  companyId: string;
  companyName: string;
  role: Role;
}

export interface BoqWithRelations {
  id: string;
  companyId: string;
  customerId: string | null;
  coverTemplateId: string | null;
  pdfThemeId: string | null;
  projectName: string;
  dateMode: DateMode;
  preparationDate: Date | string | null;
  discountEnabled: boolean;
  discountType: DiscountType;
  discountValue: number;
  vatEnabled: boolean;
  vatPercent: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  customer: {
    id: string;
    name: string;
    email: string | null;
  } | null;
  coverTemplate?: PdfCoverTemplateType | null;
  pdfTheme?: PdfThemeType | null;
  categories: CategoryWithItems[];
}

export interface CategoryWithItems {
  id: string;
  boqId: string;
  name: string;
  sortOrder: number;
  createdAt: Date;
  items: BoqItemType[];
}

export interface BoqItemType {
  id: string;
  categoryId: string;
  description: string;
  unit: string;
  unitCost: number;
  markupPct: number;
  quantity: number;
  sortOrder: number;
  isNote: boolean;
  noteContent: string | null;
  includeInPdf: boolean;
  createdAt: Date;
}

export interface CompanySettings {
  id: string;
  name: string;
  currencySymbol: string;
  currencyPosition: string;
  defaultVatPercent: number;
}

export interface CustomerType {
  id: string;
  companyId: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  createdAt: Date;
}

// PDF Cover Template Types
export interface CoverElementStyle {
  fontSize: number;
  fontWeight: 'normal' | 'bold';
  italic: boolean;
  underline: boolean;
  color: string;
  align: 'left' | 'center' | 'right';
  marginTop: number;
  marginBottom: number;
}

export interface CoverElement {
  id: string;
  type: 'project_name' | 'subtitle' | 'prepared_for' | 'company_name' | 'logo' | 'date' | 'prepared_by' | 'custom_text';
  enabled: boolean;
  text?: string; // for custom_text type
  dateMode?: 'today' | 'custom'; // for date type (deprecated, use BOQ-level dateMode)
  customDate?: string; // YYYY-MM-DD for custom date (deprecated, use BOQ-level preparationDate)
  logoUrl?: string; // for logo type - can be cloud storage path or URL
  logoWidth?: number; // logo width in pixels
  logoMaxWidthPercent?: number; // max width as percentage of page (e.g., 50 for 50%)
  style: CoverElementStyle;
}

export interface CoverPageConfig {
  page: {
    backgroundColor?: string;
    padding?: number;
    defaultFontFamily?: string;
  };
  elements: CoverElement[];
}

export interface PdfCoverTemplateType {
  id: string;
  companyId: string;
  name: string;
  configJson: CoverPageConfig;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// PDF Theme Types (for BOQ pages color/shading)
export interface PdfThemeConfig {
  // Page header section
  header: {
    borderColor: string;       // Bottom border of header
    titleColor: string;        // Project name color
    subtitleColor: string;     // Customer info color
  };
  // Category header band
  categoryHeader: {
    backgroundPrimary: string; // Gradient start
    backgroundSecondary: string; // Gradient end
    textColor: string;
  };
  // Table styling
  table: {
    headerBackground: string;  // Table header row background
    headerTextColor: string;   // Table header text color
    borderColor: string;       // All table borders
    bodyTextColor: string;     // Table body text
  };
  // Subtotal row at end of each category
  subtotalRow: {
    background: string;
    borderColor: string;
    textColor: string;
  };
  // Note rows
  noteRow: {
    background: string;
    textColor: string;
  };
  // Final totals section
  totals: {
    finalTotalBackground: string;
    finalTotalTextColor: string;
  };
}

export interface PdfThemeType {
  id: string;
  companyId: string;
  name: string;
  configJson: PdfThemeConfig;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}
