import React, { useState } from 'react';
import { FirstAidProtocol } from '../data/protocols';
import { X, Clock, AlertTriangle, ShieldAlert, CheckSquare, Square } from 'lucide-react';

interface ProtocolDetailModalProps {
  protocol: FirstAidProtocol;
  onClose: () => void;
  onStartTimer: (timerId: string) => void;
}

export const ProtocolDetailModal: React.FC<ProtocolDetailModalProps> = ({
  protocol,
  onClose,
  onStartTimer
}) => {
  const [checkedSupplies, setCheckedSupplies] = useState<Record<string, boolean>>({});
  const [imageError, setImageError] = useState(false);

  const toggleSupply = (supply: string) => {
    setCheckedSupplies((prev) => ({
      ...prev,
      [supply]: !prev[supply]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative bg-white w-full max-w-3xl rounded-2xl border border-slate-200 shadow-xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-4 bg-white sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
              <span className="font-semibold text-slate-700 capitalize">{protocol.category}</span>
              <span aria-hidden="true">·</span>
              <span>{protocol.severity}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {protocol.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Visual Header / Demonstration Photo */}
          {protocol.image && !imageError ? (
            <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={protocol.image}
                alt={protocol.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-4">
                <p className="text-white text-xs sm:text-sm font-medium leading-snug">
                  Priority: {protocol.primaryAction}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium flex items-center gap-2">
              <span className="font-bold text-rose-600">Immediate Action:</span>
              <span>{protocol.primaryAction}</span>
            </div>
          )}

          {/* Interactive Timer Callout if available */}
          {protocol.timer && (
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Recommended Procedure Timer</span>
                <h4 className="text-sm font-bold mt-0.5">{protocol.timer.label}</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-lg">{protocol.timer.instruction}</p>
              </div>
              <button
                onClick={() => {
                  onStartTimer(protocol.timer!.type);
                  onClose();
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-2xs transition-colors"
              >
                <Clock className="w-4 h-4" />
                <span>Launch Timer</span>
              </button>
            </div>
          )}

          {/* Supplies Checklist */}
          {protocol.suppliesNeeded && protocol.suppliesNeeded.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Supplies to Gather (Tap to check):
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {protocol.suppliesNeeded.map((supply, idx) => {
                  const isChecked = !!checkedSupplies[supply];
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleSupply(supply)}
                      className={`p-2 rounded-lg text-xs text-left flex items-start gap-2 border transition-all ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span className={isChecked ? 'line-through text-slate-500' : ''}>{supply}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Numbered Step-by-Step Instructions */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Step-by-Step Clinical Procedure:
            </h3>
            <div className="space-y-3">
              {protocol.steps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">{step.title}</span>
                  </h4>
                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                    {step.detail}
                  </p>
                  {step.warning && (
                    <div className="mt-2 text-xs text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                      {step.warning}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Red Flags & Do Nots */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
              <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>When to See a Doctor (Red Flags):</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-rose-900 leading-normal">
                {protocol.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold shrink-0">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>Common Harmful Mistakes (Do NOT):</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-900 leading-normal">
                {protocol.doNots.map((dont, idx) => (
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
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Followed clinical guidelines (Red Cross & Mayo Clinic)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
