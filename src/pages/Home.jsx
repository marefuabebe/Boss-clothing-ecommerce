import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Truck, RefreshCw, ArrowRight, Layers, Scissors, Star, Check } from 'lucide-react';
import { FaQuoteLeft, FaGem, FaShoppingBag, FaStar } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { products, topSellingProducts, newArrivals, featuredProducts, categories } from '../data/products';

const heroSlides = [
  {
    title: 'Modern Fashion & Clothes',
    subtitle: 'NEW WINTER COLLECTION',
    description: 'Clean designs, comfortable fabrics, and modern clothes made for every day.',
    image: '/images/Premium Navy Blazer11.avif',
    cta: 'Shop Now',
    link: '/shop',
    featuredName: 'Premium Navy Blazer',
    featuredImage: '/images/Premium Navy Blazer.avif',
    featuredCategory: 'Blazers & Jackets',
    featuredPrice: 249.00,
    originalPrice: 299.00,
    featuredBadge: 'New 2026 Drop',
    rating: 4.9,
    reviews: 142
  },
  {
    title: 'Great Quality & Perfect Fit',
    subtitle: 'MADE TO LAST',
    description: 'Soft materials and careful stitching so your clothes look great and feel comfortable.',
    image: '/images/homepage.jpg',
    cta: 'View Gallery',
    link: '/gallery',
    featuredName: 'Slim Fit Blue Jeans',
    featuredImage: "/images/Men's Light Wash Slim-Fit Denim Jeans.avif",
    featuredCategory: 'Jeans & Denim',
    featuredPrice: 189.00,
    originalPrice: 220.00,
    featuredBadge: 'Customer Favorite',
    rating: 4.8,
    reviews: 98
  },
  {
    title: 'Top Best Sellers',
    subtitle: 'CUSTOMER FAVORITES',
    description: 'Discover our most popular blazers, shirts, jeans, and sneakers.',
    image: '/images/store221.avif',
    cta: 'Shop Best Sellers',
    link: '/shop',
    featuredName: 'Warm Wool Sweater',
    featuredImage: '/images/Wool Blend Sweater.jpg',
    featuredCategory: 'Knitwear & Sweaters',
    featuredPrice: 149.00,
    originalPrice: 180.00,
    featuredBadge: '#1 Best Seller',
    rating: 5.0,
    reviews: 215
  },
];

