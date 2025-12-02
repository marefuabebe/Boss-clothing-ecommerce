import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaPinterest, 
  FaLinkedin,
  FaPaperPlane,
  FaCheckCircle,
  FaHeadset,
  FaComments,
  FaWhatsapp
} from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const contactMethods = [
    {
      icon: <HiOutlinePhone className="text-2xl" />,
      title: "Call Us",
      details: "+251 938543853",
      subtext: "Mon-Fri from 9am to 6pm",
      color: "from-blue-500 to-cyan-400",
      delay: 0.1,
      action: "tel:+251938543853"
    },
    {
      icon: <HiOutlineMail className="text-2xl" />,
      title: "Email Us",
      details: "info@bossclothes.com",
      subtext: "We reply within 24 hours",
      color: "from-purple-500 to-pink-500",
      delay: 0.2,
      action: "mailto:info@bossclothes.com"
    },
    {
      icon: <HiOutlineLocationMarker className="text-2xl" />,
      title: "Visit Us",
      details: "Bole Subcity, Addis Ababa",
      subtext: "Get directions",
      color: "from-emerald-500 to-teal-400",
      delay: 0.3,
      action: "https://maps.google.com"
    },
    {
      icon: <HiOutlineClock className="text-2xl" />,
      title: "Working Hours",
      details: "Mon-Fri: 9am-6pm",
      subtext: "Sat: 10am-4pm, Sun: Closed",
      color: "from-orange-500 to-yellow-400",
      delay: 0.4,
      action: null
    },
  ];

  const socialLinks = [
    { icon: <FaWhatsapp />, label: "WhatsApp", color: "hover:bg-green-500", delay: 0.1 },
    { icon: <FaFacebook />, label: "Facebook", color: "hover:bg-blue-600", delay: 0.2 },
    { icon: <FaInstagram />, label: "Instagram", color: "hover:bg-pink-600", delay: 0.3 },
    { icon: <FaTwitter />, label: "Twitter", color: "hover:bg-sky-500", delay: 0.4 },
    { icon: <FaLinkedin />, label: "LinkedIn", color: "hover:bg-blue-700", delay: 0.5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 sm:py-12">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-60 h-60 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mx-auto shadow-2xl">
              <FaHeadset className="text-white text-3xl" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have questions about our collections? We're here to help! Reach out through any channel below.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.action}
              target={method.action?.startsWith('http') ? "_blank" : undefined}
              rel={method.action?.startsWith('http') ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: method.delay }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`block bg-gradient-to-br ${method.color} rounded-2xl p-6 shadow-xl transform transition-all duration-300 hover:shadow-2xl border border-white/10 backdrop-blur-sm`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                  <div className="text-white">
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-white font-semibold mb-1">{method.details}</p>
                <p className="text-white/80 text-sm">{method.subtext}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info & Social */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm shadow-2xl"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mr-4">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Visit Our Store</h3>
                  <p className="text-gray-400">Experience fashion in person</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-blue-400 text-xl mt-1 mr-4">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1 text-white">Store Location</h5>
                    <p className="text-gray-300">Bole Subcity, Addis Ababa, Ethiopia</p>
                    <p className="text-gray-400 text-sm mt-1">Near Bole International Airport</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-green-400 text-xl mt-1 mr-4">
                    <FaPhone />
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1 text-white">Store Phone</h5>
                    <p className="text-gray-300">+251 938543853</p>
                    <p className="text-gray-400 text-sm mt-1">Direct line to our boutique</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-purple-400 text-xl mt-1 mr-4">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1 text-white">Store Email</h5>
                    <p className="text-gray-300">store@bossclothes.com</p>
                    <p className="text-gray-400 text-sm mt-1">For in-store inquiries</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Media Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm shadow-2xl"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
                  <FaComments className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Connect With Us</h3>
                  <p className="text-gray-400">Follow for updates & style tips</p>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: social.delay }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`w-12 h-12 rounded-xl bg-gray-700/50 flex items-center justify-center text-white text-xl transition-all duration-300 ${social.color} backdrop-blur-sm border border-gray-600/50`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700/50">
                <p className="text-gray-400 text-sm text-center">
                  DM us for quick responses to your questions!
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form & Map */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm shadow-2xl h-full"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 flex items-center justify-center mr-4">
                  <FaPaperPlane className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Send a Message</h3>
                  <p className="text-gray-400">We typically respond within a few hours</p>
                </div>
              </div>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-8 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 backdrop-blur-sm"
                  >
                    <div className="flex items-center">
                      <FaCheckCircle className="text-emerald-400 text-2xl mr-3" />
                      <div>
                        <h4 className="font-semibold text-white">Message Sent Successfully!</h4>
                        <p className="text-emerald-300 text-sm">We'll get back to you soon.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['name', 'email'].map((field, index) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <label htmlFor={field} className="block text-sm font-semibold mb-3 text-gray-300">
                        {field === 'name' ? 'Your Name' : 'Email Address'}
                      </label>
                      <div 
                        className={`relative transition-all duration-300 ${activeField === field ? 'ring-2 ring-blue-500/50' : ''}`}
                        onFocus={() => setActiveField(field)}
                        onBlur={() => setActiveField(null)}
                      >
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          id={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 bg-gray-900/50 border border-gray-600/50 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder={field === 'name' ? 'John Doe' : 'john@example.com'}
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 transition-transform duration-300 origin-left" 
                             style={{ transform: activeField === field ? 'scaleX(1)' : 'scaleX(0)' }} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label htmlFor="subject" className="block text-sm font-semibold mb-3 text-gray-300">
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-900/50 border border-gray-600/50 rounded-xl focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition-all duration-300 backdrop-blur-sm"
                      placeholder="How can we help you?"
                      onFocus={() => setActiveField('subject')}
                      onBlur={() => setActiveField(null)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 transition-transform duration-300 origin-left" 
                         style={{ transform: activeField === 'subject' ? 'scaleX(1)' : 'scaleX(0)' }} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label htmlFor="message" className="block text-sm font-semibold mb-3 text-gray-300">
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-900/50 border border-gray-600/50 rounded-xl focus:outline-none focus:border-emerald-500 text-white placeholder-gray-500 transition-all duration-300 resize-none backdrop-blur-sm"
                      placeholder="Tell us about your inquiry..."
                      onFocus={() => setActiveField('message')}
                      onBlur={() => setActiveField(null)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 transition-transform duration-300 origin-left" 
                         style={{ transform: activeField === 'message' ? 'scaleX(1)' : 'scaleX(0)' }} />
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group"
                >
                  <span className="mr-3">Send Message</span>
                  <FaPaperPlane className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </form>

              {/* Interactive Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10"
              >
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 flex items-center justify-center mr-3">
                    <FaMapMarkerAlt className="text-white text-sm" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Find Our Location</h4>
                </div>
                
                <div className="rounded-xl overflow-hidden border-2 border-gray-700/50 shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.775384294247!2d38.76365031478195!3d9.00872739355264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1656512345678!5m2!1sen!2set"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Boss Clothes Location"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 p-4 border-t border-gray-700/50 backdrop-blur-sm">
                    <p className="text-gray-300 text-sm text-center">
                      <span className="text-white font-semibold">📍 Bole Subcity</span> · Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center justify-center space-x-6 text-gray-400">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
              <span className="text-sm">Typically replies in 2-4 hours</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm">24/7 online support available</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm">Secure & encrypted communication</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;