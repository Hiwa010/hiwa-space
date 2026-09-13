import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Calendar, User, Tag, Sparkles, CheckCircle2, Wrench, ArrowRight, ChevronLeft, ChevronRight, Film, Play } from 'lucide-react';
import { PortfolioItem, ThemePreset } from '../types';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  activeTheme: ThemePreset;
  onClose: () => void;
  onContactClick: () => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  item,
  activeTheme,
  onClose,
  onContactClick,
}) => {
  if (!item) return null;

  const rawGallery = item.gallery && item.gallery.length > 0 ? item.gallery : [item.image];
  const slides = rawGallery.map((g, i) => {
    if (typeof g === 'string') {
      const isVid = /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(g) || g.includes('video');
      return {
        url: g,
        label: `Style #${i + 1}`,
        remoteUrl: undefined,
        type: (isVid ? 'video' : 'image') as 'image' | 'video',
      };
    }
    const isVid =
      g.type === 'video' ||
      /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(g.url) ||
      (g.remoteUrl && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(g.remoteUrl));
    return {
      url: g.url,
      label: g.label || `Style #${i + 1}`,
      remoteUrl: g.remoteUrl,
      type: (g.type || (isVid ? 'video' : 'image')) as 'image' | 'video',
      poster: g.poster,
    };
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = slides[activeSlide] || slides[0];
  const hasMultiple = slides.length > 1;

  const formatEmbedUrl = (url?: string): string => {
    if (!url) return '';

    // YouTube Support
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&enablejsapi=1&rel=0`;
    }

    // Google Drive Support
    let fileId = '';
    const driveLh3 = url.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
    if (driveLh3 && driveLh3[1]) {
      fileId = driveLh3[1];
    }
    const driveFile = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveFile && driveFile[1]) {
      fileId = driveFile[1];
    }
    const driveOpen = url.match(/drive\.google\.com\/(?:open\?id=|uc\?id=)([a-zA-Z0-9_-]+)/);
    if (driveOpen && driveOpen[1]) {
      fileId = driveOpen[1];
    }
    if (fileId) {
      // Fix common OCR / visual font ambiguity if needed
      if (fileId.startsWith('1sm0GvgD6AyKOhOdT') && fileId.includes('urLmcoCdnO-2W1j')) {
        fileId = '1sm0GvgD6AyKOhOdTIurLmcoCdnO-2W1j';
      }
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
  };

  const isIframeVideo = (url?: string): boolean => {
    if (!url) return false;
    return (
      url.includes('drive.google.com') ||
      url.includes('googleusercontent.com/d/') ||
      url.includes('youtube.com') ||
      url.includes('youtu.be')
    );
  };

  const isYouTubeVideo = (url?: string): boolean => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

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

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-[#0e0f17] text-white shadow-2xl my-8 flex flex-col max-h-[90vh]"
        >
          {/* Modal Top Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#12131e] px-6 py-4">
            <div className="flex items-center gap-2.5">
              <span
                className="rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-black shadow-md flex items-center gap-1.5"
                style={{ backgroundColor: activeTheme.accentColor }}
              >
                <Sparkles className="h-3 w-3" />
                <span>{item.category}</span>
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-mono text-zinc-300">
                {item.year}
              </span>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 hover:bg-white/20 hover:text-white transition-all"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable Content Container */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Distinct Framed Gallery / Image / Video Slider Presentation Box */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
              
              {/* Media Stage with object-contain */}
              <div className="relative h-64 sm:h-80 md:h-96 w-full flex items-center justify-center select-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="h-full w-full flex items-center justify-center"
                  >
                    {currentSlide.type === 'video' || isIframeVideo(currentSlide.url) ? (
                      <div className="relative h-full w-full flex items-center justify-center bg-black/95 rounded-xl overflow-hidden shadow-2xl">
                        {isIframeVideo(currentSlide.url) || isIframeVideo(currentSlide.remoteUrl) ? (
                          <iframe
                            key={formatEmbedUrl(currentSlide.url || currentSlide.remoteUrl)}
                            src={formatEmbedUrl(currentSlide.url || currentSlide.remoteUrl)}
                            title={`${item.title} - ${currentSlide.label}`}
                            className="w-full h-full border-0 rounded-lg shadow-2xl bg-black"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            key={currentSlide.url}
                            src={currentSlide.url}
                            poster={currentSlide.poster}
                            controls
                            playsInline
                            autoPlay
                            preload="auto"
                            className="max-h-full max-w-full rounded-lg shadow-2xl object-contain"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.dataset.fallbackTried && currentSlide.remoteUrl) {
                                target.dataset.fallbackTried = 'true';
                                target.src = currentSlide.remoteUrl;
                                target.load();
                                target.play().catch(() => {});
                              }
                            }}
                          >
                            <source src={currentSlide.url} type="video/mp4" />
                            {currentSlide.remoteUrl && <source src={currentSlide.remoteUrl} type="video/mp4" />}
                            Your browser does not support HTML5 video playback.
                          </video>
                        )}
                      </div>
                    ) : (
                      <img
                        src={currentSlide.url}
                        alt={`${item.title} - ${currentSlide.label}`}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain drop-shadow-2xl rounded-lg"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.dataset.fallbackTried && currentSlide.remoteUrl) {
                            target.dataset.fallbackTried = 'true';
                            target.src = currentSlide.remoteUrl;
                          }
                        }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Left & Right Gallery Navigation Arrows */}
                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous slide"
                      onClick={handlePrev}
                      className="group/btn absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-zinc-200 backdrop-blur-md shadow-xl transition-all hover:scale-110 hover:border-white/40 hover:bg-black active:scale-95"
                    >
                      <ChevronLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-0.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next slide"
                      onClick={handleNext}
                      className="group/btn absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-zinc-200 backdrop-blur-md shadow-xl transition-all hover:scale-110 hover:border-white/40 hover:bg-black active:scale-95"
                    >
                      <ChevronRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </>
                )}
              </div>

              {/* Bottom Frame Controls: Style Name Pill & Dot Indicators */}
              {(hasMultiple || currentSlide.type === 'video' || isIframeVideo(currentSlide.url)) && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 flex-wrap">
                    {currentSlide.type === 'video' || isIframeVideo(currentSlide.url) ? (
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px]">
                        <Film className="h-3.5 w-3.5 animate-pulse" />
                        <span>VIDEO</span>
                      </span>
                    ) : (
                      <span
                        className="h-2 w-2 rounded-full animate-pulse"
                        style={{ backgroundColor: activeTheme.accentColor }}
                      />
                    )}
                    <span className="font-semibold text-white">{currentSlide.label}</span>
                    {hasMultiple && (
                      <span className="text-zinc-500">
                        ({activeSlide + 1} of {slides.length})
                      </span>
                    )}

                    {(isIframeVideo(currentSlide.url) || (currentSlide.type === 'video' && (currentSlide.remoteUrl || currentSlide.url))) && (
                      <a
                        href={currentSlide.remoteUrl || currentSlide.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-[11px] font-mono font-medium text-red-200 hover:text-white transition-all ml-1 shadow-sm"
                      >
                        <Play className="h-3 w-3 fill-red-400 text-red-400" />
                        <span>
                          {isYouTubeVideo(currentSlide.url || currentSlide.remoteUrl)
                            ? 'Watch on YouTube'
                            : 'Open Video'}
                        </span>
                        <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                      </a>
                    )}
                  </div>

                  {/* Dot Indicators */}
                  <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-md">
                    {slides.map((slide, idx) => (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`Go to slide ${idx + 1}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSlide(idx);
                        }}
                        className="p-1"
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-all duration-300 ${
                            idx === activeSlide ? 'w-5' : 'w-1.5 bg-white/30 hover:bg-white/60'
                          }`}
                          style={{
                            backgroundColor: idx === activeSlide ? activeTheme.accentColor : undefined,
                            boxShadow: idx === activeSlide ? `0 0 10px ${activeTheme.accentColor}` : undefined,
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Title & Metadata Section (Cleanly Separated Below the Image Frame) */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {item.title}
                  </h2>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <User className="h-3.5 w-3.5" style={{ color: activeTheme.accentColor }} />
                      Client: <span className="text-white font-medium">{item.client}</span>
                    </span>
                    {item.highlightMetric && (
                      <>
                        <span className="text-zinc-600">•</span>
                        <span className="text-emerald-400 font-semibold">{item.highlightMetric}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Overview */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                Project Overview & Execution
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Key Deliverables */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                Key Deliverables & Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.deliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-zinc-200"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: activeTheme.accentColor }} />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools Used */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5" style={{ color: activeTheme.accentColor }} />
                Creative Suite & Production Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-zinc-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-black/60 border border-white/10 px-2.5 py-0.5 text-[11px] font-mono text-zinc-400"
                >
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 bg-[#12131d] px-6 sm:px-8 py-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Back to Gallery
              </button>

              {(isIframeVideo(currentSlide.url) || (currentSlide.type === 'video' && (currentSlide.remoteUrl || currentSlide.url))) && (
                <a
                  href={currentSlide.remoteUrl || currentSlide.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl border border-red-500/40 bg-red-600/20 px-4 py-2.5 text-xs font-semibold text-red-200 hover:bg-red-600/30 hover:text-white transition-all shadow-sm"
                >
                  <Play className="h-3.5 w-3.5 fill-current text-red-400" />
                  <span>
                    {isYouTubeVideo(currentSlide.url || currentSlide.remoteUrl)
                      ? 'Open on YouTube'
                      : 'Open Video'}
                  </span>
                  <ExternalLink className="h-3 w-3 opacity-80" />
                </a>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-black shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: activeTheme.accentColor,
                boxShadow: `0 0 20px -3px ${activeTheme.accentColor}60`,
              }}
            >
              <span>Inquire About Similar Project</span>
              <Sparkles className="h-3.5 w-3.5" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
