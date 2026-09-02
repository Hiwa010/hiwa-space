import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Instagram, 
  Linkedin, 
  ShieldCheck, 
  Send,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { ThemePreset } from '../types';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityName: string;
  activeTheme: ThemePreset;
}

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  communityName,
  activeTheme,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Logo & Branding');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  const quickLinks = [
    {
      name: 'WhatsApp',
      url: 'https://wa.me/9647515430407',
      label: '+964 751 543 0407',
      icon: MessageSquare,
      color: '#25D366',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/hiwaspace?igsi=MXFnNTdlZ3U3bncyeQ%3D%3D&utm_source=qr',
      label: '@hiwaspace',
      icon: Instagram,
      color: '#E4405F',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/hiwa-jumaa-2ab989415?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      label: 'Hiwa Jumaa',
      icon: Linkedin,
      color: '#0A66C2',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-[#0e0f17] p-6 sm:p-8 text-white shadow-2xl my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {!isSubmitted ? (
            <div>
              {/* Modal Header */}
              <div className="mb-6 space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-mono">
                  <span
                    className="h-2 w-2 rounded-full animate-pulse"
                    style={{ backgroundColor: activeTheme.accentColor }}
                  />
                  <span className="text-zinc-300">DIRECT INQUIRY & CONSULTATION</span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                  Contact {communityName}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Start your creative project, request a custom quote for video edits, branding, or social media management.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-zinc-400">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-white/30 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-zinc-400">Email Address:</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-white/30 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-zinc-400">Service Category:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Logo & Branding',
                      'Video Editing',
                      'Motion Graphics',
                      'Social Media',
                    ].map((svc) => (
                      <button
                        type="button"
                        key={svc}
                        onClick={() => setService(svc)}
                        className={`rounded-xl border py-2 px-2 text-xs font-medium transition-all text-center ${
                          service === svc
                            ? 'border-white/30 bg-white/15 text-white font-bold'
                            : 'border-white/10 bg-black/40 text-zinc-400 hover:text-white'
                        }`}
                        style={service === svc ? { borderColor: activeTheme.accentColor, color: activeTheme.accentColor } : {}}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-zinc-400">Project Overview (Optional):</label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe your requirements or timeline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-white/30 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold text-black shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    style={{
                      backgroundColor: activeTheme.accentColor,
                      boxShadow: `0 0 25px -4px ${activeTheme.accentColor}60`,
                    }}
                  >
                    {isSubmitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Direct Quick Chat Links */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-2 text-center">
                  Or message instantly on social channels:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {quickLinks.map((ql) => {
                    const Icon = ql.icon;
                    return (
                      <a
                        key={ql.name}
                        href={ql.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-white/10 bg-black/40 hover:bg-white/5 hover:border-white/20 transition-all text-center group"
                      >
                        <Icon className="h-4 w-4 mb-1" style={{ color: ql.color }} />
                        <span className="text-[11px] font-bold text-white group-hover:text-white">
                          {ql.name}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-400 truncate max-w-full">
                          {ql.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-5 py-4">
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${activeTheme.accentColor}20` }}
              >
                <CheckCircle2 className="h-8 w-8" style={{ color: activeTheme.accentColor }} />
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-white mb-1">
                  Inquiry Received!
                </h3>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                  Thank you, <span className="font-bold text-white">{name}</span>. We will review your request regarding <span className="font-bold text-white">{service}</span> and reach back to <span className="font-bold text-white">{email}</span> within 24 hours.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/60 p-4 text-left space-y-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                  Need faster response?
                </span>
                <p className="text-xs text-zinc-300">
                  Feel free to message directly on WhatsApp:
                </p>
                <a
                  href="https://wa.me/9647515430407"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-mono text-emerald-300 hover:bg-emerald-500/20 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-emerald-400" />
                    <span>WhatsApp: +964 751 543 0407</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <button
                onClick={handleReset}
                className="w-full rounded-xl py-3 text-xs font-bold text-black shadow-lg"
                style={{ backgroundColor: activeTheme.accentColor }}
              >
                Return to Website
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
