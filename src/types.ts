export interface ThemePreset {
  id: string;
  name: string;
  accentColor: string;
  accentGlow: string;
  badge: string;
  heroIntro: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  subheadline: string;
  paragraph: string;
  indexNumber: string;
  tagline: string;
}

export interface SkillHighlight {
  id: string;
  index: string;
  label: string;
}

export interface SiteConfig {
  communityName: string;
  tagline: string;
  heroIntro: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  subheadline: string;
  paragraph: string;
  accentColor: string;
  accentGlow: string;
  skills: SkillHighlight[];
  activeThemeIndex: number;
}

export interface GallerySlide {
  url: string;
  label?: string;
  remoteUrl?: string;
  type?: 'image' | 'video';
  poster?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Logo & Branding' | 'Posters & Covers' | 'Video Editing' | 'Motion Graphics' | 'Movie Edits' | 'Anime Edits' | 'Fun & Casual Edits';
  client: string;
  year: string;
  description: string;
  image: string;
  gallery?: Array<GallerySlide | string>;
  videoPreview?: string;
  tags: string[];
  tools: string[];
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  deliverables: string[];
  highlightMetric?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  lessonsCount: number;
  description: string;
  longDescription: string;
  iconName: string;
  skills: string[];
  tools: string[];
  curriculum: { module: string; topics: string[] }[];
  accentBorderColor?: string;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  builder: string;
  creatorRole: string;
  category: string;
  platform: 'Google AI Studio' | 'Firebase Studio' | 'Opal' | 'Motion Web' | 'Motion Graphics Demos' | 'Full Stack';
  description: string;
  image: string;
  metrics: string;
  tags: string[];
  demoUrl?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  category: 'Designer' | 'Founder' | 'Hobbyist' | 'Developer' | 'Agency Owner';
  avatar: string;
  quote: string;
  achievement: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
