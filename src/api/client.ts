export interface HeroContent {
  id: string;
  badge: string;
  headline: string;
  accent_text: string;
  description: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  background_image_url?: string;
  hero_image_1?: string;
  hero_image_2?: string;
  hero_image_3?: string;
  card_2_title?: string;
  card_2_link?: string;
  card_3_title?: string;
  card_3_link?: string;
  scada_plant_efficiency: number;
  scada_steam_flow: number;
  scada_fuel_consumption: number;
  scada_energy_saved_mwh: number;
  is_published: boolean;
}

export interface StatItem {
  id: string;
  label: string;
  value_number: number;
  suffix: string;
  description?: string;
  icon_name: string;
}

export interface SolutionSubProduct {
  id: string;
  name: string;
  image_url: string;
  description?: string;
  technical_specs: Record<string, string>;
}

export interface SolutionScopeCard {
  title: string;
  description: string;
  icon_name?: string;
}

export interface SolutionBadge {
  title: string;
  desc: string;
  icon_name?: string;
}

export interface SolutionItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  short_description: string;
  full_description: string;
  icon_name: string;
  hero_image_url?: string;
  badge_highlights?: SolutionBadge[];
  scope_cards?: SolutionScopeCard[];
  products_and_services?: string[];
  sub_products?: SolutionSubProduct[];
  features: string[];
  deliverables: string[];
  technical_specs?: Record<string, string>;
}

export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon_name: string;
  image_url?: string;
  key_benefits: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client_name: string;
  industry: string;
  location: string;
  challenge: string;
  solution: string;
  results: string[];
  image_url?: string;
}

export interface ClientLogoItem {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
}

export interface AboutContent {
  id: string;
  company_story: string;
  mission: string;
  vision: string;
  values: string[];
  capabilities: string[];
  hero_image_url?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image_url?: string;
  linkedin_url?: string;
}

export interface ResourcePost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  cover_image_url?: string;
  download_file_url?: string;
  published_date: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  featured_image_url?: string;
  meta_title?: string;
  meta_description?: string;
  is_published: boolean;
  created_at?: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SiteSettings {
  id: string;
  phone_primary: string;
  phone_secondary: string;
  email: string;
  address: string;
  business_hours: string;
  linkedin_url?: string;
  brochure_pdf_url?: string;
  solutions_hero_title?: string;
  solutions_hero_description?: string;
  solutions_hero_image_url?: string;
  solutions_hero_badge?: string;
}

const isLocal = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const API_BASE = isLocal 
  ? 'http://localhost:5000/api' 
  : (import.meta.env.VITE_API_URL || 'https://antrixx-backend.vercel.app/api');

export const getImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads')) {
    const baseUrl = isLocal 
      ? 'http://localhost:5000' 
      : (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api(\/admin)?$/, '') : 'https://antrixx-backend.vercel.app');
    return `${baseUrl}${path}`;
  }
  return path;
};

export const getHero = async (): Promise<HeroContent> => {
  return getHeroContent();
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  return fetchJson<SiteSettings>('/site-settings', {
    id: 'settings-1',
    phone_primary: '+91 98310 00000',
    phone_secondary: '+91 33 2200 0000',
    email: 'info@antrixxtechnology.com',
    address: 'Kolkata, West Bengal, India',
    business_hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
  });
};

async function fetchJson<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[API Client] Error fetching ${endpoint}, using fallback:`, err);
    return fallback;
  }
}

export const getHeroContent = () =>
  fetchJson<HeroContent>('/hero', {
    id: 'hero-1',
    badge: 'INDUSTRIAL AUTOMATION & ENERGY SOLUTIONS',
    headline: 'Engineering Intelligence.',
    accent_text: 'Powering Industries.',
    description: 'Antrixx Technology delivers high-efficiency boiler house automation, utility remote monitoring, pollution control systems, and balance-of-plant management tailored for enterprise manufacturing.',
    primary_cta_text: 'EXPLORE SOLUTIONS',
    primary_cta_link: '/solutions',
    secondary_cta_text: 'DOWNLOAD BROCHURE',
    secondary_cta_link: '/resources/downloads',
    scada_plant_efficiency: 94,
    scada_steam_flow: 12.45,
    scada_fuel_consumption: 850,
    scada_energy_saved_mwh: 1240,
    is_published: true,
  });

export const getStats = () =>
  fetchJson<StatItem[]>('/stats', [
    { id: 's1', label: 'Projects Completed', value_number: 500, suffix: '+', icon_name: 'Factory' },
    { id: 's2', label: 'Client Satisfaction', value_number: 98, suffix: '%', icon_name: 'Smile' },
    { id: 's3', label: 'Technical Support', value_number: 24, suffix: 'x7', icon_name: 'Headphones' },
    { id: 's4', label: 'Industrial Solutions', value_number: 15, suffix: '+', icon_name: 'Cpu' },
    { id: 's5', label: 'Years of Excellence', value_number: 10, suffix: '+', icon_name: 'ShieldCheck' },
  ]);

export const getSolutions = () => fetchJson<SolutionItem[]>('/solutions', []);
export const getSolutionBySlug = (slug: string) => fetchJson<SolutionItem | null>(`/solutions/${slug}`, null);
export const getIndustries = () => fetchJson<IndustryItem[]>('/industries', []);
export const getProjects = () => fetchJson<ProjectItem[]>('/projects', []);
export const getClientLogos = () => fetchJson<ClientLogoItem[]>('/client-logos', []);
export const getAbout = () => fetchJson<AboutContent>('/about', {
  id: 'about-1',
  company_story: 'Antrixx Technology was established by veteran thermal and utility automation engineers dedicated to optimizing industrial energy efficiency across India.',
  mission: 'To transform industrial utility operations through smart automation and energy loss diagnostics.',
  vision: 'To be South Asia’s most trusted thermal optimization partner.',
  values: ['Industrial Reliability', 'Data-Backed Integrity', 'Pan-India SLA Agility'],
  capabilities: ['Boiler House Automation', 'Remote Telemetry', 'Pollution Control', 'Steam Engineering'],
  hero_image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
});
export const getTeam = () => fetchJson<TeamMember[]>('/team', []);
export const getResources = () => fetchJson<ResourcePost[]>('/resources', []);
export const getResourceBySlug = (slug: string) => fetchJson<ResourcePost | null>(`/resources/${slug}`, null);
export const getJobOpenings = () => fetchJson<JobOpening[]>('/job-openings', []);
export const getFaqs = () => fetchJson<FaqItem[]>('/faqs', []);
export const getBlogs = () => fetchJson<BlogPost[]>('/blogs', []);
export const getBlogBySlug = (slug: string) => fetchJson<BlogPost | null>(`/blogs/${slug}`, null);
