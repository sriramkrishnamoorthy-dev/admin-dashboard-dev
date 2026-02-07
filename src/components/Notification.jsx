import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useStore } from '../store/useStore';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-orange-500',
};

const Notification = () => {
  const { notifications, removeNotification } = useStore();

  return (
    <div className="fixed top-20 right-6 z-50 space-y-3">
      <AnimatePresence>
        {notifications.map((notification) => {
          const Icon = icons[notification.type] || Info;
          const colorClass = colors[notification.type] || colors.info;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              className="glass rounded-xl shadow-2xl overflow-hidden min-w-[320px] max-w-md"
            >
              <div className="flex items-start gap-3 p-4">
                <div className={`${colorClass} p-2 rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
                  {notification.message && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                  )}
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className={`h-1 ${colorClass}`}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
