import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheck, 
  FaShoppingBag, 
  FaCreditCard, 
  FaStar, 
  FaTag, 
  FaTruck,
  FaBell,
  FaTimes,
  FaTrash
} from 'react-icons/fa';

const notifications = [
  {
    id: 1,
    title: 'Order Confirmed',
    message: 'Your order #ETH12345 has been confirmed and is being processed.',
    time: 'Just now',
    unread: true,
    type: 'order',
    icon: <FaShoppingBag />
  },
  {
    id: 2,
    title: 'Payment Received',
    message: "We've received your payment of $160.96 for order #ETH12345.",
    time: '10 mins ago',
    unread: true,
    type: 'payment',
    icon: <FaCreditCard />
  },
  {
    id: 3,
    title: 'New Arrival',
    message: 'Check out our new summer collection just arrived in stock!',
    time: '2 hours ago',
    unread: false,
    type: 'promotion',
    icon: <FaStar />
  },
  {
    id: 4,
    title: 'Special Offer',
    message: 'Get 20% off on all accessories this weekend. Use code: ACCESS20',
    time: '1 day ago',
    unread: false,
    type: 'offer',
    icon: <FaTag />
  },
  {
    id: 5,
    title: 'Order Shipped',
    message: 'Your order #ETH12344 has been shipped. Tracking number: ET123456789',
    time: '3 days ago',
    unread: false,
    type: 'shipping',
    icon: <FaTruck />
  },
];

const Notifications = () => {
  const [notificationList, setNotificationList] = useState(notifications);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'

  const markAllAsRead = () => {
    setNotificationList((prev) =>
      prev.map((notif) => ({ ...notif, unread: false }))
    );
  };

  const markAsRead = (id) => {
    setNotificationList((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotificationList((prev) => prev.filter((notif) => notif.id !== id));
  };

  const clearAll = () => {
    setNotificationList([]);
  };

  const filteredNotifications = notificationList.filter((notif) => {
    if (filter === 'unread') return notif.unread;
    if (filter === 'read') return !notif.unread;
    return true;
  });

  const unreadCount = notificationList.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 py-8 px-4 md:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <FaBell className="text-3xl md:text-4xl text-blue-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Notifications</h2>
              <p className="text-gray-400 text-sm md:text-base">
                {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'read' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              Read
            </button>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <FaCheck />
              <span>Mark all as read</span>
            </button>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors"
            >
              <FaTrash />
              <span>Clear all</span>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-700"
              >
                <FaBell className="text-5xl text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No notifications</h3>
                <p className="text-gray-500">You're all caught up!</p>
              </motion.div>
            ) : (
              filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`relative group p-5 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-sm
                    ${notification.unread 
                      ? 'bg-gradient-to-r from-blue-900/30 to-blue-800/20 border-l-4 border-blue-500 shadow-lg shadow-blue-500/10' 
                      : 'bg-gray-800/30 hover:bg-gray-800/50 border-l-4 border-transparent'
                    } hover:scale-[1.01] hover:shadow-xl`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${notification.unread ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700 text-gray-400'}`}>
                      {notification.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-lg text-white truncate">{notification.title}</h5>
                          {notification.unread && (
                            <motion.span 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 bg-blue-500 rounded-full"
                            />
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-700 rounded-lg transition-all"
                        >
                          <FaTimes className="text-gray-400 hover:text-red-400" />
                        </button>
                      </div>
                      
                      <p className="text-gray-300 mb-3 leading-relaxed">
                        {notification.message}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {notification.time}
                        </span>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full
                          ${notification.unread ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700 text-gray-400'}`}
                        >
                          {notification.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Stats Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700"
        >
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="text-gray-400">
              <span className="text-sm">Total notifications: {notificationList.length}</span>
              <span className="mx-4">•</span>
              <span className="text-sm">Unread: {unreadCount}</span>
              <span className="mx-4">•</span>
              <span className="text-sm">Read: {notificationList.length - unreadCount}</span>
            </div>
            <div className="text-sm text-gray-500">
              Click on any notification to mark it as read
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;