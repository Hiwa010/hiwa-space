import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  RotateCcw, 
  Sparkles, 
  Palette, 
  Type, 
  Layout, 
  Check,
  Layers,
  Sliders
} from 'lucide-react';
import { SiteConfig, ThemePreset } from '../types';
import { COLOR_PALETTES, DEFAULT_THEMES, INITIAL_SITE_CONFIG } from '../data/defaultContent';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onChangeConfig: (newConfig: SiteConfig) => void;
  activeTheme: ThemePreset;
  onSelectTheme: (idx: number) => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  activeTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  const handleTextChange = (field: keyof SiteConfig, value: string) => {
    onChangeConfig({
      ...config,
      [field]: value,
    });
  };

  const handleSkillChange = (idx: number, newLabel: string) => {
    const updatedSkills = [...config.skills];
    updatedSkills[idx] = {
      ...updatedSkills[idx],
      label: newLabel,
    };
    onChangeConfig({
      ...config,
      skills: updatedSkills,
    });
  };

  const handleColorSelect = (palette: typeof COLOR_PALETTES[0]) => {
    onChangeConfig({
      ...config,
      accentColor: palette.hex,
      accentGlow: palette.glow,
    });
  };

  const handleReset = () => {
    onChangeConfig({
      ...INITIAL_SITE_CONFIG,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Drawer Window */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-[#0e0f17] border-l border-white/15 text-white shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 bg-[#12131d]">
              <div className="flex items-center gap-2.5">
                <Sliders className="h-5 w-5" style={{ color: config.accentColor }} />
                <div>
                  <h3 className="font-heading text-base font-bold text-white">
                    Live Page Customizer
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400">
                    Real-time text, accent colors & hero layout
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Theme Preset Switcher */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="h-4 w-4" style={{ color: config.accentColor }} />
                  Learning Theme Preset
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {DEFAULT_THEMES.map((theme, idx) => {
                    const isSelected = config.activeThemeIndex === idx;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => onSelectTheme(idx)}
                        className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                          isSelected
                            ? 'border-white/30 bg-white/10 font-bold text-white'
                            : 'border-white/10 bg-black/40 text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="font-mono text-xs font-bold"
                            style={{ color: isSelected ? config.accentColor : '#71717a' }}
                          >
                            {theme.indexNumber}
                          </span>
                          <span className="text-xs">{theme.name}</span>
                        </div>
                        {isSelected && <Check className="h-4 w-4" style={{ color: config.accentColor }} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accent Color Palette */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                  <Palette className="h-4 w-4" style={{ color: config.accentColor }} />
                  Theme Accent Color (Dark Mode Only)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_PALETTES.map((palette) => {
                    const isSelected = config.accentColor.toLowerCase() === palette.hex.toLowerCase();
                    return (
                      <button
                        key={palette.hex}
                        onClick={() => handleColorSelect(palette)}
                        title={palette.name}
                        className={`flex flex-col items-center justify-center rounded-xl border p-2 text-center transition-all ${
                          isSelected ? 'border-white bg-white/15' : 'border-white/10 bg-black/40 hover:bg-white/5'
                        }`}
                      >
                        <span
                          className="h-6 w-6 rounded-full shadow-inner mb-1"
                          style={{ backgroundColor: palette.hex }}
                        />
                        <span className="text-[10px] text-zinc-400 truncate w-full">
                          {palette.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Color Input */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs font-mono text-zinc-400">Custom Hex:</span>
                  <input
                    type="color"
                    value={config.accentColor}
                    onChange={(e) => handleTextChange('accentColor', e.target.value)}
                    className="h-7 w-10 cursor-pointer rounded border border-white/20 bg-transparent"
                  />
                  <input
                    type="text"
                    value={config.accentColor}
                    onChange={(e) => handleTextChange('accentColor', e.target.value)}
                    className="w-24 rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-xs font-mono text-white"
                  />
                </div>
              </div>

              {/* Community Identity Fields */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                  <Type className="h-4 w-4" style={{ color: config.accentColor }} />
                  Hero & Community Text
                </label>

                {/* Community Name */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400">Community Name:</span>
                  <input
                    type="text"
                    value={config.communityName}
                    onChange={(e) => handleTextChange('communityName', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white focus:border-white/30 focus:outline-none"
                  />
                </div>

                {/* Small Intro Line */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400">Small Intro Line:</span>
                  <input
                    type="text"
                    value={config.heroIntro}
                    onChange={(e) => handleTextChange('heroIntro', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white focus:border-white/30 focus:outline-none"
                  />
                </div>

                {/* Main Two-Line Title */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-zinc-400">Title Line 1:</span>
                    <input
                      type="text"
                      value={config.heroTitleLine1}
                      onChange={(e) => handleTextChange('heroTitleLine1', e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white focus:border-white/30 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-zinc-400">Title Line 2:</span>
                    <input
                      type="text"
                      value={config.heroTitleLine2}
                      onChange={(e) => handleTextChange('heroTitleLine2', e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white focus:border-white/30 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Subheadline */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400">Right Subheadline:</span>
                  <input
                    type="text"
                    value={config.subheadline}
                    onChange={(e) => handleTextChange('subheadline', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white focus:border-white/30 focus:outline-none"
                  />
                </div>

                {/* Supporting Paragraph */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400">Supporting Paragraph (1-3 lines):</span>
                  <textarea
                    rows={3}
                    value={config.paragraph}
                    onChange={(e) => handleTextChange('paragraph', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-xs text-white focus:border-white/30 focus:outline-none"
                  />
                </div>
              </div>

              {/* 4 Skill Highlights */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                  <Layout className="h-4 w-4" style={{ color: config.accentColor }} />
                  Skill / Focus Indicators
                </label>
                <div className="space-y-2">
                  {config.skills.map((skill, idx) => (
                    <div key={skill.id} className="flex items-center gap-2">
                      <span className="font-mono text-xs text-zinc-400 w-8">{skill.index}</span>
                      <input
                        type="text"
                        value={skill.label}
                        onChange={(e) => handleSkillChange(idx, e.target.value)}
                        className="flex-1 rounded-xl border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white focus:border-white/30 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer Action Controls */}
            <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 bg-[#12131d]">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                onClick={onClose}
                className="rounded-xl px-5 py-2 text-xs font-bold text-black transition-all hover:scale-105"
                style={{ backgroundColor: config.accentColor }}
              >
                Done Editing
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
