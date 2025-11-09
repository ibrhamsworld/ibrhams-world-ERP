import { z } from 'zod';

export const saleSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerPhone: z.string().min(1, 'Phone number is required'),
  customerAddress: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string().min(1, 'Product is required'),
      variantId: z.string().optional(),
      quantityKg: z.number().min(0.001, 'Quantity must be at least 0.001 kg'),
      unitPrice: z.number().optional(),
    })
  ).min(1, 'At least one item is required'),
});

export type SaleFormData = z.infer<typeof saleSchema>;