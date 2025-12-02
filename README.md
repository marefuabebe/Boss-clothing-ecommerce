# Boss Clothe - Modern Fashion eCommerce

A modern, responsive fashion e-commerce website built with React and Tailwind CSS.

## Features

- 🛍️ **Product Catalog** - Browse products by category with advanced filtering
- 🛒 **Shopping Cart** - Add, remove, and update cart items
- 🔐 **Authentication** - Login/Register with social login options
- 💳 **Checkout** - Multi-step checkout with Ethiopian payment integration
- 📱 **Responsive Design** - Fully responsive for all devices
- 🎨 **Modern UI/UX** - Beautiful animations and transitions with Framer Motion
- 🔔 **Notifications** - Real-time notification system
- 📸 **Gallery** - Interactive image gallery with lightbox
- ⚡ **Fast Performance** - Optimized with Vite

## Tech Stack

- **React 18** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Vite** - Build tool
- **Context API** - State management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── ProductModal.jsx
│   └── AuthModal.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── Gallery.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── Notifications.jsx
├── context/         # Context providers
│   ├── CartContext.jsx
│   └── AuthContext.jsx
├── data/            # Data files
│   └── products.js
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Features in Detail

### Shopping Cart
- Add/remove products
- Update quantities
- Persistent cart (localStorage)
- Real-time total calculation

### Authentication
- Email/password login
- User registration
- Social login (Google, Facebook)
- Session persistence

### Product Features
- Category filtering
- Price range filtering
- Sort by price, newest, etc.
- Product search (ready for implementation)
- Wishlist functionality
- Quick view modal

### Checkout Process
- Multi-step checkout
- Shipping information
- Payment method selection
- Ethiopian payment integration (CBE, Telebirr)
- Order review

## Additional Features

- **Wishlist** - Save favorite products
- **Product Reviews** - Ready for implementation
- **Search Functionality** - Ready for implementation
- **Order Tracking** - Ready for implementation
- **User Profile** - Ready for implementation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Boss Clothes. All rights reserved.

