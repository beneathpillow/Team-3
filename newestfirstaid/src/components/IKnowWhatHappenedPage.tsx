import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KNOWN_INJURIES, KnownInjury } from '../data/knownInjuries';
import { ShieldAlert, AlertTriangle, ArrowRight, Clock, Search, X, CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react';

export const IKnowWhatHappenedPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeInjury, setActiveInjury] = useState<KnownInjury | null>(null);

  const categories = [
    { id: 'all', label: 'All 13 Injuries' },
    { id: 'Critical / Emergency', label: 'Critical Emergencies' },
    { id: 'Wound & Bleeding', label: 'Wounds & Bleeding' },
    { id: 'Thermal & Cold', label: 'Burns & Cold' },
    { id: 'Musculoskeletal', label: 'Sprains & Fractures' }
  ];

  const filtered = KNOWN_INJURIES.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.immediateAction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-150">
      {/* Breadcrumb / Top Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Link to="/home" className="hover:text-slate-900 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">I Know What Happened</span>
        </div>

        <Link
          to="/i-dont-know-what-happened"
          className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
        >
          <span>Not sure? Check by symptoms →</span>
        </Link>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          I Know What Happened
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Select the exact accident or injury from the clinical list below to get instantaneous, step-by-step first-aid guidance.
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search specific injury (e.g. burn, choking, fracture, cut, poisoning)..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Injury Grid */}
      <div className="grid sm:grid-cols-2 gap-3.5">
        {filtered.map((injury) => {
          const isCritical = injury.severity === 'Immediate 111';
          return (
            <div
              key={injury.id}
              onClick={() => setActiveInjury(injury)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                isCritical
                  ? 'bg-white border-rose-200 hover:border-rose-400 hover:shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                  <span className="text-slate-500 font-medium">{injury.category}</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                      isCritical
                        ? 'bg-rose-100 text-rose-800'
                        : injury.severity === 'Urgent Medical Attention'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {injury.severity}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {injury.name}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-transform" />
                </div>

                {/* Priority action highlight */}
                <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 leading-snug">
                  <span className="font-bold text-rose-700">Immediate action: </span>
                  <span>{injury.immediateAction}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">{injury.steps.length} Step Procedure</span>
                <span className="text-slate-900 font-semibold group-hover:text-rose-600 flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for viewing injury details */}
      {activeInjury && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="relative bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-4 sticky top-0 bg-white z-10">
              <div>
                <div className="flex items-center gap-2 text-xs mb-1">
                  <span className="font-semibold text-slate-500">{activeInjury.category}</span>
                  <span>·</span>
                  <span className="font-bold text-rose-700">{activeInjury.severity}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{activeInjury.name} First Aid</h2>
              </div>

              <button
                onClick={() => setActiveInjury(null)}
                className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
              {/* Immediate Priority Action */}
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block">
                  Priority Action Right Now:
                </span>
                <p className="font-medium text-xs sm:text-sm leading-relaxed">
                  {activeInjury.immediateAction}
                </p>
              </div>

              {/* Timer Callout if applicable */}
              {activeInjury.timerType && (
                <div className="p-3.5 rounded-xl bg-slate-900 text-white flex items-center justify-between gap-3 shadow-xs">
                  <div className="text-xs">
                    <span className="font-bold block">Need to time direct pressure or cooling?</span>
                    <span className="text-slate-300">Continuous timing is critical for recovery.</span>
                  </div>
                  <Link
                    to={`/timers?preset=${activeInjury.timerType}`}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Launch Timer</span>
                  </Link>
                </div>
              )}

              {/* Step by step */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Step-by-Step Clinical Procedure:
                </h3>
                {activeInjury.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-800 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {/* Dual grid: Red flags vs Do Nots */}
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200">
                  <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Red Flags (Call 111 / ER):</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-rose-900">
                    {activeInjury.redFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold shrink-0">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                  <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    <span>Mistakes to Avoid (Do NOT):</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-amber-900">
                    {activeInjury.doNots.map((dont, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold shrink-0">✕</span>
                        <span>{dont}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <a
                href="tel:111"
                className="text-xs text-rose-700 font-bold hover:underline flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call 111 If Worsening</span>
              </a>

              <button
                onClick={() => setActiveInjury(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
              >
                Close Protocol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
