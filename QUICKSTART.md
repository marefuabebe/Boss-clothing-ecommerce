# Quick Start Guide

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
ozark/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── MobileNav.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── AuthModal.jsx
│   │   └── Notification.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── Gallery.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── Notifications.jsx
│   ├── context/            # React Context providers
│   │   ├── CartContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── NotificationContext.jsx
│   ├── data/               # Static data
│   │   └── products.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── images/                 # Image assets
├── videos/                 # Video assets
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Key Features

### ✅ Completed Features

- **React Router** - Full navigation system
- **Shopping Cart** - Add, remove, update items with persistence
- **Authentication** - Login/Register with social login
- **Product Catalog** - Browse, filter, and search products
- **Checkout** - Multi-step checkout with Ethiopian payment options
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Animations** - Smooth transitions with Framer Motion
- **Notifications** - Toast notification system
- **Gallery** - Interactive image gallery with lightbox
- **Wishlist** - Save favorite products (UI ready)

### 🎨 Modern UI/UX Features

- Beautiful gradient backgrounds
- Smooth hover effects
- Loading states
- Error boundaries
- Responsive mobile navigation
- Product quick view modal
- Category filtering
- Price range slider
- Sort functionality

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All images should be in the `/images` directory
- Videos should be in the `/videos` directory
- Product data is in `src/data/products.js`
- Cart and auth state persist in localStorage

