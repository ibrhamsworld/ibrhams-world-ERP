import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: '📦',
      title: 'Smart Inventory',
      description: 'Real-time stock tracking with automated low-stock alerts'
    },
    {
      icon: '💰',
      title: 'Sales Management',
      description: 'Weight-based sales with automatic calculations and receipts'
    },
    {
      icon: '👥',
      title: 'Customer CRM',
      description: 'Complete customer management with purchase history'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Comprehensive reports for data-driven decisions'
    }
  ];

  const products = [
    { name: 'Acrylic', price: '₦1,000/kg', variants: ['Satin', 'Emulsion', 'Gloss'] },
    { name: 'Calcium', price: '₦800/kg', variants: ['Carbonate', 'Hydroxide'] },
    { name: 'Genepo', price: '₦1,500/kg', variants: ['Standard', 'Premium'] },
    { name: 'PVA', price: '₦900/kg', variants: ['Industrial', 'Commercial'] },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">IW</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">IBRHAMS WORLD</h1>
                <p className="text-xs text-gray-600">Raw Paint Materials</p>
              </div>
            </div>
            <Link 
              href="/dashboard" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              System Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Enterprise Resource Planning
              <span className="block text-blue-200">For Paint Materials</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your raw materials business with comprehensive inventory, sales, and customer management.
            </p>
            <Link 
              href="/dashboard" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              🚀 Launch ERP System
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for raw paint materials distribution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-8 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Raw Materials
            </h2>
            <p className="text-xl text-gray-600">
              Premium quality paint raw materials with multiple variants
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-blue-600 font-bold mb-3">{product.price}</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant, vIndex) => (
                    <span key={vIndex} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                      {variant}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}