import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { FaTimes, FaShoppingBag, FaHeart, FaCheck } from 'react-icons/fa';

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Noir Black');
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Noir Black', class: 'bg-[#15151A]' },
    { name: 'Midnight Navy', class: 'bg-[#1E293B]' },
    { name: 'Champagne Sand', class: 'bg-[#D4AF37]' },
    { name: 'Optic White', class: 'bg-[#E2E8F0]' },
  ];

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize, selectedColor });
    showNotification('success', `${product.name} (${selectedSize} / ${selectedColor}) added to cart.`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4" 
        onClick={onClose}
      >
        <motion.div
          className="relative bg-[#121218] rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-white/10"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <FaTimes className="text-xs" />
          </button>

          {/* Modal Grid with compact padding */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
            {/* Image display */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0A0A0E] border border-white/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Product Details - Compact */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-1">
                  {product.category || 'Boss Clothe Collection'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-playfair">
                  {product.name}
                </h2>
                
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl sm:text-2xl font-bold text-amber-300">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-[11px] text-emerald-400 ml-2 font-medium">Free Shipping</span>
                </div>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                  Made with comfortable high-quality fabrics, designed for daily wear and great style. Durable stitching and a clean modern fit.
                </p>

                {/* Size Selection */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Select Size</label>
                    <span className="text-[11px] text-amber-400/80 underline cursor-pointer">Size Guide</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                          selectedSize === size
                            ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20'
                            : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-1.5">
                    Color: <span className="text-amber-300 normal-case font-normal ml-1">{selectedColor}</span>
                  </label>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full ${color.class} border-2 flex items-center justify-center transition-all ${
                          selectedColor === color.name 
                            ? 'border-amber-400 scale-110 shadow-md' 
                            : 'border-white/20 opacity-80 hover:opacity-100'
                        }`}
                        title={color.name}
                      >
                        {selectedColor === color.name && (
                          <FaCheck className={`text-[9px] ${color.name === 'Optic White' ? 'text-black' : 'text-amber-400'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2 active:scale-98"
                >
                  <FaShoppingBag />
                  <span>Add to Cart</span>
                </button>
                
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                    isWishlisted 
                      ? 'bg-amber-400/20 text-amber-400 border-amber-400/40' 
                      : 'bg-white/5 text-gray-400 hover:text-white border-white/10'
                  }`}
                  aria-label="Save to wishlist"
                >
                  <FaHeart className={isWishlisted ? "text-amber-400" : ""} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;
