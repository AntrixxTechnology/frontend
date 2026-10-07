import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Cpu,
  Leaf,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { getSolutions, SolutionItem, getImageUrl } from '../api/client';
import { useModal } from '../context/ModalContext';

export const SolutionsHubPage: React.FC = () => {
  const { openConsultationModal } = useModal();
  const [solutions, setSolutions] = useState<SolutionItem[]>([]);
  const [activeEquipIndex, setActiveEquipIndex] = useState<number>(0);

  useEffect(() => {
    getSolutions().then(setSolutions);
  }, []);

  const defaultEquipmentList = [
    {
      name: 'Cyclone Dust Collector',
      category: 'Environment',
      desc: 'Cyclone collectors use centrifugal force to separate and collect coarse and fine particulate matter from industrial gas streams. Designed for high dust loading, low maintenance and continuous duty in harsh operating conditions.',
      image: 'https://cjaeubdycgnwgfkbddvb.supabase.co/storage/v1/object/public/general/cyclone_dust_collector_industrial.jpg',
      specs: [
        ['Application', 'Cement, Power, Steel, Food, Chemical, Mining & Processing'],
        ['Gas Flow Capacity', '500 – 500,000 CMH'],
        ['Collection Efficiency', '85% – 95% for particles > 5 microns'],
        ['Inlet Dust Load', 'Up to 50 g/Nm³'],
        ['Operating Temperature', 'Up to 400 °C'],
        ['Construction', 'Mild Steel / Stainless Steel / Abrasion-Resistant Alloys'],
        ['Design Type', 'Standard / High Efficiency Aerodynamic Volute'],
        ['Pressure Drop', '800 – 1,500 Pa'],
      ],
    },
    {
      name: 'Bag Filter (Baghouse)',
      category: 'Emission Control',
      desc: 'Pulse-Jet Baghouse systems capture fine particles from gas streams through selected high-grade filter media. Configuration and media are chosen to suit dust characteristics, flue gas moisture, temperature and CPCB compliance.',
      image: 'https://cjaeubdycgnwgfkbddvb.supabase.co/storage/v1/object/public/general/baghouse_bag_filter_industrial.jpg',
      specs: [
        ['Application', 'Boilers, Cement, Steel, Food Processing, Chemical & Agro Mills'],
        ['Gas Flow Capacity', '1,000 – 300,000 CMH tailored to process duty'],
        ['Filter Media', 'PTFE Membrane, PPS, Nomex, Polyester, Woven Fiberglass'],
        ['Collection Efficiency', '99.8%+ (guaranteed particulate capture < 30 mg/Nm³)'],
        ['Air-to-Cloth Ratio', '1.0 m/min conservative design limit'],
        ['Cleaning System', 'Sequential Online / Offline Pulse-Jet Solenoid'],
        ['Construction', 'Corrosion-resistant MS / SS316 / Specified Alloys'],
        ['Customization', 'Explosion vents, rotary air locks, modular hopper design'],
      ],
    },
    {
      name: 'Spray Type Wet Scrubber',
      category: 'Gas Cleaning',
      desc: 'Wet scrubbers bring industrial gas streams into intimate contact with a scrubbing liquid to capture dust, acidic vapors, and soluble or reactive pollutants with zero clogging and continuous liquid re-circulation.',
      image: 'https://cjaeubdycgnwgfkbddvb.supabase.co/storage/v1/object/public/general/spray_wet_scrubber_industrial.jpg',
      specs: [
        ['Application', 'Boiler Exhaust, Chemical Vapors, Acidic Mists, Metallurgical Exhaust'],
        ['Gas Flow Capacity', 'Custom engineered to match flue gas volume'],
        ['Scrubbing Medium', 'Water or alkaline chemical neutralizing reagent'],
        ['Removal Performance', '95% – 99% for SOx, acid fumes and particulate mists'],
        ['Spray Nozzle Type', 'Non-clogging Spiral Spray Nozzles with wide angle coverage'],
        ['Construction', 'FRP / Polypropylene / SS316L / Acid-Resistant Lined Steel'],
        ['Design Type', 'Counter-current vertical spray tower with mist eliminator'],
        ['Slurry Handling', 'Heavy duty recirculation pump with dual basket strainers'],
      ],
    },
    {
      name: 'Electrostatic Precipitator (ESP)',
      category: 'Power & Utility',
      desc: 'Electrostatic Precipitators utilize high-voltage electrical fields to charge and collect suspended particulate matter from large volume gas streams, delivering ultra-low stack emissions with minimal system pressure drop.',
      image: 'https://cjaeubdycgnwgfkbddvb.supabase.co/storage/v1/object/public/general/electrostatic_precipitator_esp_industrial.jpg',
      specs: [
        ['Application', 'Utility Boilers, Biomass Power, Cement Kilns, Foundry Exhaust'],
        ['Gas Flow Capacity', 'Large volume continuous industrial exhaust'],
        ['Collection Method', 'High-voltage negative corona discharge and plate rapping'],
        ['Emission Guarantee', '< 30 mg/Nm³ compliant with strict environmental norms'],
        ['Operating Temperature', 'Up to 350 °C process specific'],
        ['Construction', 'Rigid discharge electrodes and heavy fabricated collecting plates'],
        ['Power Supply', 'High-frequency TR (Transformer-Rectifier) controller set'],
        ['Customization', 'Multi-field modular casing with automated hopper heating'],
      ],
    },
  ];

  // Dynamically pull Pollution Control Equipment models from CMS database if present
  const pollutionSolution = solutions.find(
    (s) => s.slug === 'pollution-control-equipment' || s.slug === 'boiler-automation' || s.title?.toLowerCase().includes('pollution')
  );

  let dynamicEquipmentList = defaultEquipmentList;
  if (pollutionSolution?.sub_products) {
    const rawSubs = pollutionSolution.sub_products;
    const parsedSubs: any[] = typeof rawSubs === 'string'
      ? (() => { try { return JSON.parse(rawSubs); } catch { return []; } })()
      : (Array.isArray(rawSubs) ? rawSubs : []);

    if (parsedSubs.length > 0) {
      dynamicEquipmentList = parsedSubs.map((sub, idx) => {
        const fallback = defaultEquipmentList[idx] || defaultEquipmentList[0];
        const specsEntries = sub.technical_specs && typeof sub.technical_specs === 'object'
          ? Object.entries(sub.technical_specs).map(([k, v]) => [k, String(v)] as [string, string])
          : fallback.specs;
        return {
          name: sub.name || fallback.name,
          category: fallback.category,
          desc: sub.description || fallback.desc,
          image: sub.image_url || fallback.image,
          specs: specsEntries.length > 0 ? specsEntries : fallback.specs,
        };
      });
    }
  }

  const equipmentList = dynamicEquipmentList;
  const currentEquip = equipmentList[activeEquipIndex] || equipmentList[0];

  const methodologySteps = [
    { num: '01', title: 'Consultation', desc: 'We analyze plant requirements, steam load dynamics, and current fuel consumption.' },
    { num: '02', title: 'Planning & P&ID', desc: 'Custom electrical and mechanical drawings, with suitable OEM component selection.' },
    { num: '03', title: 'Execution', desc: 'Field erection, PLC automation wiring, and piping retrofit execution across India.' },
    { num: '04', title: 'Testing & Commissioning', desc: 'Safety interlock testing, steam trials, and environmental compliance verification.' },
    { num: '05', title: 'Support & Training', desc: 'Technical assistance and operator training for dependable, zero-downtime operation.' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#17202A] font-body selection:bg-amberAccent selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (2-COL WITH AUTHENTIC INDUSTRIAL ENGINEERING ARTWORK) */}
      {/* ========================================================================= */}
      <section className="bg-[#F5F7F9] border-b border-[#E6EAEE] pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#89939E] font-display">
                <Link to="/" className="hover:text-amberAccent transition-colors">HOME</Link>
                <span>/</span>
                <span className="text-[#C98208]">SOLUTIONS</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#111923] tracking-tight leading-[1.08]">
                Integrated Industrial Solutions for a <span className="text-amberAccent">Smarter Future.</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#5F6B78] leading-relaxed max-w-xl font-normal">
                We provide advanced automation, energy optimization, environmental compliance, and turnkey balance-of-plant engineering solutions to enhance thermal efficiency, reduce fuel cost, and build sustainable industries across India.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#solutions-grid"
                  className="px-6 py-3.5 rounded-lg bg-amberAccent hover:bg-amberAccentDark text-[#111923] font-display font-black text-xs uppercase tracking-wider shadow-amberGlow transition-all hover:-translate-y-0.5"
                >
                  EXPLORE SOLUTIONS ↗
                </a>

                <button
                  onClick={() => openConsultationModal('Thermal & Process Solutions Consultation')}
                  className="px-6 py-3.5 rounded-lg bg-white hover:bg-gray-50 text-[#17202A] font-display font-bold text-xs uppercase tracking-wider border border-[#D8DEE4] transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer"
                >
                  ENQUIRE NOW →
                </button>
              </div>
            </div>

            {/* Right Industrial Engineering Visual Graphic */}
            <div className="lg:col-span-5">
              <div className="relative h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-[#D0D9E0] shadow-md bg-gradient-to-br from-[#DCE7ED] to-[#78909E] flex items-end">
                <svg viewBox="0 0 560 320" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
                  <rect width="560" height="320" fill="#C6D5DD" />
                  <path d="M0 170L130 95 280 130 400 65 560 100V320H0Z" fill="#879DA8" />
                  <g stroke="#536D7A" strokeWidth="5" fill="#344C59">
                    <path d="M0 180L100 130H280V290H0Z" />
                    <path d="M0 220H280M0 260H280" fill="none" stroke="#8FA4AE" strokeWidth="6" />
                    <path d="M40 160V290M105 130V290M180 130V290M245 130V290" fill="none" stroke="#718995" strokeWidth="6" />
                  </g>
                  <g stroke="#526C79" strokeWidth="4" fill="#AABAC2">
                    <rect x="175" y="40" width="70" height="210" rx="15" />
                    <ellipse cx="210" cy="41" rx="35" ry="9" fill="#DCE4E8" />
                    <path d="M175 110H245M175 120H245" stroke="#718995" />
                    <rect x="270" y="75" width="47" height="175" rx="10" />
                    <ellipse cx="293" cy="76" rx="23" ry="7" fill="#DCE4E8" />
                    <path d="M210 40V20Q210 7 228 7H260Q278 7 278 26V75" fill="none" stroke="#AABAC2" strokeWidth="16" />
                    <path d="M317 160H365V185H420" fill="none" stroke="#AABAC2" strokeWidth="14" />
                  </g>
                  <rect x="365" y="95" width="115" height="195" fill="#A9612E" stroke="#526B78" strokeWidth="5" />
                  <path d="M400 97V290M440 97V290" stroke="#D69B5D" strokeWidth="8" />
                  <rect x="480" y="170" width="80" height="120" fill="#09649D" stroke="#526B78" strokeWidth="5" />
                  <path d="M0 290H560" stroke="#526B78" strokeWidth="10" />
                </svg>

                {/* Floating Engineering Badge */}
                <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:left-4 sm:bottom-4 z-10 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/60 shadow-lg text-[10px] text-[#687482]">
                  <strong className="block text-xs font-extrabold text-[#17202A] font-display">
                    Engineering the next level
                  </strong>
                  Efficiency · Reliability · Sustainability
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 4-PILLAR TRUST STRIP */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-[#E6EAEE] py-4">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            <div className="flex items-center gap-3 py-2 md:px-3">
              <div className="w-9 h-9 rounded-lg bg-[#FFF3DF] text-[#C98208] flex items-center justify-center font-bold text-base shrink-0">
                ◇
              </div>
              <div>
                <strong className="block text-xs font-bold text-[#111923]">Performance Driven</strong>
                <span className="text-[10px] text-[#647180]">Designed for efficiency</span>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2 md:px-4">
              <div className="w-9 h-9 rounded-lg bg-[#FFF3DF] text-[#C98208] flex items-center justify-center font-bold text-base shrink-0">
                ⚙
              </div>
              <div>
                <strong className="block text-xs font-bold text-[#111923]">Reliable Engineering</strong>
                <span className="text-[10px] text-[#647180]">Built for continuous operation</span>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2 md:px-4">
              <div className="w-9 h-9 rounded-lg bg-[#FFF3DF] text-[#C98208] flex items-center justify-center font-bold text-base shrink-0">
                ♧
              </div>
              <div>
                <strong className="block text-xs font-bold text-[#111923]">Sustainable Solutions</strong>
                <span className="text-[10px] text-[#647180]">Cleaner industrial processes</span>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2 md:px-4">
              <div className="w-9 h-9 rounded-lg bg-[#FFF3DF] text-[#C98208] flex items-center justify-center font-bold text-base shrink-0">
                ✓
              </div>
              <div>
                <strong className="block text-xs font-bold text-[#111923]">End-to-End Support</strong>
                <span className="text-[10px] text-[#647180]">Concept to commissioning</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SOLUTIONS GRID WITH FILTER PILLS & INDUSTRIAL CARDS */}
      {/* ========================================================================= */}
      <section id="solutions-grid" className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="space-y-2">
            <span className="text-[#C98208] text-[10px] font-black uppercase tracking-widest font-display block">
              WHAT WE DO
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111923] tracking-tight">
              Solutions engineered around your process.
            </h2>
            <p className="text-xs sm:text-sm text-[#647180] max-w-2xl font-normal">
              Explore our industrial capabilities across thermal systems, automation, material handling, environmental control and turnkey project engineering.
            </p>
          </div>

          {/* Dynamic Solution Cards (Clean Direct Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {solutions.map((sol) => (
              <Link
                key={sol.id}
                to={`/solutions/${sol.slug}`}
                className="group relative rounded-xl overflow-hidden bg-offWhite border border-[#E6EAEE] hover:border-amberAccent shadow-cardLight hover:shadow-cardHover transition-all flex flex-col justify-between aspect-[4/3]"
              >
                {/* Background Image with Dark Gradient Overlay */}
                <img
                  src={getImageUrl(sol.hero_image_url) || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"}
                  alt={sol.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C131D]/95 via-[#0C131D]/40 to-transparent z-10" />

                <div className="relative z-20 p-5 flex flex-col justify-end h-full">
                  <span className="text-[#FFC15C] text-[9px] font-bold uppercase tracking-widest block mb-1">
                    {sol.category}
                  </span>
                  <h3 className="font-display text-base font-extrabold text-white leading-snug group-hover:text-amberAccent transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-[11px] text-gray-300 line-clamp-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {sol.short_description}
                  </p>
                </div>

                {/* Arrow Icon in Circle */}
                <span className="absolute right-4 bottom-4 z-20 w-7 h-7 rounded-full border border-white/60 text-white flex items-center justify-center text-xs font-bold group-hover:bg-amberAccent group-hover:text-inkBlack group-hover:border-amberAccent transition-all">
                  ↗
                </span>
              </Link>
            ))}
          </div>

          {/* Custom Industrial Specifications Callout Bar */}
          <div className="rounded-2xl bg-gradient-to-r from-[#F7F9FB] to-[#F0F4F6] border border-[#E6EAEE] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 max-w-2xl">
              <span className="text-[#C98208] text-[10px] font-black uppercase tracking-widest font-display block">
                CUSTOM INDUSTRIAL SPECIFICATIONS
              </span>
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#17202A]">
                Need a Custom Utility or Thermal Automation Solution?
              </h3>
              <p className="text-xs text-[#647180] leading-relaxed">
                We design tailored P&ID layouts, boiler retrofits, and closed-loop control systems customized for your plant’s fuel type and steam demands.
              </p>
            </div>

            <button
              onClick={() => openConsultationModal('Custom Utility or Thermal Automation')}
              className="px-6 py-3.5 rounded-lg bg-amberAccent hover:bg-amberAccentDark text-inkBlack font-display font-black text-xs uppercase tracking-wider shadow-amberGlow shrink-0 flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
            >
              TALK TO OUR EXPERTS <Phone className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE IN-PAGE EQUIPMENT PREVIEW WIDGET */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#F6F8F9] border-t border-b border-[#E6EAEE]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Intro & Equipment Tabs (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[#C98208] text-[10px] font-black uppercase tracking-widest font-display block mb-1">
                  ENVIRONMENTAL SOLUTIONS
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111923] tracking-tight">
                  Pollution Control Equipment
                </h2>
                <p className="text-xs text-[#647180] mt-2 leading-relaxed">
                  Engineered systems to manage industrial dust, particulate emissions and suitable process gases—supporting cleaner operations and environmental compliance.
                </p>
              </div>

              <div className="space-y-2">
                {equipmentList.map((eq, idx) => {
                  const isActive = idx === activeEquipIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveEquipIndex(idx)}
                      className={`w-full p-3.5 rounded-xl border text-left font-display font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amberAccent border-amberAccent text-inkBlack shadow-amberGlow'
                          : 'bg-white border-[#E6EAEE] text-[#17202A] hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-base font-normal ${isActive ? 'text-inkBlack' : 'text-[#697785]'}`}>
                          {idx === 0 ? '◉' : idx === 1 ? '▤' : idx === 2 ? '♧' : '▥'}
                        </span>
                        <span>{eq.name}</span>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1' : 'opacity-40'}`} />
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  to="/solutions/pollution-control-equipment"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#111923] hover:text-amberAccent transition-colors"
                >
                  View Full Pollution Control Deep-Dive <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Live Specifications Table Card (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E6EAEE] overflow-hidden shadow-sm space-y-0">
              
              {/* Top Banner / Graphic for Active Equipment */}
              <div className="relative h-52 bg-[#0D1721] flex items-end p-5 overflow-hidden group">
                {currentEquip.image ? (
                  <img
                    key={currentEquip.image}
                    src={getImageUrl(currentEquip.image)}
                    alt={currentEquip.name}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#111923] to-[#243342]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1721] via-[#0D1721]/50 to-transparent" />
                
                <div className="relative z-10">
                  <span className="text-[#FFC15C] text-[10px] font-bold uppercase tracking-widest block font-display">
                    {currentEquip.category}
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-white mt-0.5">
                    {currentEquip.name}
                  </h3>
                </div>
              </div>

              {/* Body Content & Spec Table */}
              <div className="p-6 space-y-4">
                <p className="text-xs text-[#647180] leading-relaxed">
                  {currentEquip.desc}
                </p>

                <div className="border-t border-[#EDF0F2] pt-3">
                  <div className="text-[10px] font-bold text-[#111923] mb-2 font-display">
                    TECHNICAL SPECIFICATIONS <span className="font-normal text-[#8A949E]">(Indicative; final design depends on process data)</span>
                  </div>

                  <div className="border border-[#EDF0F2] rounded-xl overflow-hidden bg-white">
                    <table className="w-full text-left text-xs border-collapse">
                      <tbody>
                        {currentEquip.specs.map(([paramKey, paramVal], sIdx) => (
                          <tr key={sIdx} className={sIdx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}>
                            <td className="py-2 px-3 font-bold text-[#17202A] w-[38%] border-b border-[#EDF0F2] text-[11px]">
                              {paramKey}
                            </td>
                            <td className="py-2 px-3 text-[#63707D] border-b border-[#EDF0F2] text-[11px]">
                              {paramVal}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => openConsultationModal(currentEquip.name)}
                    className="px-5 py-2.5 rounded-lg bg-[#111923] hover:bg-amberAccent hover:text-inkBlack text-white font-display font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    Request Equipment Quote ↗
                  </button>

                  <Link
                    to="/solutions/pollution-control-equipment"
                    className="text-xs font-bold text-amberAccent hover:underline"
                  >
                    Explore Full Scope →
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OUR METHODOLOGY (01 TO 05 CONNECTED STEPS) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E6EAEE]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[#C98208] text-[10px] font-black uppercase tracking-widest font-display block">
              OUR METHODOLOGY
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111923]">
              How We Deliver Excellence
            </h2>
            <p className="text-xs text-[#647180]">
              A collaborative engineering process from initial consultation through commissioning and lifecycle support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Desktop Connecting Line */}
            <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-[1px] bg-[#DFE4E9] z-0" />

            {methodologySteps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-white border-2 border-[#EFF2F5] shadow-sm flex items-center justify-center mb-4 text-[#95A0AD] font-display font-extrabold text-sm">
                  {step.num}
                </div>
                <h4 className="font-display font-bold text-xs text-[#111923] mb-1">{step.title}</h4>
                <p className="text-[11px] text-[#647180] leading-relaxed max-w-[170px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. QUICK CONTACT STRIP */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#F6F8FA]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[#C98208] text-[10px] font-black uppercase tracking-widest font-display block">
                LET’S WORK TOGETHER
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111923]">
                Have a project or plant requirement in mind?
              </h2>
              <p className="text-xs text-[#647180] leading-relaxed">
                Talk to our senior engineering team about your boiler plant, air pollution limits, or upcoming utility retrofit.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#E6EAEE] shadow-sm space-y-1">
                <Phone className="w-4 h-4 text-[#C98208]" />
                <b className="block text-xs text-[#111923]">Call Our Team</b>
                <a href="tel:+919748631608" className="block text-[11px] text-[#647180] hover:text-amberAccent">
                  +91 9748631608 / +91 9477179885
                </a>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E6EAEE] shadow-sm space-y-1">
                <Mail className="w-4 h-4 text-[#C98208]" />
                <b className="block text-xs text-[#111923]">Email Us</b>
                <a href="mailto:antrixtechnology@gmail.com" className="block text-[11px] text-[#647180] hover:text-amberAccent">
                  antrixtechnology@gmail.com
                </a>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E6EAEE] shadow-sm space-y-1">
                <MapPin className="w-4 h-4 text-[#C98208]" />
                <b className="block text-xs text-[#111923]">Registered Office</b>
                <p className="text-[11px] text-[#647180]">Kolkata, West Bengal, India</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E6EAEE] shadow-sm space-y-1">
                <Clock className="w-4 h-4 text-[#C98208]" />
                <b className="block text-xs text-[#111923]">Engineering Support</b>
                <button
                  onClick={() => openConsultationModal('Consultation & Audit Request')}
                  className="text-[11px] font-bold text-amberAccent hover:underline block text-left cursor-pointer"
                >
                  Request Consultation Now →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
