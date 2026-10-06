import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Phone, Mail, Building, User, FileText } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { API_BASE } from '../../api/client';

export const ConsultationModal: React.FC = () => {
  const { isOpen, serviceRequirement, closeConsultationModal } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        service: serviceRequirement || 'Industrial Consultation',
      }));
      setIsSubmitted(false);
      setErrorMessage('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeConsultationModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, serviceRequirement, closeConsultationModal]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        name: formData.name,
        company_name: formData.company_name,
        phone: formData.phone,
        email: formData.email,
        message: `Consultation Request: ${formData.service || 'Industrial Solutions'}\n\nProject Scope & Details:\n${formData.message}`,
      };

      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit consultation request');
      }

      setIsSubmitted(true);
      setTimeout(() => {
        closeConsultationModal();
      }, 2500);
    } catch (err: any) {
      console.error('Modal submission error:', err);
      setErrorMessage(err.message || 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#09121C]/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeConsultationModal();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg overflow-hidden relative my-auto animate-scaleUp">
        {/* Header Bar */}
        <div className="bg-[#111923] text-white p-6 relative">
          <button
            onClick={closeConsultationModal}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-amberAccent text-[10px] font-bold uppercase tracking-widest font-display block mb-1">
            ANTRIXX INDUSTRIAL ENGINEERING
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white">
            Get an Engineering Consultation
          </h2>
          <p className="text-xs text-gray-300 mt-1 max-w-md">
            Connect directly with our process and thermal engineers for system audits, retrofits, and equipment proposals.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg font-bold text-inkBlack">Consultation Request Received!</h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                Thank you! Our technical engineering team will review your requirement and reach out with an audit proposal shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-inkBlack placeholder-gray-400 focus:outline-none focus:border-amberAccent focus:ring-1 focus:ring-amberAccent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Company / Plant</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Apex Process Mills"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-inkBlack placeholder-gray-400 focus:outline-none focus:border-amberAccent focus:ring-1 focus:ring-amberAccent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-inkBlack placeholder-gray-400 focus:outline-none focus:border-amberAccent focus:ring-1 focus:ring-amberAccent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="engineer@plant.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-inkBlack placeholder-gray-400 focus:outline-none focus:border-amberAccent focus:ring-1 focus:ring-amberAccent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Requirement / Service</label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="e.g. Pollution Control / Cyclone Collector / Boiler Retrofit"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-inkBlack placeholder-gray-400 focus:outline-none focus:border-amberAccent focus:ring-1 focus:ring-amberAccent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Project Details / Specifications</label>
                <textarea
                  rows={3}
                  placeholder="Share details on your equipment capacity, fuel type, temperature or process challenges..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-300 text-inkBlack placeholder-gray-400 focus:outline-none focus:border-amberAccent focus:ring-1 focus:ring-amberAccent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-lg bg-amberAccent hover:bg-amberAccentDark text-inkBlack font-display font-black text-xs uppercase tracking-wider shadow-amberGlow flex items-center justify-center gap-2 transition-all hover:translate-y-[-1px] disabled:opacity-50"
              >
                {isSubmitting ? 'PREPARING PROPOSAL...' : 'SUBMIT CONSULTATION REQUEST'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
