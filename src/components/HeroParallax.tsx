import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, 
  Sparkles, 
  ChevronDown, 
  Instagram, 
  MessageSquare,
  Linkedin,
  ArrowRight
} from 'lucide-react';
import { SiteConfig, ThemePreset } from '../types';
// لێرەدا getFrameUrl بانگکراوەتەوە
import { DEFAULT_THEMES, getFrameUrl } from '../data/defaultContent';

interface HeroParallaxProps {
  config: SiteConfig;
  activeTheme: ThemePreset;
  onThemeChange: (index: number) => void;
  onOpenCustomizer: () => void;
  onJoinClick: () => void;
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({
  config,
  activeTheme,
  onThemeChange,
  onOpenCustomizer,
  onJoinClick,
}) => {
  return (
    <div
      id="hero-sequence-container"
      className="relative w-full min-h-screen bg-[#070709] flex flex-col justify-between overflow-hidden"
    >
      <div className="relative w-full min-h-screen flex flex-col justify-between rounded-b-[36px] md:rounded-b-[54px] border-b border-white/10 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] bg-[#090a0f]">
        
        <div className="absolute inset-0 bg-[#070709] -z-10" />
        
        {/* وێنە سەرەکییەکە بەکارهێنراوەتەوە بێ ئەوەی قورس بێت */}
        <img
          src={getFrameUrl(0)}
          alt="Hiwa Space Background"
          className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none opacity-80"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-black/40 to-[#08080c]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080c]/90 via-transparent to-[#08080c]/85 pointer-events-none" />
        
        <div
          className="absolute -top-32 left-1/4 h-96 w-96 rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
          style={{ backgroundColor: activeTheme.accentColor }}
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-6 pt-24 pb-8 md:px-12 md:pt-28 md:pb-12 min-h-screen">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono">
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: activeTheme.accentColor }}
              />
              <span className="font-semibold tracking-wider text-white">
                {activeTheme.badge}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenCustomizer}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition-all"
                style={{ borderColor: `${activeTheme.accentColor}60` }}
              >
                <Sliders className="h-3.5 w-3.5" style={{ color: activeTheme.accentColor }} />
                <span>Customize Text</span>
              </button>
            </div>
          </div>

          <div className="my-auto max-w-4xl py-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTheme.id}-hero-${config.heroTitleLine1}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs md:text-sm font-mono font-bold tracking-widest uppercase transition-colors"
                    style={{ color: activeTheme.accentColor }}
                  >
                    {config.heroIntro || activeTheme.heroIntro}
                  </span>
                  <span className="h-[1px] w-10 bg-white/20" />
                  <span className="text-xs font-mono text-zinc-400 hidden sm:inline">4+ YEARS OF EXPERIENCE</span>
                </div>

                <h1 className="font-heading text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl leading-[0.96]">
                  <span className="block">{config.heroTitleLine1 || activeTheme.heroTitleLine1}</span>
                  <span
                    className="block text-transparent bg-clip-text"
                    style={{
                      backgroundImage: `linear-gradient(135deg, #FFFFFF 30%, ${activeTheme.accentColor} 100%)`,
                    }}
                  >
                    {config.heroTitleLine2 || activeTheme.heroTitleLine2}
                  </span>
                </h1>

                <div className="max-w-2xl space-y-2 pt-1">
                  <p className="font-heading text-lg sm:text-2xl font-bold text-white tracking-tight">
                    {config.subheadline || activeTheme.subheadline}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed font-normal">
                    {config.paragraph || activeTheme.paragraph}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    onClick={onJoinClick}
                    className="group flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-xs sm:text-sm font-bold text-black shadow-lg transition-all hover:opacity-95 hover:scale-[1.02]"
                    style={{
                      backgroundColor: activeTheme.accentColor,
                      boxShadow: `0 0 30px -4px ${activeTheme.accentColor}70`,
                    }}
                  >
                    <span>Contact Me</span>
                    <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  </button>

                  <a
                    href="#portfolio"
                    className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-6 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-all"
                  >
                    <span>View Portfolio</span>
                    <ArrowRight className="h-4 w-4 text-zinc-400" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative pt-4">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-black/70 p-1.5 backdrop-blur-md">
                {DEFAULT_THEMES.map((theme, idx) => {
                  const isActive = idx === config.activeThemeIndex;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => onThemeChange(idx)}
                      className={`group relative flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs transition-all ${
                        isActive
                          ? 'text-white font-bold bg-white/10 border border-white/20'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                      }`}
                    >
                      <span
                        className="font-mono text-[10px] font-bold"
                        style={{ color: isActive ? activeTheme.accentColor : '#71717a' }}
                      >
                        {theme.indexNumber}
                      </span>
                      <span className="hidden sm:inline whitespace-nowrap">{theme.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-3">
              <div className="hidden sm:block" />

              <div className="flex items-center justify-center gap-4">
                <a href="https://wa.me/9647515430407" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden md:inline font-mono text-[11px]">WhatsApp</span>
                </a>
                <a href="https://www.instagram.com/hiwaspace" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-pink-400 transition-colors">
                  <Instagram className="h-4 w-4" />
                  <span className="hidden md:inline font-mono text-[11px]">@hiwaspace</span>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="h-4 w-4" />
                  <span className="hidden md:inline font-mono text-[11px]">LinkedIn</span>
                </a>
              </div>

              <div className="flex items-center justify-center sm:justify-end gap-2 text-xs font-mono text-zinc-400">
                <span className="hidden md:inline uppercase text-[11px] tracking-wider">Scroll Down</span>
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5">
                  <ChevronDown className="h-3.5 w-3.5 text-zinc-300" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
