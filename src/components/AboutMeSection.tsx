import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Palette, 
  Film, 
  Share2, 
  Award, 
  GraduationCap,
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Flame, 
  Layers, 
  Clock, 
  TrendingUp, 
  CheckCheck,
  MonitorPlay
} from 'lucide-react';
import { ThemePreset } from '../types';

interface AboutMeSectionProps {
  activeTheme: ThemePreset;
  onContactClick: () => void;
}

export const AboutMeSection: React.FC<AboutMeSectionProps> = ({ activeTheme, onContactClick }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'design' | 'video' | 'social'>('all');

  const coreDisciplines = [
    {
      id: 'design',
      title: 'Graphic Design & Brand Systems',
      icon: Palette,
      experience: '4+ Years Active',
      summary: 'Crafting distinctive brand marks, scalable vector identity systems, high-contrast poster art, and editorial covers.',
      highlights: [
        'Custom geometric monograms & vector logo suites',
        'Print & digital key visuals, album art & festival posters',
        'Comprehensive brand guidelines (color, type, spacing)',
        'Packaging design & digital marketing collateral',
      ],
      tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Picsart'],
    },
    {
      id: 'video',
      title: 'Video Editing & Post-Production',
      icon: Film,
      experience: '4+ Years Active',
      summary: 'Transforming raw footage into high-converting commercial reels, cinematic teasers, and beat-synced visual experiences.',
      highlights: [
        'Dynamic speed ramping & rhythmic match-cutting',
        'Custom sound design & immersive audio mixing',
        '4K cinematic color grading (Rec.709 & HDR)',
        'Multi-format delivery (16:9 widescreen & 9:16 vertical)',
      ],
      tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'Alight Motion', 'CapCut'],
    },
    {
      id: 'social',
      title: 'Social Media Management & Strategy',
      icon: Share2,
      experience: '4+ Years Active',
      summary: 'Designing high-retention content architectures that boost engagement, follower growth, and brand authority across platforms.',
      highlights: [
        'Short-form video retention strategies (TikTok, Reels, Shorts)',
        'High-converting carousel graphics & visual hooks',
        'Consistent aesthetic brand identity across social channels',
        'Content calendar planning & performance analytics',
      ],
      tools: ['Meta Business Suite', 'Instagram Insights', 'TikTok Creator Tools', 'Facebook Ads'],
    },
  ];

  const softwareStack = [
    {
      name: 'Adobe Photoshop',
      category: 'Raster Design & Key Visuals',
      proficiency: '98%',
      description: 'Mastery in complex photo manipulation, multi-layer compositing, color correction, album covers, and poster art.',
      badge: 'PS',
      color: '#31A8FF',
    },
    {
      name: 'Adobe Illustrator',
      category: 'Vector Graphics & Branding',
      proficiency: '96%',
      description: 'Precision vector construction, geometric brand marks, typography manipulation, and print-ready master files.',
      badge: 'AI',
      color: '#FF9A00',
    },
    {
      name: 'Adobe Premiere Pro',
      category: '4K Cinematic Video Editing',
      proficiency: '95%',
      description: 'Non-linear narrative pacing, speed ramping, multicam syncing, dialogue cleanup, and high-impact commercial cutting.',
      badge: 'PR',
      color: '#EA77FF',
    },
    {
      name: 'Adobe After Effects',
      category: 'Motion Graphics & VFX',
      proficiency: '92%',
      description: '60fps kinetic typography, 2D/3D logo reveals, particle simulations, UI animations, and digital compositing.',
      badge: 'AE',
      color: '#9999FF',
    },
  ];

  const experienceStats = [
    { label: 'Years of Experience', value: '4+', detail: 'Industry & Freelance' },
    { label: 'Completed Projects', value: '150+', detail: 'Global Clients & Brands' },
    { label: 'Total Video Views', value: '1M+', detail: 'Across Client Channels' },
    { label: 'Client Retention Rate', value: '98%', detail: 'On-Time & On-Budget' },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 bg-[#08080a] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full blur-[160px] opacity-15"
        style={{ backgroundColor: activeTheme.accentColor }}
      />
      <div
        className="pointer-events-none absolute bottom-10 -right-40 h-[450px] w-[450px] rounded-full blur-[160px] opacity-10"
        style={{ backgroundColor: activeTheme.accentColor }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Eyebrow Label */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase"
            style={{ color: activeTheme.accentColor }}
          >
            BIOGRAPHY & EXPERTISE
          </span>
          <span className="h-[1px] w-12 bg-zinc-800" />
        </div>

        {/* Section Header & Main Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
              4+ Years Crafting Visuals That Command Attention.
            </h2>
            <p className="mt-4 text-base md:text-lg text-zinc-300 leading-relaxed">
              I am a dedicated <strong className="text-white font-semibold">Graphic Designer, Video Editor, and Social Media Strategist</strong> with over four years of hands-on experience building memorable visual identities, cinematic commercial edits, and high-engagement digital campaigns.
            </p>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0e0f17] p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl font-bold text-black shadow-md"
                style={{ backgroundColor: activeTheme.accentColor }}
              >
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-white">Information Technology (IT) Diploma</h4>
                <p className="text-xs font-mono text-zinc-400">Koya Technical Institute (2025-2026)</p>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              I hold a Diploma in Information Technology from Koya Technical Institute, completed after my high school studies. This technical background provides me with a strong foundation in digital systems, technical problem-solving, and a unique perspective when working with creative technology and software.
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Education:</span>
              <span className="font-bold text-zinc-200">Koya Technical Institute</span>
            </div>
          </div>
        </div>

        {/* Experience Metrics Bar */}
        <div className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {experienceStats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-[#0e0f17] p-6 text-center transition-all duration-300 hover:border-white/20 hover:bg-[#12131e]"
            >
              <div
                className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight"
                style={{ color: activeTheme.accentColor }}
              >
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm font-bold text-white">
                {stat.label}
              </div>
              <div className="mt-0.5 text-[11px] font-mono text-zinc-400">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

        {/* 3 Core Experience Pillars (Graphic Design, Video Editing, Social Media Management) */}
        <div className="mb-20">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span
                className="text-xs font-mono font-bold tracking-wider uppercase"
                style={{ color: activeTheme.accentColor }}
              >
                SPECIALIZED CAPABILITIES
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Core Disciplines & Execution
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              A comprehensive toolkit developed through 4+ years of real-world freelance client work, agency collaborations, and digital brand scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreDisciplines.map((discipline) => {
              const Icon = discipline.icon;
              return (
                <div
                  key={discipline.id}
                  className="group rounded-3xl border border-white/10 bg-[#0e0f17] p-7 transition-all duration-300 hover:border-white/25 hover:bg-[#12131e] hover:-translate-y-1 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/60 shadow-inner group-hover:scale-105 transition-transform"
                        style={{ color: activeTheme.accentColor }}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-mono font-semibold text-zinc-300">
                        {discipline.experience}
                      </span>
                    </div>

                    <h4 className="font-heading text-lg font-bold text-white mb-2">
                      {discipline.title}
                    </h4>

                    <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                      {discipline.summary}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="space-y-2.5 mb-6">
                      {discipline.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2
                            className="h-4 w-4 shrink-0 mt-0.5"
                            style={{ color: activeTheme.accentColor }}
                          />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools bottom footer */}
                  <div className="pt-4 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-2">
                      Primary Tools:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {discipline.tools.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-white/10 bg-black/50 px-2 py-0.5 text-[11px] font-mono text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Adobe Creative Cloud Stack (Photoshop, Illustrator, Premiere Pro, After Effects) */}
        <div className="rounded-3xl border border-white/10 bg-[#0e0f17] p-8 sm:p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-black"
                  style={{ backgroundColor: activeTheme.accentColor }}
                >
                  TOOL MASTERY
                </span>
                <span className="text-xs font-mono text-zinc-400">Industry-Standard Software Stack</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Adobe Creative Suite Specialization
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              4+ years of daily production across Adobe Photoshop, Illustrator, Premiere Pro, and After Effects for seamless multimedia workflows.
            </p>
          </div>

          {/* 4 Adobe Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {softwareStack.map((tool) => (
              <div
                key={tool.name}
                className="group rounded-2xl border border-white/10 bg-[#0a0a0f] p-5 transition-all duration-300 hover:border-white/20 hover:bg-[#12131d]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-black font-mono font-black text-sm shadow-md"
                    style={{ color: tool.color, borderColor: `${tool.color}40` }}
                  >
                    {tool.badge}
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-emerald-400 font-bold">
                    <CheckCheck className="h-3.5 w-3.5" />
                    <span>{tool.proficiency}</span>
                  </div>
                </div>

                <h4 className="font-heading text-sm font-bold text-white mb-1">
                  {tool.name}
                </h4>
                <div className="text-[11px] font-mono text-zinc-400 mb-3">
                  {tool.category}
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>

          {/* Workflow Ribbon CTA */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
              <Sparkles className="h-4 w-4 shrink-0" style={{ color: activeTheme.accentColor }} />
              <span>Ready to transform your brand identity, video edits, or social channels?</span>
            </div>

            <button
              onClick={onContactClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-black shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: activeTheme.accentColor,
                boxShadow: `0 0 20px -3px ${activeTheme.accentColor}60`,
              }}
            >
              <span>Get in Touch with Hiwa</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
