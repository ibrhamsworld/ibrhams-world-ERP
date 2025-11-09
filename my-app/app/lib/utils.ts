import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
}

export function calculateTotal(quantityKg: number, pricePerKg: number): number {
  return Math.round(quantityKg * pricePerKg * 100) / 100;
}

export function generateReceiptNumber(sequence: number): string {
  const year = new Date().getFullYear();
  return `IBR-${year}-${sequence.toString().padStart(6, '0')}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}