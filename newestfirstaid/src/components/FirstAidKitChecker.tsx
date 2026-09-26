import React, { useState, useEffect } from 'react';
import { FIRST_AID_KIT_ITEMS } from '../data/protocols';
import { CheckCircle2, Circle, AlertCircle, ShoppingBag } from 'lucide-react';

const STORAGE_KEY = 'claraaid_kit_items_v1';

export const FirstAidKitChecker: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      } else {
        // Defaults: pre-check a few common household items
        const defaults: Record<string, boolean> = {
          gauze: true,
          bandages: true,
          tape: true,
          petroleum: true,
          scissors: true
        };
        setCheckedItems(defaults);
      }
    } catch (e) {
      console.warn('Failed to load kit data:', e);
    }
  }, []);

  const toggleItem = (id: string) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save kit data:', e);
    }
  };

  const categories = Array.from(new Set(FIRST_AID_KIT_ITEMS.map((item) => item.category)));

  const totalItems = FIRST_AID_KIT_ITEMS.length;
  const inStockCount = FIRST_AID_KIT_ITEMS.filter((item) => !!checkedItems[item.id]).length;
  const readinessPercent = Math.round((inStockCount / totalItems) * 100);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <ShoppingBag className="w-3.5 h-3.5 text-slate-700" />
            <span>Household & Workplace Preparedness</span>
          </div>
          <h2 className="text-base font-semibold text-slate-900">
            First Aid Kit Inventory & Readiness
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Check off what you have at home. Keep essential supplies stocked before accidents occur.
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 shrink-0 min-w-44">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span>Kit Readiness:</span>
            <span className="font-mono font-bold text-slate-900">{readinessPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                readinessPercent >= 80 ? 'bg-emerald-600' : readinessPercent >= 50 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>{inStockCount} of {totalItems} items in stock</span>
            <span>{totalItems - inStockCount} missing</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {categories.map((category) => {
          const items = FIRST_AID_KIT_ITEMS.filter((item) => item.category === category);
          return (
            <div key={category}>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                {category}
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {items.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                        isChecked
                          ? 'bg-emerald-50/60 border-emerald-300 text-slate-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className={`text-xs font-semibold ${isChecked ? 'text-emerald-950' : 'text-slate-800'}`}>
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {item.essential ? 'Essential core item' : 'Recommended addition'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Tip */}
        <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Expiration Date Reminder:</strong> Remember to check sterile packaging seals and expiry dates on saline washes, antibiotic ointments, and burn hydrogels at least once every 6 months.
          </span>
        </div>
      </div>
    </div>
  );
};
