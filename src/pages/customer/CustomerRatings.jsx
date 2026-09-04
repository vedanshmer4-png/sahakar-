import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Award,
  ThumbsUp,
  MessageSquare,
  Camera,
  Image,
  Sparkles
} from 'lucide-react';
import { getStore } from '../../data/mockStore';

export default function CustomerRatings() {
  const store = getStore();
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [attachedPhotos, setAttachedPhotos] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>BIDIRECTIONAL TRUST REPUTATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Service Review & Customer Trust Score
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Mutual feedback protects worker dignity and ensures high-quality household craft standards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Customer Trust Score Profile Card */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-[#2B2B2B] border-b border-[#F0EAE1] pb-2">
            My Customer Trust Score
          </h3>

          <div className="text-center py-4 space-y-1">
            <div className="text-4xl font-black text-[#D4A843]">4.9 ⭐</div>
            <p className="text-xs font-bold text-[#2D6A4F]">Exceptional Courtesy Rating</p>
            <span className="text-[10px] text-[#8C827A] block">Based on 14 Completed Guild Bookings</span>
          </div>

          <div className="space-y-2 text-xs pt-2 border-t border-[#F0EAE1]">
            <div className="flex justify-between text-[#665D56]">
              <span>Prompt Payment Record:</span>
              <strong className="text-[#2D6A4F]">100%</strong>
            </div>
            <div className="flex justify-between text-[#665D56]">
              <span>Dispute / Cancellation Rate:</span>
              <strong className="text-[#2D6A4F]">0.0%</strong>
            </div>
            <div className="flex justify-between text-[#665D56]">
              <span>Working Conditions Rating:</span>
              <strong className="text-[#2D6A4F]">5.0 / 5.0</strong>
            </div>
          </div>
        </div>

        {/* Rate Recent Service Form */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-6">
          <h3 className="font-bold text-base text-[#2B2B2B] border-b border-[#F0EAE1] pb-2">
            Rate Recent Service: Rajesh Kumar (Master Electrician)
          </h3>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#4A4A4A] block mb-2">Overall Workmanship Quality</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl cursor-pointer transition-transform hover:scale-110 ${
                        rating >= star ? 'text-[#D4A843]' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">Detailed Feedback / Commendation</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe punctuality, safety compliance, and craft quality..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl text-xs text-[#2B2B2B] focus:outline-none"
                />
              </div>

              {/* Before & After Photo Attachment Module */}
              <div className="p-3.5 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2B2B2B]">Attach Before & After Work Photos</span>
                  {attachedPhotos && <span className="text-[10px] font-bold text-[#2D6A4F]">✓ 2 Photos Added</span>}
                </div>
                <button
                  type="button"
                  onClick={() => setAttachedPhotos(!attachedPhotos)}
                  className="w-full py-2 bg-white border border-[#E8DFD8] rounded-xl text-xs font-bold text-[#4A4A4A] hover:bg-gray-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-[#C45C3C]" />
                  <span>{attachedPhotos ? 'Photos Attached (before_wiring.jpg, after_fix.jpg)' : 'Upload Completed Work Photos'}</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-black text-xs shadow-md transition-all cursor-pointer"
              >
                Submit Review to Worker Reputation Passport
              </button>
            </form>
          ) : (
            <div className="p-6 bg-[#D1FAE5] rounded-2xl text-center space-y-2 text-xs text-[#1B4332]">
              <CheckCircle2 className="w-8 h-8 text-[#2D6A4F] mx-auto" />
              <strong className="block text-sm">Rating Sealed on Cooperative Reputation Ledger!</strong>
              <p>Your review has elevated Rajesh Kumar's Reputation Passport and credited your Customer Trust Score.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
