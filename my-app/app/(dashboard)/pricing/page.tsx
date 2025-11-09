'use client';

import { useState } from 'react';

// Utility function
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};

// Mock data
const mockPriceHistory = [
  {
    id: '1',
    productName: 'Acrylic',
    variantName: 'Satin Acrylic',
    oldPrice: 1150,
    newPrice: 1200,
    changeDate: '2024-01-15',
    changedBy: 'Admin User',
    reason: 'Market price adjustment'
  },
  {
    id: '2',
    productName: 'Calcium',
    variantName: 'Calcium Carbonate',
    oldPrice: 750,
    newPrice: 800,
    changeDate: '2024-01-10',
    changedBy: 'Manager',
    reason: 'Supplier cost increase'
  }
];

const currentPricing = [
  {
    product: 'Acrylic',
    variants: [
      { name: 'Satin Acrylic', currentPrice: 1200, lastUpdated: '2024-01-15' },
      { name: 'Emulsion Acrylic', currentPrice: 1100, lastUpdated: '2024-01-10' },
      { name: 'Gloss Acrylic', currentPrice: 1300, lastUpdated: '2024-01-08' }
    ]
  },
  {
    product: 'Calcium',
    variants: [
      { name: 'Calcium Carbonate', currentPrice: 800, lastUpdated: '2024-01-10' },
      { name: 'Calcium Hydroxide', currentPrice: 950, lastUpdated: '2024-01-05' }
    ]
  }
];

export default function PricingPage() {
  const [priceHistory] = useState(mockPriceHistory);
  const [pricing] = useState(currentPricing);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Price Management</h1>
          <p className="text-gray-600">Review and update product pricing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Pricing */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Current Pricing</h3>
            <p className="text-sm text-gray-600 mt-1">Active prices for all products</p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {pricing.map((productGroup) => (
                <div key={productGroup.product}>
                  <h4 className="font-semibold text-gray-900 mb-3">{productGroup.product}</h4>
                  <div className="space-y-2">
                    {productGroup.variants.map((variant, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                        onClick={() => setSelectedProduct({
                          product: productGroup.product,
                          variant: variant.name,
                          currentPrice: variant.currentPrice
                        })}
                      >
                        <div>
                          <p className="font-medium text-sm">{variant.name}</p>
                          <p className="text-xs text-gray-600">
                            Updated: {new Date(variant.lastUpdated).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">{formatCurrency(variant.currentPrice)}</p>
                          <p className="text-xs text-gray-600">per kg</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price History & Update Form */}
        <div className="space-y-6">
          {/* Update Price Form */}
          {selectedProduct && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Update Price - {selectedProduct.variant}
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-900">Current Price:</span>
                    <span className="text-lg font-bold text-blue-900">
                      {formatCurrency(selectedProduct.currentPrice)}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Price (/kg) *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="Enter new price"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300 px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Update Price
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Price Change History */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Price Change History</h3>
              <p className="text-sm text-gray-600 mt-1">Recent price adjustments</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {priceHistory.map((change) => (
                  <div key={change.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          {change.productName} - {change.variantName}
                        </p>
                        <p className="text-sm text-gray-600">{change.reason}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(change.oldPrice)}
                          </span>
                          <span className="text-lg font-semibold text-green-600">
                            {formatCurrency(change.newPrice)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(change.changeDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Changed by: {change.changedBy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State when no product is selected */}
      {!selectedProduct && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
          <div className="text-4xl mb-4">💲</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Product to Update</h3>
          <p className="text-gray-600">
            Click on any product variant from the list to update its pricing
          </p>
        </div>
      )}
    </div>
  );
}