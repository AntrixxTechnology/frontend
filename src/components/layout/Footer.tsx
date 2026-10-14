import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, Linkedin, Facebook, Instagram, ShieldCheck } from 'lucide-react';
import { getSiteSettings, SiteSettings } from '../../api/client';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(() => {
    try {
      const cached = localStorage.getItem('antrixx_settings_state');
      if (cached) return JSON.parse(cached);
    } catch {}
    return null;
  });

  useEffect(() => {
    getSiteSettings().then((data) => {
      if (data) {
        setSettings(data);
        try { localStorage.setItem('antrixx_settings_state', JSON.stringify(data)); } catch {}
      }
    });
  }, []);

  return (
    <footer className="bg-[#14141A] text-white pt-12 pb-8 border-t border-slate-800 font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Body */}
        <div className="pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center">
              <img src="/logo-white.png" alt="Antrixx Logo" className="h-10 w-auto object-contain" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Delivering intelligent & sustainable engineering solutions that drive efficiency, safety, and operational growth for process industries nationwide.
            </p>

            {/* Social Links Controlled by Admin */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings?.linkedin_url || '#'}
                target={settings?.linkedin_url ? '_blank' : undefined}
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-amberAccent hover:border-amberAccent transition-all hover:scale-105"
                aria-label="LinkedIn"
                title={settings?.linkedin_url ? "Follow Antrixx on LinkedIn" : "LinkedIn"}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings?.facebook_url || '#'}
                target={settings?.facebook_url ? '_blank' : undefined}
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-amberAccent hover:border-amberAccent transition-all hover:scale-105"
                aria-label="Facebook"
                title={settings?.facebook_url ? "Follow Antrixx on Facebook" : "Facebook"}
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings?.instagram_url || '#'}
                target={settings?.instagram_url ? '_blank' : undefined}
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-amberAccent hover:border-amberAccent transition-all hover:scale-105"
                aria-label="Instagram"
                title={settings?.instagram_url ? "Follow Antrixx on Instagram" : "Instagram"}
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-amberAccent">
              QUICK LINKS
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link to="/about" className="hover:text-amberAccent transition-colors">About Us</Link></li>
              <li><Link to="/solutions" className="hover:text-amberAccent transition-colors">Our Solutions</Link></li>
              <li><Link to="/projects" className="hover:text-amberAccent transition-colors">Case Studies</Link></li>
              <li><Link to="/careers" className="hover:text-amberAccent transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-amberAccent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div className="space-y-3">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-amberAccent">
              INDUSTRIES
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link to="/industries" className="hover:text-amberAccent transition-colors">Food Processing & FMCG</Link></li>
              <li><Link to="/industries" className="hover:text-amberAccent transition-colors">Beverages & Bottling</Link></li>
              <li><Link to="/industries" className="hover:text-amberAccent transition-colors">Textile & Dyeing Mills</Link></li>
              <li><Link to="/industries" className="hover:text-amberAccent transition-colors">Rice & Agro Processing</Link></li>
              <li><Link to="/industries" className="hover:text-amberAccent transition-colors">Pharma & Chemicals</Link></li>
              <li><Link to="/industries" className="hover:text-amberAccent transition-colors">Heavy Manufacturing</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info & Location */}
          <div className="space-y-3">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-amberAccent">
              CONTACT US
            </p>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a href="tel:+919748636108" className="flex items-start gap-2 hover:text-amberAccent transition-colors">
                <Phone className="w-4 h-4 text-amberAccent shrink-0 mt-0.5" />
                <span>+91 9748636108 / +91 9477179885</span>
              </a>
              <a href="mailto:antrixxtechnology@gmail.com" className="flex items-start gap-2 hover:text-amberAccent transition-colors">
                <Mail className="w-4 h-4 text-amberAccent shrink-0 mt-0.5" />
                <span>antrixxtechnology@gmail.com</span>
              </a>
              <a
                href="https://maps.app.goo.gl/Urp4Xd9Qu2HnzJgL9"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 hover:text-amberAccent transition-colors"
                title="View on Google Maps"
              >
                <MapPin className="w-4 h-4 text-amberAccent shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {settings?.address || 'BE 89, Street No 174, Action Area 1, Newtown, Kolkata, West Bengal 700156'}
                </span>
              </a>
            </div>

            {/* Embedded Google Map Box */}
            <div className="pt-2">
              <a
                href="https://maps.app.goo.gl/Urp4Xd9Qu2HnzJgL9"
                target="_blank"
                rel="noreferrer"
                className="block group relative w-full h-24 rounded-xl overflow-hidden border border-slate-700 hover:border-amberAccent transition-all shadow-md bg-slate-900"
                title="Click to view Antrixx Technology on Google Maps"
              >
                <iframe
                  title="Antrixx Technology Location Map"
                  src="https://maps.google.com/maps?q=BE+89,+Street+No+174,+Action+Area+1,+Newtown,+Kolkata,+West+Bengal+700156&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 pointer-events-none opacity-70 group-hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2 justify-between pointer-events-none">
                  <span className="text-[10px] font-bold text-amberAccent flex items-center gap-1 drop-shadow">
                    <MapPin className="w-3 h-3 text-amberAccent" /> Newtown, Kolkata
                  </span>
                  <span className="text-[9px] font-bold text-inkBlack bg-amberAccent px-1.5 py-0.5 rounded shadow group-hover:scale-105 transition-transform">
                    Open Map ↗
                  </span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ANTRIXX Industrial Engineering Solutions. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/faq" className="hover:text-slate-300 transition-colors">FAQ</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
