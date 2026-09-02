import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowDown } from 'lucide-react';
import { TOTAL_WEBP_FRAMES, getFrameUrl } from '../data/defaultContent';

interface PreloaderProps {
  onComplete: () => void;
  accentColor: string;
  communityName: string;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, accentColor, communityName }) => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing Parallax Engine...');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    // We preload a priority batch of 30 initial frames across the sequence for instantaneous hero responsiveness
    const priorityFrames: number[] = [];
    for (let i = 0; i < 35; i++) {
      priorityFrames.push(Math.floor((i * (TOTAL_WEBP_FRAMES - 1)) / 34));
    }
    // Also include the first 10 consecutive frames
    for (let i = 0; i < 10; i++) {
      if (!priorityFrames.includes(i)) priorityFrames.push(i);
    }

    const totalPriority = priorityFrames.length;

    const updateStatus = (current: number) => {
      if (current < 30) {
        setStatusMessage('Connecting to Supabase Storage...');
      } else if (current < 70) {
        setStatusMessage('Buffering 240-Frame WebP Sequence...');
      } else if (current < 95) {
        setStatusMessage('Calibrating Parallax Scroll Scrubbers...');
      } else {
        setStatusMessage('Ready for Cinematic Experience');
      }
    };

    // Preload images
    priorityFrames.forEach((frameIdx) => {
      const img = new Image();
      img.src = getFrameUrl(frameIdx);
      img.onload = () => {
        loadedCount++;
        const targetPercent = Math.min(100, Math.floor((loadedCount / totalPriority) * 100));
        setProgress(targetPercent);
        updateStatus(targetPercent);

        if (loadedCount >= totalPriority) {
          setTimeout(() => {
            setIsReady(true);
            setTimeout(() => {
              onComplete();
            }, 600);
          }, 300);
        }
      };
      img.onerror = () => {
        // Continue even if a frame has network glitch
        loadedCount++;
        const targetPercent = Math.min(100, Math.floor((loadedCount / totalPriority) * 100));
        setProgress(targetPercent);
        if (loadedCount >= totalPriority) {
          setIsReady(true);
          setTimeout(onComplete, 400);
        }
      };
    });

    // Fallback safety timeout (max 4.5 seconds so user is never stuck)
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setIsReady(true);
      setTimeout(onComplete, 400);
    }, 4000);

    return () => clearTimeout(fallbackTimer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        id="app-preloader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] px-6 text-white"
      >
        {/* Subtle background ambient glow */}
        <div
          className="pointer-events-none absolute h-96 w-96 rounded-full blur-[120px] opacity-25"
          style={{ background: accentColor }}
        />

        <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
          {/* Logo Mark with pulsing ring */}
          <div className="relative mb-8 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-3 rounded-full border border-dashed opacity-40"
              style={{ borderColor: accentColor }}
            />
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-[#121318] shadow-2xl"
              style={{ boxShadow: `0 0 35px -5px ${accentColor}40` }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl font-bold text-black"
                style={{ backgroundColor: accentColor }}
              >
                <span className="font-heading text-2xl font-black tracking-tighter">A</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-heading mb-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {communityName}
          </h2>
          <p className="mb-8 text-xs font-mono tracking-widest text-zinc-400 uppercase">
            AI Creation • Parallax Web • Vibecoding
          </p>

          {/* Horizontal Progress Bar */}
          <div className="w-full">
            <div className="mb-3 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" style={{ color: accentColor }} />
                {statusMessage}
              </span>
              <span className="font-bold tabular-nums" style={{ color: accentColor }}>
                {progress}%
              </span>
            </div>

            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/5 border border-white/10 p-[1px]">
              <motion.div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${accentColor}, #ffffff)`,
                  boxShadow: `0 0 15px ${accentColor}`,
                }}
              />
            </div>
          </div>

          {/* Frame count badge */}
          <div className="mt-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-mono text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
            240-Frame WebP Parallax Sequence
          </div>

          {/* Skip button if in hurry */}
          <button
            id="btn-skip-preloader"
            onClick={() => onComplete()}
            className="mt-8 text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-4"
          >
            Skip loading & enter site →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
