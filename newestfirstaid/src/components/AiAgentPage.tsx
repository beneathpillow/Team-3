import React from 'react';
import { Link } from 'react-router-dom';
import { AiChatPreview } from './AiChatPreview';
import { AlertTriangle, PhoneCall, Hospital } from 'lucide-react';

export const AiAgentPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5 animate-in fade-in duration-150">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI First-Aid Chat Agent
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Describe what happened in your own words. Our AI triage assistant analyzes urgency, gives you ordered first-aid steps, and highlights warning signs.
        </p>
      </div>

      {/* Prominent Clinical Disclaimer & Advisory */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-4.5 text-amber-950 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
        <div className="flex items-start gap-3">
          <span className="p-2 rounded-xl bg-amber-200 text-amber-900 shrink-0 mt-0.5 shadow-2xs">
            <AlertTriangle className="w-5 h-5 text-amber-800" />
          </span>
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-bold text-amber-950 block sm:inline">
              Important Medical Notice:
            </span>{' '}
            AI guidance is not 100% accurate and cannot replace a doctor or paramedic. If you feel unwell, symptoms worsen, or you are unsure, please contact emergency services (<strong className="text-rose-700">111</strong>) or visit a local healthcare center immediately.
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <Link
            to="/healthcare"
            className="px-3 py-1.5 rounded-lg border border-amber-300 bg-white hover:bg-amber-100 text-amber-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Hospital className="w-3.5 h-3.5 text-amber-800" />
            <span>Healthcare</span>
          </Link>
          <a
            href="tel:111"
            className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 111</span>
          </a>
        </div>
      </div>

      {/* Main Full-Scale Chat Area */}
      <AiChatPreview />
    </div>
  );
};
