export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'SALES_REP';
  branchId: string;
  createdAt: Date;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  contact: string;
}

export interface Product {
  id: string;
  name: string;
  pricePerKg: number;
  stock: number;
  branchId: string;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  pricePerKg: number;
  productId: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
  createdAt: Date;
}

export interface Sale {
  id: string;
  receiptNo: string;
  date: Date;
  branchId: string;
  userId: string;
  customerId: string;
  totalAmount: number;
  customer: Customer;
  user: User;
  saleItems: SaleItem[];
}

export interface SaleItem {
  id: string;
  productId: string;
  variantId?: string;
  quantityKg: number;
  unitPrice: number;
  totalPrice: number;
  product: Product;
  variant?: ProductVariant;
}