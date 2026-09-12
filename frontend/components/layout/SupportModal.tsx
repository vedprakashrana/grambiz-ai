'use client';

import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  Headphones, 
  MessageSquare, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Send, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export type SupportModalType = 'how-it-works' | 'faqs' | 'guide' | 'contact' | 'feedback' | null;

interface SupportModalProps {
  activeModal: SupportModalType;
  onClose: () => void;
  onSelectTab: (tab: SupportModalType) => void;
}

const FAQS_DATA = [
  {
    q: 'How does UDYAM-SETU AI assess my rural business idea?',
    a: 'UDYAM-SETU uses AI trained on Ministry of Social Justice & Empowerment (MOSJE), MSME, and NABARD datasets. It analyzes your location, market demand, competitor saturation, input costs, and feasibility to generate a bank-ready DPR score.'
  },
  {
    q: 'Which government schemes and subsidies can I apply for?',
    a: 'The platform automatically matches your profile with schemes like PMEGP (up to 35% subsidy), MOSJE NBCFDC / NSFDC concessional loans, PM Mudra Yojana (up to ₹10 Lakhs collateral-free), and Stand-Up India.'
  },
  {
    q: 'Is this service free of cost for rural entrepreneurs?',
    a: 'Yes, 100% free! As a government-backed initiative under MOSJE (PS 26091), all assessments, scheme matching, voice AI guidance, and DPR generations are completely free.'
  },
  {
    q: 'Can I speak in my mother tongue / regional language?',
    a: 'Yes! Our Multilingual Voice AI supports 8 Indian languages: Hindi, English, Bengali, Marathi, Gujarati, Tamil, Telugu, and Kannada with native speech recognition and voice response.'
  },
  {
    q: 'How do I download my Bank-Ready DPR (Detailed Project Report)?',
    a: 'After completing your business assessment, click "Download DPR / Project Report" on the result page. It exports a comprehensive PDF formatted to official PMEGP and bank loan standards.'
  },
  {
    q: 'How does the Document & Bill Scanner (OCR) work?',
    a: 'Navigate to "Doc Scanner" and upload photos or PDFs of handwritten bills, GST invoices, or balance sheets. The OCR automatically digitizes items, calculates totals, and validates financial ratios.'
  }
];

const GUIDE_STEPS = [
  {
    step: '01',
    title: 'Multilingual Voice AI Advisor',
    desc: 'Speak naturally in your dialect to brainstorm ideas, ask about subsidies, and get instant guidance without typing.',
    link: '/assistant',
    linkText: 'Try AI Voice'
  },
  {
    step: '02',
    title: 'Government Schemes Finder',
    desc: 'Explore 30+ central and state schemes filtered by category, caste, subsidy percentage, and loan limits.',
    link: '/schemes',
    linkText: 'Browse Schemes'
  },
  {
    step: '03',
    title: 'Financial & Working Capital Calculator',
    desc: 'Calculate total project cost, promoter margin (5-10%), bank term loan, interest subvention, and monthly EMI.',
    link: '/calculators/working-capital',
    linkText: 'Open Calculator'
  },
  {
    step: '04',
    title: 'Live Mandi Feed & Price Forecast',
    desc: 'Track real-time commodity prices across APMC mandis and AI 30-day price trend forecasts for better harvest timing.',
    link: '/mandi',
    linkText: 'View Mandi Rates'
  },
  {
    step: '05',
    title: 'OCR Bill & Ledger Scanner',
    desc: 'Scan receipts, handwritten ledger pages, and invoices to automatically compute expenses and gross margins.',
    link: '/ocr',
    linkText: 'Scan Documents'
  }
];

