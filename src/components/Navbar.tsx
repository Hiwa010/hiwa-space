import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sliders, Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemePreset } from '../types';

interface NavbarProps {
  communityName: string;
  activeTheme: ThemePreset;
  onOpenCustomizer: () => void;
  onJoinClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  communityName,
  activeTheme,
  onOpenCustomizer,
  onJoinClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About & Skills', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080a]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl font-black text-black transition-transform group-hover:scale-105 shadow-md"
            style={{ backgroundColor: activeTheme.accentColor }}
          >
            <span className="font-heading text-lg tracking-tighter">H</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-sm md:text-base font-extrabold tracking-tight text-white group-hover:text-white/90">
              {communityName}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase -mt-0.5">
              Creative Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 rounded-full border border-white/10 bg-black/40 px-5 py-2 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Live Customizer Trigger */}
          <button
            id="btn-nav-customizer"
            onClick={onOpenCustomizer}
            title="Open Live Website Customizer"
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-200 hover:bg-white/10 hover:text-white transition-all"
          >
            <Sliders className="h-3.5 w-3.5" style={{ color: activeTheme.accentColor }} />
            <span>Customize</span>
          </button>

          {/* Join CTA */}
          <button
            id="btn-nav-join"
            onClick={onJoinClick}
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-black shadow-lg transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: activeTheme.accentColor,
              boxShadow: `0 0 20px -3px ${activeTheme.accentColor}60`,
            }}
          >
            <span>Contact Me</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          id="btn-toggle-mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden border-b border-white/10 bg-[#0c0d12] px-6 py-6"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomizer();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-medium text-white"
              >
                <Sliders className="h-4 w-4" style={{ color: activeTheme.accentColor }} />
                <span>Customize Community Page</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onJoinClick();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-black"
                style={{ backgroundColor: activeTheme.accentColor }}
              >
                <span>Contact Me</span>
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};
