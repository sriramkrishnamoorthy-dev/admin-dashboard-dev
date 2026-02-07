import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Moon, Sun, User, Menu, Settings, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

const Navbar = () => {
  const { theme, toggleTheme, sidebarOpen, toggleSidebar, searchQuery, setSearchQuery } = useStore();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifications(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'New user registered', time: '5 min ago', type: 'success' },
    { id: 2, title: 'Server backup completed', time: '1 hour ago', type: 'info' },
    { id: 3, title: 'Payment received', time: '2 hours ago', type: 'success' },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 glass border-b border-gray-200 dark:border-gray-700 z-30 h-[60px] md:h-[50px]">
      <div 
        className="flex items-center justify-between px-4 sm:px-6 h-full relative"
        style={{ marginLeft: window.innerWidth >= 1024 ? (sidebarOpen ? '250px' : '80px') : '0' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4F46E5]/5 to-transparent opacity-50"></div>
        
        <div className="flex items-center gap-2 sm:gap-4 flex-1 relative z-10">
          <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-gradient-to-r hover:from-[#4F46E5]/10 hover:to-[#6366F1]/10">
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative flex-1 max-w-md hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 relative z-10">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme} 
            className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#4F46E5]/10 hover:to-[#6366F1]/10 transition-all"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </motion.button>

          <div className="relative" ref={notifRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#4F46E5]/10 hover:to-[#6366F1]/10 transition-all"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-[#EF4444] to-[#DC2626] rounded-full animate-pulse"></span>
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 glass rounded-xl shadow-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#4F46E5]/5 to-[#6366F1]/5">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 cursor-pointer transition-all">
                        <p className="font-medium text-sm">{notif.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={profileRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProfile(!showProfile)}
              className="p-1 rounded-xl hover:ring-2 hover:ring-primary/50 transition-all"
            >
              <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-8 h-8 rounded-lg ring-2 ring-primary/20" />
            </motion.button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 glass rounded-xl shadow-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#4F46E5]/5 to-[#6366F1]/5">
                    <div className="flex items-center gap-3">
                      <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-12 h-12 rounded-lg ring-2 ring-primary/30" />
                      <div>
                        <p className="font-semibold">John Doe</p>
                        <p className="text-sm text-gray-500">Admin</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/20 dark:hover:to-red-800/20 text-error transition-all">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
