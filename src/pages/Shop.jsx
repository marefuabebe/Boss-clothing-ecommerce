import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { products, categories } from '../data/products';
import { 
  FaFilter, 
  FaStar, 
  FaShieldAlt, 
  FaTruck, 
  FaGem, 
  FaSlidersH, 
  FaWhatsapp, 
  FaCrown, 
  FaTicketAlt, 
  FaCheck, 
  FaCopy, 
  FaRulerCombined,
  FaSearch,
  FaTimes
} from 'react-icons/fa';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get('search') || '';
  });
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const categoryParam = searchParams.get('category');
    return categoryParam ? [categoryParam] : [];
  });
  const [selectedBadge, setSelectedBadge] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [priceRange, setPriceRange] = useState(300);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const productsPerPage = 12;

  useEffect(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.badge?.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by badge
    if (selectedBadge !== 'all') {
      filtered = filtered.filter((p) => p.badge?.toLowerCase() === selectedBadge.toLowerCase());
    }

    // Filter by price
    filtered = filtered.filter((p) => p.price <= priceRange);

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.reverse();
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, selectedBadge, priceRange, sortBy]);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedBadge('all');
    setSelectedSize('all');
    setPriceRange(300);
    setSortBy('featured');
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('ATELIER15');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const activeFilterCount = 
    (searchQuery.trim().length > 0 ? 1 : 0) +
    selectedCategories.length + 
    (selectedBadge !== 'all' ? 1 : 0) + 
    (selectedSize !== 'all' ? 1 : 0) + 
    (priceRange < 300 ? 1 : 0);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const styleGuides = [
    { title: "Dresses & Formal", cat: "dresses", desc: "Dresses and formal wear for special events", img: "/images/Black Evening Dress22.avif" },
    { title: "Jackets & Blazers", cat: "tops", desc: "Clean-fit blazers and everyday jackets", img: "/images/Premium Navy Blazer11.avif" },
    { title: "Jeans & Denim", cat: "bottoms", desc: "Comfortable and durable blue jeans", img: "/images/Men's Light Wash Slim-Fit Denim Jeans.avif" },
    { title: "Shoes & Sneakers", cat: "shoes", desc: "Everyday sneakers and classic dress shoes", img: "/images/Sporty Running Shoes.avif" },
  ];

  const badges = [
    { id: 'all', label: 'All Clothes' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'sale', label: 'On Sale' },
    { id: 'bestseller', label: 'Bestsellers' },
  ];

  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">

        {/* SECTION 1: Style Moodboards & Quick Category Filters */}
        <section className="bg-[#121218] rounded-2xl border border-white/10 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-4 gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
                Shop By Style
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white">
                Popular Categories
              </h2>
            </div>
            <p className="text-xs text-gray-400">Click any style to filter clothes</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {styleGuides.map((guide) => {
              const isActive = selectedCategories.includes(guide.cat);
              return (
                <div
                  key={guide.title}
                  onClick={() => handleCategoryToggle(guide.cat)}
                  className={`relative h-28 sm:h-32 rounded-xl overflow-hidden cursor-pointer border transition-all group ${
                    isActive ? 'border-amber-400 ring-1 ring-amber-400' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={guide.img} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                      {guide.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 line-clamp-1">{guide.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: Main Catalog & Filterable Grid */}
        <section>
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 mb-4 border-b border-white/10 gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
                Browse Clothes
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white">
                All Products
              </h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">
              {/* Search Bar Directly Above Clothes Grid */}
              <div className="relative flex-1 sm:w-64 min-w-[180px]">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search clothes, jackets..."
                  className="w-full pl-8 pr-7 py-1.5 bg-[#121218] border border-white/10 rounded-full text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60 transition-colors shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-0.5"
                    title="Clear search"
                  >
                    <FaTimes className="text-[10px]" />
                  </button>
                )}
              </div>

              {/* Desktop Filter Toggle */}
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#121218] hover:border-amber-400/40 text-xs font-medium text-gray-200 transition-colors shrink-0"
                title={showSidebar ? "Hide sidebar for 4-column view" : "Show filter sidebar"}
              >
                <FaSlidersH className="text-amber-400 text-xs" />
                <span>{showSidebar ? 'Hide Filters' : 'Show Filters'}</span>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-black text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-200 flex items-center gap-1.5 shrink-0"
              >
                <FaFilter className="text-amber-400 text-[10px]" />
                <span>Filters ({activeFilterCount})</span>
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-[#121218] border border-white/10 rounded-full text-xs text-gray-200 focus:outline-none focus:border-amber-400/60 cursor-pointer shrink-0"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Active Search Chip Feedback */}
          {searchQuery && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-400">Search results for:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-medium">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-white">
                  <FaTimes size={9} />
                </button>
              </span>
            </div>
          )}

          {/* Quick Horizontal Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedCategories([])}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                selectedCategories.length === 0
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'bg-[#121218] text-gray-300 border border-white/10 hover:border-white/20'
              }`}
            >
              All Categories ({products.length})
            </button>
            {categories.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              const count = products.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryToggle(cat.id)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-amber-400 text-black font-semibold'
                      : 'bg-[#121218] text-gray-300 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Catalog Layout */}
          <div className={`grid grid-cols-1 ${showSidebar ? 'lg:grid-cols-4' : 'lg:grid-cols-1'} gap-6`}>
            {/* Filters Sidebar */}
            {showSidebar && (
              <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1`}>
                <div className="sticky top-20 space-y-4">
                  {/* Filter Box */}
                  <div className="bg-[#121218] rounded-xl p-4 border border-white/10 space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
                        <FaFilter size={10} />
                        <span>Filter By</span>
                      </span>
                      {activeFilterCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="text-[11px] text-amber-300 hover:text-amber-200 underline"
                        >
                          Reset All
                        </button>
                      )}
                    </div>

                    {/* Search in Sidebar */}
                    <div>
                      <h3 className="text-xs uppercase tracking-wider font-semibold text-gray-300 mb-2">
                        Search Clothes
                      </h3>
                      <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="e.g. Jacket, Jeans..."
                          className="w-full pl-8 pr-7 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            <FaTimes className="text-[10px]" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Collection / Badge Filter */}
                    <div className="pt-3 border-t border-white/10">
                      <h3 className="text-xs uppercase tracking-wider font-semibold text-gray-300 mb-2">
                        Collection
                      </h3>
                      <div className="grid grid-cols-2 gap-1.5">
                        {badges.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => setSelectedBadge(b.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors text-left truncate ${
                              selectedBadge === b.id
                                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                                : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="pt-3 border-t border-white/10">
                      <h3 className="text-xs uppercase tracking-wider font-semibold text-gray-300 mb-2">
                        Category
                      </h3>
                      <div className="space-y-1">
                        {categories.map((category) => {
                          const isChecked = selectedCategories.includes(category.id);
                          return (
                            <label
                              key={category.id}
                              className="flex items-center justify-between py-1 px-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleCategoryToggle(category.id)}
                                  className="rounded bg-black/40 border-white/20 text-amber-400 focus:ring-amber-400/30"
                                />
                                <span className={isChecked ? 'text-amber-300 font-medium' : 'text-gray-300'}>
                                  {category.name}
                                </span>
                              </div>
                              <span className="text-[10px] text-gray-500 font-mono">
                                {products.filter((p) => p.category === category.id).length}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Size Selector */}
                    <div className="pt-3 border-t border-white/10">
                      <h3 className="text-xs uppercase tracking-wider font-semibold text-gray-300 mb-2">
                        Size
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSize(s)}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-colors ${
                              selectedSize === s
                                ? 'bg-amber-400 text-black font-bold'
                                : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs uppercase tracking-wider font-semibold text-gray-300">
                          Max Price
                        </h3>
                        <span className="text-xs font-bold text-amber-300">
                          ${priceRange}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="300"
                        step="10"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full accent-amber-400 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                        <span>$30</span>
                        <span>$300</span>
                      </div>

                      {/* Quick price presets */}
                      <div className="grid grid-cols-4 gap-1 mt-2.5">
                        {[50, 100, 200, 300].map((preset) => (
                          <button
                            key={preset}
                            onClick={() => setPriceRange(preset)}
                            className={`py-1 text-[10px] rounded border transition-colors ${
                              priceRange === preset
                                ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 font-semibold'
                                : 'border-white/10 text-gray-400 hover:text-white bg-white/5'
                            }`}
                          >
                            {preset === 300 ? 'All' : `<$${preset}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Need Help with Sizing Card */}
                  <div className="bg-gradient-to-b from-[#181822] to-[#121218] rounded-xl p-4 border border-amber-400/20 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400">
                      <FaCrown className="text-sm" />
                      <span className="text-xs font-bold tracking-wider uppercase font-playfair">
                        Need Sizing Help?
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Not sure which size fits you best? Chat with our team on WhatsApp for quick advice.
                    </p>
                    <a
                      href="https://wa.me/251911234567?text=Hello%20Boss%20Clothe%2C%20I%20would%20like%20sizing%20assistance"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all text-xs font-semibold flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp className="text-sm text-emerald-400" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  {/* 15% Discount Card */}
                  <div className="bg-[#121218] rounded-xl p-4 border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
                        <FaTicketAlt size={10} />
                        <span>Special Discount</span>
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                        15% OFF
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Use this code at checkout to get 15% off orders over $150.
                    </p>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/10 font-mono text-xs">
                      <span className="text-amber-300 font-bold tracking-wider">ATELIER15</span>
                      <button
                        onClick={handleCopyCode}
                        className="text-gray-400 hover:text-white flex items-center gap-1 text-[11px]"
                      >
                        {copiedCode ? (
                          <>
                            <FaCheck className="text-emerald-400 text-xs" />
                            <span className="text-emerald-400 text-[10px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <FaCopy className="text-xs" />
                            <span className="text-[10px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Our Guarantees */}
                  <div className="bg-[#121218]/60 rounded-xl p-3 border border-white/5 space-y-2 text-[11px] text-gray-400">
                    <div className="flex items-center gap-2">
                      <FaTruck className="text-amber-400/80 shrink-0" size={12} />
                      <span>Free Delivery on orders over $100</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRulerCombined className="text-amber-400/80 shrink-0" size={12} />
                      <span>30-Day Free Returns & Exchanges</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaShieldAlt className="text-amber-400/80 shrink-0" size={12} />
                      <span>100% High-Quality Materials</span>
                    </div>
                  </div>
                </div>
              </aside>
            )}

            {/* Product Cards */}
            <main className={showSidebar ? 'lg:col-span-3' : 'lg:col-span-1'}>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-[#121218] rounded-2xl border border-white/10 p-8">
                  <p className="text-gray-400 text-sm mb-4">No clothes found matching your current filters.</p>
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2 rounded-full bg-amber-400 text-black text-xs font-semibold tracking-wider uppercase hover:bg-amber-300 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className={`grid grid-cols-2 sm:grid-cols-2 ${showSidebar ? 'md:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4'} gap-3 sm:gap-4`}>
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onView={setSelectedProduct}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-full border border-white/10 text-xs text-gray-300 disabled:opacity-40 hover:bg-white/5"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 rounded-full text-xs font-semibold transition-colors ${
                        currentPage === page
                          ? 'bg-amber-400 text-black shadow-sm'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-full border border-white/10 text-xs text-gray-300 disabled:opacity-40 hover:bg-white/5"
                  >
                    Next
                  </button>
                </div>
              )}
            </main>
          </div>
        </section>

        {/* SECTION 3: Why Choose Boss Clothe */}
        <section className="border-t border-white/10 pt-8">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
              Our Promise
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white">
              Why Choose Boss Clothe
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#121218] p-4 rounded-xl border border-white/10">
              <FaGem className="text-amber-400 text-xl mb-2" />
              <h3 className="text-sm font-bold text-white mb-1">High Quality Fabrics</h3>
              <p className="text-xs text-gray-400">Soft Ethiopian organic cotton, warm wool blends, and durable denim made to last.</p>
            </div>
            <div className="bg-[#121218] p-4 rounded-xl border border-white/10">
              <FaShieldAlt className="text-amber-400 text-xl mb-2" />
              <h3 className="text-sm font-bold text-white mb-1">30-Day Free Returns</h3>
              <p className="text-xs text-gray-400">Exchange any unworn item within 30 days or get a fast exchange at our Addis Ababa store.</p>
            </div>
            <div className="bg-[#121218] p-4 rounded-xl border border-white/10">
              <FaTruck className="text-amber-400 text-xl mb-2" />
              <h3 className="text-sm font-bold text-white mb-1">Free & Fast Delivery</h3>
              <p className="text-xs text-gray-400">Fast delivery across Ethiopia and free shipping worldwide on orders over $100.</p>
            </div>
          </div>
        </section>

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

export default Shop;
