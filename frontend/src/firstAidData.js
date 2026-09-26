const st = "https://www.stjohn.org.nz/first-aid/first-aid-library/";
export const topics = [
  {
    id: "burn",
    title: "Burn / Scald",
    hint: "Heat, hot water or steam",
    icon: "burn",
    source: st + "burns/",
    emergency: [
      "Trouble breathing, or burns to the airway or eyes.",
      "A very large burn, severe pain, or a chemical burn.",
    ],
    steps: [
      "Move away from the heat source safely.",
      "Cool the burn with cool running water for at least 20 minutes. Keep the rest of the body warm.",
      "Remove nearby jewellery and loose clothing, unless stuck to the skin.",
      "Cover loosely with a non-stick dressing or cling film. Do not put cling film on the face.",
    ],
    avoid: [
      "Do not use ice, butter, toothpaste or creams.",
      "Do not burst blisters or pull off stuck clothing.",
    ],
    care: [
      "Get urgent care for deep burns, electrical burns, or burns larger than the person’s palm.",
      "Get care for burns on the hands, feet, face, groin or a major joint, or signs of infection.",
    ],
  },
  {
    id: "bleeding",
    title: "Cut / Heavy bleeding",
    hint: "Cuts, wounds or blood loss",
    icon: "drop",
    source: st + "bleeding/",
    emergency: [
      "Severe bleeding that will not stop.",
      "Amputation, a crush injury or suspected internal bleeding.",
    ],
    steps: [
      "Press firmly on the wound with a clean cloth or dressing.",
      "Keep steady pressure on the wound. If blood soaks through, add another dressing and keep pressing.",
      "Once bleeding is controlled, secure a clean dressing.",
    ],
    avoid: [
      "Do not repeatedly lift the dressing to check.",
      "Do not remove a large embedded object. Press beside it.",
    ],
    care: [
      "Get care for deep or dirty wounds, wounds that may need stitches, or increasing redness, swelling, pus or fever.",
    ],
  },
  {
    id: "puncture",
    title: "Puncture / Stuck object",
    hint: "Something has pierced the skin",
    icon: "bandage",
    source: "https://healthify.nz/health-a-z/c/cuts-and-grazes",
    emergency: ["Severe bleeding, faintness, confusion or unresponsiveness."],
    steps: [
      "If a large object is embedded, leave it in place. Pad around it and press beside it, not on it. Seek urgent medical help.",
      "For a small puncture with no object remaining, rinse with running water and cover with a clean dressing.",
      "Ask a healthcare professional whether a tetanus booster is needed.",
    ],
    avoid: ["Do not pull out or push on an embedded object."],
    care: [
      "Get care for deep or contaminated wounds, or if an object may remain inside.",
      "For a used-needle injury, seek medical care straight away.",
    ],
  },
  {
    id: "head",
    title: "Head injury",
    hint: "A bump, fall or blow to the head",
    icon: "head",
    source: st + "head-injuries/",
    emergency: [
      "Unconsciousness, difficulty waking or a seizure.",
      "Worsening confusion, weakness, trouble speaking or severe bleeding.",
      "A suspected serious neck or spinal injury.",
    ],
    steps: [
      "Keep the person still and check their breathing and responsiveness.",
      "For minor swelling, use a cold pack wrapped in cloth.",
      "Stay with them and watch for changes. Avoid moving their neck if a spinal injury is possible.",
    ],
    care: [
      "Seek medical assessment for headache, vomiting, dizziness, unusual sleepiness or confusion after a head injury. Call 111 if symptoms are severe or worsening.",
    ],
  },
  {
    id: "fracture",
    title: "Suspected broken bone",
    hint: "A fracture or injured limb",
    icon: "bone",
    source: st + "fractures-and-dislocations/",
    emergency: [
      "An exposed bone, major bleeding or a severe injury.",
      "A suspected neck, spine, pelvis or thigh fracture, or the person cannot safely be moved.",
    ],
    steps: [
      "Keep the injured area still.",
      "Support it in the position found, using padding or a sling if comfortable.",
    ],
    avoid: ["Do not straighten the limb or push a bone back into place."],
    care: [
      "Get urgent medical assessment for a suspected fracture, severe swelling or pain, or inability to use the limb.",
    ],
  },
  {
    id: "choking",
    title: "Choking",
    hint: "Something is blocking the airway",
    icon: "air",
    source: st + "choking/",
    emergency: [
      "They cannot breathe, speak or cough effectively, or become unresponsive.",
      "An object stays stuck in the throat.",
    ],
    steps: [
      "If they can breathe and cough effectively, encourage coughing and stay with them. Do not give back blows while they can cough effectively.",
      "For an adult or child with a completely blocked airway: call 111 on speaker. Lean them forward and give up to 5 blows between the shoulder blades with the heel of your hand. Check after each blow.",
      "If still blocked, give up to 5 chest thrusts. From behind, place a fist at the centre of the chest, grasp it with the other hand and pull sharply inward and upward. Check after each thrust. Repeat back blows and chest thrusts until cleared or help arrives.",
      "Babies need a different technique. Call 111 immediately and follow the call handler’s instructions.",
      "If unresponsive and not breathing normally, start CPR and follow 111 instructions.",
    ],
    avoid: ["Do not blindly put your fingers into the mouth."],
  },
  {
    id: "allergy",
    title: "Allergic reaction",
    hint: "Swelling, rash or breathing trouble",
    icon: "shield",
    source: st + "allergic-reactions/",
    emergency: [
      "Trouble breathing, tongue or throat swelling.",
      "Faintness, confusion, unconsciousness or a rapidly worsening reaction.",
    ],
    steps: [
      "For a severe reaction, call 111 and help use their adrenaline auto-injector, following its instructions.",
      "Keep them lying flat. If breathing is difficult, allow them to sit with their legs outstretched. Do not let them stand or walk.",
      "If no better after 5 minutes, help use a second auto-injector if available.",
      "Stay with them. If unresponsive and not breathing normally, start CPR.",
    ],
    care: [
      "For a mild reaction with no emergency signs, ask Healthline for advice.",
    ],
  },
  {
    id: "cold",
    title: "Cold injury / Hypothermia",
    hint: "Very cold, wet or exposed",
    icon: "snow",
    source: st + "immediate-first-aid1/environmental-conditions",
    emergency: [
      "Confusion, marked drowsiness, unresponsiveness or abnormal breathing.",
      "Severe cold exposure or inability to warm up.",
    ],
    steps: [
      "Move them into a warm, dry place. Handle them gently.",
      "Remove wet clothing and wrap them in dry blankets or clothes.",
      "Warm gradually and stay with them.",
    ],
    avoid: [
      "Do not use very hot water or intense direct heat.",
      "Do not rub cold or numb skin.",
    ],
    care: ["Get medical advice for persistent numbness or skin damage."],
  },
  {
    id: "poison",
    title: "Poisoning",
    hint: "Medicines, chemicals or harmful substances",
    icon: "bottle",
    source: "https://poisons.co.nz/",
    emergency: [
      "Unconsciousness, a seizure, trouble breathing or serious illness.",
    ],
    steps: [
      "Move away from the substance if safe. Do not enter a contaminated area.",
      "Call the National Poisons Centre promptly: 0800 764 766. Do not wait for symptoms.",
      "Keep the product container or label for the adviser.",
      "For skin exposure, remove contaminated clothing and rinse with plenty of water. Brush off dry powder first, avoiding exposure yourself.",
    ],
    avoid: [
      "Do not induce vomiting.",
      "Do not give food or drink unless a health professional advises it.",
    ],
    poison: true,
  },
];
export const warningSigns = [
  "Severe difficulty breathing",
  "Unconscious or hard to wake",
  "Severe bleeding that will not stop",
  "Seizure",
  "Chest pain or tightness",
  "Serious burn",
  "Severe allergic reaction",
  "Major injury or suspected spinal injury",
];
