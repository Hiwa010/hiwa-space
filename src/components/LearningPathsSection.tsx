import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Wand2, 
  Cpu, 
  Layers, 
  Flame, 
  Zap, 
  Clock, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { LearningPath, ThemePreset } from '../types';
import { LEARNING_PATHS } from '../data/defaultContent';
import { CourseModal } from './CourseModal';

interface LearningPathsSectionProps {
  activeTheme: ThemePreset;
  onJoinClick: () => void;
}

export const LearningPathsSection: React.FC<LearningPathsSectionProps> = ({
  activeTheme,
  onJoinClick,
}) => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return Sparkles;
      case 'Wand2':
        return Wand2;
      case 'Cpu':
        return Cpu;
      case 'Layers':
        return Layers;
      case 'Flame':
        return Flame;
      case 'Zap':
      default:
        return Zap;
    }
  };

  return (
    <section
      id="services"
      className="relative w-full py-24 md:py-32 bg-[#090a0f] text-white border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase"
            style={{ color: activeTheme.accentColor }}
          >
            CURRICULUM & TRACKS
          </span>
          <span className="h-[1px] w-12 bg-zinc-800" />
        </div>

        {/* Section Heading */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Featured Learning Paths
            </h2>
            <p className="mt-3 max-w-xl text-sm md:text-base text-zinc-300">
              6 comprehensive, project-driven tracks designed to take you from foundational AI prompts to complex animated web applications.
            </p>
          </div>

          <button
            onClick={onJoinClick}
            className="self-start md:self-auto flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-white/10 hover:text-white transition-all"
          >
            <span>Get Full Access Pass</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 6 Path Cards Grid (Grid of 4-6 boxes matching prompt) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LEARNING_PATHS.map((path, idx) => {
            const Icon = getIcon(path.iconName);
            return (
              <div
                key={path.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0e0f17] p-6 transition-all duration-300 hover:border-white/25 hover:bg-[#12131e] hover:-translate-y-1 shadow-xl"
              >
                {/* Top badges & Icon */}
                <div>
                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/60 shadow-inner group-hover:scale-110 transition-transform"
                      style={{ color: activeTheme.accentColor }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-black"
                        style={{ backgroundColor: activeTheme.accentColor }}
                      >
                        {path.category}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {path.level}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-white transition-colors mb-2">
                    {path.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3 mb-6">
                    {path.description}
                  </p>
                </div>

                {/* Bottom Footer Info & Action */}
                <div className="pt-4 border-t border-white/10">
                  <div className="mb-4 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {path.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" /> {path.lessonsCount} Modules
                    </span>
                  </div>

                  <button
                    id={`btn-view-syllabus-${path.id}`}
                    onClick={() => setSelectedPath(path)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-zinc-200 group-hover:bg-white/10 group-hover:text-white transition-all"
                  >
                    <span>View Syllabus & Tools</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Course Details Modal */}
      <CourseModal
        path={selectedPath}
        activeTheme={activeTheme}
        onClose={() => setSelectedPath(null)}
        onEnroll={(title) => {
          setSelectedPath(null);
          onJoinClick();
        }}
      />
    </section>
  );
};
