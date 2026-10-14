import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldAlert, Award, AlertCircle, Mail, Phone, MapPin } from 'lucide-react';

export const TermsPage: React.FC = () => {
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
            <span className="text-white">TERMS OF SERVICE</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amberAccent/10 text-amberAccent border border-amberAccent/30 text-[11px] font-bold uppercase tracking-widest mb-4">
            <FileText className="w-3.5 h-3.5" /> COMMERCIAL AGREEMENT
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Terms of Service & <span className="text-amberAccent">Commercial Terms</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Governing Commercial Engagements, Engineering Audits & Equipment Supply &bull; Antrixx Technology Private Limited
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 leading-relaxed text-sm text-gray-700 font-sans">
        
        {/* Intro Alert Box */}
        <div className="p-6 rounded-2xl bg-offWhite border border-gray200 space-y-3">
          <h2 className="font-display text-lg font-bold text-inkBlack flex items-center gap-2">
            <Award className="w-5 h-5 text-amberAccent" /> Scope of Commercial Terms
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the corporate website of Antrixx Technology Private Limited (&ldquo;Antrixx&rdquo;), as well as all engineering quotations, energy audits, boiler retrofit proposals, SCADA telemetry deployments, and equipment purchase orders executed with us.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-bold text-inkBlack border-b border-gray200 pb-2">
            1. Commercial Quotations, Scope of Work & Validity
          </h3>
          <p>
            All formal proposals, feasibility estimates, and energy audit quotations issued by Antrixx Technology are subject to the specific Scope of Work (SOW) detailed in the corresponding contract:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm">
            <li><strong>Validity Window:</strong> Unless explicitly stated otherwise in writing, commercial quotes remain valid for thirty (30) calendar days from the date of issuance due to fluctuating raw material and metallurgy commodity costs.</li>
            <li><strong>Site Pre-requisites:</strong> Turnkey boiler installations, heat pump retrofits, and electrical automation commissions require client facility readiness (foundation, raw power supply, civil work, and utility pipe connections) as specified in the technical pre-commissioning schedule.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-bold text-inkBlack border-b border-gray200 pb-2">
            2. Intellectual Property & Technical Schematics
          </h3>
          <p>
            All engineering blueprints, P&ID drawings, SCADA PLC programming code, thermal efficiency simulation models, and custom balance-of-plant schematics furnished by Antrixx remain the exclusive intellectual property of Antrixx Technology Private Limited. Clients are granted a non-transferable, perpetual license to utilize such schematics solely for operating the specific installed system.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-bold text-inkBlack border-b border-gray200 pb-2">
            3. Equipment Warranty & Field Service SLA
          </h3>
          <p>
            Antrixx warrants that all equipment, boiler components, economizer coils, headers, pumps, and control valves supplied under contract shall be free from defects in material and workmanship:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-gray200 bg-white">
              <span className="font-bold text-inkBlack block mb-1">Standard Warranty Period</span>
              <span className="text-xs text-gray-500">12 months from commercial commissioning or 18 months from dispatch date, whichever occurs earlier.</span>
            </div>
            <div className="p-4 rounded-xl border border-gray200 bg-white">
              <span className="font-bold text-inkBlack block mb-1">Rapid On-Site Support SLA</span>
              <span className="text-xs text-gray-500">Service response teams deployed within 24 to 48 hours for critical boiler downtime emergencies nationwide.</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 pt-1">
            *Warranty does not cover normal wear-and-tear consumables, improper feedwater chemistry causing scale/corrosion, or unapproved third-party modifications.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-bold text-inkBlack border-b border-gray200 pb-2">
            4. Limitation of Liability & Force Majeure
          </h3>
          <p>
            To the maximum extent permitted under applicable law, Antrixx Technology shall not be liable for any indirect, incidental, special, or consequential damages—including loss of commercial production, business interruption, or downtime losses—arising from equipment operation. Neither party shall be liable for delays caused by Force Majeure events beyond reasonable control, including severe natural disasters, grid blackouts, or government embargoes.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h3 className="font-display text-xl font-bold text-inkBlack border-b border-gray200 pb-2">
            5. Governing Law & Dispute Resolution
          </h3>
          <p>
            These Terms, commercial contracts, and purchase agreements shall be governed by and construed in accordance with the laws of the Republic of India. In the event of any commercial dispute, parties agree to submit to the exclusive jurisdiction of the competent courts in Kolkata, West Bengal, India.
          </p>
          <div className="p-6 rounded-2xl bg-[#0A1628] text-white space-y-3">
            <h4 className="font-display text-base font-bold text-amberAccent">Commercial Inquiries & Legal Notices</h4>
            <div className="space-y-2 text-xs sm:text-sm text-gray-300">
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-amberAccent" /> <strong>Email:</strong> help@antrixxtechnology.net / info@antrixxtechnology.net</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-amberAccent" /> <strong>Phone:</strong> +91 9748636108</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amberAccent" /> <strong>Office:</strong> BE 89, Street No 174, Action Area 1, Newtown, Kolkata, West Bengal 700156</p>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
};

export default TermsPage;
