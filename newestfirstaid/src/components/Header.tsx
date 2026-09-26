import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PhoneCall, MoreVertical } from 'lucide-react';

interface HeaderProps {
  onOpenEmergency: () => void;
}

type TextSize = 'normal' | 'large' | 'xlarge';

export const Header: React.FC<HeaderProps> = ({ onOpenEmergency }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>(() => {
    return (localStorage.getItem('nop_text_size') as TextSize) || 'normal';
  });

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    root.classList.add(`text-size-${textSize}`);
    localStorage.setItem('nop_text_size', textSize);
  }, [textSize]);

  const cycleTextSize = () => {
    setTextSize((prev) => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'xlarge';
      return 'normal';
    });
  };

  const navLinks = [
    { to: '/home', label: 'Home', shortLabel: 'Home' },
    { to: '/111', label: 'Call 111?', shortLabel: 'Call 111?' },
    { to: '/i-dont-know-what-happened', label: "Don't Know What Happened", shortLabel: "Don't Know" },
    { to: '/injuries', label: 'Know What Happened', shortLabel: 'Injury Guide' },
    { to: '/healthcare', label: 'Healthcare Centers', shortLabel: 'Healthcare' },
  ];

  const isCurrent = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Zone 1: Wordmark & Mobile Menu Trigger (Mobile & Tablet: <lg) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile 3-Dots Button (Only below lg: lg:hidden) */}
          <div className="relative lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Open navigation menu"
              className="p-2 -ml-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer"
            >
              <MoreVertical className="w-5 h-5 text-slate-800" />
            </button>

            {/* Dropdown Menu for Mobile/Tablet */}
            {isMobileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[1px]"
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                <div className="absolute left-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Navigation Tabs
                  </div>
                  <nav className="py-1">
                    {navLinks.map((link) => {
                      const active = isCurrent(link.to);
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors ${
                            active
                              ? 'bg-rose-50 text-rose-700 font-bold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <span>{link.label}</span>
                          {active && (
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
                          )}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </>
            )}
          </div>

          {/* Wordmark logo */}
          <Link
            to="/home"
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded shrink-0"
          >
            <span className="w-7 h-7 rounded-lg bg-rose-600 text-white font-black flex items-center justify-center text-base leading-none shrink-0 shadow-2xs">
              +
            </span>
            <span className="inline font-black tracking-tight whitespace-nowrap">No Panic</span>
          </Link>
        </div>

        {/* Zone 2: Navigation Tab Bar (Clean, non-overlapping pill tabs on laptop & desktop: lg and above) */}
        <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2.5 shrink min-w-0 overflow-x-auto no-scrollbar py-1">
          {navLinks.map((link) => {
            const active = isCurrent(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                title={link.label}
                className={`transition-all py-1.5 px-3 xl:px-3.5 rounded-lg whitespace-nowrap text-sm font-semibold shrink-0 ${
                  active
                    ? 'bg-slate-900 text-white font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {/* On large laptops, show neat short labels; on wider desktops, show full labels */}
                <span className="hidden xl:inline">{link.label}</span>
                <span className="xl:hidden">{link.shortLabel}</span>
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Font Size Switcher & Emergency Action */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Font Size Switcher Button - Letter A Only */}
          <button
            type="button"
            onClick={cycleTextSize}
            title={
              textSize === 'normal'
                ? 'Text size: Normal (Default). Click for Large.'
                : textSize === 'large'
                ? 'Text size: Large. Click for Largest.'
                : 'Text size: Largest. Click to return to Normal.'
            }
            aria-label="Adjust letter size"
            className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg border transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer shrink-0 select-none shadow-2xs ${
              textSize === 'normal'
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 font-bold text-xs sm:text-sm'
                : textSize === 'large'
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-900 border-slate-400 font-extrabold text-sm sm:text-base'
                : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900 font-black text-sm sm:text-base'
            }`}
          >
            A
          </button>

          {/* Emergency 111 Button */}
          <button
            onClick={onOpenEmergency}
            className="px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer shadow-2xs shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="hidden sm:inline">Emergency</span> 111
          </button>
        </div>
      </div>
    </header>
  );
};
