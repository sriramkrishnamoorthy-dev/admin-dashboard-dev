# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Servers

**Terminal 1** - Start Vite Dev Server:
```bash
npm run dev
```

**Terminal 2** - Start JSON Server (Mock API):
```bash
npm run server
```

### 3️⃣ Open Browser
Navigate to: **http://localhost:3000**

---

## 🎯 What You'll See

### Dashboard (/)
- 4 animated metric cards (Users, Revenue, Orders, Conversions)
- Line chart showing revenue trends
- Bar chart for monthly revenue
- Recent activity feed
- Real-time updates every 10 seconds

### Analytics (/analytics)
- Area chart for sales & users
- Pie chart for traffic sources
- Revenue breakdown bar chart
- Export to CSV functionality
- Key performance metrics

### Users (/users)
- Sortable data table
- Search and filter users
- Inline editing
- Pagination
- Delete users with confirmation

### Notifications (/notifications)
- Filter notifications by type
- Mark as read/unread
- Delete notifications
- Unread count badge

### Settings (/settings)
- Profile settings
- Notification preferences
- Security settings
- App preferences

---

## 🎨 Features to Try

1. **Toggle Dark/Light Mode** - Click the sun/moon icon in navbar
2. **Collapse Sidebar** - Click the chevron icon in sidebar
3. **Search** - Use the search bar in navbar
4. **Sort Users** - Click column headers in Users page
5. **Edit User** - Click edit icon in Users table
6. **Export Data** - Click "Export CSV" in Analytics
7. **View Notifications** - Click bell icon in navbar

---

## 🛠️ Customization Tips

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    600: '#your-color',
  }
}
```

### Modify Animations
Edit animation delays in component files:
```jsx
transition={{ delay: 0.2 }}
```

### Add New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add menu item in `src/components/Sidebar.jsx`

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

---

## 🐛 Troubleshooting

### Port Already in Use
Change port in `vite.config.js`:
```js
server: {
  port: 3001, // Change this
}
```

### JSON Server Not Working
Make sure `db.json` exists and run:
```bash
npx json-server --watch db.json --port 3001
```

### Dark Mode Not Working
Clear localStorage and refresh:
```js
localStorage.clear()
```

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Recharts](https://recharts.org)

---

**Happy Coding! 🎉**
