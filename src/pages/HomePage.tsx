import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import {
  getStats,
  getSolutions,
  getClientLogos,
  StatItem,
  SolutionItem,
  ClientLogoItem,
  getImageUrl,
  getHero,
  HeroContent,
  getSiteSettings,
  SiteSettings
} from '../api/client';
import { useModal } from '../context/ModalContext';

export const HomePage: React.FC = () => {
  const { openConsultationModal } = useModal();
  const [hero, setHero] = useState<HeroContent | null>(() => {
    try {
      const cached = localStorage.getItem('antrixx_hero_cache');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [settings, setSettings] = useState<SiteSettings | null>(() => {
    try {
      const cached = localStorage.getItem('antrixx_settings_cache');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [stats, setStats] = useState<StatItem[]>([]);
  const [solutions, setSolutions] = useState<SolutionItem[]>([]);
  const [clientLogos, setClientLogos] = useState<ClientLogoItem[]>([]);

  useEffect(() => {
    getHero().then((data) => {
      if (data) {
        setHero(data);
        try { localStorage.setItem('antrixx_hero_cache', JSON.stringify(data)); } catch {}
      }
    });
    getSiteSettings().then((data) => {
      if (data) {
        setSettings(data);
        try { localStorage.setItem('antrixx_settings_cache', JSON.stringify(data)); } catch {}
      }
    });
    getStats().then(setStats);
    getSolutions().then(setSolutions);
    getClientLogos().then(setClientLogos);
  }, []);

  const teaserSolutions = solutions.slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-inkBlack font-body">
      
      {/* ========================================================================= */}
      {/* 1. SIGMA-STYLE BANNER BOX (MASONRY GRID) */}
      {/* ========================================================================= */}
      <section className="pt-24 lg:pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto lg:h-[80vh] min-h-[600px]">
            
            {/* Left Main Banner */}
            <div className="relative rounded-2xl overflow-hidden banner-zoom-container group h-[400px] lg:h-full">
              <img 
                src={getImageUrl(hero?.hero_image_1) || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"} 
                alt="Industrial Plant" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-inkBlack/40 group-hover:bg-inkBlack/50 transition-colors duration-500"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end lg:justify-center z-10">
                <span className="text-amberAccent font-bold tracking-widest uppercase text-xs mb-3 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                  {hero?.badge || "Industrial Automation"}
                </span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  {hero?.headline || "Engineering Intelligence."}
                </h1>
                <Link to="/solutions" className="inline-flex items-center gap-2 text-white font-bold uppercase text-sm border-b-2 border-amberAccent pb-1 w-fit hover:text-amberAccent transition-colors animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                  Explore Solutions <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Side (2 Stacked Banners) */}
            <div className="grid grid-rows-2 gap-4 h-full">
              
              {/* Top Right Banner */}
              <div className="relative rounded-2xl overflow-hidden banner-zoom-container group h-[300px] lg:h-full">
                <img 
                  src={getImageUrl(hero?.hero_image_2) || "https://images.unsplash.com/photo-1580982327559-c1202864eb05?q=80&w=800&auto=format&fit=crop"} 
                  alt="Telemetry" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-inkBlack/30 group-hover:bg-inkBlack/40 transition-colors duration-500"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 text-center items-center">
                  <h2 className="font-display text-3xl font-extrabold text-white mb-4">
                    {hero?.card_2_title || "SCADA Telemetry"}
                  </h2>
                  <Link to={hero?.card_2_link || "/solutions/utility-remote-monitoring"} className="inline-flex items-center gap-2 text-white font-bold uppercase text-xs border-b-2 border-white pb-1 w-fit hover:text-amberAccent hover:border-amberAccent transition-colors">
                    Shop System <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Bottom Right Banner */}
              <div className="relative rounded-2xl overflow-hidden banner-zoom-container group h-[300px] lg:h-full">
                <img 
                  src={getImageUrl(hero?.hero_image_3) || "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?q=80&w=800&auto=format&fit=crop"} 
                  alt="Pollution Control" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-inkBlack/30 group-hover:bg-inkBlack/40 transition-colors duration-500"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 text-center items-center">
                  <h2 className="font-display text-3xl font-extrabold text-white mb-4">
                    {hero?.card_3_title || "Environment Control"}
                  </h2>
                  <Link to={hero?.card_3_link || "/solutions/pollution-control-equipment"} className="inline-flex items-center gap-2 text-white font-bold uppercase text-xs border-b-2 border-white pb-1 w-fit hover:text-amberAccent hover:border-amberAccent transition-colors">
                    Explore Solutions <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATS STRIP (Clean Light Design) */}
      {/* ========================================================================= */}
      {stats && stats.length > 0 && (
        <section className="py-12 bg-offWhite border-y border-gray200">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-8 divide-x divide-gray200 text-center`}>
              {stats.slice(0, 4).map((stat) => (
                <div key={stat.id} className="px-4">
                  <p className="font-display text-4xl font-extrabold text-inkBlack mb-1">
                    {stat.value_number}<span className="text-amberAccent">{stat.suffix}</span>
                  </p>
                  <p className="text-xs font-bold text-gray500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. APPLICATION BOX (SOLUTIONS GRID) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="font-display text-4xl font-extrabold text-inkBlack mb-4">Our Core Applications</h2>
          <p className="text-gray500 max-w-2xl mx-auto">Explore our high-efficiency automation and environmental engineering solutions designed for scale.</p>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {teaserSolutions.map((sol, idx) => (
              <Link 
                key={sol.id} 
                to={`/solutions/${sol.slug}`}
                className="relative rounded-xl overflow-hidden banner-zoom-container group aspect-[4/3] bg-offWhite block"
              >
                {/* Fallback pattern if no image */}
                <div className="absolute inset-0 bg-inkBlack/5 group-hover:bg-inkBlack/0 transition-colors z-10"></div>
                <img 
                  src={getImageUrl(sol.hero_image_url) || `https://images.unsplash.com/photo-${1500000000000 + idx}?q=80&w=600&auto=format&fit=crop`}
                  alt={sol.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-inkBlack/80 via-inkBlack/20 to-transparent z-10"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-amberAccent transition-colors">
                    {sol.title}
                  </h3>
                  <div className="w-10 h-1 bg-amberAccent mb-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    {sol.short_description}
                  </p>
                </div>
              </Link>
            ))}

          </div>

          <div className="text-center mt-12">
             <Link
              to="/solutions"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-inkBlack text-inkBlack hover:bg-inkBlack hover:text-white font-bold uppercase text-xs tracking-wider transition-all"
            >
              View All Applications
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ASSOCIATE BOX (CLIENT LOGOS) */}
      {/* ========================================================================= */}
      <section className="py-20 bg-offWhite border-t border-b border-gray200 overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <h2 className="font-display text-3xl font-extrabold text-inkBlack">Our Associates & Clients</h2>
        </div>

        <div className="relative flex gap-0 overflow-hidden max-w-[1400px] mx-auto">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-offWhite to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-offWhite to-transparent" />

          <div className="flex gap-8 animate-marquee whitespace-nowrap min-w-max px-4 items-center">
            {[...clientLogos, ...clientLogos].map((client, idx) => (
              <div
                key={`${client.id}-${idx}`}
                className="flex items-center justify-center px-6 py-4 rounded-xl bg-white shadow-sm border border-gray200 hover:border-amberAccent transition-colors shrink-0 w-[180px] h-[100px]"
              >
                {client.logo_url ? (
                  <img
                    src={getImageUrl(client.logo_url)}
                    alt={client.name}
                    className="h-full w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-bold text-sm text-gray500">{client.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CONTACT CTA BOX */}
      {/* ========================================================================= */}
      <section className="py-24 bg-inkBlack text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-6">Let's Build the Future</h2>
          <p className="text-gray-400 mb-10">
            Contact us for expert turnkey solutions in thermal engineering, boiler automation, and utility management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => openConsultationModal('Thermal & Process Solutions Consultation')}
              className="px-8 py-4 bg-amberAccent text-inkBlack font-bold uppercase text-sm tracking-wider rounded hover:bg-white transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <a
              href={`tel:${settings?.phone_primary?.replace(/\s+/g, '') || '+919748636108'}`}
              className="px-8 py-4 border border-gray-600 text-white font-bold uppercase text-sm tracking-wider rounded hover:border-white transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call {settings?.phone_primary || '+91 9748636108'}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
