import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, Award, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { topSellingProducts, newArrivals, featuredProducts, categories } from '../data/products';

const heroSlides = [
  {
    title: 'New Collection 2025',
    subtitle: 'Elevate Your Style',
    description: 'Discover the latest trends in premium fashion',
    image: '/images/Premium Navy Blazer11.avif',
  },
  {
    title: 'Luxury Tailoring',
    subtitle: 'Crafted to Perfection',
    description: 'Experience unmatched quality and sophistication',
    image: '/images/homepage.jpg',
  },
  {
    title: 'Exclusive Designs',
    subtitle: 'Stand Out from the Crowd',
    description: 'Limited edition pieces for the distinguished',
    image: '/images/store221.avif'
  },
];



const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Hero Slider Section - REMOVED BLUE OVERLAY */}
      <div className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* REMOVED: bg-gradient-to-r from-blue-900/70 via-blue-800/60 to-blue-700/50 */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/30 via-transparent to-transparent">
              <div className="text-center text-white px-4 max-w-4xl mt-20">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-white text-sm font-semibold tracking-widest mb-2"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-md"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link
                    to="/shop"
                    className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-white"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons - Updated to match */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all z-20 border border-white/30"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all z-20 border border-white/30"
        >
          <ChevronRight className="text-white" size={24} />
        </button>

        {/* Slide Indicators - Updated to match */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Section - KEPT THE SAME (still has blue) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl transition-all hover:shadow-xl border border-blue-100 dark:border-blue-800/30"
          >
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <Truck className="text-white" size={32} />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Free Shipping</h3>
            <p className="text-gray-600 dark:text-gray-300">On orders over $100</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl transition-all hover:shadow-xl border border-blue-100 dark:border-blue-800/30"
          >
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <Award className="text-white" size={32} />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Premium Quality</h3>
            <p className="text-gray-600 dark:text-gray-300">Handpicked materials</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl transition-all hover:shadow-xl border border-blue-100 dark:border-blue-800/30"
          >
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <TrendingUp className="text-white" size={32} />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Latest Trends</h3>
            <p className="text-gray-600 dark:text-gray-300">Always in fashion</p>
          </motion.div>
        </div>

        {/* Featured Categories */}
        <section className="py-12 sm:py-16 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
          >
            Featured Categories
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.slice(0, 3).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/shop?category=${category.id}`}
                  className="category-card group block h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 via-blue-800/70 to-transparent text-white p-4 sm:p-6 group-hover:from-blue-800/95 group-hover:via-blue-700/80 transition-all duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-base sm:text-lg text-blue-100">Explore Collection →</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Top Selling Products */}
        <section className="py-12 sm:py-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Top Selling Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Most loved by our customers
              </p>
            </div>
            <Link
              to="/shop"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 hover:underline flex items-center space-x-2 transition-all hover:translate-x-1"
            >
              <span>View All</span>
              <span>→</span>
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSellingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onView={setSelectedProduct}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-12 sm:py-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                New Arrivals
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Fresh styles just for you
              </p>
            </div>
            <Link
              to="/shop"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 hover:underline flex items-center space-x-2 transition-all hover:translate-x-1"
            >
              <span>View All</span>
              <span>→</span>
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onView={setSelectedProduct}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 sm:py-16 mb-16">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
            >
              Featured Products
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400"
            >
              Handpicked selections from our latest collection
            </motion.p>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No featured products available.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    onView={setSelectedProduct}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-700 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white rounded-2xl p-8 md:p-12 text-center shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Boss Club
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive access to new collections, special offers, and styling tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/20 backdrop-blur-sm"
            />
            <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 hover:shadow-lg transition-all transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Home;