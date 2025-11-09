'use client';

import { useRef } from 'react';

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

interface ReceiptProps {
  sale: any;
  companyInfo: {
    name: string;
    address: string;
    phone: string;
    logo?: string;
  };
}

export function Receipt({ sale, companyInfo }: ReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (receiptRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Receipt-${sale.receiptNo}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                .receipt { max-width: 400px; margin: 0 auto; }
                .company-header { text-align: center; margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 20px; }
                .details { margin-bottom: 20px; }
                .items { margin-bottom: 20px; }
                .total { border-top: 2px solid #000; padding-top: 10px; font-weight: bold; }
                .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              ${receiptRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Print Button */}
      <div className="no-print flex justify-end">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          🖨️ Print Receipt
        </button>
      </div>

      {/* Receipt Content */}
      <div ref={receiptRef} className="bg-white p-8 rounded-lg border-2 border-dashed border-gray-300 max-w-md mx-auto">
        {/* Company Header */}
        <div className="text-center mb-6 border-b border-gray-200 pb-4">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-xl">IW</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{companyInfo.name}</h1>
          <p className="text-sm text-gray-600">{companyInfo.address}</p>
          <p className="text-sm text-gray-600">{companyInfo.phone}</p>
        </div>

        {/* Receipt Details */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Receipt No:</span>
            <span className="font-semibold">{sale.receiptNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Date:</span>
            <span>{formatDate(sale.date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Branch:</span>
            <span>Main Branch</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Sales Rep:</span>
            <span>{sale.user.name}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Customer Details</h3>
          <p className="text-sm">{sale.customer.name}</p>
          <p className="text-sm text-gray-600">{sale.customer.phone}</p>
          {sale.customer.address && (
            <p className="text-sm text-gray-600">{sale.customer.address}</p>
          )}
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">Items Purchased</h3>
          <div className="space-y-3">
            {sale.saleItems.map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm border-b border-gray-100 pb-2 last:border-0">
                <div className="flex-1">
                  <div className="font-medium">
                    {item.product.name}
                    {item.variant && ` - ${item.variant.name}`}
                  </div>
                  <div className="text-gray-600 text-xs">
                    {item.quantityKg} kg × {formatCurrency(item.unitPrice)}/kg
                  </div>
                </div>
                <div className="font-semibold text-right">
                  {formatCurrency(item.totalPrice)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount:</span>
            <span>{formatCurrency(sale.totalAmount)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
          <p>Thank you for your business!</p>
          <p>This receipt was generated electronically</p>
          <p className="mt-2 font-medium">IBRHAMS WORLD ERP System</p>
        </div>
      </div>
    </div>
  );
}