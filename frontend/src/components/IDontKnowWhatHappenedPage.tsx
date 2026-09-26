import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SYMPTOMS_LIST, SymptomItem } from '../data/symptomsData';
import { ShieldAlert, AlertTriangle, ArrowRight, Sparkles, Check, PhoneCall, RefreshCw, Activity, HeartPulse } from 'lucide-react';

export const IDontKnowWhatHappenedPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSymptomIds, setSelectedSymptomIds] = useState<string[]>([]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptomIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedSymptoms = SYMPTOMS_LIST.filter((s) => selectedSymptomIds.includes(s.id));

  const hasHighRisk = selectedSymptoms.some((s) => s.isHighRisk);

  const handleAskAiWithSymptoms = () => {
    const symptomNames = selectedSymptoms.map((s) => s.name).join(', ');
    navigate(`/ai?query=${encodeURIComponent('I observed these symptoms: ' + symptomNames + '. What should I do right now?')}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-150">
      {/* Breadcrumb / Top Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Link to="/home" className="hover:text-slate-900 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Find What Happened</span>
        </div>

        <Link
          to="/injuries"
          className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
        >
          <span>Know the injury? Select from Injuries →</span>
        </Link>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          What can you see or feel?
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          If you are unsure of the exact cause, tap all the signs or symptoms you currently notice. We will help you identify the immediate first-aid priority.
        </p>
      </div>

      {/* Critical Life-Threat Notice */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-950 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-amber-950">Unconscious or Not Breathing?</span> Call{' '}
            <strong className="text-rose-700">911</strong> immediately and begin CPR chest compressions. Do not wait.
          </div>
        </div>
        <a
          href="tel:911"
          className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shrink-0 transition-colors"
        >
          Call 911
        </a>
      </div>

      {/* Symptoms Selection Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Tap all symptoms that apply ({selectedSymptomIds.length} selected):
          </span>
          {selectedSymptomIds.length > 0 && (
            <button
              onClick={() => setSelectedSymptomIds([])}
              className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Clear selection</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {SYMPTOMS_LIST.map((symptom) => {
            const isSelected = selectedSymptomIds.includes(symptom.id);
            return (
              <button
                key={symptom.id}
                type="button"
                onClick={() => toggleSymptom(symptom.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {symptom.name}
                  </div>
                  {symptom.isHighRisk && (
                    <div
                      className={`text-[10px] mt-0.5 font-semibold ${
                        isSelected ? 'text-rose-300' : 'text-rose-600'
                      }`}
                    >
                      High Risk Sign
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

      {/* Triage & Assessment Results */}
      {selectedSymptoms.length > 0 ? (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Urgency Alert Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              hasHighRisk
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {hasHighRisk ? (
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              ) : (
                <Activity className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="text-sm font-bold">
                  {hasHighRisk
                    ? 'Urgent Medical Attention Advised (High-Risk Symptom Detected)'
                    : 'Manageable with First-Aid Care & Close Monitoring'}
                </h3>
                <p className="text-xs mt-0.5 leading-relaxed opacity-90">
                  {hasHighRisk
                    ? 'One or more selected signs (such as breathing distress, cyanosis, or confusion) can indicate compromised circulation, oxygenation, or severe trauma. Call 911 if worsening.'
                    : 'Follow the immediate step-by-step stabilization steps below. Watch for spreading swelling or infection.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              {hasHighRisk && (
                <a
                  href="tel:911"
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call 911</span>
                </a>
              )}

              <button
                onClick={handleAskAiWithSymptoms}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Ask AI Agent</span>
              </button>
            </div>
          </div>

          {/* Detailed Guidance Cards for each selected symptom */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Immediate Care Steps for Selected Signs:
            </h3>

            {selectedSymptoms.map((symptom) => (
              <div
                key={symptom.id}
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span>
                    <h4 className="text-sm font-bold text-slate-900">{symptom.name}</h4>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {symptom.recommendedCategory}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-800 leading-relaxed">
                  <span className="font-bold text-rose-700">What to do right now: </span>
                  <span>{symptom.immediateStep}</span>
                </div>

                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">What it may indicate: </span>
                  <span>{symptom.whatItMeans}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs text-rose-800">
                  <span className="font-bold">Danger signs (Red Flags): </span>
                  <span>{symptom.redFlags.join(' • ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty Prompt State */
        <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 p-6 space-y-2">
          <HeartPulse className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Symptoms Selected Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tap one or more symptoms above to view immediate action steps, what the symptom indicates, and whether emergency dispatch is recommended.
          </p>
        </div>
      )}

      {/* Couldn't find what happened? AI Agent Fallback Card */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-700/60">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Need Custom Help?</span>
          </div>
          <h3 className="text-base sm:text-xl font-extrabold text-white">
            Can't find your injury or symptom?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Describe what happened in your own words. Our AI First Aid Agent will assess your situation and provide immediate step-by-step guidance.
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
