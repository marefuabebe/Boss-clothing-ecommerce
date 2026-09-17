import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FaHome, FaShoppingBag, FaImages, FaShoppingCart, FaInfoCircle } from 'react-icons/fa';

const MobileNav = () => {
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const cartCount = getCartItemsCount();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/shop', icon: FaShoppingBag, label: 'Shop' },
    { path: '/gallery', icon: FaImages, label: 'Gallery' },
    { path: '/cart', icon: FaShoppingCart, label: 'Cart', badge: cartCount },
    { path: '/about', icon: FaInfoCircle, label: 'About' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0B0B0F]/90 backdrop-blur-xl border-t border-white/10 shadow-2xl z-40">
      <div className="flex justify-around items-center h-14 max-w-md mx-auto px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center relative py-1 px-3 transition-colors ${
                active ? 'text-amber-400' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="relative">
                <Icon className="text-base" />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] tracking-wider uppercase font-medium mt-0.5">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;