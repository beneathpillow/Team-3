export interface ProtocolStep {
  title: string;
  detail: string;
  warning?: string;
}

export interface RecommendedTimer {
  type: 'pressure' | 'burn_flush' | 'ice' | 'nosebleed' | 'eye_flush';
  durationSec: number;
  label: string;
  instruction: string;
}

export interface FirstAidProtocol {
  id: string;
  title: string;
  shortDesc: string;
  category: 'wounds' | 'burns' | 'sprains' | 'bites' | 'head_face' | 'other';
  bodyRegions: string[]; // 'hands', 'head', 'arms', 'torso', 'legs', 'feet'
  severity: 'Minor (Home Care)' | 'Moderate (Watch Closely)';
  image?: string;
  primaryAction: string;
  steps: ProtocolStep[];
  redFlags: string[];
  doNots: string[];
  suppliesNeeded: string[];
  timer?: RecommendedTimer;
}

export const FIRST_AID_PROTOCOLS: FirstAidProtocol[] = [
  {
    id: 'cuts-scrapes',
    title: 'Cuts, Scratches & Scrapes',
    shortDesc: 'Minor superficial lacerations and skin abrasions from knives, paper, gravel, or sharp edges.',
    category: 'wounds',
    bodyRegions: ['hands', 'arms', 'legs', 'feet', 'torso', 'head'],
    severity: 'Minor (Home Care)',
    image: '/src/assets/images/wound_care_cleansing_1790373580187.jpg',
    primaryAction: 'Apply direct pressure with clean cloth, then rinse thoroughly under gentle running water.',
    timer: {
      type: 'pressure',
      durationSec: 600, // 10 minutes
      label: 'Direct Pressure Timer (10 Min)',
      instruction: 'Press continuously without lifting the cloth to check. Lifting disrupts the delicate forming blood clot.'
    },
    suppliesNeeded: [
      'Sterile gauze or clean cotton cloth',
      'Mild soap & clean running tap water (or saline)',
      'Adhesive bandage or sterile non-stick dressing',
      'Petroleum jelly (Vaseline) or antibacterial ointment'
    ],
    steps: [
      {
        title: '01. Stop the Bleeding',
        detail: 'Apply gentle, continuous pressure over the wound using sterile gauze or a clean cloth. Elevate the wounded limb above heart level if practical to reduce throbbing and blood flow.'
      },
      {
        title: '02. Cleanse Thoroughly',
        detail: 'Wash your hands first. Hold the wound under gentle, cool running tap water for 2 to 3 minutes to rinse away loose dirt, gravel, and bacteria. Wash the surrounding skin gently with mild soap (avoid getting soap directly inside open cuts).'
      },
      {
        title: '03. Remove Small Surface Debris',
        detail: 'If minor grit or dirt particles remain after washing, use clean tweezers disinfected with rubbing alcohol to gently remove them. Do not dig deeply into the wound.'
      },
      {
        title: '04. Moisture Barrier & Dressing',
        detail: 'Apply a thin layer of plain petroleum jelly or antibiotic ointment to keep the wound bed moist and prevent scarring. Cover with a sterile adhesive bandage or non-stick pad held with medical tape.'
      },
      {
        title: '05. Daily Monitoring & Bandage Change',
        detail: 'Replace the dressing at least once daily, or whenever it becomes wet, dirty, or loose. Keep clean until new skin has sealed the cut.'
      }
    ],
    redFlags: [
      'Bleeding will not stop after 10–15 minutes of uninterrupted direct pressure.',
      'Wound is deep, gaping wider than 0.5 cm, or reveals yellowish fat tissue or muscle (requires stitches within 6 to 8 hours).',
      'Cut caused by a rusty metal object, dirty nail, or bite (check if tetanus vaccine was more than 5–10 years ago).',
      'Loss of sensation, tingling, or inability to bend fingers or toes beyond the wound.',
      'Signs of infection developing after 24–48 hours: spreading redness, swelling, localized warmth, or yellow pus.'
    ],
    doNots: [
      'Do NOT pour rubbing alcohol, iodine, or full-strength hydrogen peroxide inside the open wound. They kill healthy tissue cells and delay healing.',
      'Do NOT keep lifting the bandage every 30 seconds to peek; each lift breaks the newly forming fibrin clot.',
      'Do NOT leave dirty or wet bandages on the skin, which creates a breeding ground for bacteria.'
    ]
  },
  {
    id: 'minor-burns',
    title: 'Minor Burns & Scalds',
    shortDesc: 'Superficial 1st-degree burns (redness, pain) and small 2nd-degree burns (small blisters < 2 inches) from hot pans, steam, boiling liquids, or hot appliances.',
    category: 'burns',
    bodyRegions: ['hands', 'arms', 'torso', 'legs', 'head'],
    severity: 'Minor (Home Care)',
    image: '/src/assets/images/burn_cooling_treatment_1790373568300.jpg',
    primaryAction: 'Immediately cool with gentle, cool running tap water for 15 to 20 minutes. Never use ice.',
    timer: {
      type: 'burn_flush',
      durationSec: 900, // 15 minutes
      label: 'Cool Water Flush Timer (15 Min)',
      instruction: 'Keep comfortable, cool tap water flowing gently over the burned area. Do not use freezing ice water.'
    },
    suppliesNeeded: [
      'Cool running tap water',
      'Clean plastic cling film or sterile non-adherent dressing',
      'Pure aloe vera gel or burn hydrogel (no added perfume)',
      'Over-the-counter pain relief (ibuprofen or paracetamol/acetaminophen)'
    ],
    steps: [
      {
        title: '01. Remove from Heat Source & Cool Immediately',
        detail: 'Immediately place the burn under gentle, cool running tap water for 15 to 20 minutes. This draws residual trapped heat out of deeper dermis layers and significantly reduces tissue damage.'
      },
      {
        title: '02. Remove Constrictive Items Promptly',
        detail: 'Quickly and gently remove rings, bracelets, watches, or snug clothing near the burn before natural swelling sets in. Do NOT peel away clothing stuck directly to charred skin.'
      },
      {
        title: '03. Protect the Skin (No Oily Greases)',
        detail: 'After cooling, gently pat dry with a clean cloth. You may apply pure aloe vera gel or a sterile water-based burn hydrogel. Do not apply butter, oil, or petroleum jelly to hot skin as it traps heat.'
      },
      {
        title: '04. Cover Loosely with Non-Stick Wrap',
        detail: 'Cover loosely with clean kitchen plastic cling film (wrap around, do not bind tight) or a sterile non-adherent dressing. Cling film protects exposed nerve endings from air currents, dramatically reducing pain.'
      },
      {
        title: '05. Manage Discomfort',
        detail: 'Take paracetamol or ibuprofen as indicated on package directions if pain persists. Elevate burned extremities above heart level if swelling occurs.'
      }
    ],
    redFlags: [
      'Burn involves the face, eyes, groin, major joint, hands, or feet.',
      'Burn size exceeds 3 inches across (larger than the palm of your hand).',
      'Skin appears leathery, white, waxy, or charred dark (3rd-degree burn requires emergency room care).',
      'Burn caused by chemical splashes or high-voltage electrical current.',
      'Signs of severe infection: fever, foul odor, or spreading redness after 2–3 days.'
    ],
    doNots: [
      'Do NOT use ice cubes or ice-cold water. Extreme cold constricts blood vessels and causes frostbite-like secondary thermal injury.',
      'Do NOT pop, prick, or drain intact blisters. The blister roof is the body’s own sterile biological dressing.',
      'Do NOT smear butter, margarine, mayonnaise, toothpaste, or lard on burns. These cause bacterial infection and seal in residual heat.'
    ]
  },
  {
    id: 'sprains-strains',
    title: 'Sprains, Strains & Twisted Joints',
    shortDesc: 'Stretched or partially torn ligaments from rolling an ankle, twisting a wrist, or awkward stepping.',
    category: 'sprains',
    bodyRegions: ['feet', 'legs', 'hands', 'arms'],
    severity: 'Moderate (Watch Closely)',
    image: '/src/assets/images/sprain_elevation_ice_1790373591695.jpg',
    primaryAction: 'Follow P.R.I.C.E. protocol: Protect, Rest, Ice (15–20 min), Compress with elastic wrap, and Elevate.',
    timer: {
      type: 'ice',
      durationSec: 1200, // 20 minutes
      label: 'Cold Compress Timer (20 Min)',
      instruction: 'Apply cold pack wrapped in a thin towel. Rest for at least 40 minutes between icing sessions.'
    },
    suppliesNeeded: [
      'Reusable cold pack or bag of frozen peas wrapped in cloth',
      'Elastic compression bandage (ACE bandage)',
      'Supportive pillows for elevation',
      'Anti-inflammatory medication (ibuprofen) if tolerated'
    ],
    steps: [
      {
        title: '01. Protect & Rest the Joint',
        detail: 'Stop the physical activity immediately. Do not attempt to walk through the pain or "shake it off". Support the injured limb to prevent further ligament strain.'
      },
      {
        title: '02. Ice with Barrier',
        detail: 'Apply a cold pack or wrapped bag of frozen vegetables to the joint for 15 to 20 minutes at a time. Always wrap ice in a thin towel—never put bare ice directly against skin.'
      },
      {
        title: '03. Elastic Compression Wrap',
        detail: 'Wrap the joint with an elastic bandage in a snug figure-eight pattern. Start from furthest point away from the heart (e.g. toes/forefoot) and wrap upwards. It should feel firm but comfortable.'
      },
      {
        title: '04. Elevate Above Heart',
        detail: 'Prop the leg or arm up on cushions so it rests higher than your chest. Gravity aids lymphatic drainage and minimizes fluid accumulation.'
      },
      {
        title: '05. Ottawa Ankle Check (Rule of Thumb)',
        detail: 'Attempt to test if you can bear weight for at least 4 consecutive steps. If you cannot bear any weight, or have severe tenderness on the bony bumps (malleoli), an X-ray is advised.'
      }
    ],
    redFlags: [
      'Inability to bear weight or take 4 steps immediately after injury and in the clinic.',
      'Visible deformity, crooked joint angle, or bone protruding.',
      'Numbness, loss of pulse, coldness, or blue discoloration in toes or fingers.',
      'Hearing or feeling a loud "snap" or "pop" followed by rapid localized balling or extreme swelling.'
    ],
    doNots: [
      'Do NOT apply heating pads or take hot baths in the first 48 hours. Heat increases blood flow and worsens internal inflammation and swelling.',
      'Do NOT wrap the compression bandage so tightly that your toes or fingers turn pale, cold, or tingle. If tight, loosen immediately.',
      'Do NOT return to high-impact sports prematurely before full pain-free range of motion is restored.'
    ]
  },
  {
    id: 'insect-stings-bites',
    title: 'Insect Stings & Bug Bites',
    shortDesc: 'Stings from bees, wasps, yellowjackets, hornets, or itchy bites from mosquitoes, spiders, and ants.',
    category: 'bites',
    bodyRegions: ['arms', 'legs', 'hands', 'torso', 'head'],
    severity: 'Minor (Home Care)',
    primaryAction: 'Quickly scrape away any visible stinger with a card edge, wash with soap, and apply cold compress.',
    timer: {
      type: 'ice',
      durationSec: 600,
      label: 'Cold Compress (10 Min)',
      instruction: 'Apply wrapped cold pack to ease localized burning and histamine swelling.'
    },
    suppliesNeeded: [
      'Credit card or stiff plastic edge for scraping',
      'Mild soap & cool water',
      'Ice pack wrapped in paper towel',
      'Calamine lotion, 1% hydrocortisone cream, or oral antihistamine'
    ],
    steps: [
      {
        title: '01. Remove Stinger Promptly (Do Not Squeeze)',
        detail: 'If stung by a bee, gently scrape a credit card, dull butter knife, or fingernail sideways across the skin to dislodge the stinger. Avoid pinching with tweezers, which can squeeze remaining venom sac fluids into the skin.'
      },
      {
        title: '02. Wash with Soap & Water',
        detail: 'Clean the sting site gently with soap and cool water to prevent secondary skin bacterial contamination.'
      },
      {
        title: '03. Cool Compress for Swelling',
        detail: 'Hold a cold pack wrapped in a clean washcloth over the sting for 10 minutes to soothe throbbing and minimize swelling.'
      },
      {
        title: '04. Soothe Itching & Inflammation',
        detail: 'Apply calamine lotion, 1% hydrocortisone cream, or a baking soda-water paste. An over-the-counter oral antihistamine (such as cetirizine or diphenhydramine) helps ease systemic itching.'
      },
      {
        title: '05. Avoid Scratching',
        detail: 'Keep fingernails clean and resist scratching. Breaking the skin surface invites secondary Staph or Strep bacterial infections.'
      }
    ],
    redFlags: [
      'Difficulty breathing, wheezing, throat tightness, or hoarseness (Emergency Anaphylaxis - call 911 immediately and use EpiPen if prescribed).',
      'Swelling of the lips, tongue, face, or difficulty swallowing.',
      'Dizziness, fainting, lightheadedness, or rapid drop in blood pressure.',
      'Widespread hives or itching distant from the sting site.',
      'Red streaks spreading outward from the bite or increasing warmth after 24–48 hours.'
    ],
    doNots: [
      'Do NOT squeeze the visible venom sac with tweezers or fingers.',
      'Do NOT aggressively scratch open the bite lesion.',
      'Do NOT delay calling emergency services if the person has a known severe bee allergy.'
    ]
  },
  {
    id: 'nosebleeds',
    title: 'Nosebleeds (Epistaxis)',
    shortDesc: 'Bleeding from fragile blood vessels in the anterior nasal septum due to dry air, nose-picking, allergies, or minor bumps.',
    category: 'head_face',
    bodyRegions: ['head'],
    severity: 'Minor (Home Care)',
    primaryAction: 'Sit upright, lean forward slightly, and pinch the soft fleshy part of both nostrils firmly for 10 full minutes.',
    timer: {
      type: 'nosebleed',
      durationSec: 600,
      label: 'Continuous Pinch Timer (10 Min)',
      instruction: 'Breathe through your mouth. Keep pinching continuously without checking before the timer ends.'
    },
    suppliesNeeded: [
      'Clean tissues or washcloth to catch blood',
      'Timer/clock for timing 10-15 continuous minutes',
      'Cold compress across nasal bridge',
      'Saline nasal spray or petroleum jelly for post-care'
    ],
    steps: [
      {
        title: '01. Sit Up & Lean FORWARD',
        detail: 'Sit down and tilt your head slightly forward. Leaning backward causes blood to drain down your throat, triggering nausea, coughing, or vomiting.'
      },
      {
        title: '02. Pinch Soft Nostril Flesh',
        detail: 'Using thumb and index finger, firmly compress the soft fleshy lower half of your nose against the central bone (septum). Breathe calmly through your mouth.'
      },
      {
        title: '03. Hold Continuously for 10 to 15 Minutes',
        detail: 'Do not release pressure every 2 minutes to inspect. Let the pressure remain undisturbed to allow a secure clot to form.'
      },
      {
        title: '04. Apply Cold Across the Bridge',
        detail: 'Placing an ice pack wrapped in a small towel across the bridge of your nose constricts local arterioles and accelerates clotting.'
      },
      {
        title: '05. Post-Bleed Protection (Next 12 Hours)',
        detail: 'Once bleeding stops, do NOT blow your nose, pick at it, or bend over for several hours. Apply a dab of petroleum jelly inside each nostril to keep mucous membranes moist.'
      }
    ],
    redFlags: [
      'Bleeding persists after 20 to 30 minutes of continuous direct pinching.',
      'Heavy blood flow accompanied by lightheadedness, confusion, or pallor.',
      'Nosebleed occurred following a significant blow or head trauma (possible fracture or skull base issue).',
      'Blood is gushing from the back of the throat even when pinching the front (posterior nosebleed requires medical packing).'
    ],
    doNots: [
      'Do NOT tilt your head backward or lie flat on your back.',
      'Do NOT pack your nose tightly with rough dry toilet paper or napkins, as tearing them out will rip off the fresh clot.',
      'Do NOT vigorously blow your nose immediately after bleeding has stopped.'
    ]
  },
  {
    id: 'splinters-glass',
    title: 'Splinters, Thorns & Glass Shards',
    shortDesc: 'Small wooden fragments, rose thorns, fiberglass, or tiny glass slivers embedded near the skin surface.',
    category: 'other',
    bodyRegions: ['hands', 'feet', 'arms', 'legs'],
    severity: 'Minor (Home Care)',
    primaryAction: 'Wash the area, sterilize fine tweezers, and extract along the exact angle the splinter entered.',
    suppliesNeeded: [
      'Pointed precision tweezers disinfected with 70% alcohol',
      'Warm water and mild soap',
      'Sterile adhesive bandage',
      'Magnifying glass / bright flashlight'
    ],
    steps: [
      {
        title: '01. Wash Area Gently',
        detail: 'Clean the skin with mild soap and warm water. Pat dry gently without pressing on the splinter, which could drive it deeper.'
      },
      {
        title: '02. Inspect Entry Angle',
        detail: 'Use a bright light and magnifier to see which angle the fragment entered and whether any tip protrudes from the skin.'
      },
      {
        title: '03. Sterilize Instrument',
        detail: 'Wipe your precision tweezers thoroughly with rubbing alcohol or alcohol prep pads.'
      },
      {
        title: '04. Extract Along the Same Angle',
        detail: 'Firmly grasp the exposed end of the splinter with tweezers and pull it out smoothly along the exact same angle it went in. Pulling straight up can break the wood inside.'
      },
      {
        title: '05. Clean & Protect',
        detail: 'Wash the site once more with soap and water, apply a dab of antiseptic ointment, and cover with a small adhesive bandage.'
      }
    ],
    redFlags: [
      'Splinter is deeply buried under a fingernail or deep in flesh and cannot be reached without gouging skin.',
      'Foreign object is near or inside the eye.',
      'Glass fragment is large or bleeding is difficult to control.',
      'Area becomes increasingly red, swollen, throbbing, or produces pus after 24 hours.'
    ],
    doNots: [
      'Do NOT squeeze or pinch the skin around the splinter, which often snaps the shaft and pushes shards deeper.',
      'Do NOT dig aggressively with unsterilized sewing needles or safety pins.',
      'Do NOT ignore plant thorns or dirty organic material, which carry fungal and bacterial spores.'
    ]
  },
  {
    id: 'friction-blisters',
    title: 'Friction Blisters (Feet & Hands)',
    shortDesc: 'Fluid-filled pocket caused by repetitive rubbing from new shoes, running, hiking, or manual hand tools.',
    category: 'other',
    bodyRegions: ['feet', 'hands'],
    severity: 'Minor (Home Care)',
    primaryAction: 'Leave the roof intact if possible; protect with a hydrocolloid patch or moleskin donut.',
    suppliesNeeded: [
      'Hydrocolloid blister plaster or moleskin',
      'Mild soap & clean water',
      'Petroleum jelly or antiseptic ointment',
      'Sterile needle only if draining large tense blister'
    ],
    steps: [
      {
        title: '01. Keep the Blister Roof Intact',
        detail: 'The thin skin bubble is your body’s own sterile, natural protection barrier. Intact blisters heal much faster and almost never get infected if left unbroken.'
      },
      {
        title: '02. Cleanse Gently',
        detail: 'Wash the blister and surrounding skin with mild soap and warm water. Pat dry softly.'
      },
      {
        title: '03. Protect with Moleskin or Blister Patch',
        detail: 'Apply a hydrocolloid blister plaster directly over it. If using moleskin, cut a hole slightly larger than the blister (a "donut") to offload friction from the blister center.'
      },
      {
        title: '04. If Blister Has Already Popped',
        detail: 'Do not tear off the collapsed flap of skin. Smooth it flat over the raw surface, apply ointment, and cover with a sterile non-stick pad.'
      }
    ],
    redFlags: [
      'Fluid inside turns cloudy, milky, or yellow-green pus.',
      'Spreading red streaks emanating from the blister toward the heart.',
      'Patient has diabetes or peripheral neuropathy (even minor foot blisters require clinical foot-care review).'
    ],
    doNots: [
      'Do NOT deliberately pop or peel off intact blisters for cosmetic reasons.',
      'Do NOT peel the deflated skin flap off a popped blister; it protects the delicate raw dermis.'
    ]
  },
  {
    id: 'eye-irritant',
    title: 'Minor Foreign Object / Dust in Eye',
    shortDesc: 'Eyelash, grit, sand, or airborne dust particle trapped in the conjunctival sac.',
    category: 'head_face',
    bodyRegions: ['head'],
    severity: 'Moderate (Watch Closely)',
    primaryAction: 'Flush copiously with sterile saline or clean lukewarm water. Never rub the eyeball.',
    timer: {
      type: 'eye_flush',
      durationSec: 900,
      label: 'Gentle Eye Flush Timer (15 Min)',
      instruction: 'Flush gently across the eye from the inner corner outwards toward the temple.'
    },
    suppliesNeeded: [
      'Sterile eye wash saline or clean lukewarm tap water',
      'Small clean cup or eyewash cup',
      'Clean tissue for dabbing cheek'
    ],
    steps: [
      {
        title: '01. Do NOT Rub Your Eye',
        detail: 'Rubbing pushes grit into the cornea, which can cause painful corneal abrasions or scratch the surface epithelium.'
      },
      {
        title: '02. Wash Hands First',
        detail: 'Thoroughly wash hands with soap and water so you do not introduce bacteria into your eye.'
      },
      {
        title: '03. Flush with Sterile Saline or Water',
        detail: 'Fill a clean small glass or eyewash cup with saline or lukewarm tap water. Hold against the eye orbit and blink repeatedly while rolling your eye in circles.'
      },
      {
        title: '04. Pull Upper Eyelid Over Lower Eyelid',
        detail: 'Gently grasp the upper eyelashes and pull the upper lid down over the lower lid. The lower lashes can gently sweep away trapped particles on the underside.'
      },
      {
        title: '05. Chemical Splashes Require Immediate Emergency Flush',
        detail: 'If a household cleaner, acid, or bleach splashed in the eye, flush continuously for at least 15 to 20 minutes under a gentle stream of lukewarm water and call emergency services.'
      }
    ],
    redFlags: [
      'Foreign object is visibly embedded or stuck in the pupil or iris.',
      'Changes in vision (blurred vision, double vision, or loss of sight).',
      'Severe ongoing pain or extreme sensitivity to light after flushing.',
      'Blood visible inside the clear front chamber of the eye (hyphema).'
    ],
    doNots: [
      'Do NOT rub the eye with fingers or fists.',
      'Do NOT use sharp tweezers, cotton swabs, or fingernails to pick directly on the cornea.',
      'Do NOT wear contact lenses until the eye is completely asymptomatic for at least 24 hours.'
    ]
  }
];

