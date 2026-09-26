import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  AlertTriangle,
  HeartPulse,
  Activity,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  MapPin,
  ArrowRight,
  MessageCircle,
  Info
} from 'lucide-react';

interface EmergencySituation {
  title: string;
  badge: string;
  description: string;
  examples: string[];
}

const EMERGENCY_SITUATIONS: EmergencySituation[] = [
  {
    title: 'Breathing Emergencies & Choking',
    badge: 'Immediate 111',
    description: 'Any situation where the person cannot get enough air or their airway is blocked.',
    examples: [
      'Choking and unable to speak, cry, or cough forcefully',
      'Gasping for breath, struggling to inhale, or severe wheezing',
      'Lips, tongue, or fingertips turning pale, blue, or grey',
      'Severe asthma attack not improving after reliever inhaler'
    ]
  },
  {
    title: 'Chest Pain & Suspected Heart Attack',
    badge: 'Immediate 111',
    description: 'Pressure, tightness, or pain in the chest can be life-threatening.',
    examples: [
      'Crushing, heavy, or squeezing chest pain or pressure',
      'Pain spreading to the jaw, neck, back, stomach, or one or both arms',
      'Chest discomfort combined with shortness of breath, dizziness, or cold sweating',
      'Sudden collapse or cardiac arrest'
    ]
  },
  {
    title: 'Stroke Symptoms (FAST Test)',
    badge: 'Immediate 111',
    description: 'Minutes matter in stroke. Check the FAST signs right now:',
    examples: [
      'Face: Has their mouth or eye drooped on one side? Can they smile evenly?',
      'Arms: Can they raise both arms and keep them up?',
      'Speech: Is their speech slurred or strange? Do they understand you?',
      'Time: If you see ANY of these signs, call 111 immediately!'
    ]
  },
  {
    title: 'Unconsciousness, Fainting & Seizures',
    badge: 'Immediate 111',
    description: 'Changes in alertness or ability to respond are medical emergencies.',
    examples: [
      'Person is unresponsive or cannot be woken up',
      'Active convulsion or seizure lasting longer than 5 minutes, or first-time seizure',
      'Severe confusion, sudden delirium, or altered mental state',
      'Head injury followed by loss of consciousness or repeated vomiting'
    ]
  },
  {
    title: 'Heavy or Uncontrolled Bleeding',
    badge: 'Immediate 111',
    description: 'Loss of blood can rapidly lead to hypovolemic shock.',
    examples: [
      'Blood spurting or pulsing rapidly from a wound',
      'Bleeding that does not stop after 10 minutes of direct, continuous firm pressure',
      'Deep stab wounds or major lacerations with visible muscle or bone',
      'Coughing up or vomiting large amounts of blood'
    ]
  },
  {
    title: 'Severe Allergic Reaction (Anaphylaxis)',
    badge: 'Immediate 111',
    description: 'A life-threatening systemic immune response.',
    examples: [
      'Swelling of the lips, tongue, throat, or mouth causing breathing difficulty',
      'Sudden lightheadedness, weakness, or collapse after food, medication, or sting',
      'Hoarse voice, persistent cough, or feeling of throat closing',
      'Administer auto-injector (EpiPen) if available, then call 111 immediately'
    ]
  },
  {
    title: 'Severe Burns & Chemical Exposures',
    badge: 'Immediate 111',
    description: 'High-risk burns requiring specialized hospital treatment.',
    examples: [
      'Burns larger than the person\'s palm or full-thickness (charred/white) burns',
      'Any burns affecting the face, neck, airway, hands, groin, or major joints',
      'Electrical burns (including shocks from mains power)',
      'Chemical burns to the eyes or widespread on the body'
    ]
  },
  {
    title: 'Severe Trauma, Falls & Suspected Spinal Injuries',
    badge: 'Immediate 111',
    description: 'High-impact injuries where moving the patient could cause irreversible harm.',
    examples: [
      'Fall from a height greater than 1 meter (or 2-3 times patient height)',
      'High-speed motor vehicle or bicycle collision',
      'Numbness, tingling, or inability to move arms or legs after impact',
      'Deformed limbs with bone protruding through the skin (open fracture)'
    ]
  }
];

