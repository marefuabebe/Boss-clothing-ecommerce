import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { usePersistentNotification } from '../context/PersistentNotificationContext.jsx';
import { FaHome, FaShoppingBag, FaShoppingCart, FaBell, FaUser } from 'react-icons/fa';

const MobileNav = () => {
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const { unreadCount } = usePersistentNotification(); // ADD THIS
  const cartCount = getCartItemsCount();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/shop', icon: FaShoppingBag, label: 'Shop' },
    { path: '/cart', icon: FaShoppingCart, label: 'Cart', badge: cartCount },
    { path: '/notifications', icon: FaBell, label: 'Alerts', badge: unreadCount }, // UPDATED
    { path: '/account', icon: FaUser, label: 'Account' },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-sm border-t border-gray-700 shadow-lg z-40"
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full relative transition-colors ${
                  active ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                <Icon className="text-xl mb-1" />
                <span className="text-xs">{item.label}</span>
                <AnimatePresence>
                  {item.badge && item.badge > 0 && (
                    <motion.span
                      key={`mobile-${item.label}-${item.badge}`} // Unique key for animation
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0 right-1/3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-red-500/50"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MobileNav;