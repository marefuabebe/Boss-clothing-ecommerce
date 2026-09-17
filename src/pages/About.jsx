import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHandsHelping, FaAward, FaQuoteLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    id: 1,
    name: 'Marefu Abebe',
    role: 'Founder & Designer',
    image: '/images/Black.jpg',
    bio: 'Created Boss Clothe to bring great fashion, high quality fabrics, and modern style to everyone.'
  },
  {
    id: 2,
    name: 'Netsanet Belete',
    role: 'Customer Care & Marketing',
    image: '/images/Urban style.avif',
    bio: 'Manages customer service, store styles, and helps you find the right fit and size.'
  },
  {
    id: 3,
    name: 'Michael Tsegaye',
    role: 'Master Tailor',
    image: '/images/designer.png',
    bio: 'Over 20 years of tailoring experience ensuring every jacket and shirt fits comfortably.'
  },
];

const values = [
  {
    icon: FaLeaf,
    title: 'Natural & Safe Materials',
    description: 'We use organic cotton and natural materials that are comfortable and good for the environment.',
  },
  {
    icon: FaHandsHelping,
    title: 'Fair & Honest Work',
    description: 'Every piece is made in Addis Ababa by skilled workers who receive fair wages and respect.',
  },
  {
    icon: FaAward,
    title: 'Attention to Detail',
    description: 'Every stitch, button, and zipper is inspected so your clothes look sharp and last for years.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header - Compact */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-1">
            Our Story
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold font-playfair text-white mb-2">
            About Boss Clothe
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Founded in Addis Ababa in 2017, Boss Clothe makes modern, stylish, and comfortable clothes with high quality materials.
          </p>
        </div>

        {/* Narrative Split Section - Compact */}
        <section className="bg-[#121218] rounded-2xl border border-white/10 p-5 sm:p-8 mb-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block mb-1">
                Our Mission
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white mb-3">
                Quality Clothes Made with Pride
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
                What began as a small clothing studio in Bole, Addis Ababa, has grown into a store loved for great fits, comfortable fabrics, and honest prices.
              </p>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
                We believe everyone deserves well-made clothes that feel comfortable and look sharp. Every item we make is designed to last and stay in style.
              </p>
              
              <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 flex items-start gap-3">
                <FaQuoteLeft className="text-amber-400/50 text-base flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/90 italic">
                  "True quality is about great materials, comfortable fits, and clothes that last."
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
              <img
                src="/images/Discover the journey of Boos Clothes.avif"
                alt="Boss Atelier Studio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Core Values - Compact Cards */}
        <section className="mb-8">
          <div className="text-center mb-5">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
              What We Believe
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div 
                  key={v.title}
                  className="bg-[#121218] p-4 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-3">
                    <Icon size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1 font-playfair">{v.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Leadership Team - Compact Cards */}
        <section className="mb-8">
          <div className="text-center mb-5">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
              Our Team
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white">
              The People Behind Boss Clothe
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="bg-[#121218] rounded-xl overflow-hidden border border-white/10 group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-black/40">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3.5">
                  <h3 className="text-sm font-bold text-white font-playfair">{member.name}</h3>
                  <p className="text-[11px] text-amber-400 font-medium mb-1.5">{member.role}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Heritage Milestones */}
        <section className="mb-8">
          <div className="text-center mb-5">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
              Our History
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white">
              The Journey of Boss Clothe
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-[#121218] rounded-xl border border-white/10 text-center">
              <span className="text-amber-400 font-bold font-playfair text-lg block">2017</span>
              <h4 className="text-xs font-semibold text-white mt-1">Started in Bole</h4>
              <p className="text-[11px] text-gray-400 mt-1">First store founded by Marefu Abebe in Addis Ababa, specializing in tailored clothes.</p>
            </div>
            <div className="p-3.5 bg-[#121218] rounded-xl border border-white/10 text-center">
              <span className="text-amber-400 font-bold font-playfair text-lg block">2020</span>
              <h4 className="text-xs font-semibold text-white mt-1">More Styles Added</h4>
              <p className="text-[11px] text-gray-400 mt-1">Added dresses, denim jeans, and leather bags to our store collection.</p>
            </div>
            <div className="p-3.5 bg-[#121218] rounded-xl border border-white/10 text-center">
              <span className="text-amber-400 font-bold font-playfair text-lg block">2023</span>
              <h4 className="text-xs font-semibold text-white mt-1">Local Natural Cotton</h4>
              <p className="text-[11px] text-gray-400 mt-1">Began using 100% natural Ethiopian cotton and eco-friendly dyes.</p>
            </div>
            <div className="p-3.5 bg-[#121218] rounded-xl border border-white/10 text-center">
              <span className="text-amber-400 font-bold font-playfair text-lg block">2026</span>
              <h4 className="text-xs font-semibold text-white mt-1">Online Store</h4>
              <p className="text-[11px] text-gray-400 mt-1">Launched our modern online shop with fast delivery across Ethiopia and worldwide.</p>
            </div>
          </div>
        </section>

        {/* SECTION 5: CTA Banner */}
        <section className="p-6 bg-gradient-to-r from-amber-400/15 via-amber-400/5 to-transparent rounded-2xl border border-amber-400/30 text-center">
          <h3 className="text-lg sm:text-xl font-bold font-playfair text-white mb-2">
            Try Boss Clothe Today
          </h3>
          <p className="text-xs text-gray-300 mb-4 max-w-md mx-auto">
            Discover our collection of comfortable jackets, shirts, jeans, and dresses.
          </p>
          <Link
            to="/shop"
            className="inline-block px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs tracking-wider uppercase transition-colors shadow-md"
          >
            Shop All Clothes
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;