export const ShouldICall111Page: React.FC = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<Record<string, boolean>>({
    unconscious: false,
    breathing: false,
    chestPain: false,
    stroke: false,
    bleeding: false,
    anaphylaxis: false
  });

  const toggleQuestion = (key: string) => {
    setSelectedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const hasAnyYes = Object.values(selectedQuestions).some(v => v);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-150">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Link to="/home" className="hover:text-slate-900 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Should I Call 111?</span>
        </div>

        <Link
          to="/injuries"
          className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
        >
          <span>Minor injury? View protocols →</span>
        </Link>
      </div>

      {/* Primary Emergency Banner */}
      <div className="bg-rose-600 text-white rounded-2xl p-5 sm:p-7 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-700 text-white text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>New Zealand Emergency Dispatch</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Should I Call 111?
          </h1>
          <p className="text-rose-100 text-xs sm:text-sm font-medium max-w-xl leading-relaxed">
            If a person's life or health is in immediate danger, or if you are ever in doubt, <strong>call 111 immediately</strong>. Emergency dispatchers are trained to evaluate the situation and send the appropriate help.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
          <a
            href="tel:111"
            className="py-3.5 px-6 rounded-xl bg-white hover:bg-rose-50 text-rose-700 text-base font-black flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95 text-center"
          >
            <PhoneCall className="w-5 h-5 text-rose-600 fill-rose-600" />
            <span>Call 111 Now</span>
          </a>
          <span className="text-[11px] text-rose-200 text-center">
            Free from any phone or mobile
          </span>
        </div>
      </div>

      {/* Quick Interactive Triage Helper */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-rose-600" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Quick Check: Is Anyone Experiencing These?
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Tap any signs that apply right now:
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {[
            { id: 'unconscious', label: 'Unconscious or unresponsive' },
            { id: 'breathing', label: 'Struggling to breathe or choking' },
            { id: 'chestPain', label: 'Severe chest pain / pressure' },
            { id: 'stroke', label: 'Face drooping / slurred speech' },
            { id: 'bleeding', label: 'Heavy bleeding that won\'t stop' },
            { id: 'anaphylaxis', label: 'Swelling of throat or severe reaction' }
          ].map(item => {
            const isChecked = selectedQuestions[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleQuestion(item.id)}
                className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-rose-50 border-rose-600 text-rose-900 ring-2 ring-rose-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>{item.label}</span>
                {isChecked ? (
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {hasAnyYes && (
          <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-500 text-rose-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-sm text-rose-900 block">
                  You selected one or more emergency warning signs!
                </span>
                <span className="text-xs text-rose-800">
                  Do not wait to see if things improve. Call 111 right away.
                </span>
              </div>
            </div>

            <a
              href="tel:111"
              className="py-2 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 self-end sm:self-auto transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 111</span>
            </a>
          </div>
        )}
      </div>

      {/* Emergency Situations List */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Emergency Situations: When You Must Call 111
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            The following conditions require urgent emergency ambulance dispatch:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {EMERGENCY_SITUATIONS.map((sit, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {sit.title}
                </h3>
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold tracking-wide uppercase shrink-0">
                  {sit.badge}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {sit.description}
              </p>

              <ul className="space-y-1.5 pt-1 border-t border-slate-100">
                {sit.examples.map((example, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* What Happens When You Call 111 */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-rose-300 text-[11px] font-bold uppercase tracking-wider mb-1">
            <Clock className="w-3 h-3 text-rose-400" />
            <span>Calm & Prepared</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            What Happens When You Call 111?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Knowing what to expect can help you stay calm and get help as fast as possible:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1.5">
            <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
              <span>Step 1: Choose Your Service</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The first voice you hear will ask: <strong>"Police, Fire, or Ambulance?"</strong> Reply clearly with <strong>"Ambulance"</strong>.
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1.5">
            <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
              <span>Step 2: State Your Location</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Give your street address, house number, suburb, or nearby landmarks. Knowing where to send help is their #1 priority.
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1.5">
            <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
              <span>Step 3: Answer Priority Questions</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The dispatcher will ask if the person is awake and if they are breathing. While you are speaking, <em>the ambulance is already being dispatched</em>.
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1.5">
            <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
              <span>Step 4: Stay on the Line</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Do not hang up.</strong> The call taker will guide you through immediate first-aid steps (like CPR or pressure) until paramedics arrive.
            </p>
          </div>
        </div>
      </div>

      {/* When NOT to Call 111 (Non-Emergency Alternatives in NZ) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-slate-700" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            When NOT to Call 111 (Non-Emergency Options)
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          If the situation is <strong>not</strong> an immediate threat to life, limb, or eyesight, using alternative health services helps keep emergency ambulances available for critical patients:
        </p>

        <div className="grid sm:grid-cols-3 gap-3 pt-1">
          {/* Healthline NZ */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">Healthline (New Zealand)</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Free 24/7 registered nurse triage & advice</div>
            </div>
            <a
              href="tel:0800611116"
              className="py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>0800 611 116</span>
            </a>
          </div>

          {/* National Poisons Centre */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">National Poisons Centre</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Free 24/7 toxic exposure advice</div>
            </div>
            <a
              href="tel:0800764766"
              className="py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>0800 764 766</span>
            </a>
          </div>

          {/* Minor Injuries & Self Care */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">Minor Injuries & First Aid</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Cuts, small burns, mild sprains & bruises</div>
            </div>
            <Link
              to="/injuries"
              className="py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View First Aid Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Still Not Sure? Chat with AI Agent */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">
              Still not sure if you should seek care?
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Describe the situation to the AI First Aid Agent for rapid clinical advice and red-flag checking.
            </p>
          </div>
        </div>

        <Link
          to="/ai"
          className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors"
        >
          <span>Ask AI Agent</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* International Callers Footnote */}
      <div className="text-center text-[11px] text-slate-400 pt-2">
        International Emergency Numbers: United States & Canada: <strong>911</strong> · United Kingdom: <strong>999</strong> · European Union: <strong>112</strong> · Australia: <strong>000</strong> · New Zealand: <strong>111</strong>
      </div>
    </div>
  );
};
