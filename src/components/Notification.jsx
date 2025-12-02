import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Notification = ({ type, message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: FaCheckCircle,
    error: FaExclamationCircle,
    warning: FaExclamationTriangle,
    info: FaInfoCircle,
  };

  const colors = {
    success: 'bg-green-100 border-green-500 text-green-800',
    error: 'bg-blue-100 border-blue-500 text-blue-800',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    info: 'bg-blue-100 border-blue-500 text-blue-800',
  };

  const Icon = icons[type] || FaInfoCircle;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className={`fixed top-24 right-5 z-50 max-w-sm w-full rounded-lg shadow-lg border-l-4 p-4 ${colors[type] || colors.info}`}
      >
        <div className="flex items-start space-x-3">
          <Icon className="text-xl flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            <FaTimes />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;

