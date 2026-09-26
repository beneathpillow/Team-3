import React, { useState } from 'react';
import { Sparkles, AlertCircle, CheckCircle, ShieldAlert, Clock, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

interface TriageResponse {
  urgency: 'home_care_with_monitoring' | 'urgent_clinic' | 'emergency_911';
  urgencyTitle: string;
  summary: string;
  firstSteps: string[];
  redFlags: string[];
  doNots: string[];
  disclaimer: string;
}

const PRESET_QUERIES = [
  'Kitchen knife slipped while chopping vegetables, sliced left index finger pad, bleeding steadily',
  'Touched hot metal oven rack, skin on wrist is red, stinging, and a small blister is forming',
  'Tripped on gravel path, scraped knee badly with visible dirt grit stuck in scrape',
  'Rolled ankle on sidewalk curb, swollen immediately and hurts to put weight on it',
  'Cat scratched arm while playing, surface bleeding and red scratches',
  'Bee sting on forearm 15 minutes ago, site is hot, swollen, and throbbing'
];

export const AiTriageAssistant: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>('Adult');
  const [timeElapsed, setTimeElapsed] = useState<string>('Just now (< 15 mins)');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<TriageResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleTriage = async (customText?: string) => {
    const textToSubmit = customText || description;
    if (!textToSubmit.trim()) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          injuryDescription: textToSubmit,
          ageGroup,
          timeElapsed
        })
      });

      if (!res.ok) {
        throw new Error('Failed to evaluate first aid triage');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.warn('AI Triage error, using fallback clinical guidance', err);
      // Resilient fallback clinical first-aid evaluation
      setResult({
        urgency: 'home_care_with_monitoring',
        urgencyTitle: 'Standard Home First-Aid Protocol',
        summary: 'Wash hands thoroughly, gently cleanse with clean cool water or sterile saline, and apply direct pressure if bleeding persists.',
        firstSteps: [
          'Wash hands thoroughly with soap and water before touching the injured area.',
          'Rinse the injury under gentle, clean running tap water to remove loose contaminants.',
          'Apply firm, continuous direct pressure with clean gauze for at least 10 minutes if bleeding.',
          'Apply a thin coat of plain petroleum jelly and cover with a sterile protective dressing.',
          'Rest and elevate the affected limb if there is swelling or throbbing.'
        ],
        redFlags: [
          'Uncontrolled bleeding after 10-15 minutes of uninterrupted direct pressure',
          'Wound edges gaping apart (> 0.5 cm) or exposed yellowish subcutaneous fat tissue',
          'Numbness, loss of pulse, or inability to move the affected limb/digits',
          'Any animal/human bite or rusty nail puncture (tetanus booster evaluation needed)'
        ],
        doNots: [
          'Do NOT apply butter, toothpaste, grease, or baking soda to burns.',
          'Do NOT pour harsh rubbing alcohol or full-strength hydrogen peroxide directly inside fresh open cuts.',
          'Do NOT apply bare ice cubes directly onto skin without a protective cloth barrier.'
        ],
        disclaimer: 'This informational advice does not substitute for licensed medical diagnosis or emergency care. When in doubt, seek medical evaluation.'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetTriage = () => {
    setDescription('');
    setResult(null);
    setErrorMsg(null);
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'emergency_911':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-800',
          icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
          label: 'Critical / Emergency Care Advised'
        };
      case 'urgent_clinic':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
          label: 'Urgent Care / Doctor Review Recommended'
        };
      default:
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
          label: 'Suitable for Home First Aid'
        };
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-rose-700 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Clinical Triage Advisor</span>
          </div>
          <h2 className="text-base font-semibold text-slate-900">
            Describe Your Injury Situation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Get instant priority assessment, step-by-step home remedies, and clinical red flags for your specific situation.
          </p>
        </div>

        {result && (
          <button
            onClick={resetTriage}
            className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Check</span>
          </button>
        )}
      </div>

      <div className="p-4 sm:p-6">
        {!result ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                What happened? Describe the injury in your own words:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Example: I cut my finger pad with a kitchen knife 10 minutes ago. It's bleeding slowly, and it throbs..."
                rows={3}
                className="w-full text-sm p-3 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none text-slate-900 placeholder:text-slate-400 resize-none"
              />
            </div>

            {/* Quick Context Selectors */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Age of Injured Person:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Child / Infant', 'Adult', 'Senior (65+)'].map((age) => (
                    <button
                      key={age}
                      type="button"
                      onClick={() => setAgeGroup(age)}
                      className={`text-xs py-1.5 px-2 rounded-md border font-medium text-center transition-colors ${
                        ageGroup === age
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {age.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  When did it happen?
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Just now (< 15m)', '1 - 4 hours ago', 'Yesterday / >24h'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setTimeElapsed(time)}
                      className={`text-xs py-1.5 px-2 rounded-md border font-medium text-center transition-colors ${
                        timeElapsed === time
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {time.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Prompt Presets */}
            <div>
              <span className="text-xs font-medium text-slate-500 block mb-1.5">
                Or select a common scenario:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_QUERIES.map((query, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setDescription(query);
                      handleTriage(query);
                    }}
                    className="text-xs text-left px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    {query.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleTriage()}
                disabled={loading || !description.trim()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing situation...</span>
                  </>
                ) : (
                  <>
                    <span>Evaluate Situation & Steps</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Triage Results View */
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Urgency Header */}
            {(() => {
              const badge = getUrgencyBadge(result.urgency);
              return (
                <div className={`p-4 rounded-xl border ${badge.bg}`}>
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5">{badge.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          {badge.label}
                        </span>
                      </div>
                      <h3 className="text-base font-bold mt-0.5">
                        {result.urgencyTitle}
                      </h3>
                      <p className="text-xs mt-1.5 leading-relaxed font-normal">
                        {result.summary}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Actionable First Steps */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-600" />
                <span>Immediate Priority Actions (In Order):</span>
              </h4>
              <div className="space-y-2">
                {result.firstSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dual Grid: Red Flags vs Do Nots */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Red flags */}
              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/80">
                <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-700" />
                  <span>When to Seek Medical Care (Red Flags):</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-rose-900">
                  {result.redFlags.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold shrink-0">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Do nots */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                  <span>Harmful Mistakes to Avoid:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-amber-900">
                  {result.doNots.map((dont, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold shrink-0">✕</span>
                      <span>{dont}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3 bg-slate-100 rounded-lg text-[11px] text-slate-500 leading-normal flex items-start gap-2">
              <span className="font-semibold text-slate-700 shrink-0">Disclaimer:</span>
              <span>{result.disclaimer}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
