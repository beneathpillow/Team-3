import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, Phone } from 'lucide-react';

interface EmergencyBannerProps {
  onOpenEmergency: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onOpenEmergency }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const redFlags = [
    'Bleeding that spurts, pulses, or will not stop after 10–15 minutes of firm, direct pressure',
    'Deep, gaping wound edges, exposed yellow fat tissue, tendon, or bone',
    'Severe burn larger than the palm of your hand, or involving the face, hands, groin, or major joint',
    'Sudden difficulty breathing, wheezing, swelling of tongue or throat (Anaphylaxis)',
    'High-voltage electrical shock or chemical splashes into the eyes or on skin',
    'Head injury followed by loss of consciousness, repeated vomiting, or acute confusion'
  ];

  return (
    <div className="bg-amber-50/90 border-b border-amber-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-amber-200/80 text-amber-800">
              <AlertTriangle className="w-3.5 h-3.5" />
            </span>
            <div className="text-xs text-amber-900 leading-snug">
              <span className="font-semibold text-amber-950">Is this a critical emergency?</span>
              <span className="hidden sm:inline"> For minor home injuries, follow the guides below. If you notice severe red flags, call dispatch.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-amber-800 hover:text-amber-950 font-medium flex items-center gap-1 underline underline-offset-2 py-1 px-1.5"
            >
              <span>{isExpanded ? 'Hide Red Flags' : 'Check Red Flags'}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <button
              onClick={onOpenEmergency}
              className="px-2.5 py-1 text-xs font-semibold text-rose-700 bg-white border border-rose-300 rounded shadow-2xs hover:bg-rose-50 flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>Call 111 Dispatch</span>
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-amber-200/60 grid sm:grid-cols-2 gap-2 text-xs text-amber-950 animate-in fade-in duration-150">
            {redFlags.map((flag, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold shrink-0">•</span>
                <span>{flag}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
