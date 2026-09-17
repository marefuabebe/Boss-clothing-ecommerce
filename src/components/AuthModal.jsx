import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const { login, register } = useAuth();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === 'login');
    }
  }, [isOpen, initialMode]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password required';
    } else if (isLogin && formData.password.length < 6) {
      newErrors.password = 'Min 6 characters';
    } else if (!isLogin && formData.password.length < 8) {
      newErrors.password = 'Min 8 characters';
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      login(formData.email, formData.password);
      showNotification('success', 'Welcome back to Boss Clothe.');
    } else {
      register(formData.name, formData.email, formData.password);
      showNotification('success', 'Welcome! Your account has been created.');
    }
    
    onClose();
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4" 
        onClick={onClose}
      >
        <motion.div
          className="bg-[#121218] rounded-2xl shadow-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto border border-white/10 relative"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Compact */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-amber-400 font-semibold block">
                Boss Clothe
              </span>
              <h3 className="text-base font-bold font-playfair text-white">
                {isLogin ? 'Sign In' : 'Create Account'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <FaTimes size={10} />
            </button>
          </div>

          <div className="p-4 sm:p-5">
            {/* Mode Switcher - Compact */}
            <div className="flex mb-4 bg-black/40 rounded-lg p-0.5 border border-white/10">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  isLogin ? 'bg-amber-400 text-black shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  !isLogin ? 'bg-amber-400 text-black shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              {!isLogin && (
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[11px]" />
                    <input
                      type="text"
                      placeholder="Marefu Abebe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-[10px] mt-0.5">{errors.name}</p>}
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[11px]" />
                  <input
                    type="email"
                    placeholder="client@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-[10px] mt-0.5">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[11px]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-8 pr-8 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <FaEyeSlash size={11} /> : <FaEye size={11} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-[10px] mt-0.5">{errors.password}</p>}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Confirm Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[11px]" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-8 pr-8 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <FaEyeSlash size={11} /> : <FaEye size={11} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-[10px] mt-0.5">{errors.confirmPassword}</p>}
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
