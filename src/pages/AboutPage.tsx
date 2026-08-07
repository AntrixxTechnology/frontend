import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Target,
  Eye,
  CheckCircle2,
  PhoneCall,
  Linkedin,
  Clock,
  Factory,
} from 'lucide-react';
import { getAbout, getTeam, AboutContent, TeamMember } from '../api/client';

export const AboutPage: React.FC = () => {
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    getAbout().then(setAbout);
    getTeam().then(setTeam);
  }, []);

  return (
    <div className="min-h-screen bg-white text-inkBlack pt-24 pb-20 font-body">
      
      {/* 1. Header Banner */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden banner-zoom-container bg-inkBlack group">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop" 
          alt="About Us Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-inkBlack/60 z-10 group-hover:bg-inkBlack/50 transition-colors duration-500"></div>
        <div className="relative z-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
            <Link to="/" className="hover:text-amberAccent transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-amberAccent">ABOUT US</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Engineering Excellence.<br />
            <span className="text-amberAccent">Delivering Impact.</span>
          </h1>
        </div>
      </section>

      {/* 2. Company Story & History */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
                OUR STORY & EXPERTISE
              </span>
              <h2 className="font-display text-3xl font-extrabold text-inkBlack leading-tight">
                Pioneering Utility Automation Across India Since 2015
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                {about?.company_story ||
                  'Antrixx Technology was established by veteran thermal and utility automation engineers dedicated to optimizing industrial energy efficiency across India. Operating extensively across process industries—including food processing, FMCG, rice & agro processing, textiles, beverages, and chemicals—our team specializes in the sales, engineering, installation, and balance-of-plant service for boilers, thermic fluid heaters, hot water generators, steam automation, and industrial water treatment facilities.'}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-offWhite border border-gray200">
                  <span className="font-display text-2xl font-extrabold text-amberAccent block">500+</span>
                  <span className="text-xs font-bold text-inkBlack">Successful Projects</span>
                </div>
                <div className="p-4 rounded-xl bg-offWhite border border-gray200">
                  <span className="font-display text-2xl font-extrabold text-amberAccent block">24/7</span>
                  <span className="text-xs font-bold text-inkBlack">Technical Support SLA</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-gray200 shadow-cardHover">
                <img
                  src={about?.hero_image_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop'}
                  alt="Antrixx Thermal Engineers"
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Mission, Vision & Core Values */}
      <section className="py-20 bg-offWhite border-t border-b border-gray200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="p-8 rounded-2xl bg-white border border-gray200 shadow-cardLight space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amberAccent/10 text-amberAccent border border-amberAccent/20 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-extrabold text-inkBlack">
                Our Mission
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                {about?.mission ||
                  'To transform industrial utility operations through smart automation, rigorous energy loss diagnostics, and sustainable balance-of-plant engineering that minimizes fuel costs and carbon footprint.'}
              </p>
            </div>

            {/* Vision Card */}
            <div className="p-8 rounded-2xl bg-white border border-gray200 shadow-cardLight space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amberAccent/10 text-amberAccent border border-amberAccent/20 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-extrabold text-inkBlack">
                Our Vision
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                {about?.vision ||
                  'To be the most trusted industrial thermal and utility optimization engineering partner in South Asia, recognized for zero-downtime solutions and data-backed operational excellence.'}
              </p>
            </div>

          </div>

          {/* Core Values */}
          {about?.values && about.values.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
                  GUIDING PRINCIPLES
                </span>
                <h3 className="font-display text-2xl font-extrabold text-inkBlack mt-1">
                  Our Core Pillars of Excellence
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {about.values.map((val, idx) => (
                  <div key={idx} className="p-6 rounded-xl bg-white border border-gray200 shadow-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-amberAccent shrink-0" />
                      <h4 className="font-display text-sm font-bold text-inkBlack">
                        Pillar 0{idx + 1}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. Core Capabilities Checklist (9 Verticals) */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
              FULL-SPECTRUM CAPABILITIES
            </span>
            <h2 className="font-display text-3xl font-extrabold text-inkBlack">
              End-to-End Thermal & Utility Engineering Scope
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(about?.capabilities || []).map((cap, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-offWhite border border-gray200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amberAccent shrink-0" />
                <span className="text-xs font-bold text-inkBlack">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. Consultation Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-offWhite via-white to-offWhite p-8 border border-gray200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
                WORK WITH OUR ENGINEERS
              </span>
              <h3 className="font-display text-xl font-extrabold text-inkBlack">
                Ready to Upgrade Your Industrial Utility Performance?
              </h3>
              <p className="text-xs text-gray-600 max-w-xl">
                Schedule a meeting with our thermal automation specialists for a comprehensive site survey.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-md bg-amberAccent hover:bg-amberAccentDark text-white font-display font-bold text-xs uppercase tracking-wider shadow-amberGlow shrink-0 flex items-center gap-2"
            >
              CONTACT ENGINEERING TEAM <PhoneCall className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
