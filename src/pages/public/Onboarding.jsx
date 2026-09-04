import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Upload,
  CheckCircle2,
  ShieldCheck,
  Award,
  Users,
  Building2,
  ArrowRight,
  Sparkles,
  FileCheck,
  Camera,
  Smartphone,
  Check
} from 'lucide-react';
import { saveStore, getStore } from '../../data/mockStore';

export default function Onboarding() {
  const navigate = useNavigate();
  const store = getStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    otp: '',
    trade: 'Electrician',
    experienceYears: '5',
    district: 'delhi',
    aadhaarNumber: '',
    certName: 'NSDC Level 3 Certified Wireman',
    societyAffiliation: 'Shramik Kalyan Cooperative Society',
    cameraCaptured: false,
    otpVerified: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setOtpSent(true);
    setFormData({ ...formData, otp: '8492' }); // simulated OTP
  };

  const handleVerifyOtp = () => {
    if (formData.otp === '8492' || formData.otp.length === 4) {
      setFormData({ ...formData, otpVerified: true });
    } else {
      alert('Invalid OTP. Please enter 8492 for simulation.');
    }
  };

  const handleCaptureSelfie = () => {
    setFormData({ ...formData, cameraCaptured: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newKyc = {
      id: 'KYC-' + Math.floor(1000 + Math.random() * 9000),
      name: formData.name || 'Santosh Yadav',
      trade: formData.trade,
      experienceYears: Number(formData.experienceYears),
      phone: '+91 ' + (formData.phone || '98765 43210'),
      status: 'Pending Review',
      submittedDate: new Date().toISOString().split('T')[0],
      documents: [
        { name: 'Aadhaar Card (UIDAI)', number: formData.aadhaarNumber || '9876-5432-1098' },
        { name: formData.certName, number: 'NSDC-DEL-2026' },
        { name: 'Police Clearance Certificate (PCC)', number: 'PCC-DEL-8831' },
        { name: 'Live Photo & Facial Biometrics', number: 'BIO-MATCH-99.4%' }
      ]
    };

    saveStore((prev) => ({
      ...prev,
      kycQueue: [newKyc, ...(prev.kycQueue || [])]
    }));

    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>JOIN THE LABOUR COOPERATIVE REVOLUTION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
          Become a Worker-Owner on Sahakar
        </h1>
        <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto leading-relaxed">
          Stop losing 35% of your hard work to corporate algorithms. Receive 90% direct wages, 0.12% legal equity ownership, and full emergency social security.
        </p>

        {/* Benefits Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-left">
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/20 text-xs">
            <strong className="block text-[#D4A843]">✓ 90% Direct Pay</strong>
            <span className="text-[11px] text-white/80">Zero commission deductions or lead fees</span>
          </div>
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/20 text-xs">
            <strong className="block text-[#D4A843]">✓ 0.12% Equity Grant</strong>
            <span className="text-[11px] text-white/80">Cooperative shareholder & annual dividends</span>
          </div>
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/20 text-xs">
            <strong className="block text-[#D4A843]">✓ ₹2.31Cr Welfare Pool</strong>
            <span className="text-[11px] text-white/80">Accident insurance & hospital grants</span>
          </div>
        </div>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD8] shadow-sm space-y-8">
          {/* Step Stepper Header */}
          <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-4">
            <h2 className="font-bold text-base text-[#2B2B2B]">
              Step {step} of 3: {step === 1 ? 'Mobile Verification & Trade Details' : step === 2 ? 'Document Records & Live Photo' : 'Cooperative Society & Review'}
            </h2>
            <div className="flex gap-1.5">
              {[1, 2, 3].map(s => (
                <div
                  key={s}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    step === s ? 'bg-[#2D6A4F] text-white' : step > s ? 'bg-[#D1FAE5] text-[#2D6A4F]' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {step > s ? '✓' : s}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: Basic Info & Mobile OTP */}
          {step === 1 && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#4A4A4A] block mb-1">Full Legal Name (as per Aadhaar)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Santosh Yadav"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#4A4A4A] block mb-1">Mobile Number (Linked with UPI & Aadhaar)</label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-4 py-2 bg-[#2D6A4F] text-white rounded-xl font-bold text-xs shrink-0 cursor-pointer"
                    >
                      {otpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  </div>
                </div>
              </div>

              {/* OTP Input */}
              {otpSent && (
                <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFD8] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#2D6A4F]">
                    <span>SMS OTP Sent! (Demo simulation code: 8492)</span>
                    {formData.otpVerified && <span className="text-[#2D6A4F] flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Verified</span>}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="Enter 4-digit OTP"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      className="w-40 px-3 py-1.5 bg-white border border-[#E8DFD8] rounded-lg font-mono text-center font-bold"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="px-4 py-1.5 bg-[#2D6A4F] text-white rounded-lg font-bold cursor-pointer"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="font-bold text-[#4A4A4A] block mb-1">Primary Skill / Trade</label>
                  <select
                    value={formData.trade}
                    onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B] focus:outline-none cursor-pointer"
                  >
                    {store.trades.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#4A4A4A] block mb-1">Years of Craft Experience</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    required
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#4A4A4A] block mb-1">Operating District</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B] focus:outline-none cursor-pointer"
                  >
                    {store.districts.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-[#2D6A4F] text-white font-bold text-xs hover:bg-[#1B4332] cursor-pointer"
                >
                  Continue to Documents &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Documents & Live Camera */}
          {step === 2 && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#4A4A4A] block mb-1">Aadhaar Number (12 Digits)</label>
                  <input
                    type="text"
                    required
                    placeholder="XXXX-XXXX-XXXX"
                    value={formData.aadhaarNumber}
                    onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#4A4A4A] block mb-1">Skill Certification / NSDC Title</label>
                  <input
                    type="text"
                    required
                    value={formData.certName}
                    onChange={(e) => setFormData({ ...formData, certName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Live Selfie / Photo Capture Simulation */}
              <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#C45C3C]" />
                    <strong className="text-[#2B2B2B]">Live Photo & Biometric Liveness Check</strong>
                  </div>
                  {formData.cameraCaptured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#2D6A4F] font-bold text-[10px]">
                      ✓ Facial Biometrics Verified (99.4% match)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-[#E8DFD8] flex items-center justify-center text-2xl font-bold">
                    {formData.cameraCaptured ? '📸 👤' : '📷'}
                  </div>

                  <div className="space-y-1">
                    <p className="text-[#665D56] text-[11px]">Take a live selfie to verify photo against government ID records.</p>
                    <button
                      type="button"
                      onClick={handleCaptureSelfie}
                      className="px-4 py-2 bg-[#2D6A4F] text-white font-bold rounded-xl text-xs hover:bg-[#1B4332] cursor-pointer"
                    >
                      {formData.cameraCaptured ? 'Retake Photo' : 'Capture Live Photo'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-xs font-bold text-[#4A4A4A]"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-[#2D6A4F] text-white font-bold text-xs hover:bg-[#1B4332] cursor-pointer"
                >
                  Continue to Society Review &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Submit */}
          {step === 3 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] space-y-2">
                <strong className="text-sm text-[#2B2B2B] block">Primary Society Membership</strong>
                <p className="text-[#665D56]">You will be enrolled under the <strong>{formData.societyAffiliation}</strong>. Your society will provide tool depot access and mediate client disputes.</p>
              </div>

              <div className="p-4 bg-[#D1FAE5]/50 rounded-2xl border border-[#2D6A4F]/30 space-y-1">
                <strong className="text-[#1B4332] block">Cooperative Charter Declaration</strong>
                <p className="text-[#2D6A4F]">I hereby apply to become a shareholder of the District Labour Cooperative. I understand that upon board approval, I will be allocated a 0.12% legal equity share, universal ₹2L PMSBY accident insurance, and 90% direct payout rights.</p>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-xs font-bold text-[#4A4A4A]"
                >
                  &larr; Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-black text-xs shadow-md cursor-pointer"
                >
                  Submit Dossier for Federation KYC Approval
                </button>
              </div>
            </div>
          )}
        </form>
      ) : (
        /* Submission Success Message */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#2D6A4F] shadow-lg text-center space-y-5 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-[#D1FAE5] text-[#2D6A4F] flex items-center justify-center text-3xl mx-auto">
            ✓
          </div>
          <h2 className="text-2xl font-black text-[#2B2B2B]">KYC Dossier Submitted to Federation Board!</h2>
          <p className="text-xs text-[#665D56] max-w-md mx-auto leading-relaxed">
            Your verification application has been forwarded to the <strong>Delhi Federation Admin Queue</strong>. Physical inspection and 0.12% equity allocation will be completed within 24 hours.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/admin/workers"
              className="px-5 py-2.5 rounded-xl bg-[#2D6A4F] text-white font-bold text-xs hover:bg-[#1B4332]"
            >
              Inspect in Federation Admin Queue &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
