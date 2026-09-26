import React from 'react';
import { EMERGENCY_NUMBERS } from '../data/protocols';
import { X, PhoneCall, ShieldAlert, MapPin, UserCheck, MessageSquare } from 'lucide-react';

interface EmergencyNumbersModalProps {
  onClose: () => void;
}

export const EmergencyNumbersModal: React.FC<EmergencyNumbersModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-rose-600 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-rose-700 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-white" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Emergency Medical Dispatch</h2>
              <p className="text-xs text-rose-100">Direct dial emergency hotlines by country and region</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-rose-700 hover:bg-rose-800 text-white flex items-center justify-center transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Country Cards */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Select Your Region for Instant Dial:
            </h3>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {EMERGENCY_NUMBERS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between gap-2"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.region}</div>
                    <div className="text-[11px] text-slate-500">{item.desc}</div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`tel:${item.police_med}`}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call {item.police_med}</span>
                    </a>

                    {item.poisonControl && (
                      <a
                        href={`tel:${item.poisonControl}`}
                        className="py-1.5 px-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors"
                        title="Poison Control Hotline"
                      >
                        Poison: {item.poisonControl}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calm Dispatch Checklist */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-slate-700" />
              <span>What to Tell the Emergency Dispatcher Calmly:</span>
            </h3>

            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">1. Exact Location:</strong> House number, street name, apartment/unit number, nearest cross street or building landmark.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <UserCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">2. Person Condition:</strong> Is the person conscious? Are they breathing? Is there heavy bleeding?
                </div>
              </li>
              <li className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">3. Stay on the Line:</strong> Never hang up first. The dispatcher will give you immediate lifesaving instructions while ambulance is en route.
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
          >
            Close Emergency Panel
          </button>
        </div>
      </div>
    </div>
  );
};
