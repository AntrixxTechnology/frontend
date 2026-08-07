import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileText,
  Download,
  BookOpen,
  Clock,
  User,
  ArrowRight,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Share2,
} from 'lucide-react';
import { getResources, getResourceBySlug, ResourcePost } from '../api/client';

export const ResourcesPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resources, setResources] = useState<ResourcePost[]>([]);
  const [activePost, setActivePost] = useState<ResourcePost | null>(null);

  useEffect(() => {
    getResources().then(setResources);
  }, []);

  useEffect(() => {
    if (slug) {
      getResourceBySlug(slug).then(setActivePost);
    } else {
      setActivePost(null);
    }
  }, [slug]);

  if (activePost) {
    return (
      <div className="min-h-screen bg-white text-inkBlack pt-24 pb-20 font-body">
        <section className="bg-offWhite py-16 border-b border-gray200">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray500 uppercase tracking-wider">
              <Link to="/" className="hover:text-amberAccent">HOME</Link>
              <span>/</span>
              <Link to="/resources" className="hover:text-amberAccent">RESOURCES</Link>
              <span>/</span>
              <span className="text-amberAccent">{activePost.title}</span>
            </div>

            <span className="px-3 py-1 rounded-full bg-amberAccent/10 text-amberAccent border border-amberAccent/30 text-xs font-display font-bold uppercase tracking-wider inline-block">
              {activePost.category}
            </span>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-inkBlack tracking-tight leading-tight">
              {activePost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 pt-2 border-t border-gray200">
              <span className="flex items-center gap-1.5 font-bold text-inkBlack">
                <User className="w-4 h-4 text-amberAccent" /> {activePost.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amberAccent" /> {activePost.read_time}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amberAccent" /> {new Date(activePost.published_date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {activePost.cover_image_url && (
              <div className="rounded-2xl overflow-hidden border border-gray200 shadow-cardHover">
                <img src={activePost.cover_image_url} alt={activePost.title} className="w-full h-[400px] object-cover" />
              </div>
            )}

            <div className="prose prose-slate max-w-none space-y-6 text-sm text-gray-700 leading-relaxed font-normal">
              <div className="p-4 rounded-xl bg-offWhite border border-amberAccent/30 text-inkBlack font-medium">
                <strong>Executive Summary:</strong> {activePost.summary}
              </div>

              <div className="whitespace-pre-line space-y-4">
                {activePost.content}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-offWhite via-white to-offWhite border border-gray200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-display text-sm font-extrabold text-inkBlack">
                  Download Full Technical Specifications
                </h4>
                <p className="text-xs text-gray-600">
                  Get the complete Antrixx Corporate Profile & Boiler Automation PDF brochure.
                </p>
              </div>
              <a
                href="/api/resources/downloads/profile-pdf"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-md bg-amberAccent hover:bg-amberAccentDark text-white font-display font-bold text-xs uppercase tracking-wider shadow-amberGlow shrink-0 flex items-center gap-2"
              >
                DOWNLOAD PDF BROCHURE <Download className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-8 border-t border-gray200 flex justify-between items-center">
              <Link to="/resources" className="text-xs font-bold text-amberAccent uppercase tracking-wider hover:underline">
                ← Back to Resources Hub
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-inkBlack pt-24 pb-20 font-body">
      
      {/* 1. Header Banner */}
      <section className="bg-offWhite py-16 border-b border-gray200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray500 uppercase tracking-wider">
              <Link to="/" className="hover:text-amberAccent">HOME</Link>
              <span>/</span>
              <span className="text-amberAccent">RESOURCES</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-inkBlack tracking-tight leading-tight">
              Technical Insights & <span className="text-amberAccent">Corporate Profile Downloads.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Access data-backed technical guides, thermal energy audit whitepapers, and our complete Antrixx Technology Corporate Engineering PDF profile.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Featured Corporate PDF Download Card */}
      <section className="py-12 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-offWhite via-white to-offWhite p-8 border-2 border-amberAccent/40 shadow-cardHover grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amberAccent/10 text-amberAccent text-xs font-display font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" /> OFFICIAL CORPORATE BROCHURE
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-inkBlack leading-tight">
                Antrixx Technology Corporate Engineering Profile PDF
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                Download our full 2026 corporate documentation detailing all 12 solution verticals, enterprise client credentials, pan-India field dispatch terms, and balance-of-plant technical specifications.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-inkBlack font-bold">
                  <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0" />
                  <span>All 12 Solutions Scope</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-inkBlack font-bold">
                  <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0" />
                  <span>10 Verified Clients</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-inkBlack font-bold">
                  <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0" />
                  <span>P&ID Layout Specs</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-inkBlack font-bold">
                  <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0" />
                  <span>Pan-India SLA Terms</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl border border-gray200 shadow-sm space-y-4">
              <FileText className="w-12 h-12 text-amberAccent" />
              <div>
                <span className="font-display font-extrabold text-sm text-inkBlack block">
                  ANTRIXX_TECHNOLOGY_PROFILE.pdf
                </span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  PDF Document • High Resolution
                </span>
              </div>

              <a
                href="/api/resources/downloads/profile-pdf"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-md bg-amberAccent hover:bg-amberAccentDark text-white font-display font-bold text-xs uppercase tracking-wider shadow-amberGlow flex items-center justify-center gap-2 transition-colors"
              >
                DOWNLOAD PROFILE PDF <Download className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Technical Articles & Blog Hub Grid */}
      <section className="py-16 bg-offWhite border-t border-b border-gray200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="space-y-2">
            <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
              ENGINEERING WHITEPAPERS & ARTICLES
            </span>
            <h2 className="font-display text-3xl font-extrabold text-inkBlack">
              Latest Technical Guides & Thermal Audits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((res) => (
              <div
                key={res.id}
                className="group bg-white rounded-2xl border border-gray200 shadow-cardLight hover:shadow-cardHover hover:border-amberAccent transition-all overflow-hidden flex flex-col justify-between"
              >
                <div className="h-52 overflow-hidden bg-gray-100 relative">
                  <img
                    src={res.cover_image_url || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop'}
                    alt={res.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-inkBlack text-[10px] font-display font-bold uppercase tracking-wider shadow-sm">
                      {res.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-amberAccent" /> {res.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amberAccent" /> {res.read_time}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-inkBlack group-hover:text-amberAccent transition-colors">
                      {res.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed font-normal line-clamp-3">
                      {res.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray200 flex items-center justify-between">
                    <Link
                      to={`/resources/${res.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-amberAccent hover:text-amberAccentDark uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                    >
                      READ FULL ARTICLE <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={res.download_file_url || '/api/resources/downloads/profile-pdf'}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-offWhite hover:bg-gray200 text-inkBlack border border-gray200"
                      title="Download Related PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-amberAccent" />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
