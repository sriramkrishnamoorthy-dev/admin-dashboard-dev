import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, AlertTriangle, Info, Trash2, Check } from 'lucide-react';
import { useStore } from '../store/useStore';

const NotificationsPage = () => {
  const { addNotification } = useStore();
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', title: 'Payment Received', message: 'You received a payment of $1,250', time: '5 min ago', read: false },
    { id: 2, type: 'warning', title: 'Server Load High', message: 'Server CPU usage is at 85%', time: '15 min ago', read: false },
    { id: 3, type: 'info', title: 'New User Registered', message: 'John Smith just created an account', time: '1 hour ago', read: true },
    { id: 4, type: 'success', title: 'Backup Completed', message: 'Daily backup completed successfully', time: '2 hours ago', read: true },
    { id: 5, type: 'warning', title: 'License Expiring', message: 'Your license will expire in 7 days', time: '3 hours ago', read: false },
    { id: 6, type: 'info', title: 'System Update', message: 'A new system update is available', time: '5 hours ago', read: true },
  ]);

  const [filter, setFilter] = useState('all');

  const icons = {
    success: CheckCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-600', border: 'border-green-200 dark:border-green-800' },
    warning: { bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-600', border: 'border-orange-200 dark:border-orange-800' },
    info: { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-600', border: 'border-blue-200 dark:border-blue-800' },
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    addNotification({
      type: 'success',
      title: 'Notification Deleted',
      message: 'Notification removed successfully',
    });
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
    addNotification({
      type: 'success',
      title: 'All Marked as Read',
      message: 'All notifications marked as read',
    });
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMarkAllRead}
          className="btn-primary flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          Mark All Read
        </motion.button>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'unread', 'success', 'warning', 'info'].map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredNotifications.map((notif, index) => {
            const Icon = icons[notif.type];
            const color = colors[notif.type];

            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ delay: index * 0.05 }}
                className={`glass rounded-2xl p-6 border-l-4 ${color.border} ${!notif.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${color.bg}`}>
                    <Icon className={`w-6 h-6 ${color.text}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{notif.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{notif.message}</p>
                      </div>
                      {!notif.read && (
                        <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-sm text-gray-500">{notif.time}</p>
                      <div className="flex gap-2">
                        {!notif.read && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleMarkAsRead(notif.id)}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Mark as Read
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(notif.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
            <p className="text-gray-600 dark:text-gray-400">
              You're all caught up! No {filter !== 'all' ? filter : ''} notifications to show.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationsPage;
