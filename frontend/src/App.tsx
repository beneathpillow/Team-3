/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { ProtocolsList } from './components/ProtocolsList';
import { AiAgentPage } from './components/AiAgentPage';
import { SmallInjuriesPage } from './components/SmallInjuriesPage';
import { IDontKnowWhatHappenedPage } from './components/IDontKnowWhatHappenedPage';
import { HealthcareCentersPage } from './components/HealthcareCentersPage';
import { EmergencyNumbersModal } from './components/EmergencyNumbersModal';
import { ShouldICall111Page } from './components/ShouldICall111Page';

function AppContent() {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-rose-100 selection:text-rose-900">
      {/* Universal Top Header */}
      <Header onOpenEmergency={() => setIsEmergencyModalOpen(true)} />

      {/* Main Routed Content Area */}
      <main className="flex-1 w-full">
        <Routes>
          {/* Home Landing Page (Full hero image, 2 options to ask help, about service, AI preview) */}
          <Route path="/" element={<ProtocolsList />} />
          <Route path="/home" element={<ProtocolsList />} />

          {/* Unified Page: I Know What Happened & Small Injuries */}
          <Route path="/injuries" element={<SmallInjuriesPage />} />
          <Route path="/i-know-what-happened" element={<SmallInjuriesPage />} />
          <Route path="/know" element={<SmallInjuriesPage />} />

          {/* Option 2: I Don't Know What Happened / What You See & Feel */}
          <Route path="/i-dont-know-what-happened" element={<IDontKnowWhatHappenedPage />} />
          <Route path="/symptoms" element={<IDontKnowWhatHappenedPage />} />

          {/* Dedicated AI First Aid Agent Page */}
          <Route path="/ai" element={<AiAgentPage />} />

          {/* Should I Call 111 Emergency Guide Page */}
          <Route path="/111" element={<ShouldICall111Page />} />
          <Route path="/should-i-call-111" element={<ShouldICall111Page />} />

          {/* Healthcare Centers Directory Page */}
          <Route path="/healthcare" element={<HealthcareCentersPage />} />

          {/* Fallback Catch-all -> Redirect to /home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      {/* Simple, Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-slate-400 text-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Keep It Simple</span>
            <span>· Guidance for minor everyday household injuries.</span>
          </div>
          <div className="text-[11px] text-slate-400">
            For informational first-aid reference only. In acute life-threatening emergencies, dial 911 immediately.
          </div>
        </div>
      </footer>

      {/* Emergency Dispatch Numbers Modal */}
      {isEmergencyModalOpen && (
        <EmergencyNumbersModal
          onClose={() => setIsEmergencyModalOpen(false)}
        />
      )}
    </div>
  );
}

export default function App() {
    console.log("🔥🔥🔥 NEW APP.TSX IS RUNNING 🔥🔥🔥");

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
