import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Search, CheckCircle2, AlertTriangle, Hospital, ShieldAlert, Sparkles } from 'lucide-react';

interface HealthcareFacility {
  id: string;
  name: string;
  type: 'urgent_care' | 'hospital_er' | 'pharmacy';
  address: string;
  city: string;
  distance: string;
  phone: string;
  hours: string;
  isOpen24Hours: boolean;
  services: string[];
  averageWait: string;
}

const SAMPLE_FACILITIES: HealthcareFacility[] = [
  {
    id: 'uc-1',
    name: 'City Health Walk-in Urgent Care',
    type: 'urgent_care',
    address: '420 Main St, Suite 100',
    city: 'Downtown Metro',
    distance: '0.8 miles away',
    phone: '(555) 234-5678',
    hours: '8:00 AM – 9:00 PM (Daily)',
    isOpen24Hours: false,
    services: ['Stitches & Wound Glue', 'Minor Burn Treatment', 'Digital X-Rays', 'Tetanus Boosters', 'Splinting'],
    averageWait: '~15-25 min'
  },
  {
    id: 'er-1',
    name: 'Central Memorial Hospital Emergency Dept',
    type: 'hospital_er',
    address: '800 Hospital Parkway',
    city: 'Medical Center',
    distance: '2.4 miles away',
    phone: '(555) 911-0000',
    hours: 'Open 24 Hours / 7 Days',
    isOpen24Hours: true,
    services: ['24/7 Trauma Care', 'Severe Hemorrhage Care', 'Major Burns', 'Emergency Surgery', 'Pediatric Emergency'],
    averageWait: '~45-60 min'
  },
  {
    id: 'uc-2',
    name: 'CareWell Express Urgent Care & X-Ray',
    type: 'urgent_care',
    address: '1540 Highland Ave',
    city: 'Westside Plaza',
    distance: '1.9 miles away',
    phone: '(555) 876-5432',
    hours: '7:30 AM – 10:00 PM',
    isOpen24Hours: false,
    services: ['Deep Wound Dressing', 'Foreign Object Extraction', 'Sprain Immobilization', 'Bite Disinfection'],
    averageWait: '~20 min'
  },
  {
    id: 'pharm-1',
    name: 'Walgreens 24-Hour Pharmacy & First Aid',
    type: 'pharmacy',
    address: '610 Broadway Ave',
    city: 'Midtown',
    distance: '0.5 miles away',
    phone: '(555) 345-6789',
    hours: 'Open 24 Hours',
    isOpen24Hours: true,
    services: ['Sterile Gauze & Dressings', 'Burn Gels & Hydrocolloids', 'Antiseptic Washes', 'Over-The-Counter Pain Relief'],
    averageWait: 'Walk-in'
  },
  {
    id: 'uc-3',
    name: 'Summit Community Urgent Care',
    type: 'urgent_care',
    address: '2200 River Rd',
    city: 'North Suburbs',
    distance: '3.5 miles away',
    phone: '(555) 432-1098',
    hours: '8:00 AM – 8:00 PM',
    isOpen24Hours: false,
    services: ['Laceration Repair', 'Minor Head Scrapes', 'Allergy & Insect Stings', 'Prescriptions'],
    averageWait: '~15 min'
  },
  {
    id: 'er-2',
    name: 'St. Jude Regional Trauma & Emergency Center',
    type: 'hospital_er',
    address: '1100 University Blvd',
    city: 'East Metro',
    distance: '4.2 miles away',
    phone: '(555) 987-1234',
    hours: 'Open 24 Hours / 7 Days',
    isOpen24Hours: true,
    services: ['Level 1 Trauma', 'Arterial Bleeding Care', 'Complex Fractures', 'Comprehensive Intensive Care'],
    averageWait: '~50 min'
  }
];

