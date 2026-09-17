import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExpand, FaHeart, FaShoppingBag, FaInstagram, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const lookbookImages = [
  { id: 1, src: "/images/Premium Navy Blazer11.avif", title: "Tailored Navy Blazer", category: "mens", tag: "Atelier Tailoring" },
  { id: 2, src: "/images/Black Evening Dress22.avif", title: "Midnight Silk Gown", category: "womens", tag: "Haute Couture" },
  { id: 3, src: "/images/Traditional with a modern twist.avif", title: "Ethio-Fusion Ensemble", category: "womens", tag: "Heritage Edit" },
  { id: 4, src: "/images/Men's Light Wash Slim-Fit Denim Jeans.avif", title: "Artisanal Denim", category: "mens", tag: "Street Luxury" },
  { id: 5, src: "/images/Summer Collection.avif", title: "Linen Summer Silhouette", category: "mens", tag: "Resort 2026" },
  { id: 6, src: "/images/Minimalist Designs.avif", title: "Architectural Shift Dress", category: "womens", tag: "Minimalism" },
  { id: 7, src: "/images/Urban style.avif", title: "Addis Urban Aesthetic", category: "streetwear", tag: "Metropolitan" },
  { id: 8, src: "/images/Designer Leather Bag.avif", title: "Hand-Crafted Leather Bag", category: "accessories", tag: "Leatherwork" },
  { id: 9, src: "/images/Air Jordan 4 Retro OG – Iconic Style Reimagined.avif", title: "Air Jordan Atelier Custom", category: "accessories", tag: "Footwear" },
  { id: 10, src: "/images/Wool Blend Sweater.jpg", title: "Virgin Wool Knit", category: "mens", tag: "Knitwear" },
  { id: 11, src: "/images/Casual Summer Dress.avif", title: "Floral Silk Wrap", category: "womens", tag: "Couture" },
  { id: 12, src: "/images/Belt.avif", title: "Monogram Gilded Belt", category: "accessories", tag: "Hardware" },
];

const communityImages = [
  { img: "/images/beti.jpg", user: "@samrawit_style", look: "Bespoke Silk Gown" },
  { img: "/images/mare.jpg", user: "@dawit_atelier", look: "Addis Street Denim" },
  { img: "/images/netsi.jpg", user: "@helen_ethiopia", look: "Virgin Wool Knit" },
  { img: "/images/beti22.jpg", user: "@kalkidan_fashion", look: "Traditional Fusion" },
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedIds, setLikedIds] = useState([]);

  const filteredImages = activeFilter === 'all'
    ? lookbookImages
    : lookbookImages.filter((img) => img.category === activeFilter);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* SECTION 1: Featured Editorial Campaign Banner */}
        <section className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#121218] p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-1">
                Our Style Gallery
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-playfair text-white mb-3">
                Boss Clothe Photo Gallery 2026
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                Take a look at our latest clothes and style photos from our studio in Addis Ababa. Modern fashion made with high quality fabrics.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#gallery-grid"
                  className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs tracking-wider uppercase transition-colors shadow-md"
                >
                  Browse Photos
                </a>
                <Link
                  to="/shop"
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs tracking-wider uppercase transition-colors"
                >
                  Shop Clothes
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <img src="/images/homepage.jpg" alt="Campaign 1" className="rounded-xl object-cover h-36 sm:h-44 w-full border border-white/10" />
              <img src="/images/store221.avif" alt="Campaign 2" className="rounded-xl object-cover h-36 sm:h-44 w-full border border-white/10" />
            </div>
          </div>
        </section>

        {/* SECTION 2: Lookbook Gallery with Category Filters */}
        <section id="gallery-grid">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
                Our Styles
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white">
                Photo Lookbook
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'mens', label: "Men's" },
                { id: 'womens', label: "Women's" },
                { id: 'streetwear', label: 'Streetwear' },
                { id: 'accessories', label: 'Accessories' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                    activeFilter === tab.id
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredImages.map((image) => {
              const isLiked = likedIds.includes(image.id);
              return (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#121218] border border-white/10 hover:border-amber-400/40 cursor-pointer shadow-lg"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-40 group-hover:opacity-80 transition-opacity" />

                  {/* Top Badge & Heart */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                    <span className="px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider bg-black/60 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                      {image.tag}
                    </span>
                    <button
                      onClick={(e) => toggleLike(image.id, e)}
                      className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/10"
                      aria-label="Favorite"
                    >
                      <FaHeart className={`text-xs ${isLiked ? 'text-amber-400' : 'text-gray-300'}`} />
                    </button>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-300 transition-colors font-playfair truncate">
                      {image.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-gray-400">
                      <span>Inspect Piece</span>
                      <FaExpand className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: Community Style & Instagram Feed */}
        <section className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
                #BossClotheStyle
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white">
                Customer Photos & Outfits
              </h2>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200"
            >
              <FaInstagram size={14} />
              <span>Follow @bossclothe</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {communityImages.map((comm, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                <img src={comm.img} alt={comm.look} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                  <span className="text-[11px] font-bold text-white truncate">{comm.user}</span>
                  <span className="text-[10px] text-amber-300">{comm.look}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-[#121218] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 flex items-center justify-center"
              >
                <FaTimes size={12} />
              </button>

              <div className="aspect-[3/4] max-h-[70vh] bg-black">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 bg-[#121218] flex items-center justify-between border-t border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block">
                    {selectedImage.tag}
                  </span>
                  <h3 className="text-base font-bold font-playfair text-white">
                    {selectedImage.title}
                  </h3>
                </div>
                <Link
                  to="/shop"
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5"
                >
                  <FaShoppingBag size={11} />
                  <span>View in Shop</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;