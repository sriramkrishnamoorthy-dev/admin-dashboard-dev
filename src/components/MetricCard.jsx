import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

const MetricCard = ({ icon: Icon, title, value, change, color, delay = 0, prefix = '', suffix = '' }) => {
  const animatedValue = useCountUp(typeof value === 'number' ? value : parseFloat(value) || 0);
  
  const colorClasses = {
    blue: { gradient: 'from-[#4F46E5] to-[#6366F1]', bg: 'from-[#4F46E5]/10 to-[#6366F1]/10', glow: 'shadow-[#4F46E5]/20' },
    purple: { gradient: 'from-[#6366F1] to-[#4F46E5]', bg: 'from-[#6366F1]/10 to-[#4F46E5]/10', glow: 'shadow-[#6366F1]/20' },
    green: { gradient: 'from-[#10B981] to-[#059669]', bg: 'from-[#10B981]/10 to-[#059669]/10', glow: 'shadow-[#10B981]/20' },
    orange: { gradient: 'from-orange-500 to-orange-600', bg: 'from-orange-500/10 to-orange-600/10', glow: 'shadow-orange-500/20' },
  };

  const isPositive = change >= 0;
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`glass rounded-2xl p-6 card-hover relative overflow-hidden group`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-16 -mt-16"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colors.gradient} shadow-lg ${colors.glow} group-hover:shadow-xl transition-shadow`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg ${isPositive ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
            <span>{isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(change)}%</span>
          </div>
        </div>
        
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            {prefix}{animatedValue.toLocaleString()}{suffix}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
