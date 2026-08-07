import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  PhoneCall,
  SlidersHorizontal,
} from 'lucide-react';
import { getSolutions, SolutionItem } from '../api/client';

export const SolutionsHubPage: React.FC = () => {
  const [solutions, setSolutions] = useState<SolutionItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    getSolutions().then(setSolutions);
  }, []);

  const categories = [
    'All',
    'Boiler House Control',
    'IoT & Digital Utilities',
    'Environmental & Emission Systems',
    'Solid Material Handling',
    'Steam & Thermal Systems',
    'Audits & Diagnostic Services',
    'Turnkey Engineering',
    'Industrial Spares & Components',
  ];

  const filteredSolutions =
    selectedCategory === 'All'
      ? solutions
      : solutions.filter((s) => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const approachSteps = [
    { num: '01', title: 'Consultation', desc: 'We analyze your plant requirements, steam load dynamics, and current fuel consumption.' },
    { num: '02', title: 'Planning & P&ID', desc: 'Our engineers design custom electrical/mechanical drawings and select OEM components.' },
    { num: '03', title: 'Execution', desc: 'Pan-India field erection, PLC automation wiring, and piping retrofits executed with precision.' },
    { num: '04', title: 'Testing & Commissioning', desc: 'Rigorous safety interlock testing, steam trials, and environmental compliance verification.' },
    { num: '05', title: 'Support & Training', desc: '24/7 technical dispatch and hands-on operator training for zero-downtime performance.' },
  ];

  return (
    <div className="min-h-screen bg-white text-inkBlack pt-24 pb-20 font-body">
      
      {/* 1. Header Banner */}
      <section className="bg-offWhite py-16 border-b border-gray200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray500 uppercase tracking-wider">
              <Link to="/" className="hover:text-amberAccent">HOME</Link>
              <span>/</span>
              <span className="text-amberAccent">SOLUTIONS</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-inkBlack tracking-tight leading-tight">
              Integrated Industrial Solutions for a <span className="text-amberAccent">Smarter Future.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              We provide advanced automation, energy optimization, environmental compliance, and turnkey balance-of-plant engineering solutions to enhance thermal efficiency, reduce fuel cost, and build sustainable industries across India.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Category Filter & 12-Card Grid */}
      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <SlidersHorizontal className="w-4 h-4 text-amberAccent shrink-0 mr-2" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amberAccent text-white shadow-amberGlow'
                    : 'bg-offWhite text-gray-600 hover:bg-gray200 border border-gray200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image-Heavy Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSolutions.map((sol, idx) => (
              <Link
                key={sol.id}
                to={`/solutions/${sol.slug}`}
                className="relative rounded-xl overflow-hidden banner-zoom-container group aspect-[4/3] bg-offWhite block shadow-cardLight hover:shadow-cardHover transition-all"
              >
                <div className="absolute inset-0 bg-inkBlack/5 group-hover:bg-inkBlack/0 transition-colors z-10"></div>
                <img 
                  src={`https://images.unsplash.com/photo-${1500000000000 + idx}?q=80&w=600&auto=format&fit=crop`}
                  alt={sol.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-inkBlack/90 via-inkBlack/30 to-transparent z-10"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                  <span className="text-amberAccent text-[10px] font-bold uppercase tracking-widest block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {sol.category}
                  </span>
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

          {/* Custom Solution Callout Box */}
          <div className="rounded-2xl bg-offWhite p-8 border border-gray200 flex flex-col md:flex-row items-center justify-between gap-6 mt-16">
            <div className="space-y-2">
              <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
                CUSTOM INDUSTRIAL SPECIFICATIONS
              </span>
              <h3 className="font-display text-xl font-extrabold text-inkBlack">
                Need a Custom Utility or Thermal Automation Solution?
              </h3>
              <p className="text-xs text-gray-600 max-w-xl">
                We design tailored P&ID layouts, boiler retrofits, and closed-loop control systems customized for your plant's fuel type and steam demands.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-md bg-amberAccent hover:bg-amberAccentDark text-white font-display font-bold text-xs uppercase tracking-wider shadow-amberGlow shrink-0 flex items-center gap-2"
            >
              TALK TO OUR EXPERTS <PhoneCall className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. 5-Step Approach Timeline */}
      <section className="py-20 bg-white border-t border-b border-gray200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
              OUR METHODOLOGY
            </span>
            <h2 className="font-display text-3xl font-extrabold text-inkBlack">
              How We Deliver Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gray200 z-0"></div>

            {approachSteps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-offWhite shadow-sm flex items-center justify-center mb-6">
                  <span className="font-display text-2xl font-extrabold text-gray-400">
                    {step.num}
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm text-inkBlack mb-2">{step.title}</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed px-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};
