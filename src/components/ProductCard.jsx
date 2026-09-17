import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onView }) => {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    showNotification('success', `${product.name} added to cart.`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onView) {
      onView(product);
    }
  };

  const getBadgeStyle = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'new':
      case 'just in':
        return 'bg-amber-400/20 text-amber-300 border-amber-400/30';
      case 'sale':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'bestseller':
      case 'popular':
      case 'hot':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-white/10 text-gray-200 border-white/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      onClick={handleViewDetails}
      className="group relative bg-[#121219]/90 rounded-xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl flex flex-col"
    >
      {/* Product Image Box */}
      <div className="relative overflow-hidden aspect-[3/4] bg-[#0E0E14]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase border backdrop-blur-md ${getBadgeStyle(product.badge)}`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
            showNotification('info', `${product.name} ${!isWishlisted ? 'saved to wishlist' : 'removed from wishlist'}`);
          }}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all duration-200"
          aria-label="Wishlist"
        >
          <Heart 
            size={13} 
            className={isWishlisted ? "fill-amber-400 text-amber-400" : "text-gray-300 hover:text-white"} 
          />
        </button>

        {/* Quick View Hover Pill */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 py-2 px-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-lg transition-transform active:scale-95"
          >
            <ShoppingBag size={13} />
            <span>{product.stock === 0 ? 'Sold Out' : 'Quick Add'}</span>
          </button>
          
          <button
            onClick={handleViewDetails}
            className="w-8 h-8 rounded-lg bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors"
            title="Quick view"
          >
            <Eye size={14} />
          </button>
        </div>
      </div>
      
      {/* Product Information Box - Reduced Padding */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#121219] to-[#0E0E14]">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium block mb-1">
            {product.category || 'Clothing'}
          </span>
          <h3 className="font-medium text-xs sm:text-sm text-gray-100 group-hover:text-amber-300 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-baseline justify-between mt-2.5 pt-2 border-t border-white/5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-amber-300 tracking-tight">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <span className="text-[10px] uppercase tracking-wider text-gray-400">
            {product.stock !== undefined && product.stock <= 5 && product.stock > 0 
              ? `${product.stock} left` 
              : 'In Stock'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;