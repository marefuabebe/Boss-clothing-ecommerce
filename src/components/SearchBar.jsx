import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { products } from '../data/products';

const SearchBar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 6));
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  const handleProductClick = (product) => {
    navigate(`/shop?category=${product.category}`);
    setSearchQuery('');
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4"
          >
            <div className="bg-[#121218] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center px-4 py-2.5 border-b border-white/10">
                <FaSearch className="text-amber-400 mr-2.5 text-xs" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search silhouettes, blazers, denim, shoes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-gray-500 outline-none"
                />
                <button
                  onClick={onClose}
                  className="ml-2 w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <FaTimes size={10} />
                </button>
              </div>

              <AnimatePresence>
                {filteredProducts.length > 0 && (
                  <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="flex items-center gap-3 p-2.5 sm:px-4 hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-12 object-cover object-top rounded bg-black/40 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] uppercase tracking-widest text-amber-400 font-semibold block">
                            {product.category}
                          </span>
                          <h4 className="text-xs font-medium text-white truncate">
                            {product.name}
                          </h4>
                        </div>
                        <span className="text-xs font-bold text-amber-300">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {searchQuery.trim().length > 0 && filteredProducts.length === 0 && (
                  <div className="p-6 text-center text-gray-400 text-xs">
                    No atelier pieces found matching "{searchQuery}"
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
