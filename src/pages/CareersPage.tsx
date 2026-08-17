import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  Clock,
  Send,
  Zap,
  TrendingUp,
  Users,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { getJobOpenings, JobOpening, API_BASE } from '../api/client';

export const CareersPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    applicant_name: '',
    email: '',
    phone: '',
    role_title: 'Boiler Automation & Controls Engineer',
    notes: '',
    resume_file_url: '',
  });

  useEffect(() => {
    getJobOpenings().then((data) => {
      setJobs(data);
      if (data.length > 0) {
        setFormData((prev) => ({ ...prev, role_title: data[0].title }));
      }
    });
  }, []);

  const handleApplyClick = (jobTitle: string) => {
    setFormData((prev) => ({ ...prev, role_title: jobTitle }));
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/careers/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormSubmitted(true);
      }
    } catch (err) {
      console.error('Job application error:', err);
    }
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
              <span className="text-amberAccent">CAREERS</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-inkBlack tracking-tight leading-tight">
              Build Your Career With <span className="text-amberAccent">ANTRIXX.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Join a team of innovators, thermal engineers, and SCADA developers building the future of industrial automation, energy optimization, and digital utility monitoring across India.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Why Work With Us (4 Value Cards) */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
              LIFE AT ANTRIXX
            </span>
            <h2 className="font-display text-3xl font-extrabold text-inkBlack">
              Why Engineer Your Career With Us?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-offWhite border border-gray200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amberAccent/10 text-amberAccent border border-amberAccent/20 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-inkBlack">
                Innovative Projects
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Work on cutting-edge boiler house automation, IoT telemetry, and thermal recovery technologies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-offWhite border border-gray200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amberAccent/10 text-amberAccent border border-amberAccent/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-inkBlack">
                Growth Opportunities
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Continuous technical training, field leadership exposure, and fast-track career advancement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-offWhite border border-gray200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amberAccent/10 text-amberAccent border border-amberAccent/20 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-inkBlack">
                Great Environment
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Collaborative, inclusive engineering culture with hands-on technical mentorship.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-offWhite border border-gray200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amberAccent/10 text-amberAccent border border-amberAccent/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-inkBlack">
                Make Real Impact
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your engineering work creates real-world fuel savings and carbon reduction for enterprise manufacturing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Open Positions List & Resume Application Form */}
      <section className="py-20 bg-offWhite border-t border-b border-gray200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Open Positions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <span className="text-amberAccent text-xs font-bold uppercase tracking-widest block">
                  CURRENT OPENINGS
                </span>
                <h2 className="font-display text-2xl font-extrabold text-inkBlack">
                  Explore Open Engineering Roles
                </h2>
              </div>

              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 rounded-2xl bg-white border border-gray200 shadow-cardLight hover:border-amberAccent transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray200 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-amberAccent uppercase tracking-widest block">
                          {job.department}
                        </span>
                        <h3 className="font-display text-lg font-bold text-inkBlack">
                          {job.title}
                        </h3>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-offWhite text-gray-600 text-xs font-bold border border-gray200 shrink-0">
                        {job.type}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amberAccent" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amberAccent" /> {job.experience}
                      </span>
                    </div>

                    {job.requirements && job.requirements.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-2">
                        {job.requirements.map((req, idx) => (
                          <span key={idx} className="text-[10px] bg-offWhite text-gray-700 px-2.5 py-1 rounded-md border border-gray200">
                            ✓ {req}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray200 flex justify-end">
                      <button
                        onClick={() => handleApplyClick(job.title)}
                        className="px-5 py-2 rounded-md bg-amberAccent hover:bg-amberAccentDark text-white font-display font-bold text-xs uppercase tracking-wider shadow-amberGlow transition-colors"
                      >
                        APPLY FOR THIS ROLE →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Submission Form (5 Cols) */}
            <div className="lg:col-span-5 sticky top-28">
              <div id="application-form" className="bg-white rounded-2xl p-6 border border-gray200 shadow-cardHover space-y-4">
                <div className="border-b border-gray200 pb-3">
                  <span className="text-amberAccent text-[10px] font-bold uppercase tracking-widest block">
                    SUBMIT APPLICATION
                  </span>
                  <h3 className="font-display text-lg font-extrabold text-inkBlack mt-1">
                    Send Us Your Resume
                  </h3>
                </div>

                {formSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs space-y-2">
                    <p className="font-bold">Application Received!</p>
                    <p>Thank you for your interest in joining Antrixx Technology. Our engineering recruitment team will review your application and contact you if there is a match.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Verma"
                        value={formData.applicant_name}
                        onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
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
                      <label className="block font-bold text-gray-700 mb-1">Applying For Role *</label>
                      <select
                        value={formData.role_title}
                        onChange={(e) => setFormData({ ...formData, role_title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      >
                        {jobs.map((j) => (
                          <option key={j.id} value={j.title}>{j.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Resume Link / Portfolio Drive URL</label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/your-resume-link"
                        value={formData.resume_file_url}
                        onChange={(e) => setFormData({ ...formData, resume_file_url: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Summary / Experience Notes</label>
                      <textarea
                        rows={3}
                        placeholder="Briefly describe your thermal/automation engineering background..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md bg-offWhite border border-gray200 text-inkBlack focus:outline-none focus:border-amberAccent"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-md bg-amberAccent hover:bg-amberAccentDark text-white font-display font-bold text-xs uppercase tracking-wider shadow-amberGlow flex items-center justify-center gap-2 transition-colors"
                    >
                      SUBMIT RESUME <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
