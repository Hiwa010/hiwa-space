import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  Phone, 
  Linkedin, 
  Instagram, 
  Clock, 
  ExternalLink,
  ArrowUpRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { ThemePreset } from '../types';

interface ContactSectionProps {
  activeTheme: ThemePreset;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ activeTheme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Logo & Branding',
    budget: '$500 - $1,500',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    // Simulate seamless local submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          service: 'Logo & Branding',
          budget: '$500 - $1,500',
          message: '',
        });
      }, 1000);
    }, 600);
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      handle: '+964 751 543 0407',
      url: 'https://wa.me/9647515430407',
      icon: MessageSquare,
      color: '#25D366',
      badge: 'Fastest Response',
      desc: 'Instant messaging for quick quotes & timeline inquiries',
    },
    {
      name: 'Instagram',
      handle: '@hiwaspace',
      url: 'https://www.instagram.com/hiwaspace?igsi=MXFnNTdlZ3U3bncyeQ%3D%3D&utm_source=qr',
      icon: Instagram,
      color: '#E4405F',
      badge: 'Portfolio & Reels',
      desc: 'Behind-the-scenes, daily reels, poster drops & WIP',
    },
    {
      name: 'LinkedIn',
      handle: 'Hiwa Jumaa',
      url: 'https://www.linkedin.com/in/hiwa-jumaa-2ab989415?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      icon: Linkedin,
      color: '#0A66C2',
      badge: 'Professional Network',
      desc: 'Contract engagements, client reviews & industry network',
    },
  ];

  const serviceOptions = [
    'Video Editing & Reels',
    'Posters & Album Covers',
    'Motion Graphics & 3D',
    'Movie Edits & Cinematics',
    'Anime Edits & AMV Flow',
    'Fun & Casual Edits',
    'Logo & Branding',
    'Social Media Management',
    'Comprehensive Full Package',
  ];

  const budgetOptions = [
    'Under $500',
    '$500 - $1,500',
    '$1,500 - $3,000',
    '$3,000+',
  ];

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 bg-[#06070a] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Background Ambience */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 h-[550px] w-[550px] rounded-full blur-[180px] opacity-15"
        style={{ backgroundColor: activeTheme.accentColor }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 h-[500px] w-[500px] rounded-full blur-[180px] opacity-10"
        style={{ backgroundColor: activeTheme.accentColor }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase"
            style={{ color: activeTheme.accentColor }}
          >
            START A COLLABORATION
          </span>
          <span className="h-[1px] w-12 bg-zinc-800" />
        </div>

        {/* Section Heading */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Let's Create Something Remarkable
            </h2>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-zinc-300">
              Have a project in mind, need a brand overhaul, or want commercial video edits that convert? Send a message through the form or connect directly via social channels.
            </p>
          </div>

          {/* Availability Status Badge */}
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0e0f17] px-4 py-2 text-xs font-mono shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-zinc-200 font-semibold">Available for new projects</span>
          </div>
        </div>

        {/* Two-Column Layout: Form (Left 7 Cols) + Direct Channels (Right 5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Clean Contact Form */}
          <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0c0d15] p-6 sm:p-10 shadow-2xl">
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <h3 className="font-heading text-xl font-bold text-white">
                  Send Project Inquiry
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Fill out the details below and I'll get back to you within 24 hours.
                </p>
              </div>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl font-black text-black shadow-md"
                style={{ backgroundColor: activeTheme.accentColor }}
              >
                <Mail className="h-5 w-5" />
              </div>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center space-y-4"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="font-heading text-xl font-bold text-white">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out! I've received your project inquiry and will review the details and respond via email within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition-all"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-zinc-300">
                      Your Name <span style={{ color: activeTheme.accentColor }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-zinc-300">
                      Email Address <span style={{ color: activeTheme.accentColor }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-zinc-300">
                    Primary Service Needed
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/80 px-4 py-3 text-xs text-white focus:border-white/30 focus:outline-none transition-all cursor-pointer"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0e0f17] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Range Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-zinc-300">
                    Estimated Budget Range (USD)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((b) => {
                      const isSelected = formData.budget === b;
                      return (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`rounded-xl px-3 py-2 text-[11px] font-mono transition-all text-center ${
                            isSelected
                              ? 'border border-orange-500 bg-orange-500/15 text-white font-bold'
                              : 'border border-white/10 bg-black/40 text-zinc-400 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-zinc-300">
                    Project Details & Goals <span style={{ color: activeTheme.accentColor }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your brand, project timeline, deliverable formats, and key objectives..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all resize-none"
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold text-black shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  style={{
                    backgroundColor: activeTheme.accentColor,
                    boxShadow: `0 0 25px -4px ${activeTheme.accentColor}60`,
                  }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      <span>Transmitting Inquiry...</span>
                    </div>
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-400 pt-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Confidential inquiry • No spam • 24h response guarantee</span>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Header Card */}
            <div className="rounded-3xl border border-white/10 bg-[#0c0d15] p-6 sm:p-8 space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                DIRECT CONNECT
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                Connect Directly on Social Media & WhatsApp
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Prefer immediate messaging or want to check out active reels and design stories? Reach out directly through any of these official channels:
              </p>
            </div>

            {/* Social Media Link Cards (WhatsApp, Instagram, LinkedIn) */}
            <div className="space-y-3.5">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex items-center justify-between rounded-2xl border border-white/10 bg-[#0e0f17] p-5 transition-all duration-300 hover:border-white/25 hover:bg-[#131422] hover:-translate-y-0.5 shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-black/60 shadow-inner group-hover:scale-110 transition-transform"
                        style={{ color: link.color }}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading text-sm font-bold text-white group-hover:text-white">
                            {link.name}
                          </h4>
                          <span
                            className="rounded-full px-2 py-0.5 text-[9px] font-mono font-semibold"
                            style={{
                              backgroundColor: `${link.color}20`,
                              color: link.color,
                            }}
                          >
                            {link.badge}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-zinc-300 mt-0.5">
                          {link.handle}
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-1">
                          {link.desc}
                        </p>
                      </div>
                    </div>

                    <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 group-hover:bg-white/15 group-hover:text-white transition-colors shrink-0">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Response Time Guarantee Box */}
            <div className="rounded-2xl border border-white/10 bg-[#0c0d15] p-5 flex items-center gap-3.5">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/50"
                style={{ color: activeTheme.accentColor }}
              >
                <Clock className="h-5 w-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Rapid Response Time</span>
                <span className="text-zinc-400 text-[11px]">
                  Average response time via WhatsApp or Email is under 2 hours during business hours.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
