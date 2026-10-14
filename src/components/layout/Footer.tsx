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
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amberAccent shrink-0 mt-0.5" />
                <span>Kolkata, West Bengal, India</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 text-xs font-bold text-amberAccent hover:underline"
              >
                VIEW LOCATION MAP <ArrowRight className="w-3.5 h-3.5" />
              </Link>
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
