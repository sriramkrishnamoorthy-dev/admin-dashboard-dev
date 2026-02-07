# ⚡ Quick Reference Card

## 🚀 Start Development (Copy & Paste)

### Terminal 1 - Vite Dev Server
```bash
npm run dev
```

### Terminal 2 - JSON Server
```bash
npm run server
```

### Open Browser
```
http://localhost:3000
```

---

## 📂 Project Structure

```
src/
├── components/       → Reusable UI components
│   ├── Sidebar.jsx
│   ├── Navbar.jsx
│   ├── MetricCard.jsx
│   ├── Notification.jsx
│   └── SkeletonLoader.jsx
├── pages/           → Page components
│   ├── Dashboard.jsx
│   ├── Analytics.jsx
│   ├── Users.jsx
│   ├── Notifications.jsx
│   └── Settings.jsx
├── hooks/           → Custom React hooks
│   └── useCountUp.js
├── store/           → Zustand state management
│   └── useStore.js
├── services/        → API layer
│   └── api.js
├── App.jsx          → Main app with routing
├── main.jsx         → Entry point
└── index.css        → Global styles
```

---

## 🎯 Key Commands

```bash
# Install dependencies
npm install

# Start dev server (port 3000)
npm run dev

# Start JSON server (port 3001)
npm run server

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Netlify
netlify deploy --prod
```

---

## 🌐 Routes

```
/                → Dashboard (metrics, charts, activity)
/analytics       → Analytics (advanced charts, export)
/users           → Users (table, CRUD operations)
/notifications   → Notifications (filter, mark read)
/settings        → Settings (profile, security, prefs)
```

---

## 🎨 Quick Customizations

### Change App Name
**File**: `src/components/Sidebar.jsx`
**Line**: Find "AdminPro"
```jsx
<span>Your App Name</span>
```

### Change Primary Color
**File**: `tailwind.config.js`
```js
colors: {
  primary: {
    600: '#YOUR_COLOR',
  }
}
```

### Change Theme
**Location**: Navbar (sun/moon icon)
**Persisted**: localStorage

### Modify Metrics
**File**: `src/pages/Dashboard.jsx`
```jsx
<MetricCard
  icon={YourIcon}
  title="Your Metric"
  value={yourValue}
  change={12.5}
  color="blue"
/>
```

---

## 🔧 State Management (Zustand)

```jsx
import { useStore } from './store/useStore';

// In component
const { theme, toggleTheme } = useStore();
const { sidebarOpen, toggleSidebar } = useStore();
const { addNotification } = useStore();

// Add notification
addNotification({
  type: 'success',
  title: 'Success!',
  message: 'Operation completed',
});
```

---

## 📊 Add New Chart

```jsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={yourData}>
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Line dataKey="value" stroke="#3B82F6" />
  </LineChart>
</ResponsiveContainer>
```

---

## 🎭 Common Animations

```jsx
// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>

// Slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>

// Hover effect
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>

// Staggered children
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: index * 0.1 }}
>
```

---

## 🌓 Theme Toggle

```jsx
// Get theme
const { theme, toggleTheme } = useStore();

// Toggle
<button onClick={toggleTheme}>
  {theme === 'light' ? <Moon /> : <Sun />}
</button>

// Apply to document
useEffect(() => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [theme]);
```

---

## 📱 Responsive Classes

```jsx
// Mobile first approach
className="
  grid 
  grid-cols-1          // Mobile: 1 column
  md:grid-cols-2       // Tablet: 2 columns
  lg:grid-cols-4       // Desktop: 4 columns
  gap-6
"

// Hide on mobile
className="hidden lg:block"

// Show only on mobile
className="lg:hidden"
```

---

## 🔌 API Integration

```jsx
// Fetch data
import { fetchUsers } from './services/api';

const loadData = async () => {
  const data = await fetchUsers();
  setUsers(data);
};

// Update
import { updateUser } from './services/api';
await updateUser(id, newData);

// Delete
import { deleteUser } from './services/api';
await deleteUser(id);
```

---

## 🎨 Tailwind Utilities

```jsx
// Glassmorphism
className="glass"  // Pre-defined in index.css

// Button
className="btn-primary"  // Pre-defined

// Input
className="input-field"  // Pre-defined

// Card hover
className="card-hover"  // Pre-defined

// Custom
className="
  bg-white dark:bg-gray-800
  rounded-xl
  p-6
  shadow-lg
  hover:shadow-xl
  transition-all
"
```

---

## 🐛 Quick Fixes

### Port in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or change port in vite.config.js
server: { port: 3001 }
```

### Clear cache
```bash
rm -rf node_modules package-lock.json
npm install
```

### Dark mode stuck
```js
// In browser console
localStorage.clear()
```

### Build fails
```bash
npm run build -- --debug
```

---

## 📚 Documentation Files

```
README.md          → Full documentation
QUICKSTART.md      → Quick start guide
FEATURES.md        → 200+ features list
DEPLOYMENT.md      → Deploy to any platform
PROJECT_SUMMARY.md → Project overview
CHECKLIST.md       → Getting started checklist
VISUAL_GUIDE.md    → UI layout guide
QUICK_REFERENCE.md → This file
```

---

## 🎯 Common Tasks

### Add new page
1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add menu in `src/components/Sidebar.jsx`

### Add new component
1. Create `src/components/NewComponent.jsx`
2. Import where needed
3. Use with props

### Connect real API
1. Edit `src/services/api.js`
2. Change `API_BASE_URL`
3. Update functions

### Deploy
```bash
npm run build
netlify deploy --prod
```

---

## 💡 Pro Tips

1. **Use dark mode** - Easier on eyes during development
2. **Keep both terminals open** - Vite + JSON Server
3. **Check console** - F12 for errors
4. **Test responsive** - Use browser DevTools
5. **Read docs** - Check FEATURES.md for details
6. **Customize gradually** - One thing at a time
7. **Git commit often** - Save your progress
8. **Test before deploy** - Run `npm run preview`

---

## 🎉 You're Ready!

**Everything is set up and ready to go!**

1. Run `npm install`
2. Start both servers
3. Open http://localhost:3000
4. Start building!

**Happy Coding! 🚀**

---

**Keep this card handy for quick reference!** 📌
