import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SYMPTOMS_LIST, SymptomItem } from '../data/symptomsData';
import {
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Check,
  PhoneCall,
  RefreshCw,
  Activity,
  HeartPulse,
  ListOrdered,
  Ban,
  Hospital,
  ChevronRight
} from 'lucide-react';

export const IDontKnowWhatHappenedPage: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [selectedSymptomIds, setSelectedSymptomIds] = useState<string[]>([]);
  const [activeSymptomId, setActiveSymptomId] = useState<string | null>(null);

  const toggleSymptom = (id: string) => {
    setSelectedSymptomIds((prev) => {
      const isAlreadySelected = prev.includes(id);
      let updated: string[];
      if (isAlreadySelected) {
        updated = prev.filter((item) => item !== id);
        // If we deselected the active symptom, set active to the first remaining one
        if (activeSymptomId === id) {
          setActiveSymptomId(updated.length > 0 ? updated[0] : null);
        }
      } else {
        updated = [...prev, id];
        setActiveSymptomId(id);
        // Scroll smoothly to the action steps
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      }
      return updated;
    });
  };

  const selectedSymptoms = SYMPTOMS_LIST.filter((s) => selectedSymptomIds.includes(s.id));
  const activeSymptom =
    selectedSymptoms.find((s) => s.id === activeSymptomId) ||
    (selectedSymptoms.length > 0 ? selectedSymptoms[0] : null);

  const hasHighRisk = selectedSymptoms.some((s) => s.isHighRisk);

  const handleAskAiWithSymptoms = () => {
    const symptomNames = selectedSymptoms.map((s) => s.name).join(', ');
    navigate(
      `/ai?query=${encodeURIComponent(
        'I observed these symptoms: ' + symptomNames + '. What is the ordered step-by-step first aid procedure?'
      )}`
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-150">
      {/* Breadcrumb / Top Bar */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <Link to="/home" className="hover:text-slate-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Find What Happened</span>
        </div>

        <Link
          to="/injuries"
          className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 transition-colors"
        >
          <span>Know the injury? Go to Injury Guide →</span>
        </Link>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          What can you see or feel?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
          If you are unsure of what caused the injury, tap on any symptom below. We will provide a <strong>well-ordered list of what to do right now</strong> in sequential order.
        </p>
      </div>

      {/* Critical Life-Threat Warning Banner */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-amber-950">Unconscious or Not Breathing?</span> Dial{' '}
            <strong className="text-rose-700 font-black">111</strong> immediately and begin continuous CPR chest compressions. Do not delay.
          </div>
        </div>
        <a
          href="tel:111"
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-colors flex items-center gap-1.5 shadow-2xs self-end sm:self-auto"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call 111</span>
        </a>
      </div>

      {/* Symptoms Selection Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>Tap symptoms you observe</span>
            <span className="text-slate-400 font-normal">
              ({selectedSymptomIds.length} selected)
            </span>
          </span>
          {selectedSymptomIds.length > 0 && (
            <button
              onClick={() => {
                setSelectedSymptomIds([]);
                setActiveSymptomId(null);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear selection</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {SYMPTOMS_LIST.map((symptom) => {
            const isSelected = selectedSymptomIds.includes(symptom.id);
            const isFocused = activeSymptomId === symptom.id;
            return (
              <button
                key={symptom.id}
                type="button"
                onClick={() => toggleSymptom(symptom.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? isFocused
                      ? 'bg-slate-900 border-slate-900 text-white shadow-md ring-2 ring-rose-500/50'
                      : 'bg-slate-800 border-slate-800 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {symptom.name}
                  </div>
                  {symptom.isHighRisk && (
                    <div
                      className={`text-[10px] sm:text-xs mt-1 font-bold flex items-center gap-1 ${
                        isSelected ? 'text-rose-300' : 'text-rose-600'
                      }`}
                    >
                      <span>High Risk Sign</span>
                    </div>
                  )}
                </div>

                <span
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-rose-600 border-rose-600 text-white'
                      : 'border-slate-300 bg-white text-transparent'
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target anchor for smooth scroll */}
      <div ref={resultsRef} />

      {/* Ordered Step-by-Step Triage & Action Plan */}
      {selectedSymptoms.length > 0 && activeSymptom ? (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Multiple Selected Symptoms Tab Bar */}
          {selectedSymptoms.length > 1 && (
            <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-slate-500 px-2 shrink-0">Selected:</span>
              {selectedSymptoms.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSymptomId(s.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all ${
                    activeSymptomId === s.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}

          {/* Urgency Alert Banner for Current Symptom */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 shadow-xs ${
              activeSymptom.isHighRisk
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {activeSymptom.isHighRisk ? (
                <span className="p-2 rounded-xl bg-rose-200 text-rose-800 shrink-0 mt-0.5">
                  <ShieldAlert className="w-5 h-5" />
                </span>
              ) : (
                <span className="p-2 rounded-xl bg-emerald-200 text-emerald-800 shrink-0 mt-0.5">
                  <Activity className="w-5 h-5" />
                </span>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm sm:text-base font-bold">
                    {activeSymptom.isHighRisk
                      ? 'Immediate High-Priority Response Required'
                      : 'Step-by-Step Stabilization Guide'}
                  </h3>
                  <span className="text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-700">
                    {activeSymptom.recommendedCategory}
                  </span>
                </div>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-95">
                  <span className="font-semibold">Clinical context:</span> {activeSymptom.whatItMeans}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              {activeSymptom.isHighRisk && (
                <a
                  href="tel:111"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call 111</span>
                </a>
              )}

              <button
                onClick={handleAskAiWithSymptoms}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>Ask AI Agent</span>
              </button>
            </div>
          </div>

          {/* MAIN ORDERED LIST OF WHAT TO DO */}
          <div className="bg-white rounded-2xl border-2 border-slate-300 p-5 sm:p-7 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-slate-900 text-white">
                  <ListOrdered className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-base sm:text-xl font-black text-slate-900">
                    What To Do: Ordered Action Plan for {activeSymptom.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Execute these clinical steps in numbered chronological sequence.
                  </p>
                </div>
              </div>
            </div>

            {/* The Ordered Numbered Steps */}
            <div className="space-y-3 sm:space-y-3.5">
              {activeSymptom.orderedSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all flex items-start gap-3.5 group shadow-2xs"
                >
                  {/* Step Number Badge */}
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-2xs mt-0.5 group-hover:bg-rose-600 transition-colors">
                    {idx + 1}
                  </span>

                  {/* Step Guidance */}
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {step}
                  </div>
                </div>
              ))}
            </div>

            {/* DO NOT DO Critical Warnings */}
            {activeSymptom.doNots && activeSymptom.doNots.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-950 font-bold text-xs sm:text-sm uppercase tracking-wider">
                  <Ban className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Critical: What You Must NOT Do</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-amber-900 pl-1">
                  {activeSymptom.doNots.map((dont, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold shrink-0">✕</span>
                      <span>{dont}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Red Flag Warning Signs */}
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-rose-950 font-bold text-xs sm:text-sm uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Danger Signs (Call 111 Immediately If You See):</span>
                </div>
                <a
                  href="tel:111"
                  className="text-xs font-bold text-rose-700 underline hover:text-rose-900"
                >
                  Dial 111
                </a>
              </div>
              <ul className="space-y-1 text-xs sm:text-sm text-rose-900 pl-1">
                {activeSymptom.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold shrink-0">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Bar: Find Healthcare or Call 111 */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">Need professional evaluation today?</span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  to="/healthcare"
                  className="flex-1 sm:flex-initial px-4 py-2 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Hospital className="w-4 h-4 text-slate-600" />
                  <span>Find Healthcare Center</span>
                </Link>
                <a
                  href="tel:111"
                  className="flex-1 sm:flex-initial px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call 111</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 p-6 space-y-2">
          <HeartPulse className="w-9 h-9 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Symptoms Selected Yet</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Click on any symptom above to see an immediate, well-ordered list (Step 1, Step 2, Step 3...) of exactly what you should do.
          </p>
        </div>
      )}

      {/* Couldn't find what happened? AI Agent Fallback Card */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-700/60">
        <div className="space-y-1">
          <h3 className="text-base sm:text-xl font-extrabold text-white">
            Can't find your symptom?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Describe what happened in plain words. Our AI First Aid Agent will analyze the injury and give you an ordered action sequence.
          </p>
        </div>

        <Link
          to="/ai"
          className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md shrink-0 w-full sm:w-auto justify-center group cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Ask AI Agent</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
