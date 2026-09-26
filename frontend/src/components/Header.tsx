import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';

interface HeaderProps {
  onOpenEmergency: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEmergency }) => {
  const location = useLocation();

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/111', label: 'Call 111?' },
    { to: '/injuries', label: 'Injuries' },
    { to: '/i-dont-know-what-happened', label: 'Find What Happened' },
    { to: '/ai', label: 'AI Agent' },
    { to: '/healthcare', label: 'Healthcare Centers' },
  ];

  const isCurrent = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark - No Panicking */}
        <Link
          to="/home"
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded shrink-0"
        >
          <span className="w-6 h-6 rounded-md bg-rose-600 text-white font-extrabold flex items-center justify-center text-sm leading-none">
            +
          </span>
          <span className="inline font-black tracking-tight">No Panicking</span>
        </Link>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const active = isCurrent(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors py-1 whitespace-nowrap ${
                  active
                    ? 'text-slate-900 font-bold border-b-2 border-slate-900 -mb-[2px]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary emergency action */}
        <div className="flex items-center">
          <button
            onClick={onOpenEmergency}
            className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Emergency</span> 111 / 911
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Navigation Scroller */}
      <div className="md:hidden flex items-center gap-1 px-3 py-2 overflow-x-auto no-scrollbar border-t border-slate-100 bg-slate-50">
        {navLinks.map((link) => {
          const active = isCurrent(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1 text-xs font-medium whitespace-nowrap rounded-md transition-colors ${
                active
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
};
