import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  CheckCircle2,
  PhoneCall,
  Mail,
  ShieldCheck,
  Zap,
  Wrench,
  ChevronRight,
  Send,
} from 'lucide-react';
import { getSolutionBySlug, SolutionItem } from '../api/client';

export const SolutionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [solution, setSolution] = useState<SolutionItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    message: '',
  });

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getSolutionBySlug(slug).then((data) => {
        setSolution(data);
        setLoading(false);
      });
    }
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: `Inquiry regarding ${solution?.title || 'Solution'}: ${formData.message}`,
        }),
      });
      if (res.ok) {
        setFormSubmitted(true);
      }
    } catch (err) {
      console.error('Contact submission error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-20 text-center font-body">
        <div className="inline-block w-8 h-8 border-4 border-amberAccent border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-wider">Loading Solution Details...</p>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-20 text-center space-y-4 font-body">
        <h2 className="font-display text-2xl font-extrabold text-inkBlack">Solution Not Found</h2>
        <p className="text-xs text-gray-500">The solution specified does not exist or has been removed.</p>
        <Link to="/solutions" className="inline-block px-6 py-3 rounded-md bg-amberAccent text-white font-display font-bold text-xs uppercase">
          Back to Solutions Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-inkBlack pt-24 pb-20 font-body">
      
      {/* 1. Breadcrumb & Hero Banner */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden banner-zoom-container bg-inkBlack group border-b border-gray200">
        <img 
          src={solution.hero_image_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop"} 
          alt={solution.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-inkBlack/70 z-10 group-hover:bg-inkBlack/60 transition-colors duration-500"></div>
        <div className="relative z-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider">
            <Link to="/" className="hover:text-amberAccent transition-colors">HOME</Link>
            <span>/</span>
            <Link to="/solutions" className="hover:text-amberAccent transition-colors">SOLUTIONS</Link>
            <span>/</span>
            <span className="text-amberAccent">{solution.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-amberAccent/20 text-amberAccent border border-amberAccent/30 text-xs font-display font-bold uppercase tracking-wider inline-block">
                {solution.category}
              </span>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {solution.title}
              </h1>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal max-w-2xl">
                {solution.short_description}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#inquiry-form"
                  className="px-6 py-3 rounded-md bg-amberAccent hover:bg-amberAccentDark text-inkBlack font-display font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:-translate-y-1"
                >
                  REQUEST TECHNICAL AUDIT <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/api/resources/downloads/profile-pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-md bg-transparent hover:bg-white/10 text-white font-display font-bold text-xs uppercase tracking-wider border border-white/30 flex items-center gap-2 transition-all hover:-translate-y-1"
                >
                  DOWNLOAD PDF SPECS <Download className="w-4 h-4 text-amberAccent" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Split */}
      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column (2/3 Width) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Full Description & Overview */}
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-extrabold text-inkBlack border-b border-gray200 pb-3">
                  Solution Overview & Engineering Scope
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal whitespace-pre-line">
                  {solution.full_description}
                </p>
              </div>

              {/* Key Features Checklist */}
              {solution.features && solution.features.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold text-inkBlack">
                    Key Features & Technical Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {solution.features.map((feat, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-offWhite border border-gray200 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-amberAccent shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-inkBlack leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Deliverables Grid */}
              {solution.deliverables && solution.deliverables.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold text-inkBlack">
                    What We Deliver (Turnkey Scope)
                  </h3>
                  <ul className="space-y-2">
                    {solution.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-center gap-3 p-3.5 rounded-lg bg-white border border-gray200 text-xs text-gray-700">
                        <span className="w-6 h-6 rounded-full bg-amberAccent/10 text-amberAccent font-bold flex items-center justify-center text-[10px] shrink-0">
                          0{idx + 1}
                        </span>
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Specifications Table */}
              {solution.technical_specs && Object.keys(solution.technical_specs).length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold text-inkBlack">
                    Technical Specifications
                  </h3>
                  <div className="rounded-xl border border-gray200 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-offWhite text-gray-500 uppercase font-display font-bold border-b border-gray200">
                        <tr>
                          <th className="p-4">Parameter</th>
                          <th className="p-4">Specification Standard</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray200 text-slate-700">
                        {Object.entries(solution.technical_specs).map(([key, val], idx) => (
                          <tr key={idx} className="hover:bg-offWhite/50">
                            <td className="p-4 font-bold text-inkBlack">{key}</td>
                            <td className="p-4">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column (1/3 Width) */}
            <div className="lg:col-span-4 space-y-8 sticky top-28">
              
              {/* Quick Inquiry Form Card */}
              <div id="inquiry-form" className="bg-white rounded-2xl p-6 border border-gray200 shadow-cardHover space-y-4">
                <div className="border-b border-gray200 pb-3">
                  <span className="text-amberAccent text-[10px] font-bold uppercase tracking-widest block">
                    INQUIRE ABOUT THIS SOLUTION
                  </span>
                  <h4 className="font-display text-base font-extrabold text-inkBlack mt-1">
                    Request Proposal & Technical Audit
                  </h4>
                </div>

                {formSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs space-y-2">
                    <p className="font-bold">Thank you for your interest!</p>
                    <p>Our thermal engineering team will review your requirements and respond within 24 business hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Company / Plant Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Haldiram Foods"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Message / Requirements</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Describe your plant capacity, boiler type, or engineering requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-md bg-amberAccent hover:bg-amberAccentDark text-white font-display font-bold text-xs uppercase tracking-wider shadow-amberGlow flex items-center justify-center gap-2 transition-colors"
                    >
                      SEND INQUIRY <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>

              {/* Direct Engineering Support Box */}
              <div className="p-6 rounded-2xl bg-offWhite border border-gray200 space-y-3">
                <h4 className="font-display text-sm font-bold text-inkBlack">
                  Need Immediate Engineering Support?
                </h4>
                <p className="text-xs text-gray-600">
                  Talk directly with our lead thermal and controls engineers for rapid field assistance.
                </p>
                <div className="pt-1 space-y-2 text-xs font-bold text-amberAccent">
                  <a href="tel:+919748636108" className="flex items-center gap-2 hover:underline">
                    <PhoneCall className="w-4 h-4" /> +91 9748636108 / +91 9477179885
                  </a>
                  <a href="mailto:antrixxtechnology@gmail.com" className="flex items-center gap-2 text-gray-700 hover:text-amberAccent">
                    <Mail className="w-4 h-4 text-amberAccent" /> antrixxtechnology@gmail.com
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
