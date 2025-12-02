import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { usePersistentNotification } from '../context/PersistentNotificationContext.jsx';
import { FaShoppingCart, FaBell, FaUser, FaBars, FaTimes, FaSearch, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import AuthModal from './AuthModal';
import LogoutModal from './LogoutModal';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [showMobileAuthDropdown, setShowMobileAuthDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getCartItemsCount } = useCart();
  const { isLoggedIn, logout, user } = useAuth();
  const { unreadCount } = usePersistentNotification(); // ADD THIS
  const navigate = useNavigate();
  const cartCount = getCartItemsCount();
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAuthDropdown(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setShowMobileAuthDropdown(false);
      }
    };

    if (showAuthDropdown || showMobileAuthDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAuthDropdown, showMobileAuthDropdown]);

  const handleLogout = () => {
    logout();
    setShowAuthDropdown(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-gray-900/80 backdrop-blur-xl shadow-2xl border-b border-white/10' 
            : 'bg-gray-900/60 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="font-great-vibes text-3xl sm:text-4xl lg:text-5xl text-white hover:text-primary transition-colors duration-300">
                Boss Clothe
              </Link>
            </motion.div>

            {/* Centered Navigation - Desktop */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-1 bg-gray-800/50 backdrop-blur-sm rounded-full px-2 py-2 border border-white/10">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 rounded-lg group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-light transition-all duration-300 group-hover:w-3/4" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side Actions - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSearch(true)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-gray-300 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
              >
                <FaSearch className="text-base" />
              </motion.button>

              {/* Notifications - UPDATED */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link 
                  to="/notifications" 
                  className="relative w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-gray-300 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                >
                  <FaBell className="text-base" />
                  <AnimatePresence>
                    {unreadCount > 0 && (
                      <motion.span
                        key={`desktop-${unreadCount}`} // Unique key for animation
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg"
                      >
                        {unreadCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>

              {/* Cart */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link 
                  to="/cart" 
                  className="relative w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-gray-300 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                >
                  <FaShoppingCart className="text-base" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-primary-light text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </Link>
              </motion.div>

              {/* Auth Section */}
              <div className="relative" ref={dropdownRef}>
                {!isLoggedIn ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-gray-300 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                    >
                      <FaUser className="text-base" />
                    </motion.button>
                    
                    <AnimatePresence>
                      {showAuthDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ 
                            type: "spring", 
                            damping: 20, 
                            stiffness: 300,
                            duration: 0.2
                          }}
                          className="absolute right-0 mt-3 w-56 bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-50 border border-white/10 overflow-hidden"
                        >
                          <button
                            onClick={() => {
                              setAuthModalMode('login');
                              setShowAuthModal(true);
                              setShowAuthDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200 flex items-center space-x-2 group"
                          >
                            <FaSignInAlt className="text-sm group-hover:translate-x-1 transition-transform" />
                            <span>Login</span>
                          </button>
                          <button
                            onClick={() => {
                              setAuthModalMode('register');
                              setShowAuthModal(true);
                              setShowAuthDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200 flex items-center space-x-2 group border-t border-white/10"
                          >
                            <FaUserPlus className="text-sm group-hover:translate-x-1 transition-transform" />
                            <span>Register</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-gray-300 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || <FaUser />}
                      </div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {showAuthDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ 
                            type: "spring", 
                            damping: 20, 
                            stiffness: 300,
                            duration: 0.2
                          }}
                          className="absolute right-0 mt-3 w-56 bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-50 border border-white/10 overflow-hidden"
                        >
                          <div className="px-4 py-3 border-b border-white/10">
                            <p className="text-sm font-semibold text-white">{user?.name || 'User'}</p>
                            <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
                          </div>
                          <button
                            onClick={() => {
                              setShowLogoutModal(true);
                              setShowAuthDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 text-blue-400 hover:bg-blue-500/10 transition-colors duration-200 flex items-center space-x-2 group"
                          >
                            <FaSignInAlt className="text-sm group-hover:translate-x-1 transition-transform" />
                            <span>Logout</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-gray-300 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <FaTimes className="text-lg" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <FaBars className="text-lg" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden py-4 space-y-2 bg-gray-800/50 backdrop-blur-xl border-t border-white/10 overflow-hidden"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-medium"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="px-4 py-3 border-t border-white/10"
                >
                  <Link
                    to="/cart"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-medium"
                  >
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <span className="bg-gradient-to-r from-primary to-primary-light text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </motion.div>

                {/* Notifications - Mobile - UPDATED */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.26 }}
                  className="px-4 py-2"
                >
                  <Link
                    to="/notifications"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-medium"
                  >
                    <div className="flex items-center space-x-2">
                      <FaBell />
                      <span>Notifications</span>
                    </div>
                    {unreadCount > 0 && (
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                </motion.div>

                {/* Search - Mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.27 }}
                  className="px-4 py-2"
                >
                  <button
                    onClick={() => {
                      setShowSearch(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-medium"
                  >
                    <span>Search</span>
                    <FaSearch />
                  </button>
                </motion.div>

                {/* Auth Section - Mobile */}
                {!isLoggedIn ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="px-4 py-2"
                    ref={mobileDropdownRef}
                  >
                    <button
                      onClick={() => setShowMobileAuthDropdown(!showMobileAuthDropdown)}
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-medium"
                    >
                      <div className="flex items-center space-x-2">
                        <FaUser />
                        <span>Account</span>
                      </div>
                      <motion.div
                        animate={{ rotate: showMobileAuthDropdown ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {showMobileAuthDropdown && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 overflow-hidden"
                        >
                          <button
                            onClick={() => {
                              setAuthModalMode('login');
                              setShowAuthModal(true);
                              setIsOpen(false);
                              setShowMobileAuthDropdown(false);
                            }}
                            className="w-full flex items-center space-x-2 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                          >
                            <FaSignInAlt className="text-sm" />
                            <span>Login</span>
                          </button>
                          <button
                            onClick={() => {
                              setAuthModalMode('register');
                              setShowAuthModal(true);
                              setIsOpen(false);
                              setShowMobileAuthDropdown(false);
                            }}
                            className="w-full flex items-center space-x-2 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                          >
                            <FaUserPlus className="text-sm" />
                            <span>Register</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="px-4 py-3"
                  >
                    <div className="px-4 py-3 mb-2 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-sm font-semibold text-white">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowLogoutModal(true);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-semibold transition-all duration-300 border border-blue-500/30"
                    >
                      <FaSignInAlt />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <SearchBar isOpen={showSearch} onClose={() => setShowSearch(false)} />
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authModalMode}
      />
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;