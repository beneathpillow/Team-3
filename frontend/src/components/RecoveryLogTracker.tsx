import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, AlertCircle, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

export interface RecoveryEntry {
  id: string;
  createdAt: string;
  injuryType: string;
  bodyLocation: string;
  painLevel: number; // 1-10
  notes: string;
  signs: {
    swelling: boolean;
    heat: boolean;
    rednessSpreading: boolean;
    pusDischarge: boolean;
    fever: boolean;
  };
}

const STORAGE_KEY = 'claraaid_recovery_logs_v1';

export const RecoveryLogTracker: React.FC = () => {
  const [logs, setLogs] = useState<RecoveryEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form state
  const [injuryType, setInjuryType] = useState('Cut / Scrape');
  const [bodyLocation, setBodyLocation] = useState('Finger / Hand');
  const [painLevel, setPainLevel] = useState(3);
  const [notes, setNotes] = useState('');
  const [signs, setSigns] = useState({
    swelling: false,
    heat: false,
    rednessSpreading: false,
    pusDischarge: false,
    fever: false
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setLogs(JSON.parse(saved));
      } else {
        // Sample default injury for instant demonstration
        const sample: RecoveryEntry = {
          id: 'sample-1',
          createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
          injuryType: 'Kitchen Knife Cut',
          bodyLocation: 'Left thumb pad',
          painLevel: 2,
          notes: 'Washed thoroughly with cool water, applied Vaseline and sterile bandage. Dressing changed morning and evening.',
          signs: {
            swelling: false,
            heat: false,
            rednessSpreading: false,
            pusDischarge: false,
            fever: false
          }
        };
        setLogs([sample]);
      }
    } catch (e) {
      console.warn('Failed to load logs:', e);
    }
  }, []);

  const saveLogs = (newLogs: RecoveryEntry[]) => {
    setLogs(newLogs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLogs));
    } catch (e) {
      console.warn('Failed to save logs:', e);
    }
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: RecoveryEntry = {
      id: 'log-' + Date.now(),
      createdAt: new Date().toISOString(),
      injuryType,
      bodyLocation,
      painLevel,
      notes,
      signs
    };

    saveLogs([newEntry, ...logs]);
    setIsAdding(false);
    // Reset form
    setNotes('');
    setPainLevel(3);
    setSigns({ swelling: false, heat: false, rednessSpreading: false, pusDischarge: false, fever: false });
  };

  const handleDelete = (id: string) => {
    saveLogs(logs.filter((l) => l.id !== id));
  };

  const calculateStatus = (entry: RecoveryEntry) => {
    const dangerCount =
      (entry.signs.rednessSpreading ? 2 : 0) +
      (entry.signs.pusDischarge ? 2 : 0) +
      (entry.signs.fever ? 3 : 0) +
      (entry.signs.heat ? 1 : 0) +
      (entry.signs.swelling ? 1 : 0);

    if (dangerCount >= 3 || entry.signs.rednessSpreading || entry.signs.pusDischarge) {
      return {
        level: 'danger',
        label: 'Seek Medical Review (Infection Warning)',
        desc: 'Signs of bacterial proliferation detected (spreading redness or pus). Please consult a doctor or urgent care clinic.',
        badgeClass: 'bg-rose-50 text-rose-800 border-rose-200'
      };
    } else if (dangerCount >= 1 || entry.painLevel >= 6) {
      return {
        level: 'warning',
        label: 'Watch Closely (Mild Inflammation)',
        desc: 'Minor swelling or localized tenderness is normal in the first 48 hours. Keep clean and monitor for spreading redness.',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
      };
    } else {
      return {
        level: 'normal',
        label: 'Normal Healthy Healing',
        desc: 'No clinical infection markers detected. Maintain clean, dry dressings.',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
      };
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <Activity className="w-3.5 h-3.5 text-slate-700" />
            <span>Clinical Infection & Healing Monitor</span>
          </div>
          <h2 className="text-base font-semibold text-slate-900">
            Wound Recovery & Healing Log
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track your injury over 24 to 72 hours. Early detection of spreading redness or infection prevents complications.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel Entry' : 'Log Daily Check-in'}</span>
        </button>
      </div>

      {/* S.H.A.R.P. Clinical Quick Reference Banner */}
      <div className="bg-slate-50 border-b border-slate-200/80 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>The Clinical S.H.A.R.P. Rule for Infection</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Watch for: <span className="font-semibold text-slate-900">S</span>welling, <span className="font-semibold text-slate-900">H</span>eat, <span className="font-semibold text-slate-900">A</span>ltered movement, <span className="font-semibold text-slate-900">R</span>edness spreading outward, and <span className="font-semibold text-slate-900">P</span>ain increasing rather than decreasing after 48 hours.
        </p>
      </div>

      {/* New Entry Form */}
      {isAdding && (
        <form onSubmit={handleAddEntry} className="p-4 sm:p-6 bg-slate-50/70 border-b border-slate-200 space-y-4 animate-in fade-in duration-150">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Injury Type:
              </label>
              <input
                type="text"
                value={injuryType}
                onChange={(e) => setInjuryType(e.target.value)}
                placeholder="e.g. Knife cut, Ankle sprain, Hot water scald"
                required
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Body Location:
              </label>
              <input
                type="text"
                value={bodyLocation}
                onChange={(e) => setBodyLocation(e.target.value)}
                placeholder="e.g. Right palm, Left ankle, Forearm"
                required
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-slate-900"
              />
            </div>
          </div>

          {/* Pain Scale */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Current Pain Level:</span>
              <span className="font-bold text-slate-900 font-mono">{painLevel} / 10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={painLevel}
              onChange={(e) => setPainLevel(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0 (None)</span>
              <span>5 (Moderate)</span>
              <span>10 (Severe)</span>
            </div>
          </div>

          {/* Clinical Checkboxes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Check any symptoms observed today:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { key: 'swelling', label: 'Visible Swelling' },
                { key: 'heat', label: 'Skin Feels Hot to Touch' },
                { key: 'rednessSpreading', label: 'Redness Spreading Outward' },
                { key: 'pusDischarge', label: 'Yellow/Cloudy Pus' },
                { key: 'fever', label: 'Systemic Fever / Chills' },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 cursor-pointer hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={(signs as any)[item.key]}
                    onChange={(e) => setSigns({ ...signs, [item.key]: e.target.checked })}
                    className="rounded text-slate-900 focus:ring-slate-900"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Care notes & dressing changes:
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Bandage changed after shower, wound bed is pink and dry, iced ankle for 20 mins..."
              rows={2}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-slate-900 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
            >
              Save Check-in
            </button>
          </div>
        </form>
      )}

      {/* Log History */}
      <div className="p-4 sm:p-6">
        {logs.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            No injury entries logged yet. Click "Log Daily Check-in" above to monitor an injury.
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => {
              const status = calculateStatus(log);
              const formattedDate = new Date(log.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={log.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formattedDate}</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{log.bodyLocation}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                        {log.injuryType}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${status.badgeClass}`}>
                        {status.label}
                      </span>
                      <button
                        onClick={() => handleDelete(log.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        title="Delete log entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {log.notes}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span>Pain: <strong className="text-slate-900 font-mono">{log.painLevel}/10</strong></span>
                      {log.signs.pusDischarge && <span className="text-rose-600 font-medium">Pus present</span>}
                      {log.signs.rednessSpreading && <span className="text-rose-600 font-medium">Redness spreading</span>}
                    </div>

                    <span className="text-[11px] text-slate-500 italic">
                      {status.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
