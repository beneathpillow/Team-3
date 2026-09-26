export interface KnownInjury {
  id: string;
  name: string;
  category: 'Critical / Emergency' | 'Wound & Bleeding' | 'Thermal & Cold' | 'Musculoskeletal' | 'Medical Emergency' | 'Head, Eyes & Nose' | 'Stings & Bites';
  severity: 'Immediate 111' | 'Urgent Medical Attention' | 'Home Care / Clinic';
  immediateAction: string;
  shortDesc: string;
  bodyRegions: ('hands' | 'head' | 'arms' | 'torso' | 'legs' | 'feet')[];
  steps: string[];
  redFlags: string[];
  doNots: string[];
  suppliesNeeded?: string[];
  timerType?: 'pressure' | 'burn' | 'ice' | 'nosebleed' | 'eye_flush';
}

export const KNOWN_INJURIES: KnownInjury[] = [
  {
    id: 'choking',
    name: 'Choking',
    category: 'Critical / Emergency',
    severity: 'Immediate 111',
    shortDesc: 'Blocked upper airway preventing breathing, talking, or coughing.',
    bodyRegions: ['head', 'torso'],
    immediateAction: 'Ask "Are you choking?" If unable to speak, cough, or breathe, perform 5 back blows followed by 5 abdominal thrusts (Heimlich maneuver). Call 111.',
    steps: [
      'Encourage coughing if the person can breathe or make sound.',
      'If silent or hands clutched to throat: Stand behind them, lean them forward, deliver 5 firm back blows between shoulder blades with the heel of your hand.',
      'If still obstructed: Place a fist just above their navel, grasp with other hand, pull inward and upward with 5 quick abdominal thrusts.',
      'Alternate 5 back blows and 5 thrusts until the object dislodges or the person becomes unresponsive.',
      'If unresponsive: Lower gently to the floor, call 111 immediately, begin CPR chest compressions. Look in mouth before rescue breaths; do not blind finger-sweep.'
    ],
    redFlags: [
      'Inability to speak, cry, or make any sound',
      'Bluish tint around lips, face, or fingernails (cyanosis)',
      'Loss of consciousness'
    ],
    doNots: [
      'Do NOT perform a blind finger sweep into the throat (can push object deeper).',
      'Do NOT give water to someone who is choking.',
      'Do NOT slap their back while they are standing upright (lean them forward first).'
    ]
  },
  {
    id: 'heavy-bleeding',
    name: 'Heavy Bleeding',
    category: 'Critical / Emergency',
    severity: 'Immediate 111',
    shortDesc: 'Rapid, spurting or pooling blood loss that fails to clot with light pressure.',
    bodyRegions: ['hands', 'arms', 'legs', 'torso', 'head', 'feet'],
    immediateAction: 'Press hard and continuously with clean cloth or gauze directly onto the wound. Do NOT release pressure to check. Call 111 if spurting or continuous.',
    steps: [
      'Call 111 immediately if blood is spurting, pooling rapidly, or will not stop.',
      'Place sterile gauze or clean cloth directly on the source of bleeding.',
      'Push down firmly with both hands using your body weight.',
      'If blood soaks through, DO NOT remove the first cloth—add more layers on top and press harder.',
      'If on an arm or leg and bleeding is life-threatening/uncontrolled, apply a commercial tourniquet 2-3 inches above the wound (not over a joint) and tighten until bleeding halts.'
    ],
    redFlags: [
      'Pulsing, spurting bright red blood (arterial)',
      'Blood soaking completely through multiple towels within 2-3 minutes',
      'Person feels faint, cold, clammy, or confused (signs of hypovolemic shock)'
    ],
    doNots: [
      'Do NOT remove soaked dressings (it rips away newly formed clots).',
      'Do NOT wash or scrub a heavily bleeding wound.',
      'Do NOT release direct pressure to "peek" if it has stopped.'
    ],
    timerType: 'pressure'
  },
  {
    id: 'burn',
    name: 'Burn',
    category: 'Thermal & Cold',
    severity: 'Home Care / Clinic',
    shortDesc: 'Thermal damage to skin layers from hot objects, flames, or stove elements.',
    bodyRegions: ['hands', 'arms', 'torso', 'legs', 'head', 'feet'],
    immediateAction: 'Hold burn under cool running tap water for at least 15 to 20 minutes immediately. Never use ice.',
    steps: [
      'Remove heat source immediately.',
      'Cool under gentle cool tap water for 15-20 minutes. This stops thermal damage from progressing deeper into tissue.',
      'Gently remove rings, watches, or tight clothing around the burn before swelling begins.',
      'Cover loosely with clean plastic cling wrap or a sterile non-stick bandage.',
      'Take over-the-counter acetaminophen or ibuprofen for pain if appropriate.'
    ],
    redFlags: [
      'Burn is larger than the palm of the person’s hand',
      'Skin appears leathery, charred black, or waxy white (3rd-degree)',
      'Burn involves face, hands, feet, groin, or major joints'
    ],
    doNots: [
      'Do NOT apply ice, ice water, butter, grease, toothpaste, or ointments.',
      'Do NOT pop or puncture intact blisters.',
      'Do NOT pull away clothing that is melted or stuck to the burn.'
    ],
    timerType: 'burn'
  },
  {
    id: 'scald',
    name: 'Scald',
    category: 'Thermal & Cold',
    severity: 'Home Care / Clinic',
    shortDesc: 'Thermal injury caused by hot liquids (boiling water, coffee, soup) or steam.',
    bodyRegions: ['hands', 'arms', 'torso', 'legs', 'feet'],
    immediateAction: 'Quickly remove wet clothing soaked with hot liquid (unless stuck to skin) and cool under running water for 15-20 minutes.',
    steps: [
      'Immediately strip off clothing soaked in hot water, tea, or soup to stop continued heat transfer.',
      'Cool the area under continuous cool running water for 15 to 20 minutes.',
      'Remove tight jewelry or bracelets before edema sets in.',
      'Cover with a sterile, non-adherent dressing or clean cling film.',
      'Monitor for signs of shock or secondary infection.'
    ],
    redFlags: [
      'Hot liquid covered a large body surface area (e.g. chest, leg)',
      'Infant, young child, or elderly person scalded',
      'Blisters rapidly spreading or skin sloughing off'
    ],
    doNots: [
      'Do NOT leave hot-liquid-soaked clothes on the skin.',
      'Do NOT apply ice or freezing cold water (causes hypothermia and tissue necrosis).',
      'Do NOT pop blisters.'
    ],
    timerType: 'burn'
  },
  {
    id: 'cut',
    name: 'Cut & Scrape',
    category: 'Wound & Bleeding',
    severity: 'Home Care / Clinic',
    shortDesc: 'Laceration or skin abrasion from knives, broken glassware, sharp tools, or falls.',
    bodyRegions: ['hands', 'arms', 'legs', 'feet', 'head', 'torso'],
    immediateAction: 'Apply firm, continuous direct pressure with clean gauze for 10 full minutes to stop bleeding.',
    steps: [
      'Apply steady, direct pressure with clean cloth or gauze for 10 uninterrupted minutes.',
      'Once bleeding stops, rinse wound gently under cool tap water to remove debris.',
      'Clean surrounding skin with mild soap and water; avoid getting soap directly inside deep wound.',
      'Apply a thin layer of plain petroleum jelly to keep wound bed moist.',
      'Cover with a sterile adhesive bandage or non-stick pad.'
    ],
    redFlags: [
      'Wound edges gape open (> 0.5 cm) or visible yellow subcutaneous fat (needs stitches within 6-8 hours)',
      'Bleeding does not stop after 10-15 minutes of uninterrupted pressure',
      'Numbness or tingling downstream from the cut (nerve injury)'
    ],
    doNots: [
      'Do NOT pour hydrogen peroxide or rubbing alcohol into the cut (damages healthy tissue).',
      'Do NOT lift gauze every minute to see if bleeding stopped.',
      'Do NOT close gaping cuts with simple household tape.'
    ],
    timerType: 'pressure'
  },
  {
    id: 'puncture',
    name: 'Puncture',
    category: 'Wound & Bleeding',
    severity: 'Urgent Medical Attention',
    shortDesc: 'Deep piercing wound from nails, needles, animal teeth, or sharp spikes.',
    bodyRegions: ['feet', 'hands', 'legs', 'arms'],
    immediateAction: 'Rinse under warm running water for 5 minutes. DO NOT remove deeply impaled objects. Get a tetanus evaluation.',
    steps: [
      'If an object (e.g., nail, glass shard) is deeply embedded, DO NOT pull it out—stabilize it with rolled bandages and go to urgent care/ER.',
      'If object was already removed (e.g., stepped on nail): allow gentle bleeding for a few seconds to help flush contaminants.',
      'Wash thoroughly with gentle running water and mild soap for at least 5 minutes.',
      'Apply an antiseptic or plain petroleum ointment and cover with sterile bandage.',
      'Seek medical care for a tetanus booster if your last shot was > 5 years ago (for dirty puncture) or > 10 years (clean).'
    ],
    redFlags: [
      'Deep object remains impaled in the body',
      'Injury caused by animal/human bite or dirty, rusty metal',
      'Puncture over a joint or foot bottom through rubber sneaker sole'
    ],
    doNots: [
      'Do NOT yank out deeply impaled objects (can trigger massive internal bleeding).',
      'Do NOT probe inside the puncture with needles or tweezers.',
      'Do NOT ignore a puncture wound even if it appears small on the surface.'
    ]
  },
  {
    id: 'cold-injury',
    name: 'Cold Injury / Frostnip',
    category: 'Thermal & Cold',
    severity: 'Home Care / Clinic',
    shortDesc: 'Surface tissue cooling causing pale, numb skin on fingers, toes, nose, or ears.',
    bodyRegions: ['hands', 'feet', 'head'],
    immediateAction: 'Get indoors immediately. Rewarm gently in warm water (100°F–104°F / 38°C–40°C) or with body heat. Never rub skin.',
    steps: [
      'Move person to a warm shelter and remove wet, cold clothing.',
      'Immerse affected fingers, toes, or ears in warm (not hot!) water for 20-30 minutes, or place cold hands in armpits.',
      'Water should feel comfortably warm to an uninjured hand or elbow.',
      'Skin will turn red, throb, or tingle as it thaws—this is expected.',
      'Keep warmed parts elevated to reduce throbbing and swelling. Apply loose sterile dressings.'
    ],
    redFlags: [
      'Skin is hard, waxy, white, grayish-yellow, or completely numb (frostbite)',
      'Blisters form during or after thawing',
      'Person is shivering uncontrollably, slurring speech, or lethargic (hypothermia)'
    ],
    doNots: [
      'Do NOT rub frostbitten skin with snow or your hands (causes severe tissue damage).',
      'Do NOT rewarm using direct dry heat like space heaters, stoves, or hair dryers.',
      'Do NOT thaw tissue if there is a risk of it refreezing before reaching hospital.'
    ]
  },
  {
    id: 'hypothermia',
    name: 'Hypothermia',
    category: 'Critical / Emergency',
    severity: 'Immediate 111',
    shortDesc: 'Dangerously low internal core body temperature under 95°F (35°C).',
    bodyRegions: ['torso', 'head', 'arms', 'legs'],
    immediateAction: 'Call 111 immediately. Move person out of cold, strip wet clothes, wrap in dry blankets covering head and chest.',
    steps: [
      'Call 111 immediately.',
      'Move person out of wind, cold, or wet conditions into warm shelter.',
      'Gently remove wet clothing and replace with warm, dry layers, sleeping bags, or blankets.',
      'Warm the center of the body first (chest, neck, head, and groin) with blankets and warm compresses.',
      'If person is alert and can swallow, give warm, sweet, non-caffeinated drinks.',
      'Be extremely gentle; rough handling of a hypothermic patient can trigger cardiac arrest.'
    ],
    redFlags: [
      'Shivering stops while the person is still cold (sign of severe worsening hypothermia)',
      'Slurred speech, clumsy hands, intense drowsiness, confusion',
      'Weak pulse or very slow shallow breathing'
    ],
    doNots: [
      'Do NOT give alcohol or coffee.',
      'Do NOT warm arms and legs first (forces cold blood back into heart/lungs causing shock).',
      'Do NOT put person in hot bath or use direct heating lamps.'
    ]
  },
  {
    id: 'sprain',
    name: 'Sprain & Strain',
    category: 'Musculoskeletal',
    severity: 'Home Care / Clinic',
    shortDesc: 'Stretched or torn ligaments from rolled ankles, twisted wrists, or sudden awkward twists.',
    bodyRegions: ['feet', 'hands', 'legs', 'arms'],
    immediateAction: 'Follow the P.R.I.C.E. protocol: Protect, Rest, Ice (15-20 min), Compress with elastic wrap, Elevate above heart level.',
    steps: [
      'Rest: Stop activity immediately and avoid putting weight on the injured joint.',
      'Ice: Apply an ice pack wrapped in a thin towel for 15-20 minutes every 2-3 hours.',
      'Compress: Wrap an elastic bandage snugly from toes/fingers upward, firm but not tight enough to cut off circulation.',
      'Elevate: Prop the injured ankle, knee, or wrist on pillows above heart level to drain fluid and swelling.',
      'Monitor: Take ibuprofen or acetaminophen for pain relief.'
    ],
    redFlags: [
      'Complete inability to bear weight (cannot walk 4 steps)',
      'Joint is visibly deformed or sits at an abnormal angle',
      'Numbness, coldness, or blue discoloration in toes or fingers below sprain'
    ],
    doNots: [
      'Do NOT apply bare ice directly against bare skin.',
      'Do NOT wrap elastic bandage so tightly that toes turn pale or tingle.',
      'Do NOT "walk it off" through sharp pain.'
    ],
    timerType: 'ice'
  },
  {
    id: 'fracture',
    name: 'Fracture / Broken Bone',
    category: 'Musculoskeletal',
    severity: 'Urgent Medical Attention',
    shortDesc: 'Bone crack or break from high-impact falls, sports accidents, or blunt impact.',
    bodyRegions: ['arms', 'legs', 'hands', 'feet', 'torso', 'head'],
    immediateAction: 'Immobilize the injured limb in the exact position found. Do NOT try to straighten or push bone back. Call 111 or go to ER.',
    steps: [
      'Keep the person calm and still. Support the injured limb without moving it.',
      'Call 111 if bone is piercing through skin, limb is blue/cold, or injury involves neck, back, or pelvis.',
      'If open fracture (bone through skin): cover gently with sterile gauze to prevent infection. Do not push bone back.',
      'Immobilize the joint above and below the suspected fracture using a splint or padding if transport is required.',
      'Apply an ice pack wrapped in a cloth to reduce swelling, avoiding direct pressure on the fracture site.'
    ],
    redFlags: [
      'Bone has broken through the skin (compound/open fracture)',
      'Severe deformity or limb is rotated at an unnatural angle',
      'Loss of pulse or sensation below the injury site'
    ],
    doNots: [
      'Do NOT attempt to realign, straighten, or set the broken bone.',
      'Do NOT push exposed bone back into the body.',
      'Do NOT give food or drink (in case emergency surgery/anesthesia is needed).'
    ]
  },
  {
    id: 'head-injury',
    name: 'Head Injury',
    category: 'Critical / Emergency',
    severity: 'Immediate 111',
    shortDesc: 'Blunt trauma to skull, forehead, or face with potential concussion or internal bleed.',
    bodyRegions: ['head'],
    immediateAction: 'Keep person lying still with head and shoulders slightly elevated. Call 111 if there was loss of consciousness, confusion, or vomiting.',
    steps: [
      'Keep the person still; stabilize head and neck with your hands if spinal injury is possible from a fall.',
      'Check responsiveness: Ask simple questions ("What is your name? Where are you?").',
      'If bleeding from scalp: apply gentle direct pressure with clean cloth (do not press hard if skull fracture suspected).',
      'Apply a cold pack wrapped in cloth to scalp bump or bruise for 15 minutes.',
      'Monitor continuously for the next 24-48 hours for delayed concussion symptoms.'
    ],
    redFlags: [
      'Any loss of consciousness, even for a few seconds',
      'Repeated vomiting or severe worsening headache',
      'Clear watery fluid or blood draining from nose or ears',
      'One pupil visibly larger than the other, seizure, or extreme confusion'
    ],
    doNots: [
      'Do NOT move person’s neck or spine if high-impact fall or vehicle accident occurred.',
      'Do NOT let the person return to sports or driving immediately.',
      'Do NOT give aspirin or ibuprofen right after head trauma (can worsen internal bleeding); use acetaminophen only if approved.'
    ]
  },
  {
    id: 'choking-allergic',
    name: 'Allergic Reaction',
    category: 'Critical / Emergency',
    severity: 'Immediate 111',
    shortDesc: 'Acute allergic hypersensitivity or anaphylaxis from foods, medications, or insect venom.',
    bodyRegions: ['head', 'torso', 'arms'],
    immediateAction: 'If swelling of lips/throat, wheezing, or difficulty breathing (anaphylaxis), use EpiPen into outer mid-thigh and call 111.',
    steps: [
      'Assess severity immediately: Mild (hives, itching) vs. Severe / Anaphylaxis (trouble breathing, swollen throat, dizziness).',
      'For severe symptoms: Inject epinephrine auto-injector (EpiPen) into the outer mid-thigh. Hold firmly in place for 3 seconds.',
      'Call 111 immediately and state "severe anaphylactic allergic reaction".',
      'Have the person lie flat with legs elevated unless they are vomiting or having severe breathing distress (then let them sit up slightly).',
      'If symptoms do not improve within 5-15 minutes and ambulance has not arrived, administer a second epinephrine dose if available.'
    ],
    redFlags: [
      'Swelling of tongue, lips, throat, or uvula',
      'High-pitched whistling sound when breathing (stridor) or wheezing',
      'Feeling faint, dizzy, rapid weak pulse, or collapsing'
    ],
    doNots: [
      'Do NOT delay using an EpiPen—epinephrine is life-saving and time-critical.',
      'Do NOT have the person stand up or walk around during anaphylaxis.',
      'Do NOT rely solely on antihistamines (like Benadryl) for anaphylaxis; they do not open airway.'
    ]
  },
  {
    id: 'poisoning',
    name: 'Poisoning',
    category: 'Critical / Emergency',
    severity: 'Immediate 111',
    shortDesc: 'Ingestion, inhalation, or skin contact with hazardous household chemicals or overdose.',
    bodyRegions: ['torso', 'head', 'hands'],
    immediateAction: 'Call Poison Control immediately: 0800 764 766 (NZ) / 1-800-222-1222 or 111 if person is unconscious or having seizures. DO NOT induce vomiting.',
    steps: [
      'If person is unconscious, having seizures, or not breathing: Call 111 immediately.',
      'If awake and stable: Call Poison Help line (1-800-222-1222 in US) or local poison center.',
      'Have the product container, bottle, or plant in hand to read exact ingredients to the specialist.',
      'If swallowed chemical: Follow poison specialist instructions. Do NOT give anything to drink unless told.',
      'If poison on skin or eyes: Flush immediately with continuous lukewarm water for 15-20 minutes.',
      'If inhaled toxic fumes: Move person to fresh air immediately.'
    ],
    redFlags: [
      'Person is unresponsive, convulsing, or breathing abnormally',
      'Burns or chemical redness around lips and mouth',
      'Confusion, hallucinations, or extreme drowsiness'
    ],
    doNots: [
      'Do NOT induce vomiting (acids, alkalis, or petroleum products burn the esophagus twice when coming up).',
      'Do NOT use syrup of ipecac or raw charcoal without medical instruction.',
      'Do NOT wait for symptoms to appear before calling Poison Control.'
    ]
  },
  {
    id: 'nosebleed',
    name: 'Nosebleed (Epistaxis)',
    category: 'Head, Eyes & Nose',
    severity: 'Home Care / Clinic',
    shortDesc: 'Bleeding from anterior nasal septum vessels caused by dry air, trauma, or nose picking.',
    bodyRegions: ['head'],
    immediateAction: 'Sit upright, lean forward slightly, and pinch the soft part of the nose continuously for 10 to 15 minutes. Breathe through mouth.',
    steps: [
      'Sit upright and lean forward slightly so blood drains out through nostrils rather than down throat.',
      'Pinch the soft, fleshy portion of both nostrils firmly shut against the nasal septum.',
      'Hold continuously for 10-15 minutes without letting go to check.',
      'Apply an ice pack wrapped in a cloth to the bridge of the nose and cheeks.',
      'Do not blow nose or pick nostrils for at least 12 hours after bleeding stops.'
    ],
    redFlags: [
      'Bleeding continues after 20-30 minutes of continuous direct pinching',
      'Bleeding is rapid and pours down back of throat even when leaning forward (posterior bleed)',
      'Nosebleed occurred after significant head trauma or car crash'
    ],
    doNots: [
      'Do NOT tilt the head backward (causes blood to drain into stomach, provoking vomiting).',
      'Do NOT pack the nostrils with coarse bathroom tissue.',
      'Do NOT blow nose forcefully immediately after bleeding stops.'
    ],
    timerType: 'nosebleed'
  },
  {
    id: 'insect-stings',
    name: 'Insect Stings & Bites',
    category: 'Stings & Bites',
    severity: 'Home Care / Clinic',
    shortDesc: 'Local pain, swelling, and redness from bees, wasps, yellowjackets, hornets, or ants.',
    bodyRegions: ['arms', 'legs', 'hands', 'torso', 'feet', 'head'],
    immediateAction: 'Scrape stinger out immediately with a credit card edge or fingernail. Wash with soap and apply a cold compress.',
    steps: [
      'Scrape the stinger out sideways immediately with a credit card or fingernail. Avoid squeezing venom sac.',
      'Wash the sting site gently with mild soap and water.',
      'Apply an ice pack wrapped in a towel for 10-15 minutes to reduce localized swelling and throbbing.',
      'Apply 1% hydrocortisone cream, calamine lotion, or baking soda paste to relieve itching.',
      'Take an over-the-counter antihistamine if itching or local hives are pronounced.'
    ],
    redFlags: [
      'Hives, itching, or swelling spreading far beyond the sting site to face, lips, or tongue',
      'Wheezing, throat tightness, or difficulty breathing (use EpiPen and call 111 immediately)',
      'Dizziness, nausea, vomiting, or fainting'
    ],
    doNots: [
      'Do NOT squeeze the stinger with tweezers (this injects residual venom into tissue).',
      'Do NOT scratch the sting area (introduces bacterial skin infection).',
      'Do NOT delay epinephrine if there is any history of anaphylaxis.'
    ],
    timerType: 'ice'
  },
  {
    id: 'splinter',
    name: 'Splinters & Embedded Shards',
    category: 'Wound & Bleeding',
    severity: 'Home Care / Clinic',
    shortDesc: 'Wood slivers, plant thorns, or glass fragments trapped in the epidermis or dermis.',
    bodyRegions: ['hands', 'feet', 'arms', 'legs'],
    immediateAction: 'Wash area with soap and water. Disinfect tweezers with alcohol and pull splinter straight out in the direction it entered.',
    steps: [
      'Wash your hands and the skin area around the splinter gently with soap and water.',
      'Sterilize the tips of clean tweezers with rubbing alcohol.',
      'If the tip is protruding: grasp firmly with tweezers and pull out smoothly at the same angle it went in.',
      'If just beneath the skin surface: gently sterilize a needle, ease skin over tip, then pull with tweezers.',
      'Wash the area again after removal, apply petroleum ointment, and cover with a bandage.'
    ],
    redFlags: [
      'Splinter is deeply embedded near a joint, in the eye, or under the nail bed',
      'Splinter appears to be dirty glass or metal',
      'Redness, pus, increasing warmth, or throbbing pain 24 hours later'
    ],
    doNots: [
      'Do NOT squeeze or pinch the splinter sideways (can break it into smaller fragments).',
      'Do NOT dig aggressively into deep tissue with non-sterile instruments.',
      'Do NOT leave organic material like thorns inside (high risk of fungal infection).'
    ]
  },
  {
    id: 'blister',
    name: 'Friction Blister',
    category: 'Wound & Bleeding',
    severity: 'Home Care / Clinic',
    shortDesc: 'Fluid-filled pocket caused by mechanical friction from shoes, tools, or athletic gear.',
    bodyRegions: ['feet', 'hands'],
    immediateAction: 'Keep blister intact if possible. Wash gently and cover with a hydrocolloid bandage or moleskin donut.',
    steps: [
      'Leave the blister roof intact whenever possible—it is the body’s sterile biological barrier against infection.',
      'Wash the area gently with mild soap and clean water. Pat dry.',
      'Protect from further friction with a hydrocolloid blister bandage or a donut-shaped moleskin pad.',
      'If blister bursts naturally: gently wash, leave overlying skin intact, smooth it down, apply petroleum jelly, and bandage.',
      'Change dressing daily or whenever it becomes wet or dirty.'
    ],
    redFlags: [
      'Blister fluid turns milky white or yellow pus',
      'Red streaks spreading outward from the blister',
      'Severe increasing pain, warmth, or fever'
    ],
    doNots: [
      'Do NOT puncture or peel the blister roof intentionally.',
      'Do NOT pull away loose skin flaps aggressively.',
      'Do NOT apply harsh alcohol directly to raw open blister base.'
    ]
  },
  {
    id: 'eye-irritant',
    name: 'Eye Irritant & Foreign Particle',
    category: 'Head, Eyes & Nose',
    severity: 'Urgent Medical Attention',
    shortDesc: 'Dust, eyelash, wood shavings, or chemical splash entering the conjunctiva or cornea.',
    bodyRegions: ['head'],
    immediateAction: 'Do NOT rub eye. Flush continuously with sterile saline or gentle clean tap water for 15 minutes. Blink frequently.',
    steps: [
      'Wash hands thoroughly before touching near the eye.',
      'Instruct the person strictly NOT to rub the eye (rubbing scratches the cornea).',
      'Gently pull down lower eyelid while person looks up to inspect for loose particle.',
      'Flush eye continuously with clean lukewarm tap water or sterile saline solution for 15 minutes.',
      'If particle does not wash out or pain persists, cover loosely with eye shield/gauze and see an eye doctor/urgent care.'
    ],
    redFlags: [
      'Object is embedded or penetrating the eyeball (do NOT touch or remove; call 111 / go to ER)',
      'Severe pain, sensitivity to light, or reduced vision after flushing',
      'Chemical splash (especially acid or alkali: flush continuously for 20-30 min and call 111)'
    ],
    doNots: [
      'Do NOT rub the eye with hands or knuckles.',
      'Do NOT try to remove an object embedded directly in the eyeball with cotton swabs or tweezers.',
      'Do NOT wear contact lenses until the eye has completely healed.'
    ],
    timerType: 'eye_flush'
  }
];
