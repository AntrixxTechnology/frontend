import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronDown, Menu, X, ArrowRight, Activity, Flame, Wind, Layers, Truck, Cpu, Zap } from 'lucide-react';
import { getSolutions, SolutionItem, getImageUrl } from '../../api/client';
import { useModal } from '../../context/ModalContext';

export const Navbar: React.FC = () => {
  const { openConsultationModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [solutionsList, setSolutionsList] = useState<SolutionItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    getSolutions().then((data) => {
      if (data && data.length > 0) setSolutionsList(data);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-md' : 'bg-white py-4 border-b border-gray200'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img src="/logo.png" alt="Antrixx Logo" className="h-9 sm:h-10 w-auto object-contain" />
          </Link>


          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-sans">
            <Link
              to="/"
              className={`text-[12px] font-bold tracking-[0.1em] uppercase transition-colors ${
                location.pathname === '/' ? 'text-amberAccent' : 'text-inkBlack hover:text-amberAccent'
              }`}
            >
              HOME
            </Link>

            {/* Mega Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <Link
                to="/solutions"
                className={`text-[12px] font-bold tracking-[0.1em] uppercase flex items-center gap-1.5 transition-colors py-2 ${
                  location.pathname.startsWith('/solutions')
                    ? 'text-amberAccent'
                    : 'text-inkBlack hover:text-amberAccent'
                }`}
              >
                SOLUTIONS <ChevronDown className={`w-3.5 h-3.5 transition-transform ${solutionsDropdownOpen ? 'rotate-180 text-amberAccent' : ''}`} />
              </Link>

              {/* Mega-menu panel (100% Dynamic with Exact Reference Look & Fonts) */}
              {solutionsDropdownOpen && (
                <div className="absolute top-[100%] -left-48 pt-4 w-[820px] z-50">
                  <div className="bg-white rounded-xl shadow-cardHover border border-gray200 p-8 grid grid-cols-12 gap-8 animate-fade-in-up">
                    
                    {/* Dynamic Col 1: Automation Solutions */}
                    <div className="col-span-3 space-y-4">
                      <p className="text-[11px] font-display font-bold uppercase tracking-widest text-amberAccent pb-2 border-b border-gray200">
                        Automation Solutions
                      </p>
                      <div className="space-y-3">
                        {solutionsList.slice(0, Math.max(2, Math.ceil(solutionsList.length / 3))).map((sol) => (
                          <Link
                            key={sol.id}
                            to={`/solutions/${sol.slug}`}
                            className="block text-xs font-sans text-gray500 hover:text-amberAccent hover:translate-x-1 transition-all truncate"
                          >
                            {sol.title}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Col 2: Environment & Spares */}
                    <div className="col-span-3 space-y-4">
                      <p className="text-[11px] font-display font-bold uppercase tracking-widest text-amberAccent pb-2 border-b border-gray200">
                        Environment & Spares
                      </p>
                      <div className="space-y-3">
                        {solutionsList.slice(Math.ceil(solutionsList.length / 3), Math.ceil((2 * solutionsList.length) / 3)).map((sol) => (
                          <Link
                            key={sol.id}
                            to={`/solutions/${sol.slug}`}
                            className="block text-xs font-sans text-gray500 hover:text-amberAccent hover:translate-x-1 transition-all truncate"
                          >
                            {sol.title}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Col 3: Energy & Consulting */}
                    <div className="col-span-3 space-y-4">
                      <p className="text-[11px] font-display font-bold uppercase tracking-widest text-amberAccent pb-2 border-b border-gray200">
                        Energy & Consulting
                      </p>
                      <div className="space-y-3">
                        {solutionsList.slice(Math.ceil((2 * solutionsList.length) / 3)).map((sol) => (
                          <Link
                            key={sol.id}
                            to={`/solutions/${sol.slug}`}
                            className="block text-xs font-sans text-gray500 hover:text-amberAccent hover:translate-x-1 transition-all truncate"
                          >
                            {sol.title}
                          </Link>
                        ))}
                        <Link to="/contact" className="block text-xs font-sans text-gray500 hover:text-amberAccent hover:translate-x-1 transition-all">
                          Turnkey Consultation
                        </Link>
                      </div>
                    </div>

                    {/* Feature Image Col */}
                    <Link to="/solutions" className="col-span-3 bg-offWhite p-4 rounded-xl border border-gray200 flex flex-col justify-end min-h-[160px] relative overflow-hidden group cursor-pointer banner-zoom-container">
                      <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="capabilities" />
                      <div className="absolute inset-0 bg-gradient-to-t from-inkBlack/80 to-transparent"></div>
                      <div className="relative z-10">
                        <p className="text-white font-display font-bold text-sm mb-1 leading-tight">View All Our Capabilities</p>
                        <p className="text-amberAccent text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/industries"
              className={`text-[12px] font-bold tracking-[0.1em] uppercase transition-colors ${
                location.pathname === '/industries' ? 'text-amberAccent' : 'text-inkBlack hover:text-amberAccent'
              }`}
            >
              INDUSTRIES
            </Link>

            <Link
              to="/projects"
              className={`text-[12px] font-bold tracking-[0.1em] uppercase transition-colors ${
                location.pathname === '/projects' ? 'text-amberAccent' : 'text-inkBlack hover:text-amberAccent'
              }`}
            >
              PROJECTS
            </Link>

            <Link
              to="/about"
              className={`text-[12px] font-bold tracking-[0.1em] uppercase transition-colors ${
                location.pathname === '/about' ? 'text-amberAccent' : 'text-inkBlack hover:text-amberAccent'
              }`}
            >
              ABOUT US
            </Link>

            <Link
              to="/resources"
              className={`text-[12px] font-bold tracking-[0.1em] uppercase transition-colors ${
                location.pathname.startsWith('/resources') ? 'text-amberAccent' : 'text-inkBlack hover:text-amberAccent'
              }`}
            >
              RESOURCES
            </Link>

            <Link
              to="/contact"
              className={`text-[12px] font-bold tracking-[0.1em] uppercase transition-colors ${
                location.pathname === '/contact' ? 'text-amberAccent' : 'text-inkBlack hover:text-amberAccent'
              }`}
            >
              CONTACT US
            </Link>

          </nav>

          {/* Right Phone + CTA */}
          <div className="hidden xl:flex items-center gap-4">
            <a
              href="tel:+919748636108"
              className="flex items-center gap-2 text-xs font-bold text-inkBlack hover:text-amberAccent transition-colors border-r border-gray200 pr-4"
            >
              <Phone className="w-3.5 h-3.5 text-amberAccent" />
              +91 9748636108
            </a>

            <button
              onClick={() => openConsultationModal('General Engineering Consultation')}
              className="px-5 py-2.5 rounded-md bg-amberAccent hover:bg-amberAccentDark text-inkBlack text-xs font-display font-extrabold hover:-translate-y-0.5 transition-all flex items-center gap-1.5 uppercase shadow-amberGlow cursor-pointer"
            >
              ENQUIRE NOW <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md bg-offWhite text-inkBlack border border-gray200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray200 px-6 pt-6 pb-8 mt-3 space-y-4 font-sans animate-fade-in-up">
          <div className="flex items-center gap-3 pb-4 border-b border-gray200">
            <img src="/logo.png" alt="Antrixx Logo" className="h-8 w-auto" />
            <span className="font-display font-extrabold text-sm text-inkBlack">ANTRIXX TECHNOLOGY</span>
          </div>

          <nav className="space-y-3">
            <Link to="/" className="block text-sm font-bold text-inkBlack hover:text-amberAccent">HOME</Link>
            <Link to="/solutions" className="block text-sm font-bold text-inkBlack hover:text-amberAccent">SOLUTIONS</Link>
            <Link to="/industries" className="block text-sm font-bold text-inkBlack hover:text-amberAccent">INDUSTRIES</Link>
            <Link to="/projects" className="block text-sm font-bold text-inkBlack hover:text-amberAccent">PROJECTS</Link>
            <Link to="/about" className="block text-sm font-bold text-inkBlack hover:text-amberAccent">ABOUT US</Link>
            <Link to="/resources" className="block text-sm font-bold text-inkBlack hover:text-amberAccent">RESOURCES</Link>
            <Link to="/contact" className="block text-sm font-bold text-inkBlack hover:text-amberAccent">CONTACT US</Link>
          </nav>

          <div className="pt-4 border-t border-gray200 space-y-3">
            <div className="bg-offWhite p-3 rounded-lg border border-gray200">
              <p className="text-[11px] font-bold text-gray500 uppercase">Need Engineering Help?</p>
              <a href="tel:+919748636108" className="flex items-center gap-2 text-xs font-bold text-amberAccent mt-1">
                <Phone className="w-3.5 h-3.5" /> +91 9748636108 / +91 9477179885
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openConsultationModal('General Engineering Consultation');
              }}
              className="w-full flex justify-center items-center gap-2 px-5 py-3 rounded-md bg-amberAccent hover:bg-amberAccentDark text-inkBlack font-display font-extrabold text-xs uppercase tracking-wider transition-colors shadow-amberGlow cursor-pointer"
            >
              ENQUIRE NOW <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
