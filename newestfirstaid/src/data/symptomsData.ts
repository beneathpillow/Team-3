export interface SymptomItem {
  id: string;
  name: string;
  isHighRisk: boolean;
  whatItMeans: string;
  immediateStep: string;
  orderedSteps: string[];
  doNots: string[];
  redFlags: string[];
  recommendedCategory: string;
}

export const SYMPTOMS_LIST: SymptomItem[] = [
  {
    id: 'trouble-breathing',
    name: 'Trouble breathing',
    isHighRisk: true,
    whatItMeans: 'Airway constriction, anaphylaxis, asthma, pneumothorax, or cardiac/respiratory emergency.',
    immediateStep: 'Help person sit upright, loosen tight collar/clothing, ask if they have an inhaler or EpiPen, and call 111 immediately.',
    orderedSteps: [
      'Call 111 immediately if the person is gasping, choking, or lips/tongue are turning pale or blue.',
      'Help the person sit upright and lean slightly forward with arms resting on knees or a table (do NOT lay them down flat).',
      'Loosen any tight collars, neckties, belts, or restrictive clothing around their chest.',
      'Check for personal emergency medication: ask if they have a blue asthma reliever inhaler (give 4 puffs via spacer) or an EpiPen if severe allergy.',
      'Keep the person calm, quiet, and stay with them continuously while paramedics are en route.'
    ],
    doNots: [
      'Do NOT make the person lie flat on their back (this compresses the lungs and worsens airway restriction).',
      'Do NOT give food, drink, or oral pain tablets during acute breathing difficulty.',
      'Do NOT crowd the person; ensure plenty of open, fresh air flow.'
    ],
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
    orderedSteps: [
      'Put on disposable gloves if available, or place a clean barrier between your hands and the blood.',
      'Press firmly and directly on the wound using sterile gauze, clean cloth, or a fresh folded towel.',
      'Maintain continuous, firm pressure for at least 10 full minutes without lifting the pad to peek.',
      'If blood soaks through, place another pad directly on top of the first one and keep pressing (do NOT remove the soaked pad).',
      'If no broken bones are suspected, elevate the bleeding limb above the level of the person’s heart.',
      'Once bleeding slows, secure the pad with a snug bandage. If blood spurts or bleeding does not stop after 10-15 minutes, dial 111 immediately.'
    ],
    doNots: [
      'Do NOT lift the dressing early to look—this pulls away newly forming clots and restarts bleeding.',
      'Do NOT remove any embedded foreign object (glass, knife, nail) that is stuck inside the wound.',
      'Do NOT use tourniquets on minor wounds unless trained and dealing with catastrophic arterial hemorrhage.'
    ],
    redFlags: [
      'Blood spurting in rhythm with heartbeat (arterial bleeding)',
      'Bleeding soaking through heavy towels within 2 minutes',
      'Person becoming pale, clammy, and dizzy'
    ],
    recommendedCategory: 'Hemorrhage & Wound Care'
  },
  {
    id: 'confusion',
    name: 'Confusion',
    isHighRisk: true,
    whatItMeans: 'Head trauma / concussion, severe hypothermia, poisoning, stroke, or severe systemic shock.',
    immediateStep: 'Keep person seated or lying down in a quiet area. Ask basic orientation questions (Name, Year, Location). Do not leave alone. Call 111 if sudden onset.',
    orderedSteps: [
      'Guide the person to sit or lie down in a safe, quiet area to prevent unexpected falls or injury.',
      'Quickly perform the FAST Stroke Test: Check if face droops on one side, if they can raise both arms, or if speech is slurred. If positive, call 111 immediately.',
      'Ask 3 simple questions: "What is your name?", "Where are we right now?", and "What month/year is it?" to evaluate mental orientation.',
      'Check for a Medical Alert bracelet, head swelling/bruising, unequal pupil sizes, or empty medication packets nearby.',
      'If confusion followed a fall or head impact, keep their neck still and call 111.',
      'Stay beside them, speak in short, gentle sentences, and monitor their alertness continuously.'
    ],
    doNots: [
      'Do NOT leave the confused person alone or unmonitored for any period.',
      'Do NOT offer food, tea, or sedating medication.',
      'Do NOT argue or agitate the person if they are disoriented.'
    ],
    redFlags: [
      'Confusion following a head strike, fall, or motor vehicle accident',
      'Slurred speech, facial drooping, or one-sided arm weakness',
      'Aggressive disorientation, hallucinations, or progressive loss of consciousness'
    ],
    recommendedCategory: 'Neurological / Head Trauma'
  },
  {
    id: 'pale-blue-skin',
    name: 'Skin turning pale / blue',
    isHighRisk: true,
    whatItMeans: 'Severe lack of oxygen in blood (cyanosis), severe hypothermia, or cardiovascular collapse/shock.',
    immediateStep: 'Call 111 immediately. Check airway and breathing. If cold, wrap in dry blankets. If lying down, elevate feet 12 inches if no spinal trauma.',
    orderedSteps: [
      'Call 111 immediately—blue or pale/ashen skin indicates critical oxygen shortage (cyanosis) or circulatory shock.',
      'Check responsiveness and breathing immediately. If unconscious and not breathing normally, begin CPR (30 chest compressions to 2 breaths).',
      'If conscious, lay the person flat on their back and elevate their legs 30 cm (12 inches) on cushions, unless head, neck, or pelvic trauma is suspected.',
      'Wrap the person in clean, warm blankets or jackets to preserve body temperature, covering their head while keeping airway clear.',
      'Loosen tight clothing around neck, chest, and waist to assist blood circulation.',
      'Reassure the person and monitor breathing rate until emergency paramedics arrive.'
    ],
    doNots: [
      'Do NOT give the person anything to eat or drink, even if they complain of severe thirst.',
      'Do NOT apply direct high heat (like boiling water bottles or heaters) directly against cold skin.',
      'Do NOT move the person if spinal trauma is suspected from a fall.'
    ],
    redFlags: [
      'Blue or grey tint around lips, gums, tongue, or nailbeds',
      'Skin cold, clammy, and mottled grayish-blue',
      'Weak rapid pulse, fainting, or progressive collapse'
    ],
    recommendedCategory: 'Critical Hypoxia / Shock'
  },
  {
    id: 'dizziness-fainting',
    name: 'Dizziness / fainting',
    isHighRisk: true,
    whatItMeans: 'Sudden drop in blood pressure (orthostatic/vasovagal), dehydration, internal bleeding, concussion, or heart arrhythmia.',
    immediateStep: 'Help person lie flat on their back and elevate legs about 12 inches. Loosen tight clothing. Ensure plenty of fresh air.',
    orderedSteps: [
      'Help the person lie flat on the floor immediately to restore blood flow to the brain.',
      'Elevate their feet about 30 cm (12 inches) above heart level using a pillow, backpack, or folded coats.',
      'Loosen tight collars, neckties, belts, and constrictive waistbands.',
      'Ensure plenty of fresh air circulation (open a window or fan fresh air; ask onlookers to step back).',
      'Check responsiveness: if the person does not wake up within 60 seconds, turn them onto their side into the recovery position and call 111.',
      'Once fully alert, keep them lying down for 10-15 minutes before allowing them to sit up very slowly.'
    ],
    doNots: [
      'Do NOT let the person stand up quickly after regaining consciousness.',
      'Do NOT slap their face, throw cold water on them, or place a pillow under their head while unconscious.',
      'Do NOT give liquids until they are fully alert and seated upright.'
    ],
    redFlags: [
      'Fainting during physical exertion or accompanied by chest pain / palpitations',
      'Person remains unresponsive for longer than 60 seconds',
      'Fainting accompanied by seizure convulsions or following a hard blow to the head'
    ],
    recommendedCategory: 'Circulatory / Syncope'
  },
  {
    id: 'severe-pain',
    name: 'Severe pain',
    isHighRisk: false,
    whatItMeans: 'Potential bone fracture, deep burn, tendon tear, kidney stone, or acute abdominal emergency.',
    immediateStep: 'Help the person find a position of minimal discomfort. Support injured limbs with soft pillows. Do not offer food or drink before medical evaluation.',
    orderedSteps: [
      'Help the person find a position of maximum comfort (such as lying with knees bent for belly pain, or supported upright for chest comfort).',
      'Screen for life threats: if pain is in the chest spreading to jaw/arm, or a sudden "thunderclap" headache, call 111 immediately.',
      'Support any injured extremity using soft cushions, rolled blankets, or pillows to prevent painful movement.',
      'If the pain is from an acute twist or fall, apply a towel-wrapped cold pack for 15-20 minutes.',
      'Calm and reassure the person; encourage slow, deep diaphragmatic breathing to manage pain spikes.',
      'Arrange safe transport to an urgent medical clinic or emergency room.'
    ],
    doNots: [
      'Do NOT offer food, water, or oral pain killers if severe belly pain or emergency surgery may be needed.',
      'Do NOT massage or forcefully move a severely painful limb.',
      'Do NOT apply heat to a new, acute swelling injury during the first 48 hours.'
    ],
    redFlags: [
      'Crushing chest pressure or tightness spreading to shoulder, neck, or jaw',
      'Sudden "worst headache of your life" with neck stiffness',
      'Severe abdominal pain with vomiting blood or rigid, rock-hard stomach wall'
    ],
    recommendedCategory: 'Acute Trauma / Organ Distress'
  },
  {
    id: 'cant-move-limb',
    name: "Can't move a limb normally",
    isHighRisk: false,
    whatItMeans: 'Bone fracture, joint dislocation, severe ligament rupture, or peripheral nerve compression.',
    immediateStep: 'Do NOT force or test movement. Support the limb in the exact position it was found using pillows, folded towels, or a cardboard splint.',
    orderedSteps: [
      'Instruct the person to keep the limb completely still—do NOT attempt to test movement or walk on it.',
      'Support the injured limb in the exact position found using soft cushions, pillows, or folded blankets.',
      'Remove constricting rings, bracelets, watches, or tight shoes before swelling develops.',
      'Check nerve & blood flow: touch the fingers or toes to confirm they are pink, warm, and can feel your gentle pinch.',
      'Apply a wrapped ice pack (15-20 minutes) around the painful joint to control swelling, without pressing on bone.',
      'If the bone is piercing the skin, or if fingers/toes are cold, pale, and numb, call 111 immediately. Otherwise, transport to an Urgent Care clinic.'
    ],
    doNots: [
      'Do NOT attempt to force, straighten, reset, or push back an angulated bone or displaced joint.',
      'Do NOT allow the person to walk on an injured leg or bear weight on an injured ankle.',
      'Do NOT apply raw ice directly to skin without a cloth barrier.'
    ],
    redFlags: [
      'Limb is bent at an unnatural angle or bone fragments are visible through open skin',
      'Fingers or toes turn blue, white, cold, or completely numb (circulatory cutoff)',
      'Severe pain accompanied by rapid swelling and tenseness'
    ],
    recommendedCategory: 'Musculoskeletal / Fracture'
  },
  {
    id: 'something-stuck',
    name: 'Something stuck in the body',
    isHighRisk: false,
    whatItMeans: 'Impaled foreign object (nail, knife, glass shard, branch, fishhook).',
    immediateStep: 'DO NOT pull the object out. Secure and stabilize it in place using bulky rolled dressings on both sides and seek urgent care/ER.',
    orderedSteps: [
      'DO NOT pull, twist, or extract the impaled object—it is currently acting as a plug preventing heavy arterial bleeding.',
      'Gently cut or remove clothing around the injury site to expose the skin without moving the embedded object.',
      'Place thick, rolled sterile bandages or rolled towels on both sides of the object to build up support.',
      'Secure the rolled supports with a wide bandage wrapped diagonally around the limb, taking care not to push down on the object.',
      'If there is active bleeding around the base, apply direct pressure only to the edges of the wound around the object.',
      'Call 111 if the object is in the eye, neck, chest, or abdomen, or if bleeding is uncontrollable. Otherwise proceed immediately to the nearest Emergency Room.'
    ],
    doNots: [
      'Do NOT remove the embedded object under any circumstances.',
      'Do NOT put pressure directly on top of the embedded item.',
      'Do NOT let the person eat or drink in case emergency surgery is required.'
    ],
    redFlags: [
      'Object is lodged in the eye, neck, skull, chest, or abdomen',
      'The object is visibly vibrating or pulsating with each heartbeat',
      'Rapid, heavy blood loss around the object that cannot be controlled'
    ],
    recommendedCategory: 'Impaled Object'
  },
  {
    id: 'burned-skin',
    name: 'Burned skin',
    isHighRisk: false,
    whatItMeans: 'Thermal contact burn, liquid scald, electrical injury, or chemical reaction.',
    immediateStep: 'Hold under cool running tap water continuously for 15-20 minutes. Remove constricting jewelry before swelling. Cover loosely with cling wrap.',
    orderedSteps: [
      'Immediately hold the burned area under clean, cool running tap water for 20 continuous minutes.',
      'Carefully remove rings, watches, bracelets, belts, and tight clothing near the burn before the area swells.',
      'Do NOT peel off any clothing that has melted and stuck firmly to the burned skin.',
      'Cover the cooled burn loosely with clean plastic cling wrap (apply in flat sheets, never wrap tightly around a limb) or a clean, non-fluffy cloth.',
      'Keep the rest of the person warm with a blanket to prevent hypothermia during prolonged water cooling.',
      'Seek emergency hospital care (111) if the burn is larger than the palm of their hand, involves the face/neck/hands/joints, or was caused by chemicals or electricity.'
    ],
    doNots: [
      'Do NOT apply ice, iced water, butter, oil, grease, or toothpaste (these trap heat and damage deeper tissue).',
      'Do NOT burst, prick, or drain any blisters.',
      'Do NOT use fluffy cotton wool or adhesive plasters directly over the burn surface.'
    ],
    redFlags: [
      'Burn looks leathery, waxy white, or charred dark brown/black (deep full-thickness burn)',
      'Burn covers a joint, the face, throat, hands, feet, or groin',
      'Burn caused by high-voltage electricity or caustic chemical'
    ],
    recommendedCategory: 'Thermal Trauma'
  },
  {
    id: 'swelling',
    name: 'Swelling',
    isHighRisk: false,
    whatItMeans: 'Acute inflammation, ligament sprain, contusion, insect venom reaction, or fracture.',
    immediateStep: 'Rest the area, apply a cold pack wrapped in a towel for 15-20 minutes, and elevate the area above the heart.',
    orderedSteps: [
      'Rest: Immediately stop moving or putting weight on the swollen limb to prevent tissue tearing.',
      'Ice: Apply an ice pack wrapped in a damp tea towel for 15-20 minutes every 2-3 hours for the first 48 hours.',
      'Compress: Wrap an elastic bandage around the swollen joint starting furthest from the heart, snug enough for support without pinching or numbness.',
      'Elevate: Prop the swollen limb on pillows so it rests above the level of the heart to encourage lymphatic drainage.',
      'Check circulation: Ensure toes or fingers remain warm, pink, and maintain normal feeling.',
      'EMERGENCY: If swelling involves the face, lips, tongue, or airway accompanied by wheezing or hives, call 111 immediately for anaphylaxis.'
    ],
    doNots: [
      'Do NOT apply direct heat (hot baths, heat rubs, saunas) during the first 48 hours as it increases swelling.',
      'Do NOT wrap compression bandages so tightly that fingers or toes turn purple, cold, or numb.',
      'Do NOT consume alcohol in the first 48 hours (alcohol dilates blood vessels and increases swelling).'
    ],
    redFlags: [
      'Swelling in the face, lips, throat, or neck with hoarseness or difficulty swallowing (call 111)',
      'Rapidly ballooning painful lump (hematoma) under the skin',
      'Severe tightness in limb with loss of pulse or sensation (compartment syndrome)'
    ],
    recommendedCategory: 'Inflammation & Joint Trauma'
  },
  {
    id: 'numbness',
    name: 'Numbness',
    isHighRisk: false,
    whatItMeans: 'Nerve compression, severe cold injury/frostbite, compartment syndrome, or circulatory cutoff.',
    immediateStep: 'Check pulse and temperature below the numb area. Loosen any tight rings, bandages, or boots immediately.',
    orderedSteps: [
      'Quickly check the FAST stroke signs: Face drooping on one side, Arm numbness/weakness, Slurred speech. If any are present, call 111 immediately.',
      'Immediately remove any tight rings, watch straps, tight elastic bandages, socks, or constricting boots.',
      'Inspect the affected area: check skin color and temperature compared to the opposite uninjured side.',
      'Gently reposition the limb into a neutral, relaxed position to relieve nerve pinch or pressure.',
      'Protect the numb area from high temperatures (avoid boiling hot water or direct heaters, which cause severe painless burns).',
      'If numbness follows a neck or spinal injury, keep the person completely still and dial 111 immediately.'
    ],
    doNots: [
      'Do NOT expose numb skin to high heat sources, heating pads, or hot water bottles.',
      'Do NOT aggressively rub or massage skin that is numb from severe cold (this shatters frozen cells).',
      'Do NOT move a person with numbness following a high fall or vehicle impact.'
    ],
    redFlags: [
      'Sudden numbness on one entire side of the face, arm, or leg (stroke sign)',
      'Numbness accompanied by loss of bladder or bowel control after a back injury',
      'Limb turns pale, cold, marble-white, and has no pulse'
    ],
    recommendedCategory: 'Neurological / Vascular'
  },
  {
    id: 'vomiting',
    name: 'Vomiting',
    isHighRisk: false,
    whatItMeans: 'Concussion / head injury, toxic ingestion/poisoning, heat exhaustion, or acute abdominal emergency.',
    immediateStep: 'Turn person onto their side (recovery position) to prevent choking on vomit. Keep airway clear. Do not give medication without poison control advice.',
    orderedSteps: [
      'If the person is drowsy, lying down, or disoriented, turn them onto their side into the Recovery Position immediately to prevent vomit entering the lungs.',
      'Check if they hit their head: repeated vomiting following a bump or strike to the head is a key sign of intracranial swelling—call 111 immediately.',
      'Check for poisoning: ask if they swallowed household chemicals, wild mushrooms/plants, or medication. If suspected, call 111 or the National Poisons Centre.',
      'Keep their mouth and airway clear with a clean cloth.',
      'Once active vomiting pauses, give tiny sips of water or electrolyte solution every 10-15 minutes (do NOT give large glasses).',
      'Keep the person calm, cool, and monitor alertness.'
    ],
    doNots: [
      'Do NOT let a drowsy or unconscious person lie flat on their back where they can choke.',
      'Do NOT induce vomiting with salt water or your fingers unless explicitly told by the Poisons Centre.',
      'Do NOT give solid foods, milk, or dairy until their stomach has settled for several hours.'
    ],
    redFlags: [
      'Repeated vomiting after a blow to the head, fall, or sport concussion (call 111)',
      'Vomiting bright red blood or material that looks like dark coffee grounds',
      'Severe, unrelenting abdominal pain or high fever'
    ],
    recommendedCategory: 'Gastrointestinal / Neurological'
  }
];
