import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play, Pause, RotateCcw, Volume2, CheckCircle2, Clock } from 'lucide-react';
import { playChime } from '../utils/audio';

export interface TimerConfig {
  id: string;
  name: string;
  category: string;
  durationSec: number;
  tip: string;
}

export const PRESET_TIMERS: TimerConfig[] = [
  {
    id: 'pressure',
    name: 'Direct Pressure on Cut',
    category: 'Cuts & Bleeding',
    durationSec: 600, // 10 min
    tip: 'Press firmly with sterile gauze or clean cloth. Do NOT lift the cloth to peek during the 10 minutes.'
  },
  {
    id: 'burn',
    name: 'Cool Water Burn Flush',
    category: 'Burns & Scalds',
    durationSec: 900, // 15 min
    tip: 'Keep gentle, cool tap water flowing continuously over the burn. Never use ice or icy water.'
  },
  {
    id: 'ice',
    name: 'Cold Pack Interval (Ice On)',
    category: 'Sprains & Bruises',
    durationSec: 900, // 15 min
    tip: 'Keep ice pack wrapped in a thin towel. Rest for 30 minutes after this cycle before re-applying.'
  },
  {
    id: 'nosebleed',
    name: 'Continuous Nostril Pinch',
    category: 'Nosebleeds',
    durationSec: 600, // 10 min
    tip: 'Lean slightly forward and pinch the soft fleshy part of both nostrils firmly. Breathe through mouth.'
  },
  {
    id: 'eyewash',
    name: 'Gentle Saline Eye Flush',
    category: 'Eye Irritants',
    durationSec: 900, // 15 min
    tip: 'Flush with saline or clean water from inner corner outward. Blink frequently while flushing.'
  }
];

interface InteractiveTimerWidgetProps {
  initialTimerId?: string;
}

export const InteractiveTimerWidget: React.FC<InteractiveTimerWidgetProps> = ({ initialTimerId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPreset = searchParams.get('preset');
  const [selectedTimerId, setSelectedTimerId] = useState<string>(queryPreset || initialTimerId || 'pressure');

  useEffect(() => {
    if (queryPreset) {
      setSelectedTimerId(queryPreset);
    }
  }, [queryPreset]);
  const activePreset = PRESET_TIMERS.find(t => t.id === selectedTimerId) || PRESET_TIMERS[0];

  const [timeLeft, setTimeLeft] = useState<number>(activePreset.durationSec);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // When preset changes
  useEffect(() => {
    if (initialTimerId) {
      setSelectedTimerId(initialTimerId);
    }
  }, [initialTimerId]);

  useEffect(() => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeft(activePreset.durationSec);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [selectedTimerId]);

  // Countdown effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setIsCompleted(true);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const toggleRun = () => {
    if (isCompleted) {
      setTimeLeft(activePreset.durationSec);
      setIsCompleted(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeft(activePreset.durationSec);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = ((activePreset.durationSec - timeLeft) / activePreset.durationSec) * 100;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-700" />
            <span>First Aid Procedure Timers</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Timing direct pressure, cooling flushes, and ice intervals accurately is clinically critical for recovery.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {PRESET_TIMERS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedTimerId(preset.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedTimerId === preset.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {preset.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col items-center justify-center bg-slate-50/50">
        <div className="text-center max-w-md mb-6">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{activePreset.category}</span>
          <h3 className="text-lg font-bold text-slate-900 mt-0.5">{activePreset.name}</h3>
          <p className="text-xs text-slate-600 mt-2 bg-amber-50/80 border border-amber-200/80 rounded-lg p-2.5 leading-relaxed">
            {activePreset.tip}
          </p>
        </div>

        {/* Big circular or bar timer */}
        <div className="relative w-48 h-48 flex items-center justify-center my-2">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="84"
              stroke="#e2e8f0"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="96"
              cy="96"
              r="84"
              stroke={isCompleted ? '#10b981' : isRunning ? '#0284c7' : '#64748b'}
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 84}
              strokeDashoffset={2 * Math.PI * 84 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-500 ease-linear"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            {isCompleted ? (
              <div className="flex flex-col items-center text-emerald-600 animate-in zoom-in-95">
                <CheckCircle2 className="w-10 h-10 mb-1" />
                <span className="text-sm font-bold">Time Complete</span>
                <span className="text-xs text-slate-500 mt-0.5">Check wound gently</span>
              </div>
            ) : (
              <>
                <div className="text-4xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <span className="text-xs text-slate-500 font-medium mt-1">
                  {isRunning ? 'Counting down...' : 'Paused'}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={resetTimer}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-2xs focus-visible:ring-2 focus-visible:ring-slate-400"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleRun}
            className={`min-w-36 h-12 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] ${
              isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : isRunning
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isCompleted ? (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>Restart</span>
              </>
            ) : isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Start Timer</span>
              </>
            )}
          </button>

          <button
            onClick={playChime}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-2xs"
            title="Test Sound Chime"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
