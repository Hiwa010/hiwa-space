import React, { useState, useEffect } from 'react';
import { SiteConfig, ThemePreset } from './types';
import { INITIAL_SITE_CONFIG, DEFAULT_THEMES } from './data/defaultContent';
import { Navbar } from './components/Navbar';
import { HeroParallax } from './components/HeroParallax';
import { PortfolioGridSection } from './components/PortfolioGridSection';
import { AboutMeSection } from './components/AboutMeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomizerDrawer } from './components/CustomizerDrawer';
import { JoinModal } from './components/JoinModal';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);

  const activeTheme: ThemePreset = DEFAULT_THEMES[config.activeThemeIndex] || DEFAULT_THEMES[0];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-accent', config.accentColor);
    root.style.setProperty('--theme-accent-glow', config.accentGlow || `${config.accentColor}50`);
  }, [config.accentColor, config.accentGlow]);

  const handleThemeChange = (index: number) => {
    const selected = DEFAULT_THEMES[index];
    if (!selected) return;

    setConfig((prev) => ({
      ...prev,
      activeThemeIndex: index,
      accentColor: selected.accentColor,
      accentGlow: selected.accentGlow,
      heroIntro: selected.heroIntro,
      heroTitleLine1: selected.heroTitleLine1,
      heroTitleLine2: selected.heroTitleLine2,
      subheadline: selected.subheadline,
      paragraph: selected.paragraph,
    }));
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-[#f2f2f4] selection:bg-orange-500/30 selection:text-orange-200">
      
      <Navbar
        communityName={config.communityName}
        activeTheme={activeTheme}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onJoinClick={() => setIsJoinModalOpen(true)}
      />

      <HeroParallax
        config={config}
        activeTheme={activeTheme}
        onThemeChange={handleThemeChange}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onJoinClick={() => setIsJoinModalOpen(true)}
      />

      <PortfolioGridSection
        activeTheme={activeTheme}
        onContactClick={() => setIsJoinModalOpen(true)}
      />

      <AboutMeSection
        activeTheme={activeTheme}
        onContactClick={() => setIsJoinModalOpen(true)}
      />

      <ContactSection
        activeTheme={activeTheme}
      />

      <Footer
        communityName={config.communityName}
        activeTheme={activeTheme}
      />

      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onChangeConfig={setConfig}
        activeTheme={activeTheme}
        onSelectTheme={handleThemeChange}
      />

      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        communityName={config.communityName}
        activeTheme={activeTheme}
      />

      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="btn-floating-quick-customizer"
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/80 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:border-white/40 active:scale-95"
          style={{
            boxShadow: `0 0 25px -4px ${config.accentColor}50`,
          }}
        >
          <span
            className="h-2 w-2 rounded-full animate-ping"
            style={{ backgroundColor: config.accentColor }}
          />
          <span>Customize Page</span>
        </button>
      </div>

    </div>
  );
}
