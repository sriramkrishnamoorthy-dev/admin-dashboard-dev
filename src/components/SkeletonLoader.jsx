import { motion } from 'framer-motion';

export const SkeletonCard = () => (
  <div className="glass rounded-2xl p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl" />
      <div className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded" />
    </div>
    <div className="space-y-2">
      <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
      <div className="w-32 h-8 bg-gray-300 dark:bg-gray-700 rounded" />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="glass rounded-2xl p-6 animate-pulse">
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="w-1/2 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonChart = () => (
  <div className="glass rounded-2xl p-6 animate-pulse">
    <div className="w-48 h-6 bg-gray-300 dark:bg-gray-700 rounded mb-6" />
    <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded" />
  </div>
);

const SkeletonLoader = ({ type = 'card', ...props }) => {
  switch (type) {
    case 'table':
      return <SkeletonTable {...props} />;
    case 'chart':
      return <SkeletonChart {...props} />;
    default:
      return <SkeletonCard {...props} />;
  }
};

export default SkeletonLoader;
