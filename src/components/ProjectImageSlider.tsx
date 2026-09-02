import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Film, Play } from 'lucide-react';
import { PortfolioItem, ThemePreset } from '../types';

interface ProjectImageSliderProps {
  item: PortfolioItem;
  activeTheme: ThemePreset;
  className?: string;
  onImageClick?: () => void;
}

export const ProjectImageSlider: React.FC<ProjectImageSliderProps> = ({
  item,
  activeTheme,
  className = '',
  onImageClick,
}) => {
  // Extract gallery items or fallback to single main image
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);

  const hasMultiple = slides.length > 1;

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const currentSlide = slides[currentIndex] || slides[0];

  const formatEmbedUrl = (url?: string): string => {
    if (!url) return '';
    
    // YouTube Support
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?enablejsapi=1&rel=0`;
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

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div
      className={`relative h-56 sm:h-60 w-full select-none overflow-hidden bg-black/90 cursor-pointer ${className}`}
      onClick={onImageClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Animated Slide (Image or Video) */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 h-full w-full"
        >
          <div className="h-full w-full flex items-center justify-center bg-black relative">
            {currentSlide.type === 'video' || isIframeVideo(currentSlide.url) ? (
              <div className="relative h-full w-full flex items-center justify-center bg-black">
                {isIframeVideo(currentSlide.url) || isIframeVideo(currentSlide.remoteUrl) ? (
                  <iframe
                    src={formatEmbedUrl(currentSlide.url || currentSlide.remoteUrl)}
                    title={`${item.title} - ${currentSlide.label}`}
                    className="h-full w-full border-0 pointer-events-none"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={currentSlide.url}
                    poster={currentSlide.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fallbackTried && currentSlide.remoteUrl) {
                        target.dataset.fallbackTried = 'true';
                        target.src = currentSlide.remoteUrl;
                        target.load();
                        target.play().catch(() => {});
                      }
                    }}
                  />
                )}
                {/* Center play icon subtle badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur-md border border-white/20 shadow-lg">
                    <Play className="h-4 w-4 fill-white/80 translate-x-0.5" />
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={currentSlide.url}
                alt={`${item.title} - ${currentSlide.label}`}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallbackTried && currentSlide.remoteUrl) {
                    target.dataset.fallbackTried = 'true';
                    target.src = currentSlide.remoteUrl;
                  }
                }}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dark Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e0f17] via-black/20 to-black/50" />

      {/* Top Overlay Header: Category Badge & Style Variant Tag */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <span
          className="rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-black shadow-md flex items-center gap-1"
          style={{ backgroundColor: activeTheme.accentColor }}
        >
          <Sparkles className="h-3 w-3" />
          <span>{item.category}</span>
        </span>

        {/* Style Variant Tag for Multiple Images/Videos */}
        {hasMultiple ? (
          <span className="rounded-full border border-white/20 bg-black/70 px-2.5 py-0.5 text-[10px] font-mono text-zinc-200 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
            {currentSlide.type === 'video' ? (
              <Film className="h-3 w-3 text-amber-400 animate-pulse" />
            ) : (
              <span
                className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: activeTheme.accentColor }}
              />
            )}
            <span>{currentSlide.label}</span>
            <span className="text-zinc-500 text-[9px] font-mono">
              ({currentIndex + 1}/{slides.length})
            </span>
          </span>
        ) : (
          <span className="rounded-full border border-white/15 bg-black/60 px-2.5 py-0.5 text-[10px] font-mono text-zinc-300 backdrop-blur-sm">
            {item.year}
          </span>
        )}
      </div>

      {/* Navigation Arrows (Only shown when multiple slides exist) */}
      {hasMultiple && (
        <>
          {/* Previous Arrow */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={handlePrev}
            className="group/arrow absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/65 text-zinc-200 backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-110 hover:border-white/40 hover:bg-black/90 active:scale-95"
            style={{
              boxShadow: `0 4px 14px rgba(0, 0, 0, 0.5)`,
            }}
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover/arrow:-translate-x-0.5" />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            aria-label="Next slide"
            onClick={handleNext}
            className="group/arrow absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/65 text-zinc-200 backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-110 hover:border-white/40 hover:bg-black/90 active:scale-95"
            style={{
              boxShadow: `0 4px 14px rgba(0, 0, 0, 0.5)`,
            }}
          >
            <ChevronRight className="h-4 w-4 transition-transform group-hover/arrow:translate-x-0.5" />
          </button>
        </>
      )}

      {/* Bottom Dot Indicators & Swipe Hint */}
      {hasMultiple && (
        <div className="absolute bottom-2.5 left-0 right-0 z-20 flex items-center justify-center gap-1.5 px-4 pointer-events-auto">
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 backdrop-blur-md">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={(e) => handleDotClick(idx, e)}
                  className="group relative p-1 transition-all"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? 'w-4' : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                    style={{
                      backgroundColor: isActive ? activeTheme.accentColor : undefined,
                      boxShadow: isActive ? `0 0 8px ${activeTheme.accentColor}` : undefined,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
