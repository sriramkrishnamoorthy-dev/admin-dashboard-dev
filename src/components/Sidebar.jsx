import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Settings, Bell, ChevronLeft, TrendingUp } from 'lucide-react';
import { useStore } from '../store/useStore';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useStore();

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ 
          width: sidebarOpen ? 250 : 80,
          x: window.innerWidth < 1024 && !sidebarOpen ? -250 : 0
        }}
        className="fixed left-0 top-0 h-screen glass border-r border-gray-200 dark:border-gray-700 z-40 overflow-hidden"
      >
        <div className="flex flex-col h-full relative">
          <div className="absolute inset-0 pattern-grid opacity-50 pointer-events-none"></div>
          
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 h-[60px] md:h-[50px] relative z-10">
            <motion.div animate={{ opacity: sidebarOpen ? 1 : 0 }} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#6366F1] flex items-center justify-center shadow-lg animate-pulse-glow">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && <span className="font-bold text-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] bg-clip-text text-transparent">AdminPro</span>}
            </motion.div>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gradient-to-r hover:from-[#4F46E5]/10 hover:to-[#6366F1]/10 transition-all"
            >
              <ChevronLeft className={`w-5 h-5 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 relative z-10">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white shadow-lg shadow-primary/50' 
                      : 'hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-700 dark:hover:to-gray-800'
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 relative z-10"
            >
              <div className="glass rounded-xl p-4 bg-gradient-to-br from-[#4F46E5]/10 to-[#6366F1]/10 border-[#4F46E5]/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#6366F1] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-sm">Upgrade Pro</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Get advanced features</p>
                <button className="w-full btn-primary text-sm py-2">Upgrade</button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.aside>

      <AnimatePresence>
        {sidebarOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
