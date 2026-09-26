import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KNOWN_INJURIES, KnownInjury } from '../data/knownInjuries';
import {
  Search,
  ArrowRight,
  Activity,
  Layers,
  ShieldAlert,
  AlertTriangle,
  X,
  PhoneCall,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface BodyRegionInfo {
  id: 'hands' | 'head' | 'feet' | 'arms' | 'legs' | 'torso';
  name: string;
  description: string;
}

const BODY_REGIONS: BodyRegionInfo[] = [
  { id: 'hands', name: 'Hands & Fingers', description: 'Kitchen cuts, steam burns, splinters, blister friction, finger sprains' },
  { id: 'head', name: 'Head, Face & Eyes', description: 'Head bumps, nosebleeds, eye debris, airway choking, facial burns' },
  { id: 'feet', name: 'Feet & Ankles', description: 'Rolled/twisted ankles, puncture wounds (nails), footwear blisters, frostnip' },
  { id: 'arms', name: 'Arms & Elbows', description: 'Forearm burns, lacerations, elbow sprains, insect stings, fractures' },
  { id: 'legs', name: 'Legs & Knees', description: 'Skinned knees, knee sprains, bone fractures, deep cuts' },
  { id: 'torso', name: 'Torso & Chest', description: 'Chemical burns, hypothermia, allergic reactions, choking Heimlich' }
];

export const SmallInjuriesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'body-map'>('grid');
  const [selectedRegion, setSelectedRegion] = useState<'hands' | 'head' | 'feet' | 'arms' | 'legs' | 'torso'>('hands');
  const [activeInjury, setActiveInjury] = useState<KnownInjury | null>(null);

  const categories = [
    { id: 'all', label: 'All Injuries (18)' },
    { id: 'Critical / Emergency', label: 'Critical Emergencies' },
    { id: 'Wound & Bleeding', label: 'Cuts & Bleeding' },
    { id: 'Thermal & Cold', label: 'Burns & Cold' },
    { id: 'Musculoskeletal', label: 'Sprains & Fractures' },
    { id: 'Head, Eyes & Nose', label: 'Head, Eyes & Nose' },
    { id: 'Stings & Bites', label: 'Stings & Bites' },
  ];

  const filtered = KNOWN_INJURIES.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.immediateAction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const bodyRegionInjuries = KNOWN_INJURIES.filter((item) =>
    item.bodyRegions.includes(selectedRegion)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-150">
      {/* Breadcrumb / Navigation helper */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Link to="/home" className="hover:text-slate-900 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Injuries</span>
        </div>

        <Link
          to="/i-dont-know-what-happened"
          className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
        >
          <span>Not sure of the cause? Find what happened →</span>
        </Link>
      </div>

      {/* Unified Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider mb-2">
          <Activity className="w-3 h-3 text-rose-400" />
          <span>Injuries · Complete Clinical Guides</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Small Injuries & First-Aid Protocols
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Select your injury below or use the Anatomical Body Navigator. Each protocol provides the immediate priority action, step-by-step care, red flags for emergency care, and direct timer launchers.
        </p>
      </div>

      {/* Search Bar & View Mode Toggle */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search injury by name or symptom (e.g. burn, cut, sprain, choking, nosebleed)..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg shrink-0 self-end sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Injury List ({filtered.length})</span>
            </button>
            <button
              onClick={() => setViewMode('body-map')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'body-map'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Body Navigator</span>
            </button>
          </div>
        </div>

        {/* Category Pills (List View) */}
        {viewMode === 'grid' && (
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
        )}
      </div>

      {/* Main Content: Body Navigator vs Grid */}
      {viewMode === 'body-map' ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Anatomical Body Navigator</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click where the injury occurred on the body to see targeted clinical protocols.
            </p>
          </div>

          <div className="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Regions list */}
            <div className="md:col-span-5 p-4 sm:p-5 bg-slate-50/50 space-y-1.5">
              {BODY_REGIONS.map((region) => {
                const isSelected = selectedRegion === region.id;
                return (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{region.name}</div>
                      <div className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {region.description}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-rose-400' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Targeted injuries for active region */}
            <div className="md:col-span-7 p-4 sm:p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Protocols for {BODY_REGIONS.find(r => r.id === selectedRegion)?.name}:</span>
                <span className="text-slate-400 font-normal">{bodyRegionInjuries.length} protocols</span>
              </div>

              <div className="space-y-2.5">
                {bodyRegionInjuries.map((injury) => (
                  <div
                    key={injury.id}
                    onClick={() => setActiveInjury(injury)}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-400 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                          {injury.name}
                        </h4>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          injury.severity === 'Immediate 911'
                            ? 'bg-rose-100 text-rose-800'
                            : injury.severity === 'Urgent Medical Attention'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {injury.severity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {injury.shortDesc}
                      </p>
                      <div className="mt-2 text-xs text-slate-800 bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="font-bold text-rose-700">Immediate: </span>
                        <span>{injury.immediateAction}</span>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{injury.steps.length} Steps</span>

                      <span className="font-bold text-slate-900 group-hover:text-rose-600 flex items-center gap-1">
                        <span>Open Protocol</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Grid of All Injuries */
        <div className="grid sm:grid-cols-2 gap-3.5">
          {filtered.map((injury) => {
            const isCritical = injury.severity === 'Immediate 911';
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

                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {injury.shortDesc}
                  </p>

                  {/* Immediate Action Highlight */}
                  <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 leading-snug">
                    <span className="font-bold text-rose-700">Immediate action: </span>
                    <span>{injury.immediateAction}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{injury.steps.length} Step Procedure</span>

                  <span className="text-slate-900 font-semibold group-hover:text-rose-600 flex items-center gap-1">
                    <span>Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Safety Notice Banner */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-amber-950">Emergency Notice: </span>
          If the injured person experiences heavy arterial spurting bleeding, loss of consciousness, wide third-degree burns, or anaphylaxis, call <span className="font-bold text-rose-700">911</span> or your national emergency number immediately.
        </div>
      </div>

      {/* Full Modal for Viewing Clinical Protocol */}
      {activeInjury && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="relative bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-4 sticky top-0 bg-white z-10">
              <div>
                <div className="flex items-center gap-2 text-xs mb-1">
                  <span className="font-semibold text-slate-500">{activeInjury.category}</span>
                  <span>·</span>
                  <span className={`font-bold ${activeInjury.severity === 'Immediate 911' ? 'text-rose-700' : 'text-slate-700'}`}>
                    {activeInjury.severity}
                  </span>
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

              {/* Step by Step */}
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

              {/* Red Flags & Do Nots */}
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200">
                  <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Red Flags (Call 911 / ER):</span>
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
                href="tel:911"
                className="text-xs text-rose-700 font-bold hover:underline flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call 911 If Worsening</span>
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
