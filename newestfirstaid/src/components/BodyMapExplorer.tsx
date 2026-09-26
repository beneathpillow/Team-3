import React, { useState } from 'react';
import { FIRST_AID_PROTOCOLS, FirstAidProtocol } from '../data/protocols';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface BodyMapExplorerProps {
  onSelectProtocol: (protocol: FirstAidProtocol) => void;
}

interface RegionInfo {
  id: string;
  name: string;
  description: string;
  commonInjuries: string;
}

const BODY_REGIONS: RegionInfo[] = [
  { id: 'hands', name: 'Hands & Fingers', description: 'Kitchen cuts, steam burns, splinters, paper cuts, finger jams', commonInjuries: 'Lacerations, thermal scalds, foreign body slivers' },
  { id: 'head', name: 'Head, Face & Eyes', description: 'Nosebleeds, dust/debris in eyes, lip lacerations, minor scalp scrapes', commonInjuries: 'Epistaxis, corneal foreign body, facial abrasion' },
  { id: 'feet', name: 'Feet & Ankles', description: 'Rolled/twisted ankles, friction blisters from shoes, stepped on glass/thorns', commonInjuries: 'Lateral ligament sprains, blisters, puncture shards' },
  { id: 'arms', name: 'Arms & Elbows', description: 'Scrapes from falls, oven burns on forearm, insect stings, tennis elbow strain', commonInjuries: 'Road rash/abrasions, contact burns, bee stings' },
  { id: 'legs', name: 'Legs & Knees', description: 'Skinned knees, shin contusions, gravel abrasions, calf muscle cramps', commonInjuries: 'Bicycle scrapes, contusions, muscle strains' },
  { id: 'torso', name: 'Torso & Back', description: 'Insect bites, minor rib contusions, mild sunburn, surface scratches', commonInjuries: 'Contact dermatitis, bug bites, superficial abrasions' }
];

export const BodyMapExplorer: React.FC<BodyMapExplorerProps> = ({ onSelectProtocol }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('hands');

  const filteredProtocols = FIRST_AID_PROTOCOLS.filter((p) =>
    p.bodyRegions.includes(selectedRegion)
  );

  const activeRegion = BODY_REGIONS.find((r) => r.id === selectedRegion) || BODY_REGIONS[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-4 sm:p-6 border-b border-slate-100">
        <h2 className="text-base font-semibold text-slate-900">Anatomical Injury Navigator</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Select where the injury occurred on the body to see targeted clinical protocols and first aid recommendations.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        {/* Left Side: Body Region Grid / Visual Selector */}
        <div className="lg:col-span-5 p-4 sm:p-6 bg-slate-50/50">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Select Injured Body Area
          </div>

          <div className="space-y-1.5">
            {BODY_REGIONS.map((region) => {
              const isSelected = selectedRegion === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold flex items-center gap-2">
                      <span>{region.name}</span>
                    </div>
                    <div className={`text-xs mt-0.5 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {region.commonInjuries}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-white' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                </button>
              );
            })}
          </div>

          {/* Quick anatomical advisory note */}
          <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/60 rounded-lg text-xs text-amber-900 leading-relaxed">
            <span className="font-semibold text-amber-950">Anatomy Safety Note:</span> Injuries to the face, hands, and feet contain high concentrations of delicate nerves and tendons. Always verify full sensation and range of motion.
          </div>
        </div>

        {/* Right Side: Protocols for this region */}
        <div className="lg:col-span-7 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-xs text-slate-500">Selected Location:</span>
              <h3 className="text-base font-bold text-slate-900">{activeRegion.name}</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded">
              {filteredProtocols.length} {filteredProtocols.length === 1 ? 'Protocol' : 'Protocols'}
            </span>
          </div>

          <div className="space-y-3">
            {filteredProtocols.map((protocol) => (
              <div
                key={protocol.id}
                onClick={() => onSelectProtocol(protocol)}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs bg-white cursor-pointer transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-medium text-slate-700 capitalize">{protocol.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{protocol.severity}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-rose-700 transition-colors">
                      {protocol.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {protocol.shortDesc}
                    </p>
                  </div>

                  <span className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-slate-700 truncate max-w-[280px]">
                    Priority: {protocol.primaryAction}
                  </span>
                  <span className="text-rose-600 font-medium group-hover:underline">
                    View Steps →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
