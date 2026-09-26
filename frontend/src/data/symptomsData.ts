export interface SymptomItem {
  id: string;
  name: string;
  isHighRisk: boolean;
  whatItMeans: string;
  immediateStep: string;
  redFlags: string[];
  recommendedCategory: string;
}

export const SYMPTOMS_LIST: SymptomItem[] = [
  {
    id: 'trouble-breathing',
    name: 'Trouble breathing',
    isHighRisk: true,
    whatItMeans: 'Airway constriction, anaphylaxis, asthma, pneumothorax, or cardiac/respiratory emergency.',
    immediateStep: 'Help person sit upright, loosen tight collar/clothing, ask if they have an inhaler or EpiPen, and call 911 immediately.',
    redFlags: [
      'Gasping, stridor (high whistling sound), or inability to speak full sentences',
      'Bluish lips, tongue, or fingertips (cyanosis)',
      'Chest indrawing / ribs sucking in with each breath'
    ],
    recommendedCategory: 'Critical Airway Emergency'
  },
  {
    id: 'bleeding',
    name: 'Bleeding',
    isHighRisk: false,
    whatItMeans: 'Surface capillary laceration, arterial cut, puncture, or open wound.',
    immediateStep: 'Take clean gauze or towel and apply firm, continuous direct pressure with both hands for 10 minutes without lifting.',
    redFlags: [
      'Blood spurting in rhythm with heartbeat',
      'Bleeding through heavy towels within 2 minutes',
      'Person becoming pale, clammy, and dizzy'
    ],
    recommendedCategory: 'Hemorrhage & Wound Care'
  },
  {
    id: 'confusion',
    name: 'Confusion',
    isHighRisk: true,
    whatItMeans: 'Head trauma / concussion, severe hypothermia, poisoning, stroke, or severe systemic shock.',
    immediateStep: 'Keep person seated or lying down in a quiet area. Ask basic orientation questions (Name, Year, Location). Do not leave alone. Call 911 if sudden onset.',
    redFlags: [
      'Confusion following a head strike or fall',
      'Slurred speech or facial drooping on one side (FAST stroke test)',
      'Aggressive disorientation, hallucinations, or combativeness'
    ],
    recommendedCategory: 'Neurological / Head Trauma'
  },
  {
    id: 'pale-blue-skin',
    name: 'Skin turning pale / blue',
    isHighRisk: true,
    whatItMeans: 'Severe lack of oxygen in blood (cyanosis), severe hypothermia, or cardiovascular collapse/shock.',
    immediateStep: 'Call 911 immediately. Check airway and breathing. If cold, wrap in dry blankets. If lying down, elevate feet 12 inches if no spinal trauma.',
    redFlags: [
      'Blue tint around lips, gums, tongue, or nailbeds',
      'Skin cold, clammy, and mottled grayish-blue',
      'Weak rapid pulse or fainting'
    ],
    recommendedCategory: 'Critical Hypoxia / Shock'
  },
  {
    id: 'dizziness-fainting',
    name: 'Dizziness / fainting',
    isHighRisk: true,
    whatItMeans: 'Sudden drop in blood pressure (orthostatic/vasovagal), dehydration, internal bleeding, concussion, or heart arrhythmia.',
    immediateStep: 'Help person lie flat on their back and elevate legs about 12 inches. Loosen tight clothing. Ensure plenty of fresh air.',
    redFlags: [
      'Fainting during exertion or with chest pain',
      'Person remains unconscious for more than 1 minute',
      'Fainting after a hard fall or blow to the head'
    ],
    recommendedCategory: 'Circulatory / Syncope'
  },
  {
    id: 'severe-pain',
    name: 'Severe pain',
    isHighRisk: false,
    whatItMeans: 'Potential bone fracture, deep burn, tendon tear, kidney stone, or acute abdominal emergency.',
    immediateStep: 'Help the person find a position of minimal discomfort. Support injured limbs with soft pillows. Do not offer food or drink before medical evaluation.',
    redFlags: [
      'Crushing chest pain radiating to left arm or jaw',
      'Sudden "worst headache of life"',
      'Severe pain accompanied by abdominal rigidity or high fever'
    ],
    recommendedCategory: 'Acute Trauma / Organ Distress'
  },
  {
    id: 'cant-move-limb',
    name: "Can't move a limb normally",
    isHighRisk: false,
    whatItMeans: 'Bone fracture, joint dislocation, severe ligament rupture, or peripheral nerve compression.',
    immediateStep: 'Do NOT force or test movement. Support the limb in the exact position it was found using pillows, folded towels, or a cardboard splint.',
    redFlags: [
      'Limb is bent or rotated at an unnatural angle',
      'Numbness or inability to feel touch on fingers/toes',
      'Skin over joint or bone is pale, purple, or cold'
    ],
    recommendedCategory: 'Musculoskeletal / Fracture'
  },
  {
    id: 'something-stuck',
    name: 'Something stuck in the body',
    isHighRisk: false,
    whatItMeans: 'Impaled foreign object (nail, knife, glass shard, branch, fishhook).',
    immediateStep: 'DO NOT pull the object out. Secure and stabilize it in place using bulky rolled dressings on both sides and seek urgent care/ER.',
    redFlags: [
      'Object is in eye, neck, chest, abdomen, or groin',
      'Active heavy bleeding around the base of the object',
      'Object is vibrating or pulsating with heartbeat'
    ],
    recommendedCategory: 'Impaled Object'
  },
  {
    id: 'burned-skin',
    name: 'Burned skin',
    isHighRisk: false,
    whatItMeans: 'Thermal contact burn, liquid scald, electrical injury, or chemical reaction.',
    immediateStep: 'Hold under cool running tap water continuously for 15-20 minutes. Remove constricting jewelry before swelling. Cover loosely with cling wrap.',
    redFlags: [
      'Skin appears leathery, white, or charred black',
      'Burn covers large surface area (hands, face, chest, joints)',
      'Caused by high-voltage electricity or industrial chemical'
    ],
    recommendedCategory: 'Thermal Trauma'
  },
  {
    id: 'swelling',
    name: 'Swelling',
    isHighRisk: false,
    whatItMeans: 'Acute inflammation, ligament sprain, contusion, insect venom reaction, or fracture.',
    immediateStep: 'Rest the area, apply a cold pack wrapped in a towel for 15-20 minutes, and elevate the area above the heart.',
    redFlags: [
      'Swelling in face, lips, tongue, or neck with difficulty swallowing/breathing (call 911)',
      'Rapidly ballooning hematoma under skin',
      'Compartment-like severe tightness with loss of pulse'
    ],
    recommendedCategory: 'Inflammation & Joint Trauma'
  },
  {
    id: 'numbness',
    name: 'Numbness',
    isHighRisk: false,
    whatItMeans: 'Nerve compression, severe cold injury/frostbite, compartment syndrome, or circulatory cutoff.',
    immediateStep: 'Check pulse and temperature below the numb area. Loosen any tight rings, bandages, or boots immediately.',
    redFlags: [
      'Sudden numbness on one entire side of the face or body (stroke warning)',
      'Numbness after severe fall or neck injury',
      'Limb is cold, white, and pulseless'
    ],
    recommendedCategory: 'Neurological / Vascular'
  },
  {
    id: 'vomiting',
    name: 'Vomiting',
    isHighRisk: false,
    whatItMeans: 'Concussion / head injury, toxic ingestion/poisoning, heat exhaustion, or acute abdominal emergency.',
    immediateStep: 'Turn person onto their side (recovery position) to prevent choking on vomit. Keep airway clear. Do not give medication without poison control advice.',
    redFlags: [
      'Vomiting following a head strike or fall (intracranial pressure sign)',
      'Vomiting dark "coffee ground" material or bright red blood',
      'Suspected chemical or medication overdose'
    ],
    recommendedCategory: 'Gastrointestinal / Neurological'
  }
];
