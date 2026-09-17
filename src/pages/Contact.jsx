import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaPaperPlane, 
  FaCheckCircle, 
  FaWhatsapp,
  FaChevronDown
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const contactPillars = [
    {
      icon: FaPhone,
      title: "Call Us",
      detail: "+251 938 543 853",
      subtext: "Mon-Sat 9am – 7pm EAT",
      action: "tel:+251938543853"
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      detail: "info@bossclothes.com",
      subtext: "We reply within 12 hours",
      action: "mailto:info@bossclothes.com"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Our Store",
      detail: "Bole Subcity, Addis Ababa",
      subtext: "Cameroon St., Addis Ababa",
      action: "https://maps.google.com"
    },
    {
      icon: FaClock,
      title: "Opening Hours",
      detail: "Mon - Sat: 9am - 7pm",
      subtext: "Sun: By appointment only",
      action: null
    },
  ];

  const faqs = [
    {
      q: "How do I try clothes in Addis Ababa?",
      a: "You can message us directly on WhatsApp or send a message below. We will welcome you to our Bole store."
    },
    {
      q: "What payment methods are supported in Ethiopia?",
      a: "We accept Telebirr, Commercial Bank of Ethiopia (CBE Birr), and all major international credit/debit cards (Visa, MasterCard)."
    },
    {
      q: "How fast is delivery?",
      a: "Orders inside Addis Ababa arrive within 1 to 2 days. Orders across Ethiopia take 2 to 4 days, and international orders take 5 to 7 days."
    },
    {
      q: "Can clothes be altered or adjusted?",
      a: "Yes! Our tailors can adjust length, sleeves, or waist size at our Bole store upon request."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-1">
            Customer Support
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-playfair text-white mb-2">
            Contact Boss Clothe
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Have questions about clothes, sizes, or orders? We are here to help you.
          </p>
        </div>

        {/* SECTION 1: Contact Channels */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {contactPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className="p-3.5 rounded-xl bg-[#121218] border border-white/10 hover:border-amber-400/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center mb-2">
                    <Icon size={14} />
                  </div>
                  <h3 className="text-xs font-semibold text-white mb-0.5">{pillar.title}</h3>
                  <p className="text-xs font-bold text-amber-300 truncate">{pillar.detail}</p>
                </div>
                <p className="text-[10px] text-gray-400 mt-2">{pillar.subtext}</p>
              </div>
            );
          })}
        </section>

        {/* SECTION 2: Message Form & Boutique Visit */}
        <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Form */}
          <div className="md:col-span-3 bg-[#121218] rounded-2xl border border-white/10 p-5 sm:p-6 shadow-xl">
            <h2 className="text-lg font-bold font-playfair text-white mb-1">
              Send a Message
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              We answer all messages within 12 hours.
            </p>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2 text-xs"
                >
                  <FaCheckCircle className="text-sm flex-shrink-0" />
                  <span>Thank you! We received your message and will reply soon.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Marefu Abebe"
                    className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="client@domain.com"
                    className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400/60 cursor-pointer"
                >
                  <option value="">Choose a topic...</option>
                  <option value="fitting">Visit store to try clothes</option>
                  <option value="order">Help with order or size</option>
                  <option value="wholesale">Wholesale or bulk orders</option>
                  <option value="general">General questions</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your question or request here..."
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/60"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
              >
                <FaPaperPlane className="text-[10px]" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Boutique Visit Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-[#121218] rounded-2xl border border-white/10 p-4 sm:p-5">
              <h3 className="text-sm font-bold font-playfair text-white mb-2">
                Visit Our Addis Ababa Store
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                Come visit our store in Addis Ababa to try on clothes, check your size, and get friendly styling advice.
              </p>
              
              <div className="space-y-2 text-xs border-t border-white/10 pt-3">
                <p className="text-gray-400">
                  <span className="text-white font-medium">Address:</span> Bole Subcity, Cameroon Street, Addis Ababa
                </p>
                <p className="text-gray-400">
                  <span className="text-white font-medium">Direct Line:</span> +251 938 543 853
                </p>
              </div>

              <a
                href="https://wa.me/251938543853"
                target="_blank"
                rel="noreferrer"
                className="mt-4 w-full py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <FaWhatsapp />
                <span>Chat via WhatsApp</span>
              </a>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 relative">
              <img
                src="/images/store.avif"
                alt="Boss Boutique Storefront"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] text-amber-300 font-medium">Boss Clothe Store in Addis Ababa</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Frequently Asked Questions Accordion */}
        <section className="bg-[#121218] rounded-2xl border border-white/10 p-5 sm:p-7">
          <div className="text-center max-w-lg mx-auto mb-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-0.5">
              Help Center
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-playfair text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2.5 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl overflow-hidden bg-black/20"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <FaChevronDown
                    className={`text-[10px] text-amber-400 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-3.5 pb-3.5 text-xs text-gray-300 border-t border-white/5 pt-2 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;