export default function SupportModal({ activeModal, onClose, onSelectTab }: SupportModalProps) {
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    category: 'Schemes & Subsidy Query',
    message: ''
  });

  // Feedback form state
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedbackCategory, setFeedbackCategory] = useState('Voice AI Accuracy');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  if (!activeModal) return null;

  const filteredFaqs = FAQS_DATA.filter(f => 
    f.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
    f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-[#fbfdfb]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#0d4f3b]">
              {activeModal === 'faqs' && <HelpCircle className="w-5 h-5" />}
              {activeModal === 'guide' && <FileText className="w-5 h-5" />}
              {activeModal === 'contact' && <Headphones className="w-5 h-5" />}
              {activeModal === 'feedback' && <MessageSquare className="w-5 h-5" />}
              {activeModal === 'how-it-works' && <BookOpen className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {activeModal === 'faqs' && 'Help & Frequently Asked Questions'}
                {activeModal === 'guide' && 'UDYAM-SETU User Guide'}
                {activeModal === 'contact' && 'Contact Support Desk'}
                {activeModal === 'feedback' && 'Share Your Feedback'}
                {activeModal === 'how-it-works' && 'How UDYAM-SETU Works'}
              </h3>
              <p className="text-xs text-slate-500">
                {activeModal === 'faqs' && 'Quick answers to common questions about loans, AI, & schemes'}
                {activeModal === 'guide' && 'Learn how to get the most out of every feature'}
                {activeModal === 'contact' && 'Connect with MOSJE technical and scheme assistance'}
                {activeModal === 'feedback' && 'Your suggestions help us empower rural entrepreneurs'}
                {activeModal === 'how-it-works' && '4 simple steps from idea to bank-ready business'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation pills inside modal for instant switching */}
        <div className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-50/80 border-b border-slate-100 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => onSelectTab('how-it-works')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeModal === 'how-it-works' 
                ? 'bg-white text-[#0d4f3b] shadow-2xs font-bold border border-emerald-200' 
                : 'text-slate-600 hover:text-[#0d4f3b] hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#0d4f3b]" />
            <span>How It Works</span>
          </button>

          <button
            onClick={() => onSelectTab('faqs')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeModal === 'faqs' 
                ? 'bg-white text-[#0d4f3b] shadow-2xs font-bold border border-emerald-200' 
                : 'text-slate-600 hover:text-[#0d4f3b] hover:bg-white/60'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#0d4f3b]" />
            <span>Help / FAQs</span>
          </button>

          <button
            onClick={() => onSelectTab('guide')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeModal === 'guide' 
                ? 'bg-white text-[#0d4f3b] shadow-2xs font-bold border border-emerald-200' 
                : 'text-slate-600 hover:text-[#0d4f3b] hover:bg-white/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#0d4f3b]" />
            <span>User Guide</span>
          </button>

          <button
            onClick={() => onSelectTab('contact')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeModal === 'contact' 
                ? 'bg-white text-[#0d4f3b] shadow-2xs font-bold border border-emerald-200' 
                : 'text-slate-600 hover:text-[#0d4f3b] hover:bg-white/60'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 text-[#0d4f3b]" />
            <span>Contact Support</span>
          </button>

          <button
            onClick={() => onSelectTab('feedback')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeModal === 'feedback' 
                ? 'bg-white text-[#0d4f3b] shadow-2xs font-bold border border-emerald-200' 
                : 'text-slate-600 hover:text-[#0d4f3b] hover:bg-white/60'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#0d4f3b]" />
            <span>Feedback</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-slate-700">
          
          {/* TAB 1: HOW IT WORKS */}
          {activeModal === 'how-it-works' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-[#0d4f3b]">Explore the Interactive 4-Step Pipeline</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    UDYAM-SETU turns simple voice or text ideas into fully validated, bankable project reports.
                  </p>
                </div>
                <Link
                  href="/#workflow"
                  onClick={onClose}
                  className="px-3 py-1.5 bg-[#0d4f3b] text-white text-xs font-bold rounded-lg hover:bg-[#093d2d] transition flex items-center gap-1.5 shrink-0"
                >
                  <span>View on Home</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#0d4f3b]">STEP 1</span>
                  <h5 className="font-bold text-slate-900 text-sm mt-1.5">Input Your Business Idea</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Enter your idea by typing or simply speaking into the Multilingual Voice AI in your regional language.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#0d4f3b]">STEP 2</span>
                  <h5 className="font-bold text-slate-900 text-sm mt-1.5">AI Feasibility & Demand Engine</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    AI evaluates local supply-demand metrics, competition saturation, and capital investment requirements.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#0d4f3b]">STEP 3</span>
                  <h5 className="font-bold text-slate-900 text-sm mt-1.5">Government Scheme Matching</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Matches your enterprise with high-subsidy schemes (PMEGP, MOSJE NBCFDC, Mudra, Stand-Up India).
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#0d4f3b]">STEP 4</span>
                  <h5 className="font-bold text-slate-900 text-sm mt-1.5">Bank-Ready DPR Report</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Get an instant, downloadable PDF DPR project report ready to submit directly to bank branch managers.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link
                  href="/assessment/new"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d4f3b] text-white rounded-xl font-bold text-xs shadow-sm hover:bg-[#093d2d] transition"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Start Free Business Assessment</span>
                </Link>
              </div>
            </div>
          )}

          {/* TAB 2: HELP / FAQS */}
          {activeModal === 'faqs' && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search questions (e.g. loan, subsidy, DPR, language)..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#0d4f3b] transition"
                />
              </div>

              <div className="space-y-2">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className="border border-slate-200/80 rounded-xl overflow-hidden transition-all bg-white"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 text-xs font-bold text-slate-800 hover:text-[#0d4f3b] hover:bg-slate-50 transition"
                      >
                        <span>{faq.q}</span>
                        {openFaqIndex === idx ? (
                          <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {openFaqIndex === idx && (
                        <div className="px-4 pb-3.5 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed pt-2.5 animate-in fade-in duration-150">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center py-6 text-xs text-slate-400">No matching questions found.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: USER GUIDE */}
          {activeModal === 'guide' && (
            <div className="space-y-3">
              {GUIDE_STEPS.map((g) => (
                <div key={g.step} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 flex items-start gap-3.5 hover:border-emerald-300 transition">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0d4f3b] font-black text-xs flex items-center justify-center shrink-0">
                    {g.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{g.title}</h4>
                      <Link
                        href={g.link}
                        onClick={onClose}
                        className="text-[11px] font-bold text-[#0d4f3b] hover:underline flex items-center gap-1 shrink-0"
                      >
                        <span>{g.linkText}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: CONTACT SUPPORT */}
          {activeModal === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white text-[#0d4f3b] flex items-center justify-center shadow-2xs shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">National Helpline</span>
                    <p className="text-xs font-bold text-slate-900">1800-11-26091</p>
                    <span className="text-[9.5px] text-emerald-800">Toll-Free • 9 AM - 6 PM IST</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white text-[#0d4f3b] flex items-center justify-center shadow-2xs shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Official Support Desk</span>
                    <p className="text-xs font-bold text-slate-900">support@udyamsetu.gov.in</p>
                    <span className="text-[9.5px] text-slate-500">Replies within 24 business hours</span>
                  </div>
                </div>
              </div>

              {contactSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Query Received Successfully!</h4>
                  <p className="text-xs text-slate-600">
                    Ticket #SETU-{Math.floor(100000 + Math.random() * 900000)} has been created. A support officer will contact you shortly.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="mt-2 text-xs font-bold text-[#0d4f3b] hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-800">Send an Inquiry or Support Request</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Ramesh Kumar"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#0d4f3b]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#0d4f3b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Query Category</label>
                    <select
                      value={contactForm.category}
                      onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#0d4f3b] bg-white"
                    >
                      <option>Schemes & Subsidy Query</option>
                      <option>Bank DPR & Loan Assistance</option>
                      <option>Voice AI & Language Help</option>
                      <option>Technical Issue / Bug</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Message</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Please describe your question or issue in detail..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#0d4f3b]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-[#0d4f3b] text-white text-xs font-bold rounded-lg hover:bg-[#093d2d] transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 5: FEEDBACK */}
          {activeModal === 'feedback' && (
            <div className="space-y-4">
              {feedbackSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Thank You for Your Feedback!</h4>
                  <p className="text-xs text-slate-600">
                    Your valuable inputs help us enhance AI models and government scheme matching for rural India.
                  </p>
                  <button
                    onClick={() => {
                      setFeedbackSubmitted(false);
                      setFeedbackText('');
                    }}
                    className="mt-2 text-xs font-bold text-[#0d4f3b] hover:underline"
                  >
                    Give more feedback
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="text-center py-2">
                    <p className="text-xs font-bold text-slate-700 mb-2">How would you rate your experience with UDYAM-SETU?</p>
                    <div className="flex items-center justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 text-slate-300 hover:text-amber-400 transition"
                        >
                          <Star 
                            className={`w-7 h-7 ${
                              (hoverRating || rating) >= star 
                                ? 'text-amber-400 fill-amber-400' 
                                : 'text-slate-200'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1.5">What are you providing feedback on?</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Voice AI Accuracy',
                        'Scheme Recommendations',
                        'DPR Generator',
                        'Mandi Rates',
                        'General UI / Ease of Use'
                      ].map((cat) => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => setFeedbackCategory(cat)}
                          className={`text-[11px] px-3 py-1 rounded-lg border transition ${
                            feedbackCategory === cat 
                              ? 'bg-emerald-50 border-[#0d4f3b] text-[#0d4f3b] font-bold' 
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Suggestions or Observations</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us what you liked or what we can improve to better serve rural entrepreneurs..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0d4f3b]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0d4f3b] text-white text-xs font-bold rounded-xl hover:bg-[#093d2d] transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Feedback</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
