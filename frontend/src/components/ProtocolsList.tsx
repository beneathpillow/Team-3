import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MessageCircle,
  PhoneCall,
  AlertTriangle,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';

export const ProtocolsList: React.FC = () => {
  const [heroImageError, setHeroImageError] = useState(false);

  return (
    <div className="w-full relative">
      {/* 1. Above The Fold Viewport: ONLY Banner and 3 Action Buttons */}
      <div className="min-h-[calc(100dvh-3.5rem)] min-h-[calc(100vh-3.5rem)] flex flex-col justify-between">
        {/* Top Banner (Thinner, streamlined) */}
        <section className="relative w-full h-24 sm:h-32 md:h-36 shrink-0 overflow-hidden bg-slate-950 flex items-center justify-center">
          {!heroImageError ? (
            <img
              src="/src/assets/images/full_hero_caring_firstaid_1790374755979.jpg"
              alt="First aid essentials"
              referrerPolicy="no-referrer"
              onError={() => setHeroImageError(true)}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
            />
          ) : (
            <div className="absolute inset-0 bg-slate-900" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/40" />

          <div className="relative z-10 max-w-2xl mx-auto px-4 text-center text-white py-2">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              Are you hurt? We got you.
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-200 font-medium">
              Clear, step-by-step guidance for injuries and accidents.
            </p>
          </div>
        </section>

        {/* Primary Action Buttons Container */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
          {/* Side-by-Side Main Action Cards (Phone & Desktop) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {/* Tile 1: Injuries */}
            <Link
              to="/injuries"
              className="p-4 sm:p-7 md:p-8 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-900 hover:shadow-lg transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[190px] md:min-h-[220px] group cursor-pointer"
            >
              <h2 className="text-base sm:text-2xl md:text-3xl font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors leading-snug tracking-tight">
                Injuries
              </h2>
              <div className="flex items-center justify-between pt-3 mt-auto">
                <span className="text-[11px] sm:text-xs font-bold text-slate-400 group-hover:text-rose-600 uppercase tracking-wider">
                  Select Injury
                </span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 group-hover:bg-rose-600 text-slate-700 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>

            {/* Tile 2: Find What Happened */}
            <Link
              to="/i-dont-know-what-happened"
              className="p-4 sm:p-7 md:p-8 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-900 hover:shadow-lg transition-all flex flex-col justify-between min-h-[145px] sm:min-h-[190px] md:min-h-[220px] group cursor-pointer"
            >
              <h2 className="text-base sm:text-2xl md:text-3xl font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors leading-snug tracking-tight">
                Find What Happened
              </h2>
              <div className="flex items-center justify-between pt-3 mt-auto">
                <span className="text-[11px] sm:text-xs font-bold text-slate-400 group-hover:text-rose-600 uppercase tracking-wider">
                  Check Signs
                </span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 group-hover:bg-rose-600 text-slate-700 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          </div>

          {/* Tile 3: Should I Call 111? (Placed Down Below) */}
          <Link
            to="/111"
            className="p-3.5 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 border-rose-300 bg-rose-50/60 hover:bg-rose-50 hover:border-rose-600 hover:shadow-md transition-all flex items-center justify-between gap-3 group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-rose-600 text-white shrink-0">
                <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              <h2 className="text-sm sm:text-xl md:text-2xl font-bold text-rose-950 group-hover:text-rose-600 transition-colors leading-tight">
                Should I Call 111?
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-rose-700 group-hover:text-rose-800 shrink-0">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="pb-3 pt-1 flex items-center justify-center gap-1.5 text-xs text-slate-400 select-none">
          <span>Scroll down for more</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-slate-400" />
        </div>
      </div>

      {/* 2. Below The Fold: Visible ONLY When Scrolling Down */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-16 space-y-4 border-t border-slate-200/80">
        {/* Minimalist AI Chat Card */}
        <Link
          to="/ai"
          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-rose-400 hover:shadow-md transition-all flex items-center justify-between gap-4 group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-900 group-hover:bg-rose-600 text-white flex items-center justify-center shrink-0 transition-colors">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                Ask AI First Aid Agent
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Describe what happened in plain words for instant guidance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 shrink-0 group-hover:translate-x-1 transition-transform">
            <span>Chat</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Simple Emergency Bar */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>If someone is unresponsive, cannot breathe, or losing blood rapidly, call emergency dispatch immediately.</span>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <Link
              to="/111"
              className="text-xs font-semibold text-amber-900 underline hover:text-amber-950 px-1"
            >
              When to call 111
            </Link>
            <a
              href="tel:111"
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call 111</span>
            </a>
          </div>
        </div>
      </div>

      {/* Minimalist Floating Chat Button */}
      <Link
        to="/ai"
        aria-label="Chat with AI First-Aid Agent"
        className="fixed bottom-6 right-5 sm:right-6 z-50 group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900 hover:bg-rose-600 text-white shadow-lg transition-all duration-200 active:scale-95"
      >
        <MessageCircle className="w-4 h-4 text-white" />
        <span className="text-xs font-semibold pr-0.5">
          Ask AI
        </span>
      </Link>
    </div>
  );
};
