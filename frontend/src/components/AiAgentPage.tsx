import React from 'react';
import { AiChatPreview } from './AiChatPreview';
import { Sparkles, ShieldCheck, HeartHandshake, AlertCircle } from 'lucide-react';

export const AiAgentPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-150">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-rose-600" />
          <span>Intelligent First-Aid Advisor</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI First-Aid Chat Agent
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Describe what happened in your own words. Our AI triage assistant analyzes urgency, gives you ordered first-aid steps, and highlights warning signs.
        </p>
      </div>

      {/* Main Full-Scale Chat Area */}
      <AiChatPreview />

      {/* Trust & Safety Cards */}
      <div className="grid sm:grid-cols-3 gap-3.5 pt-2">
        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Clinical Protocols</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Guidance aligns with standard Red Cross and Mayo Clinic first-aid recommendations.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
            <HeartHandshake className="w-4 h-4 text-rose-600" />
            <span>Myth Busting</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Flags harmful folk remedies like butter on burns or harsh alcohol in fresh open cuts.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Red Flag Detection</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Detects symptoms requiring urgent clinic visits, stitches within 6-8 hours, or 911 dispatch.
          </p>
        </div>
      </div>
    </div>
  );
};
