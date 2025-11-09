import Link from 'next/link';

// For now, let's use inline components to avoid import issues
// We'll create these as separate files later

// Temporary inline Card components
const Card = ({ children, className = '', hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-200 ${hover ? 'hover:shadow-md' : ''} ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Temporary inline Button component
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary'; 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default function DashboardPage() {
  const stats = [
    { 
      name: 'Today\'s Sales', 
      value: '₦245,800', 
      change: '+12%', 
      changeType: 'positive',
      icon: '💰'
    },
    { 
      name: 'Inventory Value', 
      value: '₦2.8M', 
      change: '+5%', 
      changeType: 'positive',
      icon: '📦'
    },
    { 
      name: 'Low Stock Items', 
      value: '3', 
      change: '-1', 
      changeType: 'positive',
      icon: '⚠️'
    },
    { 
      name: 'New Customers', 
      value: '8', 
      change: '+2', 
      changeType: 'positive',
      icon: '👥'
    },
  ];

  const recentSales = [
    { id: 'IBR-2024-000123', customer: 'John Doe', amount: '₦45,200', time: '2 hours ago' },
    { id: 'IBR-2024-000122', customer: 'Sarah Smith', amount: '₦32,150', time: '4 hours ago' },
    { id: 'IBR-2024-000121', customer: 'Mike Johnson', amount: '₦28,750', time: '6 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-blue-100 text-lg">
              Here's what's happening with your business today.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/sales">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                💰 New Sale
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 group hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className="text-3xl opacity-80">{stat.icon}</div>
            </div>
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-3 ${
              stat.changeType === 'positive' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {stat.change}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Recent Sales</h3>
            <p className="text-sm text-gray-600 mt-1">Latest transactions</p>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{sale.id}</p>
                    <p className="text-sm text-gray-600">{sale.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{sale.amount}</p>
                    <p className="text-sm text-gray-600">{sale.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/sales" className="block w-full mt-4">
              <Button variant="secondary" className="w-full">
                View All Sales
              </Button>
            </Link>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <p className="text-sm text-gray-600 mt-1">Frequently used features</p>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/sales">
                <div className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="font-medium text-blue-700">New Sale</div>
                </div>
              </Link>
              <Link href="/customers">
                <div className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors cursor-pointer border border-green-200">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="font-medium text-green-700">Customers</div>
                </div>
              </Link>
              <Link href="/inventory">
                <div className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors cursor-pointer border border-purple-200">
                  <div className="text-2xl mb-2">📦</div>
                  <div className="font-medium text-purple-700">Inventory</div>
                </div>
              </Link>
              <Link href="/reports">
                <div className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors cursor-pointer border border-orange-200">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-medium text-orange-700">Reports</div>
                </div>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}