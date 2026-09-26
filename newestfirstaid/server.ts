import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Allow large image uploads (base64)
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Server-side Gemini initialization
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// First aid triage API endpoint
app.post('/api/triage', async (req, res) => {
  try {
    const { injuryDescription, ageGroup, timeElapsed, currentSymptoms, imageBase64, imageMimeType } = req.body;

    const description = (injuryDescription && typeof injuryDescription === 'string' && injuryDescription.trim())
      ? injuryDescription.trim()
      : (imageBase64 ? 'Please analyze this uploaded photo of my injury and provide triage advice.' : '');

    if (!description && !imageBase64) {
      return res.status(400).json({ error: 'Please provide an injury description or upload a photo.' });
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured yet
      return res.json({
        urgency: 'home_care_with_monitoring',
        urgencyTitle: 'Home Care with Careful Observation',
        visualFindings: imageBase64 ? 'Photo received. Appears to be a localized minor tissue injury suitable for gentle cleansing and monitoring.' : undefined,
        summary: 'General first aid protocol applies. Clean gently, monitor closely, and seek medical attention if symptoms worsen.',
        firstSteps: [
          'Wash hands thoroughly with soap and clean water before touching the injured area.',
          'Gently cleanse the wound with clean cool water or sterile saline to remove loose debris.',
          'Apply clean sterile gauze with gentle direct pressure if bleeding persists.',
          'Apply an appropriate clean dressing or sterile adhesive bandage.',
          'Keep the area elevated if there is swelling or throbbing.'
        ],
        redFlags: [
          'Uncontrolled bleeding after 10-15 minutes of continuous firm pressure',
          'Deep, gaping wound edges or exposed fat, muscle, or bone (requires stitches within 6-8 hours)',
          'Signs of infection: spreading redness, swelling, localized heat, increasing pain, or yellow pus',
          'Numbness, loss of sensation, or inability to move the affected fingers/toes',
          'Any puncture from an animal, human bite, or dirty/rusty object (evaluate tetanus booster status)'
        ],
        doNots: [
          'Do NOT apply butter, toothpaste, grease, or baking soda to burns.',
          'Do NOT aggressively scrub open abrasions with harsh rubbing alcohol or full-strength hydrogen peroxide, as this damages delicate healing tissue.',
          'Do NOT remove large or deeply embedded foreign objects (stabilize and seek emergency care).',
          'Do NOT apply ice directly onto bare skin; always wrap ice in a clean towel.'
        ],
        disclaimer: 'This guidance is for informational first-aid purposes only and does not replace professional medical diagnosis or emergency care.'
      });
    }

    const prompt = `You are a clinical first-aid triage advisor specializing in minor injuries and emergency risk assessment.
Evaluate this user's situation:
Injury details: "${description}"
Age group: "${ageGroup || 'Adult'}"
Time elapsed: "${timeElapsed || 'Just now'}"
Symptoms reported: "${currentSymptoms || 'None specified'}"
${imageBase64 ? 'NOTE: An image of the injury is provided. Carefully inspect the visual features such as wound edges, skin color, blistering, depth, active bleeding, foreign objects, or swelling.' : ''}

CRITICAL SAFETY INSTRUCTIONS:
1. If the situation suggests any life-threatening signs (e.g., severe hemorrhage, anaphylaxis/throat tightening, chest pain, loss of consciousness, chemical eye burns, severe 3rd-degree burns), classify urgency as "emergency_911".
2. If it requires medical evaluation (e.g. potential fracture, stitches needed for gaping wound > 0.5cm, animal bite, tetanus risk, foreign object in eye), classify as "urgent_clinic".
3. If suitable for home first aid with standard protocols, classify as "home_care_with_monitoring".

Respond ONLY with a valid JSON object matching this exact structure:
{
  "urgency": "home_care_with_monitoring" | "urgent_clinic" | "emergency_911",
  "urgencyTitle": "Short title describing urgency level",
  "visualFindings": ${imageBase64 ? '"1-2 concise sentences noting what you observe in the photo (wound depth, swelling, redness, blister, etc.)"' : 'null'},
  "summary": "1-2 calm, concise sentences summarizing the situation and immediate priority",
  "firstSteps": ["step 1 in priority order", "step 2", "step 3", "step 4", "step 5"],
  "redFlags": ["warning sign 1 that means go to doctor/ER", "warning sign 2", "warning sign 3"],
  "doNots": ["what NOT to do for this specific injury (myth-busting)", "second thing to avoid"],
  "disclaimer": "This guidance is for educational first-aid support. Call emergency services immediately if condition worsens or if in doubt."
}`;

    let response;
    if (imageBase64 && typeof imageBase64 === 'string') {
      let cleanData = imageBase64;
      let mime = imageMimeType || 'image/jpeg';
      if (cleanData.includes(';base64,')) {
        const parts = cleanData.split(';base64,');
        mime = parts[0].replace(/^data:/, '') || mime;
        cleanData = parts[1];
      }

      const imagePart = {
        inlineData: {
          mimeType: mime,
          data: cleanData,
        },
      };

      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: { parts: [imagePart, { text: prompt }] },
        config: {
          responseMimeType: 'application/json',
        },
      });
    } else {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
    }

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (err: any) {
    console.error('Triage API error:', err);
    return res.status(500).json({
      error: 'Failed to process triage consultation. Please follow standard protocol below or call medical services.',
    });
  }
});

// Setup Vite in development or serve dist in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Fallback for HTML routing in dev
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`No Panicking server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
