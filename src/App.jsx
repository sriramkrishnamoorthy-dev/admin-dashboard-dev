import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import Settings from './pages/Settings';
import NotificationsPage from './pages/Notifications';
import { useStore } from './store/useStore';

function App() {
  const { theme, sidebarOpen } = useStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen pattern-dots">
        <Sidebar />
        <Navbar />
        <Notification />
        <motion.main
          animate={{ 
            marginLeft: window.innerWidth >= 1024 ? (sidebarOpen ? '250px' : '80px') : '0',
            marginTop: window.innerWidth >= 768 ? '60px' : '50px'
          }}
          transition={{ duration: 0.3 }}
          className="p-4 sm:p-6 lg:p-8 min-h-screen"
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/users" element={<Users />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;