export const EMERGENCY_NUMBERS = [
  { region: 'New Zealand', police_med: '111', nonEmergency: '0800 611 116', poisonControl: '0800 764 766', desc: 'Emergency 111, Healthline & Poisons' },
  { region: 'United States & Canada', police_med: '911', poisonControl: '1-800-222-1222', desc: 'National Emergency Dispatch' },
  { region: 'United Kingdom', police_med: '999', nonEmergency: '111', poisonControl: '111', desc: 'Emergency / NHS Health Advice' },
  { region: 'European Union', police_med: '112', desc: 'Universal European Emergency Number' },
  { region: 'Australia', police_med: '000', nonEmergency: '13 11 26', poisonControl: '13 11 26', desc: 'Triple Zero Emergency & Poisons Info' }
];

export const FIRST_AID_KIT_ITEMS = [
  { id: 'gauze', category: 'Wound Care', name: 'Sterile Gauze Pads (4x4 & 2x2 in)', essential: true },
  { id: 'tape', category: 'Wound Care', name: 'Medical Adhesive Paper Tape', essential: true },
  { id: 'bandages', category: 'Wound Care', name: 'Assorted Adhesive Bandages (Bandaids)', essential: true },
  { id: 'saline', category: 'Cleansing', name: 'Sterile Saline Wash Ampoules (or bottled)', essential: true },
  { id: 'antiseptic', category: 'Cleansing', name: 'Antiseptic Wipes (alcohol-free)', essential: true },
  { id: 'petroleum', category: 'Ointments', name: 'Petroleum Jelly (Vaseline) / Antibiotic Ointment', essential: true },
  { id: 'burngel', category: 'Burns', name: 'Burn Gel Hydrogel & Non-stick Burn Dressing', essential: true },
  { id: 'elastic', category: 'Sprains', name: 'Elastic Compression Bandage (ACE wrap)', essential: true },
  { id: 'icepack', category: 'Sprains', name: 'Instant Chemical Cold Pack', essential: true },
  { id: 'tweezers', category: 'Tools', name: 'Fine-tipped Stainless Tweezers', essential: true },
  { id: 'scissors', category: 'Tools', name: 'Medical Trauma Shears / Blunt Scissors', essential: true },
  { id: 'gloves', category: 'Protection', name: 'Disposable Nitrile Gloves (Latex-free)', essential: true },
  { id: 'analgesic', category: 'Medications', name: 'Ibuprofen or Paracetamol / Acetaminophen', essential: false },
  { id: 'antihistamine', category: 'Medications', name: 'Oral Antihistamine (for stings/allergic reaction)', essential: false },
  { id: 'blister', category: 'Wound Care', name: 'Hydrocolloid Blister Plasters / Moleskin', essential: false }
];
