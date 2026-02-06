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
  projectName: string;
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
  createdAt: Date;
}

export interface CompanySettings {
  id: string;
  name: string;
  currencySymbol: string;
  currencyPosition: string;
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
