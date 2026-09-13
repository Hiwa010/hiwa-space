import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Image as ImageIcon, 
  Film, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  Wrench, 
  Play, 
  Layers,
  Clapperboard,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { ThemePreset, PortfolioItem } from '../types';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from '../data/defaultContent';
import { PortfolioModal } from './PortfolioModal';
import { ProjectImageSlider } from './ProjectImageSlider';

interface PortfolioGridSectionProps {
  activeTheme: ThemePreset;
  onContactClick: () => void;
}

export const PortfolioGridSection: React.FC<PortfolioGridSectionProps> = ({
  activeTheme,
  onContactClick,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'Logo & Branding':
        return Compass;
      case 'Posters & Covers':
        return ImageIcon;
      case 'Video Editing':
        return Film;
      case 'Motion Graphics':
        return Zap;
      case 'Movie Edits':
        return Clapperboard;
      case 'Anime Edits':
        return Flame;
      case 'Fun & Casual Edits':
        return Sparkles;
      default:
        return Layers;
    }
  };

  const filteredItems = activeCategory === 'all' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="relative w-full py-24 md:py-32 bg-[#090a0f] text-white border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase"
            style={{ color: activeTheme.accentColor }}
          >
            PORTFOLIO & CREATIVE DISCIPLINES
          </span>
          <span className="h-[1px] w-12 bg-zinc-800" />
        </div>

        {/* Section Heading */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Creative Work Showcase
            </h2>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-zinc-300">
              Explore curated projects across brand identity, print & digital key visuals, commercial video editing, motion graphics, movie tributes, and anime AMV cuts.
            </p>
          </div>

          <button
            onClick={onContactClick}
            className="self-start md:self-auto flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-white/10 hover:text-white transition-all"
          >
            <span>Request Custom Project</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Category Filter Pills (All Works, Logo & Branding, Posters & Covers, Video Editing, Motion Graphics, Movie Edits, Anime Edits) */}
        <div className="mb-10 flex flex-wrap items-center gap-2 sm:gap-3">
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const Icon = cat.id !== 'all' ? getCategoryIcon(cat.id) : Layers;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 ${
                  isSelected
                    ? 'text-black font-bold shadow-lg'
                    : 'border border-white/10 bg-[#0e0f17] text-zinc-300 hover:border-white/20 hover:bg-white/5 hover:text-white'
                }`}
                style={isSelected ? { backgroundColor: activeTheme.accentColor } : {}}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-black' : 'text-zinc-400'}`} />
                <span>{cat.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                    isSelected ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-zinc-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 6 Category Highlights Grid Banners when All is selected */}
        {activeCategory === 'all' && (
          <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: 'Video Editing',
                title: 'Video Editing',
                icon: Film,
                desc: 'Speed ramping, sound design & cinematic 4K commercial cuts.',
                count: '0 Featured',
              },
              {
                id: 'Posters & Covers',
                title: 'Posters & Covers',
                icon: ImageIcon,
                desc: 'Album art, festival key visuals & Swiss typography prints.',
                count: '1 Featured',
              },
              {
                id: 'Motion Graphics',
                title: 'Motion Graphics',
                icon: Zap,
                desc: 'Kinetic typo, 3D particle logos & tactile UI micro-animations.',
                count: '1 Featured',
              },
              {
                id: 'Movie Edits',
                title: 'Movie Edits',
                icon: Clapperboard,
                desc: 'Atmospheric scene montages, dialogue pacing & blockbuster soundscapes.',
                count: '2 Featured',
              },
              {
                id: 'Anime Edits',
                title: 'Anime Edits',
                icon: Flame,
                desc: 'Beat-synced AMVs, optical flow speed ramps & anime VFX.',
                count: '1 Featured',
              },
              {
                id: 'Fun & Casual Edits',
                title: 'Fun & Casual Edits',
                icon: Sparkles,
                desc: 'Playful meme cuts, comedic zooms & viral gaming reels.',
                count: '4 Featured',
              },
              {
                id: 'Logo & Branding',
                title: 'Logo & Branding',
                icon: Compass,
                desc: 'Geometric marks, monograms & responsive brand systems.',
                count: '2 Featured',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveCategory(card.id)}
                  className="cursor-pointer group rounded-2xl border border-white/10 bg-[#0e0f17] p-5 transition-all duration-300 hover:border-white/25 hover:bg-[#12131e] hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/60 shadow-inner group-hover:scale-110 transition-transform"
                      style={{ color: activeTheme.accentColor }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {card.count}
                    </span>
                  </div>
                  <h3 className="font-heading text-sm font-bold text-white mb-1 group-hover:text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic Portfolio Items Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredItems.map((item) => {
              const Icon = getCategoryIcon(item.category);
              const isVideoOrMotion = item.category === 'Video Editing' || item.category === 'Motion Graphics' || item.category === 'Movie Edits' || item.category === 'Anime Edits' || item.category === 'Fun & Casual Edits';

              const getVideoBadgeLabel = () => {
                switch (item.category) {
                  case 'Movie Edits':
                    return 'Cinema Cut';
                  case 'Anime Edits':
                    return 'AMV Flow';
                  case 'Fun & Casual Edits':
                    return 'Fun Reel';
                  case 'Video Editing':
                    return '4K Cut';
                  case 'Motion Graphics':
                    return '60 FPS';
                  default:
                    return 'Watch';
                }
              };

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0e0f17] transition-all duration-300 hover:border-white/30 hover:bg-[#12131e] hover:-translate-y-1 shadow-xl"
                >
                  {/* Interactive Media Slider / Visual Preview */}
                  <div className="relative w-full overflow-hidden bg-black/80">
                    <ProjectImageSlider
                      item={item}
                      activeTheme={activeTheme}
                      onImageClick={() => setSelectedItem(item)}
                    />

                    {/* Play/Inspection Floating Badge for Video & Motion */}
                    {isVideoOrMotion && (
                      <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-[10px] font-mono text-zinc-300 backdrop-blur-sm pointer-events-none">
                        <Play className="h-2.5 w-2.5 fill-current text-orange-400" />
                        <span>{getVideoBadgeLabel()}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content Details */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      {/* Client info */}
                      <div className="mb-1.5 text-[11px] font-mono text-zinc-400">
                        Client: <span className="text-zinc-200">{item.client}</span>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-heading text-lg font-bold text-white transition-colors group-hover:text-white mb-2 line-clamp-1">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 mb-4">
                        {item.description}
                      </p>

                      {/* Tools Used Chips */}
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {item.tools.slice(0, 3).map((tool, idx) => (
                          <span
                            key={idx}
                            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-zinc-300"
                          >
                            {tool}
                          </span>
                        ))}
                        {item.tools.length > 3 && (
                          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                            +{item.tools.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Highlight Metric & Inspection Action */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="text-[11px] font-mono text-zinc-400 truncate max-w-[170px]">
                        {item.highlightMetric || item.deliverables[0]}
                      </div>

                      <button
                        id={`btn-view-portfolio-${item.id}`}
                        onClick={() => setSelectedItem(item)}
                        className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/15 hover:text-white transition-all shadow-sm group-hover:border-white/30"
                      >
                        {isVideoOrMotion ? (
                          <>
                            <Play className="h-3.5 w-3.5 fill-current text-orange-400" />
                            <span>Watch</span>
                          </>
                        ) : (
                          <>
                            <Eye className="h-3.5 w-3.5" style={{ color: activeTheme.accentColor }} />
                            <span>Inspect</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Portfolio Item Detail Lightbox Modal */}
      <PortfolioModal
        item={selectedItem}
        activeTheme={activeTheme}
        onClose={() => setSelectedItem(null)}
        onContactClick={onContactClick}
      />
    </section>
  );
};
