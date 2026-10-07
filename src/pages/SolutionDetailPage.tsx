import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  Zap,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Send,
  Droplets,
  Wind,
  Layers,
  Cpu,
  Leaf,
  Activity,
  Gauge,
  Factory,
  Flame,
} from 'lucide-react';
import { getSolutionBySlug, getSiteSettings, SolutionItem, SolutionSubProduct, SiteSettings, API_BASE, getImageUrl } from '../api/client';
import { useModal } from '../context/ModalContext';

export const SolutionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openConsultationModal } = useModal();
  const [solution, setSolution] = useState<SolutionItem | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
  const [windowStartIndex, setWindowStartIndex] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Newsletter state & toast
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    message: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getSolutionBySlug(slug).then((data) => {
        setSolution(data);
        setSelectedProductIndex(0);
        setWindowStartIndex(0);
        setLoading(false);
      });
    }
  }, [slug]);

  // Helper to render dynamic icons cleanly
  const renderIcon = (name?: string, className = "w-5 h-5") => {
    switch (name?.toLowerCase()) {
      case 'wind': return <Wind className={className} />;
      case 'droplets': case 'water': return <Droplets className={className} />;
      case 'layers': return <Layers className={className} />;
      case 'cpu': return <Cpu className={className} />;
      case 'leaf': return <Leaf className={className} />;
      case 'shield': case 'shieldcheck': return <ShieldCheck className={className} />;
      case 'zap': return <Zap className={className} />;
      case 'wrench': return <Wrench className={className} />;
      case 'activity': return <Activity className={className} />;
      case 'gauge': return <Gauge className={className} />;
      case 'flame': return <Flame className={className} />;
      default: return <Factory className={className} />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: `Inquiry regarding ${solution?.title || 'Solution'}: ${formData.message}`,
        }),
      });
      if (res.ok) {
        setFormSubmitted(true);
        showToast('Technical audit request received! Our engineers will review shortly.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitting(true);
    try {
      await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: newsletterEmail,
          phone: '+910000000000',
          message: 'Newsletter subscription request for Industrial Utility Insights.',
        }),
      }).catch(() => {});
      showToast('Subscription submitted successfully. Welcome to Industrial Insights!');
      setNewsletterEmail('');
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-20 text-center font-body">
        <div className="inline-block w-10 h-10 border-4 border-amberAccent border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-gray-500 mt-4 font-bold uppercase tracking-wider">Loading Solution Details...</p>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-20 text-center space-y-4 font-body">
        <h2 className="font-display text-2xl font-extrabold text-inkBlack">Solution Not Found</h2>
        <p className="text-xs text-gray-500">The solution specified does not exist or has been removed.</p>
        <Link to="/solutions" className="inline-block px-6 py-3 rounded-md bg-amberAccent text-inkBlack font-display font-bold text-xs uppercase">
          Back to Solutions Hub
        </Link>
      </div>
    );
  }

  // Value Badges
  const badgeHighlights = solution.badge_highlights && solution.badge_highlights.length > 0 ? solution.badge_highlights : [
    { title: 'High Efficiency', desc: 'Maximum performance with low emissions', icon_name: 'ShieldCheck' },
    { title: 'Reliable Operation', desc: 'Built for continuous industrial performance', icon_name: 'Cpu' },
    { title: 'Sustainable Solutions', desc: 'Cleaner environment, better tomorrow', icon_name: 'Leaf' },
  ];

  // Scope Cards
  const scopeCards = solution.scope_cards && solution.scope_cards.length > 0 ? solution.scope_cards : (
    solution.features && solution.features.length > 0
      ? solution.features.map((f, i) => ({
          title: f.split(' - ')[0] || f,
          description: f.split(' - ')[1] || `Advanced engineering design ensuring peak performance for ${solution.title}.`,
          icon_name: i % 3 === 0 ? 'Wind' : i % 3 === 1 ? 'Layers' : 'Droplets'
        }))
      : [
          { title: 'Cyclone Dust Collector', description: 'Cyclone dust collectors use centrifugal force to separate and collect coarse and fine particulate matter from industrial gases.', icon_name: 'Wind' },
          { title: 'Bag Filter', description: 'Bag filter systems capture fine particles from gas streams using high-efficiency filter media (baghouse).', icon_name: 'Layers' },
          { title: 'Spray Type Wet Scrubber', description: 'Wet scrubbers remove dust, gas, and pollutants using water sprays and scrubbing action with high removal efficiency.', icon_name: 'Droplets' }
        ]
  );

  // Products and Services matrix
  const productsAndServices = solution.products_and_services && solution.products_and_services.length > 0
    ? solution.products_and_services
    : (solution.deliverables && solution.deliverables.length > 0 ? solution.deliverables : [
        'Cyclone Dust Collector Systems',
        'System Design & Engineering',
        'Spare Parts & Accessories',
        'Bag Filter / Baghouse Systems',
        'Installation & Commissioning',
        'Performance Optimization',
        'Spray Type Wet Scrubber Systems',
        'Retrofit & Upgradation',
        'Pollution Monitoring Solutions',
        'ESP (Electrostatic Precipitator) Systems',
        'Operation & Maintenance',
        'Turnkey Project Execution',
        'Ducting Design & Fabrication',
        'AMC & Annual Maintenance Contracts'
      ]);

  // Sub products: Parse defensively if string or array
  const rawSubProducts = solution.sub_products;
  const parsedSubProducts: SolutionSubProduct[] = typeof rawSubProducts === 'string'
    ? (() => { try { return JSON.parse(rawSubProducts); } catch { return []; } })()
    : (Array.isArray(rawSubProducts) ? rawSubProducts : []);

  const subProducts: SolutionSubProduct[] = parsedSubProducts.length > 0
    ? parsedSubProducts
    : [
        {
          id: 'sp-1',
          name: solution.title,
          image_url: solution.hero_image_url || 'https://cjaeubdycgnwgfkbddvb.supabase.co/storage/v1/object/public/general/boiler_retrofit_thermic_heater_industrial.jpg',
          description: solution.short_description,
          technical_specs: typeof solution.technical_specs === 'string'
            ? (() => { try { return JSON.parse(solution.technical_specs as any); } catch { return {}; } })()
            : (solution.technical_specs || {
                'Application': 'Cement, Power, Steel, Food, Chemical, Mining & more',
                'Gas Flow Capacity': '500 – 500,000 CMH',
                'Collection Efficiency': '85% - 95% (for particulate size > 5 microns)',
                'Inlet Dust Load': 'Up to 50 g/Nm³',
                'Operating Temperature': 'Up to 400 °C',
                'Material of Construction': 'Mild Steel / SS / Special Alloys',
                'Design Type': 'Standard / High Efficiency',
                'Pressure Drop': '800 – 1500 Pa',
                'Customization': 'Available as per process requirement'
              })
        }
      ];

  const currentProduct = subProducts[selectedProductIndex] || subProducts[0];

  const handlePrevProduct = () => {
    setSelectedProductIndex((prev) => {
      const nextIdx = prev > 0 ? prev - 1 : subProducts.length - 1;
      if (subProducts.length > 3) {
        if (nextIdx < windowStartIndex) {
          setWindowStartIndex(nextIdx);
        } else if (nextIdx === subProducts.length - 1) {
          setWindowStartIndex(Math.max(0, subProducts.length - 3));
        }
      }
      return nextIdx;
    });
  };

  const handleNextProduct = () => {
    setSelectedProductIndex((prev) => {
      const nextIdx = prev < subProducts.length - 1 ? prev + 1 : 0;
      if (subProducts.length > 3) {
        if (nextIdx >= windowStartIndex + 3) {
          setWindowStartIndex(Math.min(nextIdx - 2, subProducts.length - 3));
        } else if (nextIdx === 0) {
          setWindowStartIndex(0);
        }
      }
      return nextIdx;
    });
  };

  // Helper to render full description with automatic numbered/bullet points
  const renderFullDescription = (text?: string) => {
    if (!text) return null;

    // Check if text already has HTML tags
    if (/<[a-z][\s\S]*>/i.test(text)) {
      return (
        <div 
          className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed max-w-3xl prose prose-sm prose-amber"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }

    // Check if text has numbered items like "1. ", "2. "
    const matches = text.match(/\d+[\.\)]\s*[^0-9\n]+/g);
    if (matches && matches.length >= 2) {
      const firstNumIdx = text.search(/\d+[\.\)]/);
      const intro = firstNumIdx > 0 ? text.substring(0, firstNumIdx).trim() : '';
      const items = matches.map((m) => m.replace(/^\d+[\.\)]\s*/, '').trim()).filter(Boolean);

      return (
        <div className="mt-3 space-y-3 max-w-3xl">
          {intro && (
            <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed">
              {intro}
            </p>
          )}
          <ul className="space-y-2.5">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-amberAccent/20 text-[#A86400] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amberAccent/40 font-display">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    // Check for lines starting with bullets
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length > 1 && lines.some((l) => l.startsWith('•') || l.startsWith('-') || l.startsWith('*'))) {
      return (
        <div className="mt-3 space-y-2.5 max-w-3xl">
          <ul className="space-y-2.5">
            {lines.map((line, idx) => {
              const clean = line.replace(/^[•\-\*]\s*/, '').trim();
              return (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-amberAccent shrink-0 mt-2" />
                  <span className="leading-relaxed">{clean}</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    return (
      <div className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed max-w-3xl space-y-2 whitespace-pre-line">
        {text}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#1E2024] font-body selection:bg-amberAccent selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. TOP DARK HERO BANNER */}
      {/* ========================================================================= */}
      <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-20 overflow-hidden bg-[#0A0D12] text-white">
        <img 
          src={getImageUrl(solution.hero_image_url) || "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1920&auto=format&fit=crop"} 
          alt={solution.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D12] via-[#0A0D12]/90 to-transparent z-10" />

        <div className="relative z-20 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5 font-display">
            <Link to="/" className="hover:text-amberAccent transition-colors">HOME</Link>
            <span className="text-gray-600">/</span>
            <Link to="/solutions" className="hover:text-amberAccent transition-colors">SOLUTIONS</Link>
            <span className="text-gray-600">/</span>
            <span className="text-amberAccent font-bold">{solution.title}</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
              {solution.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal max-w-2xl">
              {solution.short_description}
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openConsultationModal(solution.title)}
                className="px-6 py-3.5 rounded-lg bg-amberAccent hover:bg-amberAccentDark text-inkBlack font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-amberGlow transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                ENQUIRE NOW <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#inquiry-form-section"
                className="px-6 py-3.5 rounded-lg bg-transparent hover:bg-white/10 text-white font-display font-bold text-xs uppercase tracking-wider border border-white/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                REQUEST AUDIT <ArrowRight className="w-4 h-4 text-amberAccent" />
              </a>
            </div>
          </div>

          {/* 3 Highlight Badges at Bottom of Hero */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {badgeHighlights.map((badge, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-amberAccent/10 border border-amberAccent/20 text-amberAccent flex items-center justify-center shrink-0">
                  {renderIcon(badge.icon_name, "w-5 h-5")}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">{badge.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-snug">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION 1: WHAT WE COVER + SIDEBAR */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Scope Content (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <span className="text-amberAccent text-xs font-black uppercase tracking-widest block mb-2 font-display">
                  SOLUTION OVERVIEW & ENGINEERING SCOPE
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111] tracking-tight">
                  What We Cover
                </h2>
                {renderFullDescription(solution.full_description || solution.short_description)}
              </div>

              {/* 3 Scope Cards Grid (Equal Width and Equal Height) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-stretch">
                {scopeCards.slice(0, 3).map((card, idx) => (
                  <div 
                    key={idx} 
                    className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-all hover:border-amberAccent/40 space-y-3 group h-full flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-amberAccent/10 text-amberAccent flex items-center justify-center">
                        {renderIcon(card.icon_name, "w-5 h-5")}
                      </div>
                      <h3 className="font-display text-sm font-bold text-[#111] leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar Card (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm space-y-5 sticky top-28">
                <div>
                  <h3 className="font-display text-base font-extrabold text-[#111]">
                    Need Expert Guidance?
                  </h3>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                    Our process engineers are ready to understand your requirement and provide the best solution.
                  </p>
                </div>

                <div className="space-y-2.5 text-xs font-bold text-gray-800">
                  <a 
                    href={`tel:${settings?.phone_primary || '+919748636108'}`} 
                    className="flex items-center gap-3 p-3 rounded-xl bg-offWhite border border-gray-200/80 hover:text-amberAccent transition-colors"
                  >
                    <Phone className="w-4 h-4 text-amberAccent shrink-0" />
                    <span>{settings?.phone_primary || '+91 9748636108'} / {settings?.phone_secondary || '+91 9477179885'}</span>
                  </a>

                  <a 
                    href={`mailto:${settings?.email || 'antrixtechnology@gmail.com'}`} 
                    className="flex items-center gap-3 p-3 rounded-xl bg-offWhite border border-gray-200/80 hover:text-amberAccent transition-colors"
                  >
                    <Mail className="w-4 h-4 text-amberAccent shrink-0" />
                    <span className="truncate">{settings?.email || 'antrixtechnology@gmail.com'}</span>
                  </a>
                </div>

                <button
                  onClick={() => openConsultationModal(solution.title)}
                  className="w-full py-3.5 px-4 rounded-xl bg-amberAccent hover:bg-amberAccentDark text-inkBlack font-display font-black text-xs uppercase tracking-wider text-center block shadow-amberGlow transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  ENQUIRE NOW <ArrowRight className="w-3.5 h-3.5 inline-block ml-1" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION 2: OUR PRODUCTS & SERVICES (3-COLUMN MATRIX) */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111]">
              Our Products & Services
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
              End-to-end solutions for clean air, efficient operations and environmental compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-8">
            {productsAndServices.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION 3: EXPLORE PRODUCTS & TECHNICAL SPECS (EQUAL-HEIGHT SHOWCASE) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div>
            <span className="text-amberAccent text-xs font-black uppercase tracking-widest block mb-1 font-display">
              {subProducts.length > 1 ? 'OUR PRODUCTS & MODELS' : 'ENGINEERING SPECIFICATIONS'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111]">
              {subProducts.length > 1 ? `Explore Our ${solution.title}` : `${solution.title} Specifications`}
            </h2>
          </div>

          {/* Interactive Multi-Model Carousel if Multiple Sub-Products Exist */}
          {subProducts.length > 1 && (
            <div className="relative flex items-center gap-3">
              <button
                onClick={handlePrevProduct}
                className="w-10 h-10 rounded-full bg-[#111] text-white hover:bg-amberAccent hover:text-inkBlack flex items-center justify-center shrink-0 transition-all shadow-md cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Desktop View: 3-Card Sliding Window Slider (NEVER stacks vertically!) */}
              <div className="flex-1 overflow-hidden">
                <div 
                  className="hidden md:flex transition-transform duration-500 ease-out gap-4"
                  style={{
                    transform: `translateX(calc(-${windowStartIndex} * ((100% - 2rem) / 3 + 1rem)))`
                  }}
                >
                  {subProducts.map((prod, idx) => {
                    const isSelected = idx === selectedProductIndex;
                    return (
                      <div
                        key={prod.id || idx}
                        onClick={() => setSelectedProductIndex(idx)}
                        style={{ width: 'calc((100% - 2rem) / 3)' }}
                        className={`shrink-0 rounded-2xl p-3.5 transition-all cursor-pointer bg-white text-center space-y-2.5 ${
                          isSelected
                            ? 'border-2 border-amberAccent shadow-md ring-2 ring-amberAccent/20'
                            : 'border border-gray-200 hover:border-gray-300 shadow-sm opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div className="h-36 w-full rounded-xl overflow-hidden bg-gray-100 relative">
                          <img
                            src={getImageUrl(prod.image_url) || "https://cjaeubdycgnwgfkbddvb.supabase.co/storage/v1/object/public/general/cyclone_dust_collector_industrial.jpg"}
                            alt={prod.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          {isSelected && (
                            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amberAccent text-inkBlack text-[9px] font-black uppercase tracking-wider font-display shadow-sm">
                              Active
                            </span>
                          )}
                        </div>
                        <h3 className={`font-display text-xs font-extrabold truncate ${isSelected ? 'text-amberAccent' : 'text-[#111]'}`}>
                          {prod.name}
                        </h3>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile View: 1 card slider with indicator */}
                <div className="block md:hidden">
                  <div className="rounded-2xl p-4 bg-white border-2 border-amberAccent shadow-md text-center space-y-2">
                    <div className="h-44 w-full rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={getImageUrl(currentProduct.image_url) || "https://cjaeubdycgnwgfkbddvb.supabase.co/storage/v1/object/public/general/cyclone_dust_collector_industrial.jpg"}
                        alt={currentProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-display text-sm font-extrabold text-amberAccent">
                      {currentProduct.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      Model {selectedProductIndex + 1} of {subProducts.length}
                    </p>
                  </div>
                </div>

                {/* Desktop Pagination Dots if more than 3 models */}
                {subProducts.length > 3 && (
                  <div className="hidden md:flex justify-center items-center gap-2 pt-3">
                    {Array.from({ length: subProducts.length - 2 }).map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => {
                          setWindowStartIndex(dotIdx);
                          setSelectedProductIndex(dotIdx);
                        }}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          windowStartIndex === dotIdx ? 'w-6 bg-amberAccent' : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Slide to group ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleNextProduct}
                className="w-10 h-10 rounded-full bg-[#111] text-white hover:bg-amberAccent hover:text-inkBlack flex items-center justify-center shrink-0 transition-all shadow-md cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Equal-Height Showcase: Left Image Card + Right Technical Specs Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
            
            {/* Left Photo Card (5 cols) - Exactly matches right card height */}
            <div className="lg:col-span-5 rounded-2xl p-5 bg-[#FAFAFC] border-2 border-amberAccent/40 shadow-sm flex flex-col justify-between h-full space-y-4">
              <div className="w-full flex-1 min-h-[280px] rounded-xl overflow-hidden bg-gray-100 relative">
                <img
                  src={getImageUrl(currentProduct.image_url) || "https://cjaeubdycgnwgfkbddvb.supabase.co/storage/v1/object/public/general/cyclone_dust_collector_industrial.jpg"}
                  alt={currentProduct.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                />
              </div>
              <div className="pt-1 text-center">
                <span className="text-amberAccent text-[10px] font-bold uppercase tracking-widest block font-display">
                  {subProducts.length > 1 ? `Model ${selectedProductIndex + 1} of ${subProducts.length}` : 'Core Equipment'}
                </span>
                <h3 className="font-display text-sm font-extrabold text-inkBlack mt-0.5">
                  {currentProduct.name}
                </h3>
                {currentProduct.description && (
                  <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    {currentProduct.description}
                  </p>
                )}
              </div>
            </div>

            {/* Right Technical Specs Table (7 cols) - Matches left card height */}
            <div className="lg:col-span-7 bg-[#FAFAFC] rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-display block">
                      EQUIPMENT SPECIFICATIONS
                    </span>
                    <h3 className="font-display text-sm sm:text-base font-extrabold text-[#111]">
                      Technical Specifications – <span className="text-amberAccent">{currentProduct.name}</span>
                    </h3>
                  </div>
                  <button
                    onClick={() => openConsultationModal(currentProduct.name)}
                    className="text-xs font-bold text-amberAccent hover:underline cursor-pointer shrink-0"
                  >
                    Request Quote ↗
                  </button>
                </div>

                {currentProduct.technical_specs && Object.keys(currentProduct.technical_specs).length > 0 ? (
                  <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                    <table className="w-full text-left text-xs">
                      <tbody className="divide-y divide-gray-100">
                        {Object.entries(currentProduct.technical_specs).map(([paramKey, paramVal], sIdx) => (
                          <tr key={sIdx} className={sIdx % 2 === 0 ? 'bg-white' : 'bg-offWhite/50'}>
                            <td className="py-2.5 px-4 font-bold text-[#111] w-2/5 border-r border-gray-100 align-top text-xs">
                              {paramKey}
                            </td>
                            <td className="py-2.5 px-4 text-gray-700 font-medium align-top text-xs">
                              {paramVal}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 py-6 text-center">Technical specifications standard available upon process audit.</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-medium">
                  Need customized technical sizing?
                </span>
                <button
                  onClick={() => openConsultationModal(currentProduct.name)}
                  className="px-4 py-2 rounded-lg bg-amberAccent hover:bg-amberAccentDark text-inkBlack font-display font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  Enquire for this Model →
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. NEWSLETTER SUBSCRIPTION BANNER */}
      {/* ========================================================================= */}
      <section className="bg-[#11141B] text-white py-12 border-t border-b border-gray-800">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-1 max-w-xl">
              <span className="text-amberAccent text-[10px] font-bold uppercase tracking-widest font-display block">
                STAY CONNECTED WITH ANTRIXX
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                Subscribe to Industrial Energy & Utility Insights
              </h2>
              <p className="text-xs text-gray-400">
                Get latest updates, engineering bulletins and case studies on pollution control solutions and steam efficiency.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 min-w-full sm:min-w-[420px]">
              <input
                type="email"
                required
                placeholder="Enter your professional email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-[#0E1117] border border-[#363C47] text-white text-xs px-4 py-3 rounded-lg focus:outline-none focus:border-amberAccent"
              />
              <button
                type="submit"
                disabled={newsletterSubmitting}
                className="px-6 py-3 rounded-lg bg-amberAccent hover:bg-amberAccentDark text-inkBlack font-display font-black text-xs uppercase tracking-wider shadow-amberGlow transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                {newsletterSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INQUIRY / TECHNICAL AUDIT FORM SECTION */}
      {/* ========================================================================= */}
      <section id="inquiry-form-section" className="py-16 bg-[#0F1318] text-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-amberAccent uppercase tracking-widest block font-display">
                START YOUR PROJECT
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Request a Technical Audit & Proposal
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Connect with our senior thermal and utility automation engineers for an on-site system inspection and fuel efficiency audit.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              {formSubmitted ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="font-display font-bold text-base text-emerald-300">Inquiry Received!</h4>
                  <p className="text-xs text-gray-300">Our engineering team will review your requirement and reach out shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-amberAccent text-xs"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Contact Phone *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-amberAccent text-xs"
                    />
                  </div>

                  <input
                    type="email"
                    required
                    placeholder="Work Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-amberAccent text-xs"
                  />

                  <input
                    type="text"
                    placeholder="Company / Plant Name"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-amberAccent text-xs"
                  />

                  <textarea
                    rows={3}
                    placeholder="Describe your plant equipment or project scope..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-amberAccent text-xs resize-none"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg bg-amberAccent hover:bg-amberAccentDark text-inkBlack font-display font-black text-xs uppercase tracking-wider shadow-amberGlow flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT TECHNICAL INQUIRY'}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed right-5 bottom-5 z-50 bg-[#151922] text-white px-5 py-3.5 rounded-xl border-l-4 border-amberAccent shadow-2xl text-xs flex items-center gap-3 animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
