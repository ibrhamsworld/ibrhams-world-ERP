'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

// Mock products data
const products = [
  { id: '1', name: 'Acrylic', pricePerKg: 1000 },
  { id: '2', name: 'Calcium', pricePerKg: 800 },
  { id: '3', name: 'Genepo', pricePerKg: 1500 },
  { id: '4', name: 'PVA', pricePerKg: 900 },
];

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};

const calculateTotal = (quantityKg: number, pricePerKg: number): number => {
  return Math.round(quantityKg * pricePerKg * 100) / 100;
};

// SalesForm component defined inline
function SalesForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      items: [{ productId: '', quantityKg: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const items = watch('items');
  const grandTotal = items.reduce((total: number, item: any) => {
    const product = products.find(p => p.id === item.productId);
    return total + calculateTotal(item.quantityKg || 0, product?.pricePerKg || 0);
  }, 0);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      console.log('Sale data:', data);
      alert('Sale recorded successfully!');
    } catch (error) {
      console.error('Error recording sale:', error);
      alert('Error recording sale. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Customer Information */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400"
                placeholder="Enter customer name"
                {...register('customerName', { required: true })}
              />
              {errors.customerName && (
                <p className="text-red-600 text-sm mt-1">Customer name is required</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400"
                placeholder="Enter phone number"
                {...register('customerPhone', { required: true })}
              />
              {errors.customerPhone && (
                <p className="text-red-600 text-sm mt-1">Phone number is required</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400"
                placeholder="Enter customer address"
                {...register('customerAddress')}
              />
            </div>
          </div>
        </div>

        {/* Sale Items */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Sale Items</h3>
            <button
              type="button"
              onClick={() => append({ productId: '', quantityKg: 0 })}
              className="bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300 px-4 py-2.5 rounded-lg transition-colors"
            >
              + Add Item
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  {/* Product Selection */}
                  <div className="md:col-span-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product
                    </label>
                    <select
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                      {...register(`items.${index}.productId`, { required: true })}
                    >
                      <option value="">Select product</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} - {formatCurrency(product.pricePerKg)}/kg
                        </option>
                      ))}
                    </select>
                    {errors.items?.[index]?.productId && (
                      <p className="text-red-600 text-sm mt-1">Product is required</p>
                    )}
                  </div>

                  {/* Quantity Input */}
                  <div className="md:col-span-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity (kg)
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      min="0.001"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400"
                      placeholder="0.000"
                      {...register(`items.${index}.quantityKg`, { 
                        required: true,
                        valueAsNumber: true,
                        min: 0.001
                      })}
                    />
                    {errors.items?.[index]?.quantityKg && (
                      <p className="text-red-600 text-sm mt-1">Quantity must be at least 0.001 kg</p>
                    )}
                  </div>

                  {/* Remove Button */}
                  <div className="md:col-span-3">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                      className="w-full bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-lg py-2.5 px-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total Display */}
                {items[index]?.productId && items[index]?.quantityKg > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-900">
                        Item Total:
                      </span>
                      <span className="text-lg font-bold text-blue-900">
                        {formatCurrency(
                          calculateTotal(
                            items[index].quantityKg,
                            products.find(p => p.id === items[index].productId)?.pricePerKg || 0
                          )
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Grand Total */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-green-900">Grand Total</h3>
              <p className="text-sm text-green-700">Including all items</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-900">
                {formatCurrency(grandTotal)}
              </div>
              <div className="text-sm text-green-700">
                {items.length} item(s)
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button type="button" className="bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300 px-4 py-2.5 rounded-lg transition-colors">
            Save Draft
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Complete Sale & Print Receipt'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Record New Sale</h1>
          <p className="text-gray-600">Enter sale details and generate receipt</p>
        </div>
        <div className="text-sm text-gray-500">
          Receipt: <span className="font-mono bg-gray-100 px-2 py-1 rounded">IBR-2024-000124</span>
        </div>
      </div>

      <SalesForm />
    </div>
  );
}