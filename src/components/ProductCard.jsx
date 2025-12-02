import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onView }) => {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    showNotification('success', `${product.name} added to cart!`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onView) {
      onView(product);
    }
  };

  const getBadgeClass = (badge) => {
    const classes = {
      'New': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
      'Hot': 'bg-gradient-to-r from-red-500 to-red-600 text-white',
      'Sale': 'bg-gradient-to-r from-green-500 to-green-600 text-white',
      'Popular': 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
      'Bestseller': 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
      'Just In': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
      'Featured': 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black',
    };
    return classes[badge] || 'bg-gray-600 text-white';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={handleViewDetails}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
    >
      <div className="relative overflow-hidden aspect-[3/4]">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        
        {/* Featured Badge */}
        {product.featured && (
          <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-lg">
            FEATURED
          </span>
        )}
        
        {/* Stock Status */}
        {product.stock === 0 && (
          <span className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-lg">
            OUT OF STOCK
          </span>
        )}
        
        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
            showNotification('success', `${product.name} ${isWishlisted ? 'removed from' : 'added to'} wishlist!`);
          }}
          className={`absolute top-16 right-4 p-2.5 rounded-full shadow-lg transition-all duration-300 z-10 ${
            isWishlisted 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/50' 
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white border border-gray-200 dark:border-gray-700'
          }`}
        >
          <motion.div
            animate={isWishlisted ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </motion.div>
        </motion.button>
        
        {/* Hover Overlay with Action Buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`p-3 rounded-full shadow-lg transition-all transform scale-90 group-hover:scale-100 ${
              product.stock === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
            }`}
          >
            <ShoppingCart size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleViewDetails}
            className="p-3 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-100 transition-colors transform scale-90 group-hover:scale-100"
          >
            <Eye size={20} />
          </motion.button>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description || 'Premium quality product with excellent craftsmanship.'}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-blue-500">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {product.stock !== undefined && (
              <span className={`text-sm ${
                product.stock > 10 
                  ? 'text-green-500' 
                  : product.stock > 0 
                    ? 'text-yellow-500' 
                    : 'text-red-500'
              }`}>
                {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
              </span>
            )}
            
            {product.rating && (
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.rating}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Quick Add to Cart Button - Mobile & Desktop */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full mt-4 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
            product.stock === 0
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-blue-500/50'
          }`}
        >
          <ShoppingCart size={18} />
          <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;