// Outfit bundle items for Unique Section 1
const outfitBundleItems = [
  { id: "18", name: "Navy Blazer", price: 249, image: "/images/Premium Navy Blazer.avif", role: "Jacket" },
  { id: "21", name: "Slim Fit Blue Jeans", price: 189, image: "/images/Men's Light Wash Slim-Fit Denim Jeans.avif", role: "Pants" },
  { id: "8", name: "Classic Leather Belt", price: 129.99, image: "/images/Belt.avif", role: "Accessory" },
  { id: "35", name: "White Leather Sneakers", price: 119.99, image: "/images/Sporty Running Shoes.avif", role: "Shoes" },
];

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('trending');
  const [activeMaterial, setActiveMaterial] = useState(0);
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Get current products based on active tab
  const getTabProducts = () => {
    switch (activeTab) {
      case 'new':
        return newArrivals;
      case 'featured':
        return featuredProducts;
      case 'trending':
      default:
        return topSellingProducts;
    }
  };

  // Bundle add-to-cart handler
  const handleAddEntireOutfit = () => {
    outfitBundleItems.forEach((item) => {
      const prod = products.find((p) => p.id === item.id) || item;
      addToCart(prod);
    });
    showNotification('success', 'Complete 4-piece outfit added to your cart!');
  };

  const bundleOriginalTotal = outfitBundleItems.reduce((acc, curr) => acc + curr.price, 0);
  const bundleDiscountPrice = bundleOriginalTotal * 0.9; // 10% bundle savings

  const materials = [
    {
      title: "Warm Wool & Cashmere",
      origin: "Soft & Warm Fabric",
      specs: "High Quality • Very Comfortable",
      desc: "Made for jackets and warm sweaters. Keeps you warm, feels light, and does not wrinkle easily.",
      image: "/images/Wool Blend Sweater.jpg",
    },
    {
      title: "100% Organic Soft Cotton",
      origin: "Natural Ethiopian Cotton",
      specs: "100% Certified Organic • Extra Soft",
      desc: "Spun from natural cotton seeds. Super soft on your skin, breathable, and gets softer every time you wash it.",
      image: "/images/Premium Cotton T-Shirt.avif",
    },
    {
      title: "Real Natural Leather",
      origin: "Handmade in Addis Ababa",
      specs: "Genuine Leather • Naturally Tanned",
      desc: "Tanned using natural plant oils without harsh chemicals. Looks better and richer as it ages.",
      image: "/images/Designer Leather Bag.avif",
    },
    {
      title: "Durable Blue Denim",
      origin: "Strong Cotton Denim",
      specs: "100% Pure Cotton • Built to Last",
      desc: "Heavy-duty blue jeans that keep their shape, look great, and last for years of everyday wear.",
      image: "/images/jeans22.avif",
    }
  ];

  const pressQuotes = [
    {
      quote: "The top new clothing brand in Addis Ababa. Modern designs and high quality clothes.",
      source: "Vogue Africa",
      year: "2026",
    },
    {
      quote: "Great tailoring, clean streetwear style, and fits that give you instant confidence.",
      source: "GQ Style",
      year: "2025",
    },
    {
      quote: "Boss Clothe makes modern fashion proud of its Ethiopian roots and craftsmanship.",
      source: "Addis Standard",
      year: "2025",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100">
      {/* Hero Carousel */}
      <section className="relative h-[480px] sm:h-[520px] lg:h-[550px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-black/30" />

            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-4 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Left Column: Heading & CTAs */}
                  <div className="lg:col-span-7">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 backdrop-blur-md mb-3"
                    >
                      <Sparkles className="text-amber-400" size={12} />
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                        {slide.subtitle}
                      </span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-3 font-playfair tracking-tight leading-tight"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-xs sm:text-sm md:text-base text-gray-300 mb-6 max-w-xl leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex items-center gap-3 flex-wrap"
                    >
                      <Link
                        to={slide.link}
                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5"
                      >
                        {slide.cta}
                      </Link>
                      <Link
                        to="/gallery"
                        className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm tracking-wider uppercase backdrop-blur-sm border border-white/15 transition-all hover:-translate-y-0.5"
                      >
                        Lookbook
                      </Link>
                    </motion.div>

                    {/* Trust Proof Badges */}
                    <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/10 text-xs text-gray-300">
                      <div>
                        <span className="text-amber-400 font-bold text-base block">5,000+</span>
                        <span className="text-[11px] text-gray-400">Happy Customers</span>
                      </div>
                      <div>
                        <span className="text-amber-400 font-bold text-base block">4.9 / 5</span>
                        <span className="text-[11px] text-gray-400">Verified Rating</span>
                      </div>
                      <div>
                        <span className="text-amber-400 font-bold text-base block">24-48h</span>
                        <span className="text-[11px] text-gray-400">Addis Delivery</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Hero Spotlight Feature Card & Highlights */}
                  <div className="hidden lg:flex flex-col gap-3 justify-center items-end lg:col-span-5">
                    <motion.div
                      key={slide.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-full max-w-sm bg-[#121218]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl hover:border-amber-400/40 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                          {slide.featuredBadge}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                          <Check size={11} />
                          <span>In Stock</span>
                        </span>
                      </div>

                      <div className="flex gap-3.5 items-center">
                        <img
                          src={slide.featuredImage}
                          alt={slide.featuredName}
                          className="w-20 h-24 object-cover object-top rounded-xl border border-white/10 bg-black/40 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] uppercase tracking-wider text-gray-400 block mb-0.5">
                            {slide.featuredCategory}
                          </span>
                          <h4 className="text-sm font-bold text-white truncate font-playfair mb-1">
                            {slide.featuredName}
                          </h4>
                          <div className="flex items-center gap-1 text-[11px] text-amber-400 mb-1.5">
                            <Star size={11} className="fill-amber-400" />
                            <span className="font-semibold">{slide.rating}</span>
                            <span className="text-gray-400 font-normal text-[10px]">({slide.reviews} reviews)</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-bold text-amber-300">
                              ${slide.featuredPrice.toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                              ${slide.originalPrice.toFixed(2)}
                            </span>
                          </div>
                          <Link
                            to="/shop"
                            className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                          >
                            <span>Shop This Piece</span>
                            <ArrowRight size={11} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>

                    {/* Trust Pills under card */}
                    <div className="flex items-center gap-2 w-full max-w-sm">
                      <div className="flex-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-[11px] text-gray-300 flex items-center gap-2">
                        <Truck size={13} className="text-amber-400 shrink-0" />
                        <span className="truncate">Free delivery over $100</span>
                      </div>
                      <div className="flex-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-[11px] text-gray-300 flex items-center gap-2">
                        <ShieldCheck size={13} className="text-amber-400 shrink-0" />
                        <span className="truncate">100% Quality Fabric</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all z-20"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all z-20"
          aria-label="Next Slide"
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-amber-400 w-6' : 'bg-white/30 w-2 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">
        
        {/* Value Pillars */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 hover:border-amber-400/30 transition-all">
            <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
              <Truck size={18} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white">Free Delivery</h4>
              <p className="text-[11px] text-gray-400">On all orders over $100</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 hover:border-amber-400/30 transition-all">
            <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white">Top Quality</h4>
              <p className="text-[11px] text-gray-400">Carefully made clothes</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 hover:border-amber-400/30 transition-all">
            <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
              <RefreshCw size={18} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white">30-Day Returns</h4>
              <p className="text-[11px] text-gray-400">Easy exchanges & returns</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 hover:border-amber-400/30 transition-all">
            <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white">Customer Support</h4>
              <p className="text-[11px] text-gray-400">Chat with us anytime</p>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
                Popular Styles
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white">
                Shop By Category
              </h2>
            </div>
            <Link 
              to="/shop" 
              className="text-xs text-amber-300 hover:text-amber-200 font-medium flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {categories.slice(0, 3).map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group relative h-48 sm:h-56 rounded-xl overflow-hidden border border-white/10 shadow-lg block"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-playfair text-white group-hover:text-amber-300 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-[11px] text-gray-300 tracking-wide">
                      View Clothes
                    </p>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-amber-400 group-hover:text-black text-white flex items-center justify-center text-xs transition-colors">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Dynamic Collection Tabs */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
                Featured Clothes
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white">
                Our Best Styles
              </h2>
            </div>

            <div className="inline-flex p-1 rounded-full bg-white/[0.04] border border-white/10 self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('trending')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  activeTab === 'trending'
                    ? 'bg-amber-400 text-black shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Trending
              </button>
              <button
                onClick={() => setActiveTab('new')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  activeTab === 'new'
                    ? 'bg-amber-400 text-black shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                New Arrivals
              </button>
              <button
                onClick={() => setActiveTab('featured')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  activeTab === 'featured'
                    ? 'bg-amber-400 text-black shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Featured
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {getTabProducts().map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={setSelectedProduct}
              />
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* UNIQUE SECTION 1: The Curated Outfit Studio (Interactive Look of the Week) */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-[#12121A] via-[#141420] to-[#101018] rounded-2xl border border-amber-400/25 p-5 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left: Model Showcase */}
            <div className="relative w-full lg:w-5/12 aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/images/homepage.jpg"
                alt="Curated Look of the Week"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
              
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-400 text-black font-bold text-[10px] uppercase tracking-wider shadow-lg">
                Outfit of the Week
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold block">
                  Addis Modern Style
                </span>
                <h3 className="text-lg font-bold font-playfair">
                  The Complete Navy & Denim Set
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  Navy jacket matched with slim fit blue jeans, a leather belt, and white sneakers.
                </p>
              </div>
            </div>

            {/* Right: Breakdown of the 4 bundled items */}
            <div className="w-full lg:w-7/12 space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-1">
                  Matching Outfits
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-white">
                  Get The Whole Outfit
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Get the complete matching set with one click. Save 10% when you buy the full outfit together.
                </p>
              </div>

              {/* 4 Items in Outfit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {outfitBundleItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedProduct(products.find(p => p.id === item.id) || item)}
                    className="p-2.5 bg-black/40 rounded-xl border border-white/10 hover:border-amber-400/40 cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 rounded-lg object-cover object-top flex-shrink-0 bg-black"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase tracking-wider text-amber-400 font-bold block">
                        {item.role}
                      </span>
                      <h4 className="text-xs font-semibold text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs font-bold text-amber-300 mt-0.5">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bundle Pricing Bar & Add All Button */}
              <div className="p-4 bg-black/60 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-amber-300">
                      ${bundleDiscountPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ${bundleOriginalTotal.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">
                      Save 10% on Set
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Includes all 4 matching items
                  </p>
                </div>

                <button
                  onClick={handleAddEntireOutfit}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <FaShoppingBag size={12} />
                  <span>Add Full Outfit to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* UNIQUE SECTION 2: Quality Materials & Fabrics                             */}
        {/* ========================================================================= */}
        <section className="bg-[#121218] rounded-2xl border border-white/10 p-5 sm:p-8">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
              Quality Fabrics
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-white">
              What Our Clothes Are Made Of
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              We use natural, high quality fabrics that are comfortable, soft on your skin, and built to last.
            </p>
          </div>

          {/* Material Selectors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {materials.map((mat, i) => (
              <button
                key={mat.title}
                onClick={() => setActiveMaterial(i)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  activeMaterial === i
                    ? 'bg-amber-400/10 border-amber-400 shadow-md'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                }`}
              >
                <span className={`text-[10px] font-mono block ${activeMaterial === i ? 'text-amber-400' : 'text-gray-500'}`}>
                  0{i + 1}
                </span>
                <h4 className="text-xs font-semibold text-white truncate mt-1">{mat.title}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5 truncate">{mat.origin}</p>
              </button>
            ))}
          </div>

          {/* Active Material Detail Showcase */}
          <div className="bg-black/40 rounded-xl border border-white/10 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
              <img
                src={materials[activeMaterial].image}
                alt={materials[activeMaterial].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-semibold text-amber-300">
                  Close-Up Fabric View • {materials[activeMaterial].specs}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block">
                {materials[activeMaterial].origin}
              </span>
              <h3 className="text-xl font-bold font-playfair text-white">
                {materials[activeMaterial].title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {materials[activeMaterial].desc}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-gray-400 block">Quality Details</span>
                  <span className="text-xs font-semibold text-white">{materials[activeMaterial].specs}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-gray-400 block">Eco-Friendly</span>
                  <span className="text-xs font-semibold text-emerald-400">100% Safe & Natural</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Heritage Story Banner */}
        <section className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#121218] to-[#181824] p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-1.5">
                Our Story
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-playfair text-white mb-3 leading-tight">
                High Quality Clothes, Born in Addis Ababa
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                Founded by Marefu Abebe, Boss Clothe makes modern, stylish clothes using top quality materials. We focus on comfort, great fit, and fair prices for our customers.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/about"
                  className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs tracking-wider uppercase transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-white/10">
              <img
                src="/images/Traditional with a modern twist.avif"
                alt="Atelier Craftsmanship"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold">Boss Clothe</p>
                <p className="text-xs font-medium">Modern Style & Comfortable Fit</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* UNIQUE SECTION 3: Customer Reviews                                        */}
        {/* ========================================================================= */}
        <section className="bg-[#121218] rounded-2xl border border-white/10 p-5 sm:p-8">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
              Customer Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-white">
              What People Say About Us
            </h2>
          </div>

          {/* Press Quotes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {pressQuotes.map((item, i) => (
              <div
                key={i}
                className="p-4 bg-black/40 rounded-xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <FaQuoteLeft className="text-amber-400/40 text-lg mb-2" />
                  <p className="text-xs text-gray-300 italic leading-relaxed mb-3">
                    "{item.quote}"
                  </p>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-amber-300">{item.source}</span>
                  <span className="text-gray-500">{item.year}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Client Testimonials Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10">
            <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="flex text-amber-400 text-xs mb-1.5 gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>
              <p className="text-xs text-gray-300 font-medium">"The Navy Blazer fits great. Very comfortable, soft fabric and looks sharp."</p>
              <span className="text-[10px] text-gray-400 block mt-2">— Yared K., Addis Ababa (Verified Buyer)</span>
            </div>

            <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="flex text-amber-400 text-xs mb-1.5 gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>
              <p className="text-xs text-gray-300 font-medium">"The cotton dresses are very soft and comfortable. Truly great quality."</p>
              <span className="text-[10px] text-gray-400 block mt-2">— Sarah M., London (International Order)</span>
            </div>

            <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="flex text-amber-400 text-xs mb-1.5 gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>
              <p className="text-xs text-gray-300 font-medium">"Easy checkout with Telebirr and arrived in Bole within 24 hours. Great service."</p>
              <span className="text-[10px] text-gray-400 block mt-2">— Dawit T., Addis Ababa (Verified Buyer)</span>
            </div>
          </div>
        </section>

        {/* Newsletter / VIP Club */}
        <section className="p-5 sm:p-7 rounded-2xl bg-[#13131A] border border-amber-400/20 text-center max-w-3xl mx-auto shadow-xl">
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-1">
            Newsletter
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-playfair text-white mb-2">
            Join The Boss Clothe Club
          </h3>
          <p className="text-xs text-gray-300 max-w-md mx-auto mb-4">
            Get updates on new clothes, discounts, and sales.
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Welcome to the Boss Clothe Club.");
            }} 
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-amber-400/60"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95"
            >
              Subscribe
            </button>
          </form>
        </section>

      </div>

      {/* Quick View Modal */}
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