import React, { createContext, useContext, useState, useEffect } from 'react';

const PersistentNotificationContext = createContext();

export const usePersistentNotification = () => {
  const context = useContext(PersistentNotificationContext);
  if (!context) {
    throw new Error('usePersistentNotification must be used within PersistentNotificationProvider');
  }
  return context;
};

export const PersistentNotificationProvider = ({ children }) => {
  // Try to load from localStorage first
  const savedNotifications = localStorage.getItem('notifications');
  
  const [notifications, setNotifications] = useState(() => {
    if (savedNotifications) {
      try {
        return JSON.parse(savedNotifications);
      } catch (error) {
        console.error('Failed to parse saved notifications:', error);
        return getInitialNotifications();
      }
    }
    return getInitialNotifications();
  });

  const [unreadCount, setUnreadCount] = useState(0);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    const count = notifications.filter(n => n.unread).length;
    setUnreadCount(count);
  }, [notifications]);

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      time: 'Just now',
      unread: true
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <PersistentNotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAllAsRead,
        markAsRead,
        addNotification,
        deleteNotification,
        clearAll
      }}
    >
      {children}
    </PersistentNotificationContext.Provider>
  );
};

// Helper function for initial notifications
function getInitialNotifications() {
  return [
    {
      id: 1,
      title: 'Order Confirmed',
      message: 'Your order #ETH12345 has been confirmed and is being processed.',
      time: 'Just now',
      unread: true,
      type: 'order',
      icon: 'FaShoppingBag'
    },
    {
      id: 2,
      title: 'Payment Received',
      message: "We've received your payment of $160.96 for order #ETH12345.",
      time: '10 mins ago',
      unread: true,
      type: 'payment',
      icon: 'FaCreditCard'
    },
    {
      id: 3,
      title: 'New Arrival',
      message: 'Check out our new summer collection just arrived in stock!',
      time: '2 hours ago',
      unread: false,
      type: 'promotion',
      icon: 'FaStar'
    },
    {
      id: 4,
      title: 'Special Offer',
      message: 'Get 20% off on all accessories this weekend. Use code: ACCESS20',
      time: '1 day ago',
      unread: false,
      type: 'offer',
      icon: 'FaTag'
    },
    {
      id: 5,
      title: 'Order Shipped',
      message: 'Your order #ETH12344 has been shipped. Tracking number: ET123456789',
      time: '3 days ago',
      unread: false,
      type: 'shipping',
      icon: 'FaTruck'
    },
  ];
}