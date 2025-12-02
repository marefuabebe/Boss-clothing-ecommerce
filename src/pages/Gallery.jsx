import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  FaTimes, 
  FaChevronLeft, 
  FaChevronRight, 
  FaExpand, 
  FaDownload,
  FaHeart,
  FaShare,
  FaSearch,
  FaTimesCircle,
  FaInstagram,
  FaPinterest,
  FaEye,
  FaShoppingBag,
  FaTshirt,
  FaGem,
  FaFire
} from 'react-icons/fa';
import { IoGrid, IoImage, IoCube, IoShirt, IoBag, IoFlame } from 'react-icons/io5';

const galleryImages = [
  // Men's Fashion (6 items)
  { 
    id: 1, 
    src: "/images/Men's Light Wash Slim-Fit Denim Jeans.avif", 
    title: 'Premium Denim Jeans', 
    description: 'Modern city fashion for the contemporary man',
    category: 'mens',
    tags: ['urban', 'jeans', 'slim-fit', 'casual']
  },
  { 
    id: 2, 
    src: "/images/Men's Light Wash Slim-Fit Denim Jeans22.avif", 
    title: 'Classic Fit Jeans', 
    description: 'Everyday comfort meets style in perfect fit',
    category: 'mens',
    tags: ['casual', 'jeans', 'daily', 'comfort']
  },
  { 
    id: 3, 
    src: '/images/Premium Navy Blazer11.avif', 
    title: 'Tailored Navy Blazer', 
    description: 'Handcrafted perfection in every stitch for formal occasions',
    category: 'mens',
    tags: ['premium', 'tailored', 'formal', 'blazer']
  },
  { 
    id: 4, 
    src: '/images/Summer Collection.avif', 
    title: 'Summer Casual Collection', 
    description: 'Light and comfortable styles for the sunny days',
    category: 'mens',
    tags: ['summer', 'casual', 'new', 'lightweight']
  },
  { 
    id: 5, 
    src: '/images/Urban style.avif', 
    title: 'Urban Street Style', 
    description: 'Modern urban fashion statements',
    category: 'mens',
    tags: ['street', 'urban', 'modern', 'fashion']
  },
  { 
    id: 6, 
    src: '/images/Discover the journey of Boos Clothes.avif', 
    title: 'Heritage Collection', 
    description: 'Celebrating our roots with modern designs',
    category: 'mens',
    tags: ['heritage', 'classic', 'modern', 'premium']
  },

  // Women's Fashion (6 items)
  { 
    id: 7, 
    src: '/images/Black Evening Dress22.avif', 
    title: 'Elegant Evening Dress', 
    description: 'Elegance redefined for special occasions and parties',
    category: 'womens',
    tags: ['formal', 'elegant', 'evening', 'party']
  },
  { 
    id: 8, 
    src: '/images/Traditional with a modern twist.avif', 
    title: 'Ethnic Fusion Dress', 
    description: 'Traditional elegance with a modern twist',
    category: 'womens',
    tags: ['ethnic', 'traditional', 'modern', 'fusion']
  },
  { 
    id: 9, 
    src: '/images/Minimalist Designs.avif', 
    title: 'Minimalist Dress Collection', 
    description: 'Less is more in our minimalist collection',
    category: 'womens',
    tags: ['minimalist', 'simple', 'elegant', 'clean']
  },
  { 
    id: 10, 
    src: '/images/homepage.jpg', 
    title: 'Exclusive Women Collection', 
    description: 'Limited edition pieces for the distinguished woman',
    category: 'womens',
    tags: ['exclusive', 'limited', 'premium', 'luxury']
  },
  { 
    id: 11, 
    src: '/images/Seasonal Trends.avif', 
    title: 'Seasonal Dress Collection', 
    description: 'Stay ahead in fashion with the latest trends',
    category: 'womens',
    tags: ['trending', 'seasonal', 'fashion', 'new']
  },
  { 
    id: 12, 
    src: '/images/Summer Collection.avif', 
    title: 'Summer Dress Collection', 
    description: 'Fresh and vibrant summer styles',
    category: 'womens',
    tags: ['summer', 'vibrant', 'dress', 'seasonal']
  },

  // Accessories (6 items)
  { 
    id: 13, 
    src: '/images/Accessory Showcase.avif', 
    title: 'Premium Accessory Set', 
    description: 'Complete your look with premium accessories',
    category: 'accessories',
    tags: ['accessories', 'premium', 'style', 'complete']
  },
  { 
    id: 14, 
    src: '/images/Black Evening Dress22.avif', 
    title: 'Evening Jewelry Collection', 
    description: 'Elegant jewelry pieces for special occasions',
    category: 'accessories',
    tags: ['jewelry', 'elegant', 'evening', 'luxury']
  },
  { 
    id: 15, 
    src: '/images/Premium Navy Blazer11.avif', 
    title: 'Premium Leather Belt', 
    description: 'Handcrafted leather belts for formal wear',
    category: 'accessories',
    tags: ['leather', 'belt', 'formal', 'premium']
  },
  { 
    id: 16, 
    src: '/images/Urban style.avif', 
    title: 'Urban Style Accessories', 
    description: 'Modern accessories for urban fashion',
    category: 'accessories',
    tags: ['urban', 'modern', 'accessories', 'style']
  },
  { 
    id: 17, 
    src: '/images/Minimalist Designs.avif', 
    title: 'Minimalist Jewelry', 
    description: 'Simple and elegant jewelry designs',
    category: 'accessories',
    tags: ['minimalist', 'jewelry', 'simple', 'elegant']
  },
  { 
    id: 18, 
    src: '/images/Discover the journey of Boos Clothes.avif', 
    title: 'Heritage Accessories', 
    description: 'Traditional accessory designs',
    category: 'accessories',
    tags: ['heritage', 'traditional', 'accessories', 'classic']
  },

  // Trending (6 items)
  { 
    id: 19, 
    src: '/images/Seasonal Trends.avif', 
    title: 'Trending Seasonal Collection', 
    description: 'Latest fashion trends for this season',
    category: 'trends',
    tags: ['trending', 'seasonal', 'fashion', 'latest']
  },
  { 
    id: 20, 
    src: '/images/Urban style.avif', 
    title: 'Street Fashion Trends', 
    description: 'Urban style statements for the bold and trendy',
    category: 'trends',
    tags: ['street', 'urban', 'bold', 'trendy']
  },
  { 
    id: 21, 
    src: '/images/Summer Collection.avif', 
    title: 'Summer Trends 2024', 
    description: 'Hot summer fashion trends',
    category: 'trends',
    tags: ['summer', 'trends', '2024', 'hot']
  },
  { 
    id: 22, 
    src: '/images/Traditional with a modern twist.avif', 
    title: 'Ethnic Trend Collection', 
    description: 'Traditional meets modern trends',
    category: 'trends',
    tags: ['ethnic', 'trends', 'modern', 'fusion']
  },
  { 
    id: 23, 
    src: '/images/Minimalist Designs.avif', 
    title: 'Minimalist Trends', 
    description: 'Current minimalist fashion trends',
    category: 'trends',
    tags: ['minimalist', 'trends', 'simple', 'clean']
  },
  { 
    id: 24, 
    src: '/images/homepage.jpg', 
    title: 'Exclusive Trending Items', 
    description: 'Limited edition trending pieces',
    category: 'trends',
    tags: ['exclusive', 'trending', 'limited', 'premium']
  },

  // Collections (6 items)
  { 
    id: 25, 
    src: '/images/Summer Collection.avif', 
    title: 'Summer Collection 2024', 
    description: 'Complete summer fashion collection',
    category: 'collection',
    tags: ['summer', 'collection', '2024', 'complete']
  },
  { 
    id: 26, 
    src: '/images/Traditional with a modern twist.avif', 
    title: 'Ethnic Fusion Collection', 
    description: 'Traditional elegance with modern design',
    category: 'collection',
    tags: ['ethnic', 'traditional', 'modern', 'collection']
  },
  { 
    id: 27, 
    src: '/images/Minimalist Designs.avif', 
    title: 'Minimalist Collection', 
    description: 'Complete minimalist fashion line',
    category: 'collection',
    tags: ['minimalist', 'simple', 'elegant', 'collection']
  },
  { 
    id: 28, 
    src: '/images/homepage.jpg', 
    title: 'Exclusive Limited Collection', 
    description: 'Premium limited edition collection',
    category: 'collection',
    tags: ['exclusive', 'limited', 'premium', 'collection']
  },
  { 
    id: 29, 
    src: '/images/Premium Navy Blazer11.avif', 
    title: 'Premium Tailoring Collection', 
    description: 'Handcrafted premium collection',
    category: 'collection',
    tags: ['premium', 'tailored', 'formal', 'collection']
  },
  { 
    id: 30, 
    src: '/images/Discover the journey of Boos Clothes.avif', 
    title: 'Heritage Collection 2024', 
    description: 'Celebrating heritage with modern designs',
    category: 'collection',
    tags: ['heritage', 'classic', 'modern', 'collection']
  }
];

