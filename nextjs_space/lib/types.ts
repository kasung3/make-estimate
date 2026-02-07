import { Role, DiscountType } from '@prisma/client';

export type { Role, DiscountType };

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
  projectName: string;
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
  dateMode?: 'today' | 'custom'; // for date type
  customDate?: string; // YYYY-MM-DD for custom date
  logoUrl?: string; // for logo type
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
