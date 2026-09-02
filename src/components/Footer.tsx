import React, { useState } from 'react';
import { 
  Instagram, 
  Linkedin,
  MessageSquare,
  ArrowRight, 
  Check, 
  Sparkles,
  Heart
} from 'lucide-react';
import { ThemePreset } from '../types';

interface FooterProps {
  communityName: string;
  activeTheme: ThemePreset;
}

export const Footer: React.FC<FooterProps> = ({ communityName, activeTheme }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer id="footer" className="w-full bg-[#050608] text-white border-t border-white/10 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-16">
          
          {/* Col 1: Brand & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl font-black text-black shadow-lg"
                style={{ backgroundColor: activeTheme.accentColor }}
              >
                <span className="font-heading text-xl tracking-tighter">H</span>
              </div>
              <span className="font-heading text-lg font-bold text-white tracking-tight">
                {communityName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Creative visual solutions specializing in Logo & Branding, Posters & Covers, Commercial Video Editing, and 60fps Motion Graphics.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/9647515430407"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp: +964 751 543 0407"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
              </a>
              <a
                href="https://www.instagram.com/hiwaspace?igsi=MXFnNTdlZ3U3bncyeQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram: @hiwaspace"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/10 transition-all"
              >
                <Instagram className="h-4 w-4 text-pink-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/hiwa-jumaa-2ab989415?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn: Hiwa Jumaa"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
              >
                <Linkedin className="h-4 w-4 text-blue-400" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Navigation
              </span>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About & Skills</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Direct Channels
              </span>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><a href="https://wa.me/9647515430407" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">WhatsApp Chat</a></li>
                <li><a href="https://www.instagram.com/hiwaspace?igsi=MXFnNTdlZ3U3bncyeQ%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors">Instagram Profile</a></li>
                <li><a href="https://www.linkedin.com/in/hiwa-jumaa-2ab989415?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn Profile</a></li>
              </ul>
            </div>
          </div>

          {/* Col 3: Quick Project Inquiry Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block">
              Stay Connected
            </span>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Subscribe for new poster drops, behind-the-scenes video breakdowns, and creative design resources.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-white/30 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center rounded-xl px-4 py-2 text-xs font-bold text-black transition-all hover:scale-105"
                  style={{ backgroundColor: activeTheme.accentColor }}
                >
                  {subscribed ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1 text-[11px] font-mono text-green-400">
                  <Check className="h-3.5 w-3.5" /> Thank you for subscribing!
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Copyright & Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} {communityName}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Powered by 240-Frame Parallax WebP Engine</span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span style={{ color: activeTheme.accentColor }}>Dark Mode Only</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
