import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  Send,
  Building2,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    industry: 'Food Processing & FMCG',
    service_interest: 'Boiler Automation & Draft Control',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: `[Industry: ${formData.industry} | Interest: ${formData.service_interest}] ${formData.message}`,
        }),
      });
      if (res.ok) {
        setFormSubmitted(true);
      }
    } catch (err) {
      console.error('Contact submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-inkBlack pt-24 pb-20 font-body">
      
      {/* 1. Header Banner */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden banner-zoom-container bg-inkBlack group border-b border-gray200">
        <img 
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop" 
          alt="Contact Us Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-inkBlack/70 z-10 group-hover:bg-inkBlack/60 transition-colors duration-500"></div>
        <div className="relative z-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
            <Link to="/" className="hover:text-amberAccent transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-amberAccent">CONTACT US</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Get in Touch With Our <br />
            <span className="text-amberAccent">Engineering Team.</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal mt-6 max-w-2xl mx-auto">
            Have a technical query, boiler retrofit project, or utility audit request? Our thermal engineering specialists are ready to discuss your plant requirements.
          </p>
        </div>
      </section>

      {/* 2. Contact Cards Strip */}
      <section className="py-12 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: HQ Address */}
            <div className="p-6 rounded-2xl bg-offWhite border border-gray200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amberAccent/10 text-amberAccent border border-amberAccent/20 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-inkBlack">
                Corporate HQ
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Antrixx Technology,<br />
                Kolkata, West Bengal, India
              </p>
            </div>

            {/* Card 2: Direct Phone */}
            <div className="p-6 rounded-2xl bg-offWhite border border-gray200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amberAccent/10 text-amberAccent border border-amberAccent/20 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-inkBlack">
                Direct Engineering Support
              </h3>
              <p className="text-xs text-amberAccent font-bold leading-relaxed">
                <a href="tel:+919748636108" className="hover:underline block">+91 9748636108</a>
                <a href="tel:+919477179885" className="hover:underline block text-gray-700">+91 9477179885</a>
              </p>
            </div>

            {/* Card 3: Email */}
            <div className="p-6 rounded-2xl bg-offWhite border border-gray200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amberAccent/10 text-amberAccent border border-amberAccent/20 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-inkBlack">
                Email Inquiries
              </h3>
              <p className="text-xs text-amberAccent font-bold leading-relaxed">
                <a href="mailto:antrixxtechnology@gmail.com" className="hover:underline">
                  antrixxtechnology@gmail.com
                </a>
              </p>
            </div>

            {/* Card 4: Hours */}
            <div className="p-6 rounded-2xl bg-offWhite border border-gray200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amberAccent/10 text-amberAccent border border-amberAccent/20 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-inkBlack">
                Working Hours
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Mon – Sat: 9:00 AM – 7:00 PM IST<br />
                <span className="text-amberAccent font-bold">24/7 Field Support Dispatch</span>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Main Contact Form & Location Map Split */}
      <section className="py-16 bg-offWhite border-t border-b border-gray200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Form (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-gray200 shadow-cardHover space-y-6">
              <div className="border-b border-gray200 pb-4">
                <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
                  TECHNICAL AUDIT & INQUIRY FORM
                </span>
                <h2 className="font-display text-2xl font-extrabold text-inkBlack mt-1">
                  Send Your Project Requirements
                </h2>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-3">
                  <div className="flex items-center gap-2 font-display text-lg font-bold">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" /> Inquiry Submitted Successfully!
                  </div>
                  <p className="text-xs leading-relaxed">
                    Thank you for reaching out to Antrixx Technology. Our lead thermal engineering team will review your project details and respond within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikramaditya Singh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
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
                        className="w-full px-4 py-3 rounded-lg bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Company / Plant Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Haldiram Foods Pvt Ltd"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Industry Vertical</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      >
                        <option value="Food Processing & FMCG">Food Processing & FMCG</option>
                        <option value="Beverages & Bottling">Beverages & Bottling</option>
                        <option value="Textile & Dyeing Mills">Textile & Dyeing Mills</option>
                        <option value="Rice & Agro Processing">Rice & Agro Processing</option>
                        <option value="Pharma & Chemical">Pharma & Chemical</option>
                        <option value="Heavy Manufacturing">Heavy Manufacturing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Primary Interest</label>
                      <select
                        value={formData.service_interest}
                        onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      >
                        <option value="Boiler Automation & Draft Control">Boiler Automation & Draft Control</option>
                        <option value="Utility Remote Monitoring System">Utility Remote Monitoring System</option>
                        <option value="Pollution Control Equipment">Pollution Control Equipment</option>
                        <option value="Ash Handling Systems">Ash Handling Systems</option>
                        <option value="Fuel Handling Systems">Fuel Handling Systems</option>
                        <option value="Steam Fuel Tracker System">Steam Fuel Tracker System</option>
                        <option value="Steam Engineering Automation">Steam Engineering Automation</option>
                        <option value="Boiler & Filter Spares">Boiler & Filter Spares</option>
                        <option value="Steam & Energy Loss Diagnosis">Steam & Energy Loss Diagnosis</option>
                        <option value="Retrofitting of Boiler">Retrofitting of Boiler</option>
                        <option value="Project Management Consultation">Project Management Consultation</option>
                        <option value="Heat Pump & Chilling BOP">Heat Pump & Chilling BOP</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Message / Plant Details *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please describe your boiler capacity, operating steam pressure, fuel type, or project timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-lg bg-amberAccent hover:bg-amberAccentDark text-white font-display font-bold text-xs uppercase tracking-wider shadow-amberGlow flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'SUBMITTING...' : 'SUBMIT INQUIRY'} <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Location Map & Info (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-2xl p-6 border border-gray200 shadow-cardLight space-y-4">
                <h3 className="font-display text-lg font-extrabold text-inkBlack">
                  Pan-India Field Dispatch Coverage
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Our service engineers and commissioning specialists operate pan-India with quick-response dispatch hubs serving major industrial clusters in West Bengal, Maharashtra, Gujarat, Haryana, Tamil Nadu, and Uttar Pradesh.
                </p>

                <div className="pt-2 space-y-2 text-xs font-bold text-inkBlack">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0" />
                    <span>Emergency 24-Hour Spares Dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0" />
                    <span>On-Site Boiler Commissioning Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0" />
                    <span>Certified Steam & Utility Loss Audits</span>
                  </div>
                </div>
              </div>

              {/* Styled Map Placeholder Box */}
              <div className="rounded-2xl overflow-hidden border border-gray200 shadow-sm relative h-64 bg-gray-100 flex items-center justify-center text-center p-6">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                  alt="Kolkata HQ Location Map"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-inkBlack/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-4 space-y-2">
                  <MapPin className="w-8 h-8 text-amberAccent animate-bounce" />
                  <h4 className="font-display font-extrabold text-sm text-white">
                    Antrixx Technology Head Office
                  </h4>
                  <p className="text-[11px] text-slate-200">
                    Kolkata, West Bengal, India
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
