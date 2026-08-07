import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  Building2,
  CheckCircle2,
  TrendingUp,
  Award,
  PhoneCall,
  Filter,
} from 'lucide-react';
import { getProjects, getClientLogos, ProjectItem, ClientLogoItem } from '../api/client';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [clientLogos, setClientLogos] = useState<ClientLogoItem[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  useEffect(() => {
    getProjects().then(setProjects);
    getClientLogos().then(setClientLogos);
  }, []);

  const industriesList = ['All', 'Food Processing & FMCG', 'Rice & Agro Processing', 'Beverages', 'General Manufacturing'];

  const filteredProjects =
    selectedIndustry === 'All'
      ? projects
      : projects.filter((p) => p.industry.toLowerCase().includes(selectedIndustry.toLowerCase()));

  return (
    <div className="min-h-screen bg-white text-inkBlack pt-24 pb-20 font-body">
      
      {/* 1. Header Banner */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden banner-zoom-container bg-inkBlack group border-b border-gray200">
        <img 
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1920&auto=format&fit=crop" 
          alt="Projects Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-inkBlack/70 z-10 group-hover:bg-inkBlack/60 transition-colors duration-500"></div>
        <div className="relative z-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
            <Link to="/" className="hover:text-amberAccent transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-amberAccent">PROJECTS</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Delivering Engineering Excellence <br />
            <span className="text-amberAccent">Across Industries.</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal mt-6 max-w-2xl mx-auto">
            Explore our successfully executed turnkey boiler house automation, steam fuel tracking, bag filter erection, and balance-of-plant projects for India's leading process manufacturing plants.
          </p>
        </div>
      </section>

      {/* 2. Projects Filter & Case Studies Grid */}
      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Industry Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-amberAccent shrink-0 mr-2" />
            {industriesList.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-4 py-2 rounded-full text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedIndustry === ind
                    ? 'bg-amberAccent text-white shadow-amberGlow'
                    : 'bg-offWhite text-gray-600 hover:bg-gray200 border border-gray200'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* 4 Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="group bg-white rounded-2xl border border-gray200 shadow-cardLight hover:shadow-cardHover hover:border-amberAccent transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Image Header */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={proj.image_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inkBlack/80 via-inkBlack/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-inkBlack text-[10px] font-display font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-amberAccent" />
                      {proj.client_name}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold text-amberAccent uppercase tracking-widest block">
                      {proj.industry}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white leading-tight">
                      {proj.title}
                    </h3>
                    <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-amberAccent" /> {proj.location}
                    </p>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        The Challenge
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed font-normal">
                        {proj.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Antrixx Engineering Solution
                      </h4>
                      <p className="text-xs text-inkBlack leading-relaxed font-medium">
                        {proj.solution}
                      </p>
                    </div>

                    {/* Results / Key Metrics Pills */}
                    {proj.results && proj.results.length > 0 && (
                      <div className="pt-3 border-t border-gray200 space-y-2">
                        <span className="text-[10px] font-bold text-amberAccent uppercase tracking-widest flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> QUANTIFIED PROJECT RESULTS
                        </span>
                        <div className="space-y-1.5">
                          {proj.results.map((res, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs font-bold text-inkBlack bg-offWhite p-2.5 rounded-lg border border-gray200">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span>{res}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray200">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-amberAccent hover:text-amberAccentDark uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                    >
                      REQUEST SIMILAR PROJECT AUDIT <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. FULL ENTERPRISE CLIENT LOGO WALL (ALL 10 PDF CLIENTS VISIBLE) */}
      <section className="py-20 bg-offWhite border-t border-b border-gray200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
              OUR TRUSTED ENTERPRISE CLIENTS
            </span>
            <h2 className="font-display text-3xl font-extrabold text-inkBlack">
              Powering India's Leading Industrial Plants
            </h2>
            <p className="text-xs text-gray-600">
              Every client extracted directly from our corporate engineering profile:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {clientLogos.map((c) => (
              <div
                key={c.id}
                className="p-6 rounded-2xl bg-white border border-gray200 shadow-cardLight hover:shadow-cardHover hover:border-amberAccent transition-all flex flex-col items-center justify-center gap-3 group"
              >
                <div className="w-16 h-16 flex items-center justify-center mb-2">
                  <img
                    src={c.logo_url || 'https://via.placeholder.com/150'}
                    alt={c.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=' + c.name.charAt(0);
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-inkBlack group-hover:text-amberAccent transition-colors">
                    {c.name}
                  </h4>
                  <span className="text-[9px] font-sans font-bold text-gray-400 uppercase tracking-widest block mt-0.5">
                    Verified Enterprise Client
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA Callout */}
      <section className="py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-offWhite via-white to-offWhite p-8 border border-gray200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
                HAVE A PROJECT IN MIND?
              </span>
              <h3 className="font-display text-xl font-extrabold text-inkBlack">
                Let's Discuss How We Can Optimize Your Plant Efficiency
              </h3>
              <p className="text-xs text-gray-600 max-w-xl">
                Our thermal and controls engineers are available for immediate on-site plant surveys and technical consultations.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-md bg-amberAccent hover:bg-amberAccentDark text-white font-display font-bold text-xs uppercase tracking-wider shadow-amberGlow shrink-0 flex items-center gap-2"
            >
              SCHEDULE ON-SITE AUDIT <PhoneCall className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
