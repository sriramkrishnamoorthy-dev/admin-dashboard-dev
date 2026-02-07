# 🚀 AdminPro - Modern Admin Dashboard SPA

A **high-end, modern, animated Admin Dashboard** built with **React.js**, featuring stunning animations, glassmorphism effects, and a professional SaaS-style design.

![React](https://img.shields.io/badge/React-18.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-ff0055)
![Zustand](https://img.shields.io/badge/Zustand-4.5-orange)

## ✨ Features

### 🎨 Design & UI
- **Sleek, professional layout** inspired by modern SaaS dashboards (Figma/Dribbble style)
- **Glassmorphism effects** with backdrop blur on cards and panels
- **Responsive sidebar** with smooth slide animations (collapsible)
- **Dark/Light mode** with smooth color transitions and localStorage persistence
- **Modern color gradients** and subtle shadows
- **Fully responsive** for desktop, tablet, and mobile

### 🧭 Navigation & Layout
- **Top navbar** with:
  - Search bar with autocomplete
  - Profile menu dropdown with avatar
  - Notifications badge with animated toast alerts
  - Theme toggle button
- **Collapsible sidebar** with smooth animations
- **Page transitions** using Framer Motion

### 📊 Dashboard Overview
- **Animated metric cards** with:
  - Incremental number counter animations
  - Users, Revenue, Orders, Conversion Rate
  - Trend indicators (up/down percentages)
  - Gradient icon backgrounds
- **Interactive charts** using Recharts:
  - Line chart for revenue trends
  - Bar chart for monthly revenue
  - Real-time updating (simulated every 10 seconds)
- **Recent activity feed** with user avatars
- **Loading skeletons** for async data

### 📈 Analytics Dashboard
- **Multi-chart analytics**:
  - Area chart for sales & users trend
  - Pie chart for traffic sources
  - Bar chart for revenue breakdown
- **Key metrics cards** with trend indicators
- **Export to CSV** functionality
- **Performance metrics** display

### 👥 Users Management
- **Advanced data table** with:
  - Sorting by columns (name, role, status)
  - Search/filtering functionality
  - Pagination with page numbers
  - Inline editing capabilities
  - Row hover animations
  - User avatars with tooltips
- **CRUD operations**:
  - Edit user inline
  - Delete with confirmation
  - Add new user button
- **Role-based filtering** (Admin, User, Manager)
- **Status badges** (Active/Inactive)

### 🔔 Notifications
- **Interactive notification panel** with:
  - Filter by type (all, unread, success, warning, info)
  - Mark as read functionality
  - Delete notifications
  - Mark all as read
  - Unread count badge
- **Toast notifications** with:
  - Slide-in animations
  - Auto-dismiss after 5 seconds
  - Progress bar indicator
  - Multiple types (success, error, warning, info)

### ⚙️ Settings
- **Tabbed interface** with smooth transitions:
  - **Profile**: Edit name, email, phone, company, bio, avatar
  - **Notifications**: Toggle email, push, weekly reports
  - **Security**: Change password, two-factor authentication
  - **Preferences**: Language, timezone, date format, public profile
- **Animated toggle switches**
- **Form validation feedback**
- **Success notifications** on save

### 🎭 Animations & Interactions
- **Framer Motion** page transitions
- **Hover effects** on cards and buttons
- **Button ripple animations**
- **Animated chart counters** with easing
- **Smooth sidebar collapse/expand**
- **Staggered list animations**
- **Scale and fade transitions**

### 🔧 Technical Features
- **Zustand** for global state management
- **React Router v6** for navigation
- **Axios** for HTTP requests
- **JSON Server** for mock API
- **Custom hooks** (useCountUp for animations)
- **Loading states** with skeleton loaders
- **Error handling** with animated messages
- **Theme persistence** in localStorage

## 🛠️ Tech Stack

- **React 18.3** - UI library with hooks
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Router v6** - Client-side routing
- **Recharts** - Chart library
- **Framer Motion** - Animation library
- **Lucide React** - Modern icon library
- **Axios** - HTTP client
- **JSON Server** - Mock REST API

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm

### Setup

1. **Clone or navigate to the project**:
```bash
cd admin-dashboard
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **In a separate terminal, start the JSON server**:
```bash
npm run server
```

5. **Open your browser**:
Navigate to `http://localhost:3000`

## 📜 Available Scripts

```bash
npm run dev      # Start Vite development server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build
npm run server   # Start JSON Server (port 3001)
```

## 📁 Project Structure

```
admin-dashboard/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Sidebar.jsx      # Collapsible sidebar with navigation
│   │   ├── Navbar.jsx       # Top navbar with search, notifications, profile
│   │   ├── MetricCard.jsx   # Animated metric cards with counters
│   │   ├── Notification.jsx # Toast notification system
│   │   └── SkeletonLoader.jsx # Loading skeletons
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx    # Main dashboard with metrics & charts
│   │   ├── Analytics.jsx    # Advanced analytics with multiple charts
│   │   ├── Users.jsx        # User management table
│   │   ├── Notifications.jsx # Notification center
│   │   └── Settings.jsx     # Settings with tabbed interface
│   ├── hooks/               # Custom React hooks
│   │   └── useCountUp.js    # Animated counter hook
│   ├── store/               # Zustand store
│   │   └── useStore.js      # Global state management
│   ├── services/            # API services
│   │   └── api.js           # Axios config & API calls
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles with Tailwind
├── db.json                  # Mock database for JSON Server
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind customization
├── postcss.config.js        # PostCSS configuration
└── index.html               # HTML entry point
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```js
colors: {
  primary: {
    500: '#3b82f6',
    600: '#2563eb',
    // ... add your colors
  },
}
```

### Theme
The theme is automatically persisted in localStorage and managed by Zustand. Toggle between light/dark mode using the navbar button.

### API
Replace JSON Server endpoints in `src/services/api.js` with your real API:
```js
const API_BASE_URL = 'https://your-api.com';
```

### Animations
Adjust animation timings in `tailwind.config.js` and component files using Framer Motion props.

## 🚀 Deployment

### Netlify
1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

3. **Note**: JSON Server won't work in production. Replace with a real API.

### Vercel
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts

### Environment Variables
For production, set up environment variables for your API:
```env
VITE_API_URL=https://your-api.com
```

## 🎯 Key Features Breakdown

### Real-time Updates
- Dashboard metrics update every 10 seconds (simulated)
- Charts refresh with new data automatically
- Notifications appear with smooth animations

### State Management
- **Theme**: Persisted in localStorage
- **Sidebar**: Open/closed state persisted
- **Notifications**: Global notification queue
- **User data**: Cached and updated

### Performance
- **Code splitting** with React Router
- **Lazy loading** for images
- **Optimized re-renders** with Zustand
- **Skeleton loaders** for better UX

## 🎨 Design Highlights

- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Gradient backgrounds**: Modern blue-purple gradients
- **Smooth transitions**: 300ms color transitions
- **Custom scrollbar**: Styled for dark/light mode
- **Hover effects**: Scale, translate, and color changes
- **Card shadows**: Elevated cards with hover lift

## 📱 Responsive Design

- **Desktop**: Full sidebar, expanded layout
- **Tablet**: Collapsible sidebar, optimized spacing
- **Mobile**: Overlay sidebar, stacked cards, touch-friendly

## 🔐 Security Notes

- Replace mock authentication with real auth
- Implement proper API authentication
- Add CSRF protection
- Validate all user inputs
- Use HTTPS in production

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**

Enjoy your modern, high-end admin dashboard! 🎉
#   a d m i n - d a s h b o a r d - d e v  
 #   A d m i n - D a s h b o a r d  
 