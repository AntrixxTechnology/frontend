import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, FileText, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-inkBlack pt-24 pb-20 font-body">
      
      {/* Header Banner */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#0A1628] border-b border-gray200">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0F223D] to-[#0A1628] opacity-90"></div>
        <div className="relative z-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
            <Link to="/" className="hover:text-amberAccent transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-amberAccent">LEGAL</span>
            <span>/</span>
            <span className="text-white">PRIVACY POLICY</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amberAccent/10 text-amberAccent border border-amberAccent/30 text-[11px] font-bold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> ENTERPRISE DATA GOVERNANCE
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Privacy Policy & <span className="text-amberAccent">Data Protection</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Effective Date: October 2026 &bull; Antrixx Technology Private Limited
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 leading-relaxed text-sm text-gray-700 font-sans">
        
        {/* Intro Alert Box */}
        <div className="p-6 rounded-2xl bg-offWhite border border-gray200 space-y-3">
          <h2 className="font-display text-lg font-bold text-inkBlack flex items-center gap-2">
            <Lock className="w-5 h-5 text-amberAccent" /> Commitment to Enterprise Privacy
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Antrixx Technology (&ldquo;Antrixx&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the privacy and proprietary data of our enterprise clients, industrial partners, candidates, and website visitors. This Privacy Policy details how we collect, process, store, and safeguard your commercial and personal information.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-bold text-inkBlack border-b border-gray200 pb-2">
            1. Information We Collect
          </h3>
          <p>We collect information directly from you when you interact with our commercial engineering services, submit lead inquiries, request boiler house audits, or apply for open career positions:</p>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm">
            <li><strong>Commercial & Contact Data:</strong> Full name, corporate email address, phone number, company name, industry sector, plant location, and technical project requirements submitted via contact or inquiry forms.</li>
            <li><strong>Job Applicant Data:</strong> Full name, resume/curriculum vitae (CV), employment history, academic credentials, and contact notes submitted via our Careers portal.</li>
            <li><strong>Technical & Telemetry Data:</strong> IP address, browser type, device identifiers, and site usage patterns gathered via standard server logs and analytical cookies to ensure optimal site availability and performance.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-bold text-inkBlack border-b border-gray200 pb-2">
            2. How We Use Your Information
          </h3>
          <p>We process your data strictly for legitimate industrial business and service fulfillment purposes:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-gray200 bg-white">
              <span className="font-bold text-inkBlack block mb-1">Engineering Proposals & Audits</span>
              <span className="text-xs text-gray-500">To calculate steam loads, evaluate boiler efficiency parameters, and provide tailored technical proposals.</span>
            </div>
            <div className="p-4 rounded-xl border border-gray200 bg-white">
              <span className="font-bold text-inkBlack block mb-1">Customer Service & SLA Dispatch</span>
              <span className="text-xs text-gray-500">To coordinate field service engineers, dispatch spare parts, and address urgent operational plant inquiries.</span>
            </div>
            <div className="p-4 rounded-xl border border-gray200 bg-white">
              <span className="font-bold text-inkBlack block mb-1">Recruitment & Talent Acquisition</span>
              <span className="text-xs text-gray-500">To evaluate engineering credentials and contact candidates regarding open roles in our thermal automation team.</span>
            </div>
            <div className="p-4 rounded-xl border border-gray200 bg-white">
              <span className="font-bold text-inkBlack block mb-1">Regulatory & Statutory Compliance</span>
              <span className="text-xs text-gray-500">To maintain legally required commercial records, tax invoices, and statutory safety documentation under Indian laws.</span>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-bold text-inkBlack border-b border-gray200 pb-2">
            3. Strict Non-Disclosure & Data Sharing
          </h3>
          <p className="font-semibold text-inkBlack">
            Antrixx Technology NEVER sells, rents, leases, or monetizes any client or applicant data to third-party advertisers.
          </p>
          <p>Information is disclosed solely to authorized service providers bound by strict confidentiality obligations, including:</p>
          <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm">
            <li>Secure cloud hosting and encrypted database providers (Supabase & Vercel Edge Infrastructure).</li>
            <li>Transactional email and notification dispatch systems (Resend API) for inquiry acknowledgment.</li>
            <li>Governmental or statutory authorities only when legally mandated by applicable Indian law or court subpoena.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-bold text-inkBlack border-b border-gray200 pb-2">
            4. Enterprise Data Security & Retention
          </h3>
          <p>
            We deploy multi-layered security controls, including TLS/SSL cryptographic encryption in transit, strict Row Level Security (RLS) on cloud databases, bcrypt password hashing, and token-based administrative authorization. We retain customer contact and project specifications only for the duration necessary to satisfy ongoing service warranties and statutory accounting requirements.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-bold text-inkBlack border-b border-gray200 pb-2">
            5. Your Rights & Grievance Contact
          </h3>
          <p>
            Under Indian information technology laws and international data standards, you have the right to request access, correction, or deletion of your commercial contact records from our systems. For any inquiries or grievance redressals, please reach out to our compliance desk:
          </p>
          <div className="p-6 rounded-2xl bg-[#0A1628] text-white space-y-3">
            <h4 className="font-display text-base font-bold text-amberAccent">Antrixx Data Governance & Grievance Officer</h4>
            <div className="space-y-2 text-xs sm:text-sm text-gray-300">
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-amberAccent" /> <strong>Email:</strong> help@antrixxtechnology.net</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-amberAccent" /> <strong>Phone:</strong> +91 9748636108 / +91 9477179885</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amberAccent" /> <strong>Address:</strong> Kolkata, West Bengal, India</p>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
};

export default PrivacyPolicyPage;
