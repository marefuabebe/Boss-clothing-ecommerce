import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebook, FaWhatsapp, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#08080C] text-gray-300 border-t border-white/10 pt-8 pb-14 lg:pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Column 1: Brand (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-playfair font-black text-2xl tracking-wide text-white">
                Boss Clothe
              </span>
            </Link>
            
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Modern clothing and fashion store based in Addis Ababa, Ethiopia. High quality clothes, great style, and fast delivery.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://wa.me/251938543853"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-amber-400 hover:text-black border border-white/10 flex items-center justify-center transition-colors text-xs"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-amber-400 hover:text-black border border-white/10 flex items-center justify-center transition-colors text-xs"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-amber-400 hover:text-black border border-white/10 flex items-center justify-center transition-colors text-xs"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-amber-400 hover:text-black border border-white/10 flex items-center justify-center transition-colors text-xs"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
            </div>
          </div>

          {/* Column 2: Shop Clothes */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-amber-400 font-semibold mb-3">
              Shop Clothes
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/shop?category=tops" className="hover:text-amber-300 transition-colors">Tops & Shirts</Link></li>
              <li><Link to="/shop?category=bottoms" className="hover:text-amber-300 transition-colors">Pants & Jeans</Link></li>
              <li><Link to="/shop?category=dresses" className="hover:text-amber-300 transition-colors">Dresses</Link></li>
              <li><Link to="/shop?category=shoes" className="hover:text-amber-300 transition-colors">Shoes & Sneakers</Link></li>
              <li><Link to="/shop?category=accessories" className="hover:text-amber-300 transition-colors">Bags & Accessories</Link></li>
            </ul>
          </div>

          {/* Column 3: Help & Information */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-amber-400 font-semibold mb-3">
              Help & Information
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/gallery" className="hover:text-amber-300 transition-colors">Photo Gallery</Link></li>
              <li><Link to="/about" className="hover:text-amber-300 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-amber-300 transition-colors">Contact Us</Link></li>
              <li><Link to="/cart" className="hover:text-amber-300 transition-colors">Free Delivery Info</Link></li>
              <li><Link to="/contact" className="hover:text-amber-300 transition-colors">30-Day Returns</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-amber-400 font-semibold mb-3">
              Newsletter
            </h4>
            <p className="text-gray-400 text-[11px] mb-2.5">
              Get updates on new clothes, discounts, and sales.
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to our newsletter!");
              }}
              className="flex items-center"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-3 py-2 bg-black/50 border border-white/10 rounded-l-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-r-lg transition-colors flex items-center justify-center"
                aria-label="Subscribe"
              >
                <FaArrowRight className="text-xs" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-[11px] gap-2">
          <p>&copy; {new Date().getFullYear()} Boss Clothe. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <span>Telebirr</span>
            <span>•</span>
            <span>CBE Birr</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
