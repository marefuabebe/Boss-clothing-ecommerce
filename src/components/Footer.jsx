import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaPinterest, href: '#', label: 'Pinterest' },
  ];

  return (
    <footer className="bg-gray-800 text-white py-8 sm:py-12 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h5 className="text-lg sm:text-xl font-bold mb-4">Boss Clothes</h5>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Your one-stop shop for the latest fashion trends and premium quality clothing.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="text-xl sm:text-2xl" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h5 className="text-lg sm:text-xl font-bold mb-4">Quick Links</h5>
            <div className="space-y-2">
              {['/', '/shop', '/gallery', '/about', '/contact'].map((path, index) => {
                const labels = { '/': 'Home', '/shop': 'Shop', '/gallery': 'Gallery', '/about': 'About', '/contact': 'Contact' };
                return (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={path}
                      className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      {labels[path]}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h5 className="text-lg sm:text-xl font-bold mb-4">Customer Service</h5>
            <div className="space-y-2">
              {['FAQs', 'Shipping Policy', 'Returns & Exchanges', 'Contact Support'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h5 className="text-lg sm:text-xl font-bold mb-4">Newsletter</h5>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Subscribe to get special offers, free giveaways, and new arrivals
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 sm:px-4 py-2 rounded-l-lg text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-r-lg transition-colors"
                aria-label="Subscribe"
              >
                <FaPinterest />
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base"
        >
          <p>&copy; 2025 Boss Clothes. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

