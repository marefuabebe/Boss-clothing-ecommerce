import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHandsHelping, FaStar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const teamMembers = [
  {
    id: 1,
    name: 'Marefu-Abebe',
    role: 'Founder & CEO',
    image: '/images/Black.jpg',
  },
  {
    id: 2,
    name: 'Netsanet-Belete',
    role: 'Marketing Director',
    image: '/images/Urban style.avif',
  },
  {
    id: 3,
    name: 'Michael-Tsegaye',
    role: 'Head Designer',
    image: '/images/designer.png',
  },
];

const values = [
  {
    icon: FaLeaf,
    title: 'Sustainability',
    description: 'We use eco-friendly materials and processes to minimize our environmental impact. Our packaging is 100% recyclable.',
    color: 'text-green-500',
  },
  {
    icon: FaHandsHelping,
    title: 'Ethical Production',
    description: 'All our garments are produced in fair-wage, safe working conditions. We support local Ethiopian artisans and communities.',
    color: 'text-blue-500',
  },
  {
    icon: FaStar,
    title: 'Quality Craftsmanship',
    description: 'We take pride in the quality of our products. Each piece is carefully designed and crafted to ensure longevity and style.',
    color: 'text-yellow-500',
  },
];

const About = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Try to play the video automatically
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.log("Autoplay prevented, video will play when user interacts");
          // Add a play button overlay if autoplay fails
        }
      };
      playVideo();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-3"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Discover the journey of Boss Clothe
          </motion.p>
        </div>

        {/* Who We Are */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Who We Are</h2>
            <p className="text-gray-300 mb-3 leading-relaxed text-sm md:text-base">
              Boss Clothes was founded in 2017 with a simple mission: to provide high-quality, fashionable clothing at affordable prices. Our founder, Marefu Abebe, started with a small boutique in Addis Ababa and has since grown into a beloved national brand.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              We believe that everyone deserves to look and feel their best without breaking the bank. Our collections are carefully curated to reflect the latest trends while maintaining timeless elegance and comfort.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src="/images/Discover the journey of Boos Clothes.avif"
              alt="Our Store"
              className="w-full h-64 md:h-80 object-cover"
            />
          </motion.div>
        </div>

        {/* Video Section - Fixed */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Our Vision in Motion</h2>
            <p className="text-gray-400 text-sm">See how we bring style to life</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-xl overflow-hidden shadow-2xl bg-black"
          >
            <div className="relative aspect-video">
              {/* 
                VIDEO PATH: Make sure your video is at: public/videos/0807/0807.mp4
                The correct path in public folder should be: /videos/0807/0807.mp4
              */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls
                poster="/images/video-poster.jpg" // Optional: Add a poster image
              >
                <source 
                  src="/videos/0807/0807.mp4" 
                  type="video/mp4" 
                />
                <source 
                  src="/videos/0807/0807.webm" 
                  type="video/webm" 
                />
                Your browser does not support the video tag.
              </video>
              
              {/* Fallback if video doesn't load */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 hidden" id="video-fallback">
                <p className="text-white text-center p-4">
                  Video cannot be loaded. Please check the file path or format.
                  <br />
                  <small className="text-gray-400">
                    Expected path: /videos/0807/0807.mp4
                  </small>
                </p>
              </div>
            </div>
            
            {/* Video caption */}
            <div className="bg-gray-800 p-4">
              <p className="text-gray-300 text-center text-sm">
                Behind the scenes at Boss Clothes - Crafting quality fashion since 2017
              </p>
            </div>
          </motion.div>

          {/* Video Loading Error Message */}
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-xs">
              Note: The video plays automatically without sound. Click the video controls to adjust volume.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              If video doesn't play, check the file exists at: <code className="bg-gray-800 px-2 py-1 rounded">public/videos/0807/0807.mp4</code>
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1 rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src="/images/store221.avif"
              alt="Our Mission"
              className="w-full h-64 md:h-80 object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-1 md:order-2 flex flex-col justify-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-3 leading-relaxed text-sm md:text-base">
              At Boss Clothes, we're committed to sustainable fashion practices and ethical manufacturing. We work directly with Ethiopian artisans to create unique pieces that celebrate our cultural heritage while embracing modern design.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Our goal is to empower customers to express their personal style while making a positive impact on our community and the environment.
            </p>
          </motion.div>
        </div>

        {/* Our Values */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white mb-2"
          >
            Our Values
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-sm"
          >
            The principles that guide everything we do
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow border border-gray-700"
            >
              <value.icon className={`text-5xl ${value.color} mx-auto mb-4`} />
              <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Meet Our Team */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white mb-2"
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-sm"
          >
            The passionate people behind Boss Clothes
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-700"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-gray-700"
              />
              <h4 className="text-xl font-bold mb-2 text-white">{member.name}</h4>
              <p className="text-gray-400 mb-4 text-sm">{member.role}</p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16 pt-8 border-t border-gray-800"
        >
          <h3 className="text-xl font-bold text-white mb-3">Join Our Journey</h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm mb-4">
            From a small boutique in Addis Ababa to a national fashion destination, we continue to grow while staying true to our roots.
          </p>
          <p className="text-gray-500 text-xs">
            Boss Clothes © 2017 - {new Date().getFullYear()}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;