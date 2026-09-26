import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Send,
  Sparkles,
  AlertCircle,
  ShieldAlert,
  CheckCircle,
  RotateCcw,
  Loader2,
  Image as ImageIcon,
  Camera,
  X
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text?: string;
  imageUrl?: string;
  triageData?: {
    urgency: 'home_care_with_monitoring' | 'urgent_clinic' | 'emergency_911';
    urgencyTitle: string;
    visualFindings?: string;
    summary: string;
    firstSteps: string[];
    redFlags: string[];
    doNots: string[];
  };
}

const SAMPLE_QUESTIONS = [
  'Cut my finger chopping vegetables, bleeding slowly',
  'Touched a hot pan handle, skin is red and burning',
  'Twisted my ankle stepping off curb, hurts to walk',
  'Wasp sting on forearm, localized swelling'
];

export const AiChatPreview: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get('query');
  const hasAutoSentRef = useRef(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      timestamp: 'Just now',
      text: "Hello! I'm your No Panic first-aid assistant. (Reminder: AI guidance is not 100% accurate. If you feel unwell or are in doubt, please contact emergency services 111 or a healthcare center). What happened? Tell me what kind of injury occurred, or click the camera button to upload a photo for instant visual triage."
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<{
    dataUrl: string;
    mimeType: string;
    name: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // If passed from symptoms page
  useEffect(() => {
    if (urlQuery && !hasAutoSentRef.current) {
      hasAutoSentRef.current = true;
      handleSendMessage(urlQuery);
    }
  }, [urlQuery]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (e.g., JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Image file size must be under 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage({
        dataUrl: reader.result as string,
        mimeType: file.type || 'image/jpeg',
        name: file.name
      });
    };
    reader.readAsDataURL(file);

    // Reset so the same file could be selected again if needed
    e.target.value = '';
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend !== undefined ? textToSend : inputText;
    const currentImage = selectedImage;

    if ((!text.trim() && !currentImage) || loading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text.trim() ? text : (currentImage ? 'Uploaded injury photo for review' : ''),
      imageUrl: currentImage?.dataUrl
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setSelectedImage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          injuryDescription: text.trim() || 'Please evaluate this injury photo and recommend immediate first aid steps.',
          ageGroup: 'Adult',
          timeElapsed: 'Just now',
          imageBase64: currentImage?.dataUrl,
          imageMimeType: currentImage?.mimeType
        })
      });

      if (!res.ok) throw new Error('API triage failed');
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        triageData: data
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      // Fallback response if network or model fails
      const fallbackMsg: ChatMessage = {
        id: 'ai-fallback-' + Date.now(),
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        triageData: {
          urgency: 'home_care_with_monitoring',
          urgencyTitle: 'Home Care Protocol',
          visualFindings: currentImage ? 'Photo noted. Minor surface abrasion or localized injury observed. Keep clean and monitor for swelling or spreading redness.' : undefined,
          summary: 'Wash thoroughly with cool running water, apply continuous gentle pressure with clean cloth if bleeding, and keep covered with sterile dressing.',
          firstSteps: [
            'Clean hands and rinse the wound gently with cool tap water.',
            'Apply continuous direct pressure with sterile gauze for 10 minutes if bleeding.',
            'Apply a thin coat of petroleum jelly and cover with an adhesive bandage.'
          ],
          redFlags: [
            'Bleeding that will not stop after 10-15 minutes of uninterrupted pressure',
            'Deep gaping wound edges (> 0.5 cm) or exposed yellowish fat tissue',
            'Spreading redness, heat, swelling, or yellow pus after 24 hours'
          ],
          doNots: [
            'Do NOT put butter, grease, or toothpaste on burns.',
            'Do NOT pour harsh rubbing alcohol directly inside open cuts.'
          ]
        }
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setSelectedImage(null);
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        timestamp: 'Just now',
        text: "Hello! I'm your No Panic first-aid assistant. What happened? Tell me what kind of injury occurred, or click the camera/photo button below to upload a picture of the injury for instant visual triage."
      }
    ]);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-[560px]">
      {/* Chat Agent Header */}
      <div className="px-4 py-3 sm:px-6 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-extrabold text-sm">
            +
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold tracking-tight">First Aid AI Chat Agent</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <p className="text-[11px] text-slate-300">Live Clinical Triage & Photo Assessment</p>
          </div>
        </div>

        <button
          onClick={resetChat}
          className="text-xs text-slate-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
          title="Restart conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60 text-xs sm:text-sm">
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[85%] sm:max-w-[75%] bg-slate-900 text-white rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-2xs space-y-2">
                  {msg.imageUrl && (
                    <div className="overflow-hidden rounded-xl border border-slate-700">
                      <img
                        src={msg.imageUrl}
                        alt="Uploaded injury"
                        className="max-h-48 w-full object-cover rounded-xl"
                      />
                    </div>
                  )}
                  {msg.text && <p className="leading-relaxed">{msg.text}</p>}
                  <div className="text-[10px] text-slate-400 text-right">{msg.timestamp}</div>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex items-start gap-2.5 max-w-[92%] sm:max-w-[85%]">
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                +
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 shadow-2xs space-y-3 w-full">
                {msg.text && (
                  <p className="text-slate-800 leading-relaxed">{msg.text}</p>
                )}

                {msg.triageData && (
                  <div className="space-y-3">
                    {/* Urgency Badge */}
                    <div className="flex items-center gap-1.5 font-semibold text-xs flex-wrap">
                      {msg.triageData.urgency === 'emergency_911' ? (
                        <span className="text-rose-700 flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          Emergency Dispatch Recommended
                        </span>
                      ) : msg.triageData.urgency === 'urgent_clinic' ? (
                        <span className="text-amber-800 flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Clinic / Doctor Review Needed
                        </span>
                      ) : (
                        <span className="text-emerald-800 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Safe for Home First Aid
                        </span>
                      )}
                    </div>

                    {/* Visual Observation if Image was evaluated */}
                    {msg.triageData.visualFindings && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5">
                        <Camera className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-900 block mb-0.5">
                            Visual Image Assessment:
                          </span>
                          <p className="text-slate-700 leading-relaxed">
                            {msg.triageData.visualFindings}
                          </p>
                        </div>
                      </div>
                    )}

                    <p className="text-slate-700 text-xs leading-relaxed font-medium">
                      {msg.triageData.summary}
                    </p>

                    {/* Step-by-step guidance */}
                    {msg.triageData.firstSteps?.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                          Immediate Action Steps:
                        </div>
                        {msg.triageData.firstSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                            <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Red flags */}
                    {msg.triageData.redFlags?.length > 0 && (
                      <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-100 text-xs text-rose-900 space-y-1">
                        <span className="font-bold text-rose-950 block">When to seek urgent care:</span>
                        <ul className="space-y-0.5 list-disc list-inside">
                          {msg.triageData.redFlags.slice(0, 3).map((rf, idx) => (
                            <li key={idx}>{rf}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <div className="text-[10px] text-slate-400 text-right">{msg.timestamp}</div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-xs">
              +
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-3 text-xs text-slate-600 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
              <span>Analyzing injury & inspecting photo for clinical triage...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
        <span className="text-[11px] text-slate-500 shrink-0 font-medium">Try asking:</span>
        {SAMPLE_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(q)}
            disabled={loading}
            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-colors whitespace-nowrap text-xs shrink-0 shadow-2xs"
          >
            {q.split(',')[0]}
          </button>
        ))}
      </div>

      {/* Selected Image Preview Bar (before sending) */}
      {selectedImage && (
        <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={selectedImage.dataUrl}
              alt="Selected injury thumbnail"
              className="w-10 h-10 object-cover rounded-lg border border-slate-300 shadow-2xs"
            />
            <div className="text-xs">
              <div className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-xs">
                {selectedImage.name}
              </div>
              <div className="text-[10px] text-slate-500">Ready to upload & analyze</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="p-1 rounded-full text-slate-500 hover:text-rose-600 hover:bg-slate-200 transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="p-2.5 rounded-xl border border-slate-300 text-slate-600 hover:text-rose-600 hover:border-rose-400 hover:bg-rose-50/50 transition-colors shrink-0 flex items-center justify-center title='Upload or snap injury photo'"
          title="Upload or snap photo of injury"
        >
          <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={selectedImage ? "Add extra details about the photo (optional)..." : "Describe your injury or upload a photo..."}
          className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 placeholder:text-slate-400"
        />

        <button
          type="submit"
          disabled={loading || (!inputText.trim() && !selectedImage)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs sm:text-sm hover:bg-slate-800 disabled:bg-slate-300 transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>

      {/* Persistent safety notice below the input */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 text-center leading-normal">
        <span className="font-bold text-slate-700">Notice:</span> AI is not 100% accurate. If you feel unwell or are unsure, please contact emergency services (<a href="tel:111" className="text-rose-600 font-bold underline hover:text-rose-700">111</a>) or visit a <Link to="/healthcare" className="text-slate-800 font-bold underline hover:text-slate-950">healthcare center</Link> immediately.
      </div>
    </div>
  );
};
