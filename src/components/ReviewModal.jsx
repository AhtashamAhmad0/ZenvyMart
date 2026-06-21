import React, { useState } from 'react';
import { Star, X, Sparkles } from 'lucide-react';

export const ReviewModal = ({ isOpen, onClose, onSubmitReview }) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError('Your Name is required');
      return;
    }
    if (!comment.trim()) {
      setError('Please provide feedback commentary');
      return;
    }

    onSubmitReview({
      id: `rev-${Date.now()}`,
      userName: userName.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' }),
    });

    setUserName('');
    setRating(5);
    setComment('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative bg-[#111111] border border-[#222222] rounded-2xl w-full max-w-md shadow-2xl p-6 sm:p-7 z-10 animate-scaleUp text-[#F0F0F0]">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#222222]">
          <div>
            <h3 className="text-lg font-sans font-bold text-white flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-400" />Write a Review</h3>
            <p className="text-xs text-[#888888]">Share your premium user experience</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-[#888888] hover:text-white hover:bg-[#1A1A1A] transition-colors focus:outline-none" title="Close modal"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-2.5 text-xs text-rose-450 bg-rose-950/20 border border-rose-900/40 rounded-md font-medium">{error}</div>}

          <div>
            <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1">Your Name <span className="text-rose-400">*</span></label>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full px-4 py-2 border border-[#222222] rounded-lg text-sm bg-[#1A1A1A] text-white focus:bg-[#1D1D1D] focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all" placeholder="e.g. Sarah Khan" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1">Rating Star Selection</label>
            <div className="flex gap-1.5 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button type="button" key={star} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(null)} className="focus:outline-none">
                  <Star className={`w-6 h-6 transition-all duration-150 ${star <= (hoverRating ?? rating) ? 'text-amber-400 fill-amber-400 scale-110' : 'text-neutral-800'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1">Feedback commentary <span className="text-rose-400">*</span></label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} className="w-full px-4 py-2 border border-[#222222] rounded-lg text-sm bg-[#1A1A1A] text-white focus:bg-[#1D1D1D] focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all resize-none" placeholder="Comment on premium build, shipping, packaging elegance..." />
          </div>

          <button type="submit" className="w-full bg-white hover:bg-neutral-200 text-black font-sans text-xs font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow cursor-pointer">Submit Verified Review</button>
        </form>
      </div>
    </div>
  );
};
