import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  ChevronDown, 
  Layers, 
  ExternalLink,
  Instagram, 
  MessageSquare,
  Linkedin,
  ArrowRight,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { SiteConfig, ThemePreset } from '../types';
import { TOTAL_WEBP_FRAMES, DEFAULT_THEMES, getFrameUrl } from '../data/defaultContent';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isThemeSwitching, setIsThemeSwitching] = useState<boolean>(false);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [manualScrubActive, setManualScrubActive] = useState<boolean>(false);
  const [canvasReady, setCanvasReady] = useState<boolean>(false);
  
  // Cache of loaded Image elements
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const rafIdRef = useRef<number | null>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Draw frame to canvas
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clampedIdx = Math.max(0, Math.min(TOTAL_WEBP_FRAMES - 1, Math.floor(frameIdx)));
    const cachedImg = imagesCacheRef.current.get(clampedIdx);

    if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
      // Clear and draw maintaining aspect ratio cover
      const cWidth = canvas.width;
      const cHeight = canvas.height;
      const imgRatio = cachedImg.naturalWidth / cachedImg.naturalHeight;
      const canvasRatio = cWidth / cHeight;

      let drawWidth = cWidth;
      let drawHeight = cHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = cWidth / imgRatio;
        offsetY = (cHeight - drawHeight) / 2;
      } else {
        drawWidth = cHeight * imgRatio;
        offsetX = (cWidth - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, cWidth, cHeight);
      ctx.drawImage(cachedImg, offsetX, offsetY, drawWidth, drawHeight);
      setCanvasReady(true);
    } else {
      // Load this frame on demand if not cached
      const img = new Image();
      img.src = getFrameUrl(clampedIdx);
      img.onload = () => {
        imagesCacheRef.current.set(clampedIdx, img);
        drawFrame(clampedIdx);
      };
    }
  }, []);

  // Set up canvas sizing
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(currentFrame);
    }
  }, [currentFrame, drawFrame]);

  // Initial setup and background caching
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    // Progressively cache surrounding and all frames in the background
    let cancel = false;
    const loadAllFramesInBackground = async () => {
      // First load step-by-step
      for (let i = 0; i < TOTAL_WEBP_FRAMES; i += 2) {
        if (cancel) break;
        if (!imagesCacheRef.current.has(i)) {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => imagesCacheRef.current.set(i, img);
        }
      }
      // Then fill odd frames
      for (let i = 1; i < TOTAL_WEBP_FRAMES; i += 2) {
        if (cancel) break;
        if (!imagesCacheRef.current.has(i)) {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => imagesCacheRef.current.set(i, img);
        }
      }
    };

    loadAllFramesInBackground();

    // Initial frame draw
    const initialImg = new Image();
    initialImg.src = getFrameUrl(0);
    initialImg.onload = () => {
      imagesCacheRef.current.set(0, initialImg);
      drawFrame(0);
    };

    return () => {
      cancel = true;
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, drawFrame]);

  // Scroll listener for sticky sequence track
  useEffect(() => {
    const handleScroll = () => {
      if (manualScrubActive || isPlayingAuto) return;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;

      if (scrollableHeight <= 0) return;

      // Calculate progress 0 to 1 through container
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      const targetFrame = Math.floor(progress * (TOTAL_WEBP_FRAMES - 1));

      if (targetFrame !== currentFrame) {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => {
          setCurrentFrame(targetFrame);
          drawFrame(targetFrame);
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [currentFrame, manualScrubActive, isPlayingAuto, drawFrame]);

  // Handle Theme Switch animation with smooth loading indicator
  const switchThemeWithEffect = (index: number) => {
    if (index === config.activeThemeIndex) return;
    setIsThemeSwitching(true);
    setTimeout(() => {
      onThemeChange(index);
      setTimeout(() => {
        setIsThemeSwitching(false);
      }, 350);
    }, 200);
  };

  // Auto playback toggle
  useEffect(() => {
    if (isPlayingAuto) {
      autoPlayIntervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          const next = (prev + 1) % TOTAL_WEBP_FRAMES;
          drawFrame(next);
          return next;
        });
      }, 42); // ~24 fps playback matching delay 0.042s
    } else {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    }
    return () => {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    };
  }, [isPlayingAuto, drawFrame]);

  return (
    <div
      ref={containerRef}
      id="hero-sequence-container"
      className="relative w-full h-[320vh] bg-[#070709]"
    >
      {/* Sticky Screen Viewport with Rounded Border Bottom */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Main Hero Visual Frame with Rounded Border Bottom */}
        <div className="relative w-full h-full rounded-b-[36px] md:rounded-b-[54px] border-b border-white/10 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] bg-[#090a0f]">
          
          {/* Canvas for 60FPS WebP Parallax Scrubbing */}
          <canvas
            ref={canvasRef}
            id="hero-parallax-canvas"
            className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none transition-opacity duration-300"
            style={{ opacity: canvasReady ? 1 : 0.8 }}
          />

          {/* Cinematic Dark Overlays & Gradients for High Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-black/40 to-[#08080c]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080c]/90 via-transparent to-[#08080c]/85 pointer-events-none" />
          
          {/* Dynamic Theme Color Atmosphere Flare */}
          <div
            className="absolute -top-32 left-1/4 h-96 w-96 rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
            style={{ backgroundColor: activeTheme.accentColor }}
          />
          <div
            className="absolute bottom-10 right-10 h-80 w-80 rounded-full blur-[130px] pointer-events-none opacity-15 transition-all duration-700"
            style={{ backgroundColor: activeTheme.accentColor }}
          />

          {/* HERO CONTENT OVERLAYS — EXACT MATCH TO REFERENCE SPEC */}
          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-6 pt-24 pb-8 md:px-12 md:pt-28 md:pb-12">
            
            {/* TOP BAR / THEME BADGE & CONTROLS */}
            <div className="flex items-center justify-between">
              {/* Active Track Badge */}
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono">
                <span
                  className="h-2 w-2 rounded-full animate-pulse"
                  style={{ backgroundColor: activeTheme.accentColor }}
                />
                <span className="font-semibold tracking-wider text-white">
                  {activeTheme.badge}
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400">FRAME {String(currentFrame).padStart(3, '0')} / 240</span>
              </div>

              {/* Parallax Controller & Customizer Quick Bar */}
              <div className="flex items-center gap-2.5">
                <button
                  id="btn-toggle-autoplay"
                  onClick={() => setIsPlayingAuto(!isPlayingAuto)}
                  title={isPlayingAuto ? 'Pause sequence' : 'Auto-play sequence'}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:border-white/25 transition-all"
                >
                  {isPlayingAuto ? (
                    <>
                      <Pause className="h-3.5 w-3.5 text-orange-400" />
                      <span className="hidden sm:inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" style={{ color: activeTheme.accentColor }} />
                      <span className="hidden sm:inline">Preview Motion</span>
                    </>
                  )}
                </button>

                <button
                  id="btn-hero-edit-customizer"
                  onClick={onOpenCustomizer}
                  className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition-all"
                  style={{ borderColor: `${activeTheme.accentColor}60` }}
                >
                  <Sliders className="h-3.5 w-3.5" style={{ color: activeTheme.accentColor }} />
                  <span>Customize Text</span>
                </button>
              </div>
            </div>

            {/* MIDDLE SECTION — CLEAN HERO TITLE, SUBTITLE & ACTION BUTTONS */}
            <div className="my-auto max-w-4xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTheme.id}-hero-${config.heroTitleLine1}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-5"
                >
                  {/* Small Intro Line in Accent Color */}
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

                  {/* Huge Two-Line Title */}
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

                  {/* Subtitle & Value Proposition */}
                  <div className="max-w-2xl space-y-2 pt-1">
                    <p className="font-heading text-lg sm:text-2xl font-bold text-white tracking-tight">
                      {config.subheadline || activeTheme.subheadline}
                    </p>
                    <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed font-normal">
                      {config.paragraph || activeTheme.paragraph}
                    </p>
                  </div>

                  {/* Direct Action Buttons: Contact Me & View Portfolio */}
                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <button
                      id="btn-hero-contact"
                      onClick={onJoinClick}
                      className="group flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-xs sm:text-sm font-bold text-black shadow-lg transition-all hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]"
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
                      className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-6 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 hover:border-white/30 transition-all"
                    >
                      <span>View Portfolio</span>
                      <ArrowRight className="h-4 w-4 text-zinc-400" />
                    </a>
                  </div>

                  {/* Focus Highlights Tags */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2 max-w-3xl">
                      {(config.skills && config.skills.length > 0 ? config.skills : [
                        { id: '1', index: '#01', label: 'Graphic Design' },
                        { id: '2', index: '#02', label: 'Video Editing' },
                        { id: '3', index: '#03', label: 'Motion Graphics' },
                        { id: '4', index: '#04', label: 'Posters & Covers' },
                        { id: '5', index: '#05', label: 'Logo & Branding' },
                        { id: '6', index: '#06', label: 'Social Media Management' },
                      ]).map((skill) => (
                        <div
                          key={skill.id || skill.index}
                          className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 backdrop-blur-md px-3 py-1.5 transition-all hover:border-white/25 hover:bg-black/70"
                        >
                          <span
                            className="text-[10px] font-mono font-bold"
                            style={{ color: activeTheme.accentColor }}
                          >
                            {skill.index}
                          </span>
                          <span className="text-xs font-medium text-zinc-200">
                            {skill.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* BOTTOM SECTION — THEME SELECTOR & SOCIAL ICONS */}
            <div className="relative pt-4">
              
              {/* Theme Navigation Strip */}
              <div className="mb-4 flex items-center justify-center">
                <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-black/70 p-1.5 backdrop-blur-md">
                  {DEFAULT_THEMES.map((theme, idx) => {
                    const isActive = idx === config.activeThemeIndex;
                    return (
                      <button
                        key={theme.id}
                        id={`btn-select-theme-${idx}`}
                        onClick={() => switchThemeWithEffect(idx)}
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
                        {isActive && (
                          <motion.div
                            layoutId="activeThemePill"
                            className="absolute inset-0 rounded-xl border pointer-events-none"
                            style={{ borderColor: activeTheme.accentColor }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BOTTOM BAR: Scrubber, Social Links & Scroll Indicator */}
              <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-3">
                
                {/* Left: Interactive Manual Frame Scrubber */}
                <div className="hidden sm:flex items-center gap-2.5">
                  <span className="text-[11px] font-mono text-zinc-400 whitespace-nowrap">SCRUB:</span>
                  <input
                    id="hero-frame-scrubber"
                    type="range"
                    min="0"
                    max={TOTAL_WEBP_FRAMES - 1}
                    value={currentFrame}
                    onMouseDown={() => setManualScrubActive(true)}
                    onMouseUp={() => setManualScrubActive(false)}
                    onTouchStart={() => setManualScrubActive(true)}
                    onTouchEnd={() => setManualScrubActive(false)}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCurrentFrame(val);
                      drawFrame(val);
                    }}
                    className="h-1.5 w-32 md:w-44 accent-orange-500 cursor-pointer rounded-lg bg-white/10"
                    style={{ accentColor: activeTheme.accentColor }}
                  />
                  <span className="text-[11px] font-mono text-zinc-400 tabular-nums">
                    {Math.round((currentFrame / (TOTAL_WEBP_FRAMES - 1)) * 100)}%
                  </span>
                </div>

                {/* Center: Social Icons (WhatsApp, Instagram, LinkedIn) */}
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="https://wa.me/9647515430407"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden md:inline font-mono text-[11px]">WhatsApp</span>
                  </a>
                  <a
                    href="https://www.instagram.com/hiwaspace?igsi=MXFnNTdlZ3U3bncyeQ%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-pink-400 transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                    <span className="hidden md:inline font-mono text-[11px]">@hiwaspace</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/hiwa-jumaa-2ab989415?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="hidden md:inline font-mono text-[11px]">LinkedIn</span>
                  </a>
                </div>

                {/* Right: Scroll Indicator prompt */}
                <div className="flex items-center justify-center sm:justify-end gap-2 text-xs font-mono text-zinc-400">
                  <span className="hidden md:inline uppercase text-[11px] tracking-wider">Scroll to Parallax</span>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5"
                  >
                    <ChevronDown className="h-3.5 w-3.5 text-zinc-300" />
                  </motion.div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
