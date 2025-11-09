import { SalesForm } from '@/components/sales/SalesForm';

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