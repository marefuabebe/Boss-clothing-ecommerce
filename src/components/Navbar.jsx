import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  FaShoppingCart, 
  FaUser, 
  FaBars, 
  FaTimes, 
  FaSignInAlt, 
  FaUserPlus, 
  FaSignOutAlt,
  FaHome,
  FaShoppingBag,
  FaImages,
  FaInfoCircle,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import AuthModal from './AuthModal';
import LogoutModal from './LogoutModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [showMobileAuthDropdown, setShowMobileAuthDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getCartItemsCount } = useCart();
  const { isLoggedIn, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = getCartItemsCount();
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
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
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/shop', label: 'Shop', icon: FaShoppingBag },
    { path: '/gallery', label: 'Gallery', icon: FaImages },
    { path: '/about', label: 'About', icon: FaInfoCircle },
    { path: '/contact', label: 'Contact', icon: FaEnvelope },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0B0B0F]/90 backdrop-blur-xl shadow-xl shadow-black/40 border-b border-white/10' 
            : 'bg-[#0B0B0F]/70 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & City Badge */}
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="font-playfair font-black text-xl sm:text-2xl tracking-wide text-white group-hover:text-amber-400 transition-colors duration-300">
                  Boss Clothe
                </span>
              </Link>
              <span className="hidden xl:inline-flex items-center text-[10px] uppercase tracking-wider font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                Addis Ababa
              </span>
            </div>

            {/* Navigation Links - Desktop */}
            <nav className="hidden lg:flex items-center justify-center">
              <div className="flex items-center space-x-1 bg-white/[0.03] backdrop-blur-md rounded-full px-2 py-1 border border-white/10 shadow-inner">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs uppercase tracking-[0.08em] font-medium transition-all duration-200 rounded-full ${
                        isActive 
                          ? 'text-black bg-gradient-to-r from-amber-300 to-amber-400 font-semibold shadow-sm' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="text-xs shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Right Side Actions - Desktop */}
            <div className="hidden lg:flex items-center space-x-2.5">
              {/* Phone Support Link */}
              <a
                href="tel:+251938543853"
                className="hidden xl:flex items-center gap-1.5 text-xs text-gray-300 hover:text-amber-300 transition-colors px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-amber-400/30"
                title="Call our store"
              >
                <FaPhone className="text-amber-400 text-[10px]" />
                <span className="text-[11px] font-medium">+251 938 543 853</span>
              </a>

              {/* Cart Pill */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  to="/cart" 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-200 hover:text-amber-300 transition-all duration-200"
                  title="Shopping Cart"
                  aria-label="Shopping Cart"
                >
                  <FaShoppingCart className="text-xs text-amber-400" />
                  <span className="text-xs font-semibold">Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[10px] rounded-full px-1.5 py-0.2 font-bold shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </motion.div>

              {/* Auth Section */}
              <div className="relative" ref={dropdownRef}>
                {!isLoggedIn ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-200 hover:text-white transition-all duration-200"
                      title="Account"
                      aria-label="Account"
                    >
                      <FaUser className="text-xs text-gray-400" />
                      <span className="text-xs font-medium">Sign In</span>
                    </motion.button>
                    
                    <AnimatePresence>
                      {showAuthDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-48 bg-[#13131A] rounded-xl shadow-2xl py-1.5 z-50 border border-white/10 overflow-hidden"
                        >
                          <button
                            onClick={() => {
                              setAuthModalMode('login');
                              setShowAuthModal(true);
                              setShowAuthDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs uppercase tracking-wider text-gray-200 hover:text-white hover:bg-white/5 transition-colors flex items-center space-x-2"
                          >
                            <FaSignInAlt className="text-amber-400" />
                            <span>Sign In</span>
                          </button>
                          <button
                            onClick={() => {
                              setAuthModalMode('register');
                              setShowAuthModal(true);
                              setShowAuthDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs uppercase tracking-wider text-gray-200 hover:text-white hover:bg-white/5 transition-colors flex items-center space-x-2 border-t border-white/5"
                          >
                            <FaUserPlus className="text-amber-400" />
                            <span>Register</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 transition-all duration-200"
                    >
                      <FaUser className="text-xs" />
                      <span className="text-xs font-semibold">{user?.name?.split(' ')[0] || 'Account'}</span>
                    </motion.button>
                    
                    <AnimatePresence>
                      {showAuthDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-52 bg-[#13131A] rounded-xl shadow-2xl py-2 z-50 border border-white/10 overflow-hidden"
                        >
                          <div className="px-3.5 py-2 border-b border-white/10">
                            <p className="text-xs font-semibold text-white">{user?.name || 'Client'}</p>
                            <p className="text-[11px] text-gray-400 truncate">{user?.email || ''}</p>
                          </div>
                          <button
                            onClick={() => {
                              setShowLogoutModal(true);
                              setShowAuthDropdown(false);
                            }}
                            className="w-full text-left px-3.5 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors flex items-center space-x-2"
                          >
                            <FaSignOutAlt />
                            <span>Sign Out</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>

              {/* Shop CTA Button */}
              <Link
                to="/shop"
                className="hidden xl:inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-102"
              >
                Shop Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <Link 
                to="/cart" 
                className="relative w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 text-gray-300 flex items-center justify-center"
              >
                <FaShoppingCart className="text-xs" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 text-white flex items-center justify-center"
              >
                {isOpen ? <FaTimes className="text-sm" /> : <FaBars className="text-sm" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden py-3 space-y-1 bg-[#111117] border-t border-white/10 rounded-b-xl overflow-hidden px-2 mb-2"
              >
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider text-gray-300 hover:text-amber-300 hover:bg-white/5 rounded-lg font-medium"
                    >
                      <Icon className="text-amber-400 text-xs shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}

                <div className="pt-2 border-t border-white/10 flex items-center justify-between px-2">
                  <button
                    onClick={() => {
                      setShowSearch(true);
                      setIsOpen(false);
                    }}
                    className="text-xs text-gray-300 hover:text-amber-300 flex items-center space-x-2 py-1.5"
                  >
                    <FaSearch />
                    <span>Search</span>
                  </button>

                  {!isLoggedIn ? (
                    <button
                      onClick={() => {
                        setAuthModalMode('login');
                        setShowAuthModal(true);
                        setIsOpen(false);
                      }}
                      className="text-xs text-amber-300 hover:text-amber-200 font-semibold"
                    >
                      Sign In
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowLogoutModal(true);
                        setIsOpen(false);
                      }}
                      className="text-xs text-red-400 font-semibold"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

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