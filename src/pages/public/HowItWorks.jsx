import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ShieldCheck,
  Radio,
  FileCheck,
  Award,
  Vote,
  DollarSign,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Play,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { formatCurrency } from '../../data/mockStore';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('customer');
  const [showSimModal, setShowSimModal] = useState(false);
  const [simStep, setSimStep] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);

  const customerSteps = [
    {
      num: '01',
      title: 'Select Trade & Preferred Slot',
      desc: 'Choose from 10 verified skilled trades (Electricians, Plumbers, Carpenters, Painters, Helpers, Caregivers, Drivers, Gardeners, Cleaners, Appliance Techs) and pick your morning, afternoon, or evening slot.',
      icon: Calendar,
      badge: 'Transparent Pricing'
    },
    {
      num: '02',
      title: 'Hyperlocal Geo-Radar Matching',
      desc: 'Our real-time cooperative radar scans active, verified guild craftsmen in your neighborhood (2km–25km) and locks the nearest available professional with clear ETA tracking.',
      icon: Radio,
      badge: 'Zero Lead Markup'
    },
    {
      num: '03',
      title: 'Dignified Service & Digital Escrow',
      desc: 'The craftsman arrives with full identity clearance. Payment is held in secure digital escrow until you verify the completed task, after which 90% is released directly to the worker’s bank account.',
      icon: ShieldCheck,
      badge: 'Escrow Protected'
    },
    {
      num: '04',
      title: 'Bidirectional Trust Ratings',
      desc: 'You rate the craftsman’s skill and punctuality. Simultaneously, the craftsman rates customer courtesy and payment reliability, building a transparent community reputation ledger.',
      icon: Award,
      badge: 'Mutual Accountability'
    }
  ];

  const workerSteps = [
    {
      num: '01',
      title: 'Register & KYC Verification',
      desc: 'Submit your Aadhaar, NSDC skill certifications, and primary society letter. Upon district federation approval, you receive a 0.12% legal cooperative equity shareholding.',
      icon: FileCheck,
      badge: '0.12% Equity Grant'
    },
    {
      num: '02',
      title: 'Worker Prosperity Engine',
      desc: 'Set your schedule, view seasonal demand predictions, receive AI cross-skilling recommendations, and accept individual jobs or high-value multi-skill team squad contracts.',
      icon: Sparkles,
      badge: 'Predictive Earnings'
    },
    {
      num: '03',
      title: '90% Direct Pay & Welfare Coverage',
      desc: 'Receive 90% of job revenue directly via 1-click UPI payout. 1% automatically builds your collective ₹2.31Cr emergency welfare pool, auto-renewing PMSBY accident insurance.',
      icon: DollarSign,
      badge: 'Universal Safety Net'
    },
    {
      num: '04',
      title: 'Portable W3C Reputation & Voting',
      desc: 'Your ratings and credentials are permanently minted into a portable W3C Verifiable Credential Reputation Passport. Vote on district wage floors and cooperative bylaws (1 member = 1 vote).',
      icon: Vote,
      badge: 'Democratic Power'
    }
  ];

  const faqs = [
    {
      q: 'How is Sahakar different from commercial aggregator platforms?',
      a: 'Commercial apps charge 25%–35% platform fees and retain all company profits for venture investors. Sahakar is 100% cooperative-owned: 90% goes directly to the worker, 1% builds a shared emergency welfare fund, and 9% goes to the local primary society for tool depots and training.'
    },
    {
      q: 'How does the 1% Emergency Welfare Pool work?',
      a: 'A micro-levy of 1% is automatically diverted from each completed booking into the collective pool. This funds hospitalization grants, accident relief, tool loss compensation, and subsidized PMSBY insurance.'
    },
    {
      q: 'What is the Worker Reputation Passport?',
      a: 'It is a cryptographic, portable digital credential based on W3C standards. If a worker moves to another district or state federation, their 5-star ratings, verified badges, and police clearance status stay with them.'
    },
    {
      q: 'Can customers book emergency 15-minute services?',
      a: 'Yes! The Emergency Fast-Track module pairs dangerous hazards (sparking wiring, burst pipes, elderly emergency) with the closest on-duty guild master within 15 minutes.'
    }
  ];

  const steps = activeTab === 'customer' ? customerSteps : workerSteps;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D1FAE5] text-[#2D6A4F] text-xs font-black tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TRANSPARENT COOPERATIVE ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
          How Sahakar Works End-to-End
        </h1>
        <p className="text-sm sm:text-base text-[#665D56] leading-relaxed">
          Explore the step-by-step workflow designed to protect customer safety, guarantee 90% direct craftsman wages, and build collective prosperity.
        </p>

        {/* Dual Tab Switcher & Simulation Sandbox Trigger */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8]">
            <button
              onClick={() => setActiveTab('customer')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'customer'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#665D56] hover:text-[#2B2B2B]'
              }`}
            >
              The Customer Journey
            </button>
            <button
              onClick={() => setActiveTab('worker')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'worker'
                  ? 'bg-[#C45C3C] text-white shadow-xs'
                  : 'text-[#665D56] hover:text-[#2B2B2B]'
              }`}
            >
              The Worker-Owner Journey
            </button>
          </div>

          <button
            onClick={() => { setShowSimModal(true); setSimStep(1); }}
            className="px-5 py-2.5 rounded-2xl bg-[#D4A843] hover:bg-[#C29633] text-[#1B4332] font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Try Live Lifecycle Simulation</span>
          </button>
        </div>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-[#E8DFD8] group-hover:text-[#2D6A4F]/40 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                    {s.num}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                    activeTab === 'customer' ? 'bg-[#D1FAE5] text-[#2D6A4F]' : 'bg-[#FFF3E6] text-[#C45C3C]'
                  }`}>
                    {s.badge}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] text-[#2D6A4F] flex items-center justify-center border border-[#E8DFD8]">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-bold text-base text-[#2B2B2B] leading-snug">
                  {s.title}
                </h3>

                <p className="text-xs text-[#665D56] leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EAE1] flex items-center gap-1.5 text-[11px] font-bold text-[#2D6A4F]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Step</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-[#FAF5EE] rounded-3xl p-6 sm:p-10 border border-[#E8DFD8] space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#C45C3C]" />
          <h3 className="text-xl font-black text-[#2B2B2B]">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-[#E8DFD8] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs text-[#2B2B2B] hover:bg-[#FAF5EE]/60 cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-[#8C827A] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#8C827A] shrink-0" />}
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs text-[#665D56] leading-relaxed border-t border-[#F0EAE1]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Simulation Sandbox Modal */}
      {showSimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-6 shadow-2xl border border-[#E8DFD8]">
            <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4A843]" />
                <h3 className="font-bold text-sm text-[#2B2B2B]">Interactive Booking Lifecycle Simulation</h3>
              </div>
              <button
                onClick={() => setShowSimModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Stepper Progress */}
            <div className="flex justify-between items-center text-[10px] font-bold text-[#8C827A] px-2">
              <span className={simStep >= 1 ? 'text-[#2D6A4F]' : ''}>1. Request</span>
              <span className={simStep >= 2 ? 'text-[#2D6A4F]' : ''}>2. Geo Match</span>
              <span className={simStep >= 3 ? 'text-[#2D6A4F]' : ''}>3. OTP Start</span>
              <span className={simStep >= 4 ? 'text-[#2D6A4F]' : ''}>4. 90/1/9 Payout</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#2D6A4F] h-full transition-all duration-300" style={{ width: `${(simStep / 4) * 100}%` }} />
            </div>

            {/* Step Content */}
            <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] text-xs space-y-2">
              {simStep === 1 && (
                <>
                  <strong className="block text-sm text-[#2B2B2B]">Step 1: Customer Submits Booking Request</strong>
                  <p className="text-[#665D56]">Customer Neha Agarwal requests a 2-hour Master Electrician service for ₹700 in South Delhi. Payment is held in secure digital escrow.</p>
                </>
              )}
              {simStep === 2 && (
                <>
                  <strong className="block text-sm text-[#2B2B2B]">Step 2: Radar Matches Nearest Guild Craftsman</strong>
                  <p className="text-[#665D56]">Cooperative Geo Radar locates Rajesh Kumar (1.8 km away). Rajesh accepts on his mobile dashboard. Live ETA dispatched: 14 mins.</p>
                </>
              )}
              {simStep === 3 && (
                <>
                  <strong className="block text-sm text-[#2B2B2B]">Step 3: Verified Arrival & 4-Digit OTP Start</strong>
                  <p className="text-[#665D56]">Rajesh arrives with ID clearance badge. Customer shares 4-digit code (8921) to unlock start of work and safety checklist.</p>
                </>
              )}
              {simStep === 4 && (
                <>
                  <strong className="block text-sm text-[#2B2B2B]">Step 4: Completion & Instant 90/1/9 Split Execution</strong>
                  <div className="p-3 bg-white rounded-xl border border-[#E8DFD8] space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between text-[#2D6A4F] font-bold"><span>90% Worker Direct Pay:</span><span>₹630.00</span></div>
                    <div className="flex justify-between text-[#C45C3C] font-bold"><span>1% Welfare Pool:</span><span>₹7.00</span></div>
                    <div className="flex justify-between text-[#736B63]"><span>9% Society Depot Fund:</span><span>₹63.00</span></div>
                  </div>
                </>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={simStep === 1}
                onClick={() => setSimStep(simStep - 1)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-bold text-[#4A4A4A] disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>

              {simStep < 4 ? (
                <button
                  onClick={() => setSimStep(simStep + 1)}
                  className="px-5 py-2 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold hover:bg-[#1B4332] cursor-pointer"
                >
                  Next Step &rarr;
                </button>
              ) : (
                <button
                  onClick={() => setShowSimModal(false)}
                  className="px-5 py-2 rounded-xl bg-[#D4A843] text-[#1B4332] text-xs font-black hover:bg-[#C29633] cursor-pointer"
                >
                  Close Simulation
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
