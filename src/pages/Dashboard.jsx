import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, ShoppingCart, TrendingUp, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import MetricCard from '../components/MetricCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { useStore } from '../store/useStore';
import { generateMockMetrics, generateChartData } from '../services/api';

const Dashboard = () => {
  const { setMetrics, addNotification } = useStore();
  const [loading, setLoading] = useState(true);
  const [metrics, setLocalMetrics] = useState({ users: 0, revenue: 0, orders: 0, conversions: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const newMetrics = generateMockMetrics();
      setLocalMetrics(newMetrics);
      setMetrics(newMetrics);
      setChartData(generateChartData(7));
      setLoading(false);
      addNotification({ type: 'success', title: 'Dashboard Updated', message: 'Latest data loaded' });
    }, 1500);

    const interval = setInterval(() => {
      const newMetrics = generateMockMetrics();
      setLocalMetrics(newMetrics);
      setChartData(generateChartData(7));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => <SkeletonLoader key={i} />)}
        </div>
        <SkeletonLoader type="chart" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:flex items-center gap-2 btn-primary"
        >
          <span>View Report</span>
          <ArrowUpRight className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard icon={Users} title="Total Users" value={metrics.users} change={12.5} color="blue" delay={0} />
        <MetricCard icon={DollarSign} title="Revenue" value={metrics.revenue} change={8.2} color="green" prefix="$" delay={0.1} />
        <MetricCard icon={ShoppingCart} title="Orders" value={metrics.orders} change={-3.1} color="purple" delay={0.2} />
        <MetricCard icon={TrendingUp} title="Conversion Rate" value={metrics.conversions} change={5.7} color="orange" suffix="%" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }} 
          className="glass rounded-2xl p-4 sm:p-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/5 to-[#6366F1]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold">Revenue Trend</h3>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4F46E5]"></span>
                <span className="w-3 h-3 rounded-full bg-[#6366F1]"></span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={3} dot={{ fill: '#4F46E5', r: 4 }} fill="url(#colorSales)" />
                <Line type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={3} dot={{ fill: '#6366F1', r: 4 }} fill="url(#colorUsers)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5 }} 
          className="glass rounded-2xl p-4 sm:p-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/5 to-[#059669]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold">Monthly Revenue</h3>
              <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.6 }} 
        className="glass rounded-2xl p-4 sm:p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#4F46E5]/10 to-transparent rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Recent Activity</h3>
          <div className="space-y-3 sm:space-y-4">
            {[
              { user: 'John Doe', action: 'completed a purchase', time: '2 min ago', avatar: 1, color: 'from-blue-500 to-purple-500' },
              { user: 'Jane Smith', action: 'registered as new user', time: '15 min ago', avatar: 2, color: 'from-green-500 to-teal-500' },
              { user: 'Mike Johnson', action: 'updated profile', time: '1 hour ago', avatar: 3, color: 'from-orange-500 to-red-500' },
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all group cursor-pointer"
              >
                <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${activity.color} p-[2px] group-hover:scale-110 transition-transform`}>
                  <img src={`https://i.pravatar.cc/150?img=${activity.avatar}`} alt={activity.user} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">
                    <span className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] bg-clip-text text-transparent">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">{activity.time}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