export const HealthcareCentersPage: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationStatus('Detecting your location...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setLocationStatus(`Showing healthcare centers nearest to your coordinates (${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)})`);
        setSearchLocation('Current Location');
      },
      (error) => {
        setIsLocating(false);
        setLocationStatus('Location access was denied. You can search by city or zip code manually.');
      },
      { timeout: 8000 }
    );
  };

  const filteredFacilities = SAMPLE_FACILITIES.filter((fac) => {
    const matchesType = selectedType === 'all' || fac.type === selectedType;
    const matchesSearch =
      searchLocation === '' ||
      fac.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
      fac.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
      fac.address.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-in fade-in duration-150">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
          <Hospital className="w-4 h-4" />
          <span>Local Medical Facility Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Healthcare Centers & Walk-in Clinics
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Locate nearby urgent care clinics, 24/7 hospital emergency rooms, and late-night pharmacies when home first-aid needs professional clinical support.
        </p>
      </div>

      {/* Decision Guide: Urgent Care vs Emergency Room */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span>Where Should You Go? Urgent Care vs. Emergency Room (ER)</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <h3 className="text-sm font-bold text-slate-900">Walk-in Urgent Care</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Best for minor to moderate injuries that need prompt professional treatment today, with shorter wait times and lower cost:
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Cuts needing stitches or surgical glue (gap &gt; 0.5 cm)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Twisted ankles, wrists, and joint sprains needing X-rays</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Minor 2nd-degree burns with intact blisters</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Tetanus booster shots after dirty puncture wounds</span>
              </li>
            </ul>
          </div>

          <div className="p-4 sm:p-5 space-y-2 bg-rose-50/20">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600"></span>
              <h3 className="text-sm font-bold text-slate-900">Emergency Room (ER) or 911</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              For severe, life-threatening injuries or trauma requiring specialized acute emergency equipment:
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-1">
              <li className="flex items-start gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>Uncontrolled, spurting, or heavy arterial bleeding</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>Burns covering large areas (&gt; 3 inches), face, or joints</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>Visible bone through skin or crooked joint deformity</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>Head injury with fainting, vomiting, or acute confusion</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Search by city, clinic name, or street..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <button
            onClick={handleUseLocation}
            disabled={isLocating}
            className="px-3.5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            <Navigation className="w-3.5 h-3.5 text-slate-700" />
            <span>{isLocating ? 'Locating...' : 'Use My Location'}</span>
          </button>
        </div>

        {locationStatus && (
          <div className="text-[11px] text-slate-500 italic">
            {locationStatus}
          </div>
        )}

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-100">
          {[
            { id: 'all', label: 'All Centers' },
            { id: 'urgent_care', label: 'Walk-in Urgent Care' },
            { id: 'hospital_er', label: 'Hospital Emergency Rooms (24/7)' },
            { id: 'pharmacy', label: 'Late-Night Pharmacies' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedType === type.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Facility Results List */}
      <div className="space-y-3.5">
        {filteredFacilities.map((fac) => (
          <div
            key={fac.id}
            className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`font-semibold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded ${
                    fac.type === 'hospital_er'
                      ? 'bg-rose-100 text-rose-800'
                      : fac.type === 'urgent_care'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {fac.type === 'hospital_er' ? 'Hospital ER' : fac.type === 'urgent_care' ? 'Urgent Care' : 'Pharmacy'}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 font-medium">{fac.distance}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 font-mono">Est. wait: {fac.averageWait}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {fac.name}
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{fac.address}, {fac.city}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className={fac.isOpen24Hours ? 'text-emerald-700 font-semibold' : ''}>
                    {fac.hours}
                  </span>
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {fac.services.map((svc, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions: Call & Directions */}
            <div className="flex sm:flex-col items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <a
                href={`tel:${fac.phone.replace(/[^0-9]/g, '')}`}
                className="flex-1 sm:w-36 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Center</span>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fac.name + ' ' + fac.address + ' ' + fac.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:w-36 py-2 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-slate-500" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Call Box */}
      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold">Life-Threatening Emergency?</span> Do not drive yourself to a center if experiencing severe bleeding, loss of consciousness, or anaphylaxis.
          </div>
        </div>

        <a
          href="tel:911"
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-xs"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call 911 Immediately</span>
        </a>
      </div>
    </div>
  );
};