const categories = [
  { id: 'all', name: 'All Collections', icon: <IoGrid />, count: galleryImages.length, color: 'from-blue-500 to-cyan-400' },
  { id: 'collection', name: 'Collections', icon: <IoCube />, count: galleryImages.filter(img => img.category === 'collection').length, color: 'from-purple-500 to-pink-500' },
  { id: 'mens', name: 'Men\'s Fashion', icon: <IoShirt />, count: galleryImages.filter(img => img.category === 'mens').length, color: 'from-emerald-500 to-teal-400' },
  { id: 'womens', name: 'Women\'s Fashion', icon: <IoShirt />, count: galleryImages.filter(img => img.category === 'womens').length, color: 'from-rose-500 to-pink-400' },
  { id: 'accessories', name: 'Accessories', icon: <IoBag />, count: galleryImages.filter(img => img.category === 'accessories').length, color: 'from-amber-500 to-yellow-400' },
  { id: 'trends', name: 'Trending', icon: <IoFlame />, count: galleryImages.filter(img => img.category === 'trends').length, color: 'from-orange-500 to-red-400' },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const galleryRef = useRef(null);
  const isInView = useInView(galleryRef, { once: true, amount: 0.1 });

  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = activeCategory === 'all' || image.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  }, []);

  const openLightbox = useCallback((image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    setIsFullscreen(false);
  }, []);

  const navigate = useCallback((direction) => {
    setCurrentIndex(prevIndex => {
      let newIndex;
      if (direction === 'next') {
        newIndex = (prevIndex + 1) % filteredImages.length;
      } else {
        newIndex = (prevIndex - 1 + filteredImages.length) % filteredImages.length;
      }
      setSelectedImage(filteredImages[newIndex]);
      return newIndex;
    });
  }, [filteredImages]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.log);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleDownload = useCallback((imageSrc, imageTitle) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `boss-clothes-${imageTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      const index = filteredImages.findIndex(img => img.id === selectedImage.id);
      setCurrentIndex(index);
    }
  }, [selectedImage, filteredImages]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigate('prev');
          break;
        case 'ArrowRight':
          navigate('next');
          break;
        case 'f':
        case 'F':
          if (e.ctrlKey) {
            toggleFullscreen();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex, navigate, closeLightbox, toggleFullscreen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-60 h-60 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-8"
          >
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center mx-auto shadow-2xl">
              <FaShoppingBag className="text-white text-5xl" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6">
            Fashion Gallery
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
            Explore our curated collections of premium fashion. Discover styles for every occasion.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto mb-16">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setActiveCategory(category.id)}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-4`}>
                  <div className="text-white text-2xl">
                    {category.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{category.count}</div>
                <div className="text-gray-400 text-base truncate">{category.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filter and Search Bar - Made More Spacious */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 mb-10 border border-gray-700/50 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Search Bar - Made More Spacious */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search collections, styles, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-14 py-5 bg-gray-900/50 border border-gray-700/50 rounded-2xl focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-all duration-300 backdrop-blur-sm text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTimesCircle className="text-xl" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Buttons - Made More Spacious */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center px-6 py-4 rounded-2xl transition-all duration-300 border text-base ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-xl border-transparent`
                      : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800/50 hover:text-white border-gray-700/50'
                  }`}
                >
                  <span className="mr-3 text-lg">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                  <span className={`ml-3 text-sm px-3 py-1.5 rounded-full ${
                    activeCategory === category.id 
                      ? 'bg-white/20' 
                      : 'bg-gray-700/50'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Info - Made More Spacious */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Showing {filteredImages.length} of {galleryImages.length} items
              {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
            </h3>
            {searchQuery && (
              <p className="text-gray-400 text-base mt-1">
                Search results for: <span className="text-purple-300 font-medium">"{searchQuery}"</span>
              </p>
            )}
          </div>
          
          {/* View Mode Toggle - Made More Spacious */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 inline-flex border border-gray-700/50">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <IoGrid className="text-2xl" />
              <span className="hidden sm:inline text-base font-medium">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                viewMode === 'masonry'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <IoImage className="text-2xl" />
              <span className="hidden sm:inline text-base font-medium">Masonry</span>
            </button>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          ref={galleryRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`grid ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
          }`}
        >
          <AnimatePresence mode="wait">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 shadow-xl cursor-pointer"
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => openLightbox(image, index)}
              >
                {/* Image Container */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <motion.img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(image.id);
                    }}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 z-10"
                    aria-label={favorites.has(image.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <FaHeart className={`text-xl ${favorites.has(image.id) ? 'text-red-500 fill-red-500 animate-pulse' : 'text-white'}`} />
                  </button>
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className={`px-4 py-2 text-sm font-medium rounded-full capitalize ${
                      image.category === 'mens' ? 'bg-blue-500/80 text-white' :
                      image.category === 'womens' ? 'bg-pink-500/80 text-white' :
                      image.category === 'accessories' ? 'bg-amber-500/80 text-white' :
                      image.category === 'trends' ? 'bg-orange-500/80 text-white' :
                      'bg-purple-500/80 text-white'
                    }`}>
                      {image.category}
                    </span>
                  </div>
                  
                  {/* View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                      <FaEye className="text-white text-3xl" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {image.title}
                  </h3>
                  <p className="text-gray-400 text-base mb-5 line-clamp-2">
                    {image.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {image.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-gray-700/50 text-gray-300 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {image.tags.length > 2 && (
                      <span className="px-3 py-1.5 bg-gray-700/50 text-gray-300 text-sm rounded-full">
                        +{image.tags.length - 2}
                      </span>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-700/50">
                    <div className="flex gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.share({
                            title: image.title,
                            text: image.description,
                            url: window.location.href,
                          }).catch(console.log);
                        }}
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300 p-2.5"
                        title="Share"
                      >
                        <FaShare className="text-lg" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(image.src, image.title);
                        }}
                        className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 p-2.5"
                        title="Download"
                      >
                        <FaDownload className="text-lg" />
                      </button>
                    </div>
                    <div className="text-gray-500 text-sm uppercase tracking-wider font-medium">
                      {image.category === 'mens' && 'Men\'s'}
                      {image.category === 'womens' && 'Women\'s'}
                      {image.category === 'accessories' && 'Accessories'}
                      {image.category === 'trends' && 'Trending'}
                      {image.category === 'collection' && 'Collection'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center border border-gray-700/50">
              <FaSearch className="text-gray-500 text-6xl" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">No Images Found</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8 text-lg">
              {searchQuery 
                ? `No results found for "${searchQuery}". Try different keywords or clear the search.`
                : `No items found in this category. Try selecting a different category.`
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 text-lg"
              >
                Clear Search
              </button>
            )}
          </motion.div>
        )}

        {/* Load More Button (Optional) */}
        {filteredImages.length > 0 && filteredImages.length < galleryImages.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <button className="px-10 py-5 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-700/50 backdrop-blur-sm text-lg">
              Load More Collections
            </button>
          </motion.div>
        )}
      </div>

      {/* Advanced Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
            
            {/* Lightbox Content */}
            <motion.div
              className="relative w-full max-w-6xl"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Controls */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                <div className="flex items-center gap-6">
                  <motion.button
                    onClick={closeLightbox}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 border border-white/20"
                  >
                    <FaTimes className="text-2xl" />
                  </motion.button>
                  <div className="bg-black/50 backdrop-blur-sm px-5 py-3 rounded-full border border-white/20">
                    <span className="text-white font-medium text-lg">
                      {currentIndex + 1} / {filteredImages.length}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  {[
                    { icon: FaHeart, action: () => toggleFavorite(selectedImage.id), active: favorites.has(selectedImage.id), label: 'Favorite' },
                    { icon: FaExpand, action: toggleFullscreen, active: isFullscreen, label: 'Fullscreen' },
                    { icon: FaDownload, action: () => handleDownload(selectedImage.src, selectedImage.title), active: false, label: 'Download' },
                  ].map((btn, idx) => (
                    <motion.button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        btn.action();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 border border-white/20"
                      title={btn.label}
                    >
                      <btn.icon className={`text-2xl ${btn.active ? 'text-red-500 fill-red-500' : ''}`} />
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('prev');
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 border border-white/20 z-10"
              >
                <FaChevronLeft className="text-3xl" />
              </motion.button>
              
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('next');
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 border border-white/20 z-10"
              >
                <FaChevronRight className="text-3xl" />
              </motion.button>
              
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <motion.img
                  key={selectedImage.id}
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Image Info */}
              <motion.div
                className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-sm rounded-b-3xl p-10 border-t border-gray-700/50"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`px-4 py-2 text-base font-medium rounded-full capitalize ${
                        selectedImage.category === 'mens' ? 'bg-blue-500/80 text-white' :
                        selectedImage.category === 'womens' ? 'bg-pink-500/80 text-white' :
                        selectedImage.category === 'accessories' ? 'bg-amber-500/80 text-white' :
                        selectedImage.category === 'trends' ? 'bg-orange-500/80 text-white' :
                        'bg-purple-500/80 text-white'
                      }`}>
                        {selectedImage.category}
                      </span>
                      {favorites.has(selectedImage.id) && (
                        <span className="px-4 py-2 bg-red-500/20 text-red-300 text-base rounded-full flex items-center gap-2">
                          <FaHeart className="text-sm" /> Favorited
                        </span>
                      )}
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-4">{selectedImage.title}</h3>
                    <p className="text-gray-300 text-xl mb-6">{selectedImage.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {selectedImage.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-purple-300 text-base font-medium rounded-full border border-purple-500/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 flex items-center gap-4 text-lg"
                    >
                      <FaInstagram className="text-xl" />
                      Share
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-2xl hover:bg-gray-700 transition-all duration-300 border border-gray-700 flex items-center gap-4 text-lg"
                    >
                      <FaPinterest className="text-xl" />
                      Pin It
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Keyboard Hint */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-8 py-4 rounded-full border border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-gray-400 text-base flex items-center gap-6">
                <kbd className="px-3 py-1.5 bg-gray-800 rounded text-sm">← →</kbd>
                <span>Navigate</span>
                <kbd className="px-3 py-1.5 bg-gray-800 rounded text-sm">ESC</kbd>
                <span>Close</span>
                <kbd className="px-3 py-1.5 bg-gray-800 rounded text-sm">F</kbd>
                <span>Fullscreen</span>
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;