export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Track product stock and levels</p>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="text-4xl mb-4">📦</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory Page</h3>
        <p className="text-gray-600">Inventory management interface will go here</p>
      </div>
    </div>
  );
}