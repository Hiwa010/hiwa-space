import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, BookOpen, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { LearningPath, ThemePreset } from '../types';

interface CourseModalProps {
  path: LearningPath | null;
  activeTheme: ThemePreset;
  onClose: () => void;
  onEnroll: (pathTitle: string) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  path,
  activeTheme,
  onClose,
  onEnroll,
}) => {
  if (!path) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0f1017] p-6 sm:p-8 text-white shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="mb-6 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-md px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider text-black"
                style={{ backgroundColor: activeTheme.accentColor }}
              >
                {path.category}
              </span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-mono text-zinc-300">
                {path.level}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                <Clock className="h-3 w-3" /> {path.duration}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                <BookOpen className="h-3 w-3" /> {path.lessonsCount} Modules
              </span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              {path.title}
            </h3>

            <p className="text-sm text-zinc-300 leading-relaxed pt-1">
              {path.longDescription}
            </p>
          </div>

          {/* Tools & Skills */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
                Tools Used
              </span>
              <div className="flex flex-wrap gap-1.5">
                {path.tools.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
                Key Skills Acquired
              </span>
              <div className="flex flex-wrap gap-1.5">
                {path.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Curriculum Modules */}
          <div className="mb-8 space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider text-zinc-400">
              Interactive Syllabus & Hands-On Projects
            </h4>
            <div className="space-y-2.5">
              {path.curriculum.map((c, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-[#141520] p-4 transition-colors hover:border-white/20"
                >
                  <div className="font-semibold text-sm text-white mb-2 flex items-center gap-2">
                    <span
                      className="font-mono text-xs"
                      style={{ color: activeTheme.accentColor }}
                    >
                      0{idx + 1}
                    </span>
                    {c.module}
                  </div>
                  <ul className="space-y-1 pl-5 list-disc text-xs text-zinc-400">
                    {c.topics.map((tp, tIdx) => (
                      <li key={tIdx}>{tp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full sm:w-auto rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-white/10 transition-colors"
            >
              Close Preview
            </button>

            <button
              onClick={() => {
                onClose();
                onEnroll(path.title);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-black shadow-lg transition-all hover:scale-105"
              style={{
                backgroundColor: activeTheme.accentColor,
                boxShadow: `0 0 25px -4px ${activeTheme.accentColor}60`,
              }}
            >
              <span>Enroll in This Path</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
