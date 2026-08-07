import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Utensils,
  Coffee,
  Layers,
  Wheat,
  FlaskConical,
  Factory,
  Zap,
  CheckCircle2,
  PhoneCall,
  Flame,
} from 'lucide-react';
import { getIndustries, IndustryItem } from '../api/client';

function renderIndustryIcon(iconName: string) {
  const props = { className: 'w-6 h-6 text-amberAccent' };
  switch (iconName) {
    case 'Utensils': return <Utensils {...props} />;
    case 'Coffee': return <Coffee {...props} />;
    case 'Layers': return <Layers {...props} />;
    case 'Wheat': return <Wheat {...props} />;
    case 'FlaskConical': return <FlaskConical {...props} />;
    case 'Factory': return <Factory {...props} />;
    case 'Zap': return <Zap {...props} />;
    default: return <Factory {...props} />;
  }
}

export const IndustriesPage: React.FC = () => {
  const [industries, setIndustries] = useState<IndustryItem[]>([]);

  useEffect(() => {
    getIndustries().then(setIndustries);
  }, []);

  return (
    <div className="min-h-screen bg-white text-inkBlack pt-24 pb-20 font-body">
      
      {/* 1. Header Banner */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden banner-zoom-container bg-inkBlack group border-b border-gray200">
        <img 
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1920&auto=format&fit=crop" 
          alt="Industries Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-inkBlack/70 z-10 group-hover:bg-inkBlack/60 transition-colors duration-500"></div>
        <div className="relative z-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
            <Link to="/" className="hover:text-amberAccent transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-amberAccent">INDUSTRIES</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Engineering Solutions for <br />
            <span className="text-amberAccent">Every Industry Vertical.</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal mt-6 max-w-2xl mx-auto">
            Our specialized thermal engineering and automation solutions help diverse process manufacturing plants improve fuel economy, ensure environmental compliance, and drive sustainable operational growth across India.
          </p>
        </div>
      </section>

      {/* 2. Industries 6-Card Grid */}
      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <div
                key={ind.id}
                className="group bg-white rounded-2xl border border-gray200 shadow-cardLight hover:shadow-cardHover hover:border-amberAccent transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Image & Icon Header */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={ind.image_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'}
                    alt={ind.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inkBlack/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white text-amberAccent border border-gray200 shadow-md">
                      {renderIndustryIcon(ind.icon_name)}
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {ind.title}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      {ind.description}
                    </p>

                    {/* Key Benefits Checklist */}
                    {ind.key_benefits && ind.key_benefits.length > 0 && (
                      <div className="pt-3 border-t border-gray200 space-y-2">
                        <span className="text-[10px] font-bold text-amberAccent uppercase tracking-widest block">
                          KEY INDUSTRY BENEFITS
                        </span>
                        {ind.key_benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amberAccent shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray200/50">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-amberAccent hover:text-amberAccentDark uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                    >
                      CONTACT FOR CONSULTATION <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Industry Consultation CTA Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-offWhite via-white to-offWhite p-8 border border-gray200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
                SPECIALIZED UTILITY AUDITS
              </span>
              <h3 className="font-display text-xl font-extrabold text-inkBlack">
                Looking for Engineering Solutions Tailored to Your Specific Industry?
              </h3>
              <p className="text-xs text-gray-600 max-w-xl">
                Our thermal experts conduct on-site utility loss diagnosis and custom boiler automation engineering across India.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-md bg-amberAccent hover:bg-amberAccentDark text-white font-display font-bold text-xs uppercase tracking-wider shadow-amberGlow shrink-0 flex items-center gap-2"
            >
              REQUEST INDUSTRY CONSULTATION <PhoneCall className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};
