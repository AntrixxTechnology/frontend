import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  HelpCircle,
  PhoneCall,
  Mail,
  ArrowRight,
  SlidersHorizontal,
  Search,
} from 'lucide-react';
import { getFaqs, FaqItem } from '../api/client';

export const FaqPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    getFaqs().then(setFaqs);
  }, []);

  const categories = ['All', 'General', 'Solutions', 'Services', 'Customization', 'Support', 'Contact'];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCategory = selectedCategory === 'All' || f.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-white text-inkBlack pt-24 pb-20 font-body">
      
      {/* 1. Header Banner */}
      <section className="bg-offWhite py-16 border-b border-gray200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray500 uppercase tracking-wider">
              <Link to="/" className="hover:text-amberAccent">HOME</Link>
              <span>/</span>
              <span className="text-amberAccent">FAQ</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-inkBlack tracking-tight leading-tight">
              Frequently Asked <span className="text-amberAccent">Questions.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Find detailed answers to common questions about our boiler house automation, steam loss diagnostics, spares dispatch, and turnkey project execution.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Search & Category Filters + Accordion List */}
      <section className="py-16">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search questions or keywords (e.g. Boiler, Spares, Audit, Delivery)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-offWhite border border-gray200 text-sm text-inkBlack placeholder:text-gray-400 focus:outline-none focus:border-amberAccent shadow-sm"
            />
          </div>

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

          {/* Accordion List */}
          <div className="space-y-4 pt-4">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 rounded-2xl bg-offWhite border border-gray200 text-center text-xs text-gray-500">
                No matching questions found for "{searchQuery}". Try adjusting your search query.
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div
                    key={faq.id || idx}
                    className="rounded-2xl border border-gray200 overflow-hidden bg-white shadow-cardLight transition-all"
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-offWhite/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-amberAccent' : 'text-gray-400'}`} />
                        <h3 className="font-display text-base font-bold text-inkBlack">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-amberAccent' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray100 bg-offWhite/30 animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Direct Support Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-offWhite via-white to-offWhite p-8 border border-gray200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
                STILL HAVE QUESTIONS?
              </span>
              <h3 className="font-display text-xl font-extrabold text-inkBlack">
                Talk Directly with Our Engineering Team
              </h3>
              <p className="text-xs text-gray-600 max-w-xl">
                We are available to answer your technical queries, site feasibility questions, or custom boiler house automation requests.
              </p>
            </div>
            <a
              href="tel:+919748636108"
              className="px-6 py-3.5 rounded-md bg-amberAccent hover:bg-amberAccentDark text-white font-display font-bold text-xs uppercase tracking-wider shadow-amberGlow shrink-0 flex items-center gap-2"
            >
              CALL US NOW (+91 9748636108) <PhoneCall className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};
