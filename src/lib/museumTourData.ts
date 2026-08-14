export interface TourPhase {
  phase: string;
  title: string;
  duration: string;
  description: string;
  highlight: string;
}

export interface ArtifactItem {
  title: string;
  period: string;
  origin: string;
  description: string;
}

export interface MuseumTourCity {
  id: string;
  name: string;
  state: string;
  tagline: string;
  museumName: string;
  architecture: string;
  overview: string;
  tourTitle: string;
  tourDuration: string;
  languages: string[];
  audioGuide: boolean;
  guidedPassPrice: string;
  badge: string;
  accentColor: string;
  // Percentage coordinates on the custom India Map SVG (viewBox 0 0 800 900)
  mapCoordinates: { x: number; y: number };
  pinLabelPosition: "top" | "bottom" | "left" | "right";
  tourPhases: TourPhase[];
  artifacts: ArtifactItem[];
  culturalHeritage: {
    tradition: string;
    description: string;
    keyFigures: string[];
  };
  tourSignificance: string;
  ticketIncludes: string[];
}

export const MUSEUM_TOUR_CITIES: MuseumTourCity[] = [
  {
    id: "delhi",
    name: "Delhi",
    state: "Delhi NCR",
    tagline: "Epicenter of National Sovereignty & Sovereign Trials",
    museumName: "Red Fort Freedom Fighters Museum & Kranti Mandir",
    architecture: "17th-century Mughal Red Sandstone Citadel, Lahori Gate & Diwan-i-Khas",
    overview:
      "Situated within the historic barracks and pavilions of the Red Fort, this archival complex documents the pivotal epochs of India's independence struggle—from the 1857 First War of Independence to the historic INA Red Fort trials and the 1947 midnight declaration.",
    tourTitle: "Imperial Ramparts to Freedom: The Red Fort Sovereign Walk",
    tourDuration: "120 Minutes",
    languages: ["English", "Hindi", "Urdu", "Punjabi"],
    audioGuide: true,
    guidedPassPrice: "₹1,000 / Adult",
    badge: "National Flagship Complex",
    accentColor: "red",
    mapCoordinates: { x: 38, y: 31 },
    pinLabelPosition: "right",
    tourPhases: [
      {
        phase: "Phase 01",
        title: "1857 Rebellion Barracks & Cannon Gate",
        duration: "30 mins",
        description:
          "Walk through the military barracks where Indian soldiers rose against colonial officers, featuring original artillery, tactical charts, and imperial declarations.",
        highlight: "Last Mughal Emperor Bahadur Shah Zafar's handwritten royal court decrees.",
      },
      {
        phase: "Phase 02",
        title: "Azad Hind Fauj (INA) Courtroom & Trial Chamber",
        duration: "35 mins",
        description:
          "Inspect the restored military courtroom where Colonel Prem Sahgal, Colonel Gurbaksh Singh Dhillon, and Major General Shahnawaz Khan were tried, igniting national outrage.",
        highlight: "Original defense transcripts prepared by legal legends Bhulabhai Desai and Jawaharlal Nehru.",
      },
      {
        phase: "Phase 03",
        title: "Revolutionary Cells & Bhagat Singh Vault",
        duration: "25 mins",
        description:
          "Examine forensic case files, clandestine printing presses, and weapon archives used by the Hindustan Socialist Republican Association (HSRA).",
        highlight: "Bhagat Singh's handwritten Lahore Conspiracy trial notes and diary excerpts.",
      },
      {
        phase: "Phase 04",
        title: "Midnight 1947 Independence Ramparts Memorial",
        duration: "30 mins",
        description:
          "Ascend to the Lahori Gate ramparts where the National Flag was hoisted, concluding with a multimedia tribute to unsung regional martyrs.",
        highlight: "Original silk Tricolor hoisted at the dawn of independence in August 1947.",
      },
    ],
    artifacts: [
      {
        title: "Netaji's INA Officer Uniform & Sword",
        period: "1943",
        origin: "Azad Hind Government, Singapore / Imphal",
        description: "Ceremonial military tunic, boots, and ceremonial sabre carried by Netaji Subhas Chandra Bose.",
      },
      {
        title: "1857 Siege Cannonballs & Matchlocks",
        period: "1857",
        origin: "Kashmiri Gate, Old Delhi",
        description: "Original recovered iron ordnance and sepoy matchlock muskets from the Siege of Delhi.",
      },
      {
        title: "HSRA Clandestine Press & Pamphlet Plates",
        period: "1929",
        origin: "Delhi Underground Cell",
        description: "Zinc printing plates used to publish the iconic 'To the Deaf' leaflets hurled in the Central Assembly.",
      },
      {
        title: "Constituent Assembly Sovereign Pen",
        period: "1946–1949",
        origin: "Constitution Hall, New Delhi",
        description: "Historic gold-nib pen used by the drafting committee to sign the sovereign register of India.",
      },
    ],
    culturalHeritage: {
      tradition: "Yamuna-Ganga Composite Heritage & Hindustani Literary Renaissance",
      description:
        "Delhi's cultural landscape melds ancient imperial architectural mastery with the impassioned patriotic poetry of Urdu and Hindi freedom bards.",
      keyFigures: ["Bahadur Shah Zafar", "Bhagat Singh", "Ashfaqulla Khan", "Aruna Asaf Ali"],
    },
    tourSignificance:
      "This pass provides exclusive access to restricted historical barracks and verified trial archives, showing you the exact ramparts where Indian sovereignty was fought for and won.",
    ticketIncludes: [
      "Access to all 4 Red Fort Freedom Galleries",
      "Curator-led specialized historical briefing",
      "Bilingual digital audio guide with spatial sitar score",
      "Red Fort ramparts priority entry",
    ],
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    tagline: "Birthplace of the Quit India Revolution & Maratha Swaraj",
    museumName: "August Kranti Maidan Commemorative Museum & Mani Bhavan",
    architecture: "Historic British Colonial & Teak-Balconied Archive Bhavan",
    overview:
      "Spanning the sacred grounds of Gowalia Tank Maidan and the heritage corridors of Mani Bhavan, this museum immortalizes the 'Do or Die' call of 1942, the clandestine Congress Radio resistance, and the 1946 Royal Indian Navy mutiny.",
    tourTitle: "Do or Die: The 1942 Quit India & Naval Resistance Tour",
    tourDuration: "110 Minutes",
    languages: ["English", "Marathi", "Hindi", "Gujarati"],
    audioGuide: true,
    guidedPassPrice: "₹1,000 / Adult",
    badge: "Mass Movement Crucible",
    accentColor: "orange",
    mapCoordinates: { x: 26, y: 58 },
    pinLabelPosition: "left",
    tourPhases: [
      {
        phase: "Phase 01",
        title: "August Kranti Ground & Flag Hoisting Plaza",
        duration: "25 mins",
        description:
          "Stand on the historic pavilion where 23-year-old Aruna Asaf Ali hoisted the Indian National Flag amid tear gas and colonial police baton charges on August 9, 1942.",
        highlight: "Original commemorative granite pillar and restored sound recordings of Mahatma Gandhi's speech.",
      },
      {
        phase: "Phase 02",
        title: "Underground Congress Radio Transmission Cell",
        duration: "30 mins",
        description:
          "Explore the secret radio room from which Dr. Usha Mehta broadcast forbidden news of the freedom struggle, defying British censorship.",
        highlight: "Original vacuum-tube transmitter and coded frequency logs from 1942.",
      },
      {
        phase: "Phase 03",
        title: "1946 Royal Indian Navy (RIN) Mutiny Archive",
        duration: "30 mins",
        description:
          "Inspect ship logs, telegraph cables, and strike proclamations from the 20,000 naval ratings aboard HMIS Talwar that broke the colonial naval spine.",
        highlight: "Original strike manifesto signed by the Naval Central Strike Committee.",
      },
      {
        phase: "Phase 04",
        title: "Mani Bhavan Library & Swadeshi Spinning Room",
        duration: "25 mins",
        description:
          "Visit the room where the Non-Cooperation, Satyagraha, and Swadeshi movements were conceptualized, surrounded by rare archives.",
        highlight: "Mahatma Gandhi's personal hand-carved charkha and letters to world leaders.",
      },
    ],
    artifacts: [
      {
        title: "Underground Radio Valve Transmitter",
        period: "1942",
        origin: "Secret Bombay Safehouse",
        description: "Custom-assembled 42.34-meter shortwave transmitter used by Congress Radio.",
      },
      {
        title: "First Edition 'Do or Die' Leaflets",
        period: "August 1942",
        origin: "Gowalia Tank Press",
        description: "Lithographed revolutionary manifestos distributed across Bombay within hours of leaders' arrests.",
      },
      {
        title: "HMIS Talwar Naval Signal Log",
        period: "February 1946",
        origin: "Bombay Harbour Naval Barracks",
        description: "Original naval telegraph logs transmitting strike alerts across 78 naval ships in the Arabian Sea.",
      },
      {
        title: "Peshwa & Maratha Steel Armor Fragment",
        period: "18th Century",
        origin: "Western Ghats Hill Forts",
        description: "Damascus steel chainmail and katar daggers symbolizing early Swarajya martial resilience.",
      },
    ],
    culturalHeritage: {
      tradition: "Maratha Swarajya Spirit & Bombay Progressive Industrial Resistance",
      description:
        "Mumbai's heritage blends the fierce independence philosophy of Chhatrapati Shivaji Maharaj with the cosmopolitan grassroots activism of working-class mills and dockworkers.",
      keyFigures: ["Mahatma Gandhi", "Aruna Asaf Ali", "Usha Mehta", "Lokmanya Bal Gangadhar Tilak"],
    },
    tourSignificance:
      "Experience the pulse of the mass movement that united millworkers, naval sailors, students, and freedom fighters to issue the final unnegotiable ultimatum to the British Empire.",
    ticketIncludes: [
      "Guided access to August Kranti Grounds & Mani Bhavan Archive",
      "Special demonstration of Congress Radio archival audio transmissions",
      "Interactive 1942 underground leaflet reproduction keepsake",
      "Curator-assisted historical Q&A session",
    ],
  },
  {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    tagline: "Cradle of the Bengal Renaissance & Armed Resistance",
    museumName: "Victoria Memorial Archive & Netaji Hall of Valor",
    architecture: "Indo-Saracenic Makrana White Marble Monument & Italianate Porticos",
    overview:
      "Housed in Kolkata's grandest marble palace and archival galleries, this experience unveils the intellectual awakening, fiery secret societies (Anushilan Samiti), and Netaji's daring international armed struggle.",
    tourTitle: "Vande Mataram & The Revolutionary Dawn of Bengal",
    tourDuration: "120 Minutes",
    languages: ["English", "Bengali", "Hindi"],
    audioGuide: true,
    guidedPassPrice: "₹1,000 / Adult",
    badge: "Intellectual & Armed Awakening",
    accentColor: "red",
    mapCoordinates: { x: 70, y: 51 },
    pinLabelPosition: "right",
    tourPhases: [
      {
        phase: "Phase 01",
        title: "Netaji 'Great Escape' Secret Archive",
        duration: "35 mins",
        description:
          "Trace the breathtaking 1941 escape of Subhas Chandra Bose from his Elgin Road house under British house arrest, through Peshawar to Berlin and Tokyo.",
        highlight: "Original 1937 Wanderer escape car, disguises, and forged Italian passport.",
      },
      {
        phase: "Phase 02",
        title: "Anushilan Samiti & Jugantar Secret Society Gallery",
        duration: "30 mins",
        description:
          "Discover the underground secret societies of young revolutionaries, including Khudiram Bose, Prafulla Chaki, and Surya Sen (Chittagong Armoury Raid).",
        highlight: "Original bomb formula notebooks and Alipore Bomb Trial evidence files.",
      },
      {
        phase: "Phase 03",
        title: "Vande Mataram Manuscript & Renaissance Wing",
        duration: "30 mins",
        description:
          "Witness the original literary works of Bankim Chandra Chattopadhyay, Rabindranath Tagore, and Kazi Nazrul Islam that provided the patriotic anthem of India.",
        highlight: "First manuscript printing of Anandamath and handwritten Tagore songsheets.",
      },
      {
        phase: "Phase 04",
        title: "Matangini Hazra & Quit India Bengal Martyrdom Hall",
        duration: "25 mins",
        description:
          "Honoring 73-year-old Matangini Hazra and the peasant brigades of Tamluk who ran a parallel independent government in 1942.",
        highlight: "Bullet-pierced khadi flag carried by Matangini Hazra until her martyrdom.",
      },
    ],
    artifacts: [
      {
        title: "Netaji's Forged Italian Diplomatic Passport",
        period: "1941",
        origin: "Berlin / Moscow Transit",
        description: "Official travel document under the alias 'Orlando Mazzotta' used for his escape across Asia.",
      },
      {
        title: "Original 'Vande Mataram' Songsheet",
        period: "1882",
        origin: "Kolkata Archival Trust",
        description: "Original letterpress proof of Bankim Chandra's anthem that galvanized millions across the nation.",
      },
      {
        title: "Chittagong Armoury Raid Secret Plan",
        period: "1930",
        origin: "Indian Republican Army (Chittagong)",
        description: "Master Surya Sen's handwritten tactical plan for the simultaneous raid on police and army arsenals.",
      },
      {
        title: "Khudiram Bose Muzaffarpur Trial Record",
        period: "1908",
        origin: "Calcutta High Court Archive",
        description: "Judicial proceedings of the 18-year-old martyr who walked smilingly to the colonial gallows.",
      },
    ],
    culturalHeritage: {
      tradition: "Bengal Renaissance, Baul Folk Philosophy & Patriotic Poetry",
      description:
        "A profound intellectual and artistic heritage where literature, music, and revolutionary philosophy combined to ignite the national freedom awakening.",
      keyFigures: ["Netaji Subhas Chandra Bose", "Bankim Chandra Chattopadhyay", "Matangini Hazra", "Surya Sen"],
    },
    tourSignificance:
      "Unravels the philosophical heartbeat and armed international campaign that transformed the struggle from passive petitions into a thunderous demand for complete, unconditional Purna Swaraj.",
    ticketIncludes: [
      "Victoria Memorial Gallery & Netaji Hall of Valor Fast-Track Entry",
      "Special viewing of Netaji's original escape car and personal journals",
      "Expert-narrated Bengal Renaissance & Revolutionary Walkthrough",
      "Commemorative 'Vande Mataram' archival replica print",
    ],
  },
  {
    id: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    tagline: "Land of Deccan Rocketry, Kittur Valour & Mysore Renaissance",
    museumName: "National Gallery of Modern Art & Heritage Hall",
    architecture: "Classical Colonial Heritage Mansion with Heritage Glass Pavilion & Gardens",
    overview:
      "Set in the verdant grounds of the Manikyavelu Mansion, this heritage institution showcases the Deccan Plateau's early military innovations (Tipu Sultan's rocketry), Queen Chennamma's revolt, and Karnataka's freedom unification.",
    tourTitle: "Deccan Sovereignty & Mysore Freedom Legacy Tour",
    tourDuration: "100 Minutes",
    languages: ["English", "Kannada", "Hindi", "Telugu"],
    audioGuide: true,
    guidedPassPrice: "₹1,000 / Adult",
    badge: "Deccan Resistance & Innovation",
    accentColor: "amber",
    mapCoordinates: { x: 41, y: 77 },
    pinLabelPosition: "left",
    tourPhases: [
      {
        phase: "Phase 01",
        title: "Mysore Rocketry & Anglo-Mysore War Armoury",
        duration: "30 mins",
        description:
          "Explore the world's first iron-cased artillery rockets engineered in Mysore that stunned British imperial armies in the late 1700s.",
        highlight: "Original 18th-century cast-iron rocket casings and Tipu Sultan's battle maps.",
      },
      {
        phase: "Phase 02",
        title: "Kittur Rani Chennamma & Sangolli Rayanna Gallery",
        duration: "25 mins",
        description:
          "Learn about Queen Chennamma's armed defiance against the British 'Doctrine of Lapse' in 1824, decades before 1857.",
        highlight: "Original Kittur royal seal decrees and Sangolli Rayanna's guerrilla defense scrolls.",
      },
      {
        phase: "Phase 03",
        title: "Vidurashwatha: The Jallianwala Bagh of the South",
        duration: "25 mins",
        description:
          "Documenting the April 1938 massacre where peaceful flag-hoisting villagers were fired upon, galvanizing the South Indian Satyagraha.",
        highlight: "Original hand-woven khadi flag recovered from the 1938 Vidurashwatha gathering.",
      },
      {
        phase: "Phase 04",
        title: "Deccan Bronze & Karnataka Unification Memorial",
        duration: "20 mins",
        description:
          "A stunning curated collection of regional bronze sculptures, sandalwood craft, and historical records of Karnataka's national integration.",
        highlight: "Rare 19th-century bronze statuary and unified Karnataka cartographic surveys.",
      },
    ],
    artifacts: [
      {
        title: "Iron-Cased Mysore Military Rocket",
        period: "1792",
        origin: "Srirangapatna Royal Foundry",
        description: "Authentic combat rocket casing with forged iron combustion tube used against East India Company forces.",
      },
      {
        title: "Kittur Royal Palm-Leaf Defense Decree",
        period: "1824",
        origin: "Kittur Palace Archive",
        description: "Official royal edict rejecting British colonial suzerainty signed by Rani Chennamma.",
      },
      {
        title: "Tipu Sultan's Inlaid Astronomical Astrolabe",
        period: "1785",
        origin: "Mysore Observatory",
        description: "Intricately engraved brass astrolabe used for artillery trajectory calculations and desert navigation.",
      },
      {
        title: "Vidurashwatha Satyagraha Register",
        period: "1938",
        origin: "Kolar District Freedom Committee",
        description: "Original handwritten register listing the names of rural villagers who took the pledge of civil resistance.",
      },
    ],
    culturalHeritage: {
      tradition: "Carnatic Classical Heritage, Hoysala Craftsmanship & Deccan Defense Science",
      description:
        "Karnataka's cultural bedrock combines early scientific defense innovation with fearless regional warrior queens and a rich tradition of handloom and temple architecture.",
      keyFigures: ["Tipu Sultan", "Rani Chennamma of Kittur", "Sangolli Rayanna", "K.C. Reddy"],
    },
    tourSignificance:
      "Reveals the critical role of South Indian military genius and regional rebellions that defended Indian sovereignty half a century before the rebellion of 1857.",
    ticketIncludes: [
      "Full access to NGMA galleries and Heritage Mansion Gardens",
      "Interactive 3D Mysore Rocketry virtual firing demonstration",
      "Audio-guided historical walkthrough with regional soundtrack",
      "Exclusive Deccan heritage exhibition booklet",
    ],
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    tagline: "Oldest Colonial Fortress & The Fierce Queens of the South",
    museumName: "Fort St. George National Heritage Complex",
    architecture: "17th-Century Coastal Citadel with Moat, Palladian Garrison & Battlements",
    overview:
      "Standing on the shores of the Bay of Bengal, Fort St. George was the first British fortress in India (built 1644). Today, it houses vast archives of early anti-colonial uprisings, Polygar Wars, and Queen Velu Nachiyar's legendary military victories.",
    tourTitle: "Coromandel Coast & Veeramangai Freedom Expedition",
    tourDuration: "110 Minutes",
    languages: ["English", "Tamil", "Hindi", "Malayalam"],
    audioGuide: true,
    guidedPassPrice: "₹1,000 / Adult",
    badge: "Coastal Citadel & Royal Defiance",
    accentColor: "red",
    mapCoordinates: { x: 48, y: 79 },
    pinLabelPosition: "right",
    tourPhases: [
      {
        phase: "Phase 01",
        title: "Fort St. George Moat & Citadel Ramparts",
        duration: "25 mins",
        description:
          "Inspect the 17th-century coastal battlements, cannon batteries, and subterranean vaults from which the British East India Company began its territorial conquest.",
        highlight: "Original French and British brass naval cannons and garrison battlements.",
      },
      {
        phase: "Phase 02",
        title: "Rani Velu Nachiyar: Veeramangai of Sivaganga",
        duration: "30 mins",
        description:
          "Witness the extraordinary story of Rani Velu Nachiyar (1730–1796), the first Indian queen to wage war against the British and successfully reclaim her throne.",
        highlight: "Original Sivaganga royal correspondence and tactical allied warfare treaties with Hyder Ali.",
      },
      {
        phase: "Phase 03",
        title: "1806 Vellore Sepoy Mutiny Vault",
        duration: "30 mins",
        description:
          "Deep dive into the 1806 Vellore Mutiny—the first major outbreak of Indian soldiers against the British East India Company, preceding 1857 by 51 years.",
        highlight: "Original confidential British court martial proceedings and sepoy badges from 1806.",
      },
      {
        phase: "Phase 04",
        title: "V.O. Chidambaram Pillai & Swadeshi Maritime Fleet",
        duration: "25 mins",
        description:
          "Honoring 'Kappalottiya Thamizhan' V.O. Chidambaram Pillai, who launched India's first indigenous shipping service to break the British shipping monopoly.",
        highlight: "Original 1906 Swadeshi Steam Navigation Company stock certificates and prison grinding stone.",
      },
    ],
    artifacts: [
      {
        title: "Rani Velu Nachiyar's Damascus Steel Dagger",
        period: "1780",
        origin: "Sivaganga Royal Arsenal",
        description: "Intricately gold-inlaid curved dagger carried during the historic recapture of Sivaganga Fort.",
      },
      {
        title: "1806 Vellore Mutiny Court Inquest Scroll",
        period: "1806",
        origin: "Madras Army Headquarters",
        description: "Original handwritten parchment detailing the sepoy takeover of Vellore Fort under Tipu Sultan's royal flag.",
      },
      {
        title: "Swadeshi Steam Navigation Shipping Ledger",
        period: "1906",
        origin: "Tuticorin Port Trust",
        description: "Original financial register and passenger manifests for the SS Gallia and SS Lawoe indigenous ships.",
      },
      {
        title: "Subramania Bharati Handwritten Patriotic Poem",
        period: "1908",
        origin: "Swadesamitran Press, Madras",
        description: "Original handwritten verses of 'Achamillai Achamillai' (Fearless We Stand) penned by the legendary bard.",
      },
    ],
    culturalHeritage: {
      tradition: "Dravidian Classical Sangam Heritage, Maritime Trade & Warrior Queen Valor",
      description:
        "Tamil Nadu's timeless heritage blends ancient Sangam literary wisdom, seafaring maritime mastery, and early armed rebellions that challenged colonial supremacy at its naval foundations.",
      keyFigures: ["Rani Velu Nachiyar", "V.O. Chidambaram Pillai", "Subramania Bharati", "Veerapandiya Kattabomman"],
    },
    tourSignificance:
      "Essential for understanding the earliest roots of Indian anti-colonial defiance—where warrior queens and sepoys took up arms half a century before the rest of the continent.",
    ticketIncludes: [
      "Full Fort St. George Museum & Clive House Archival Entry",
      "Special guided tour of the 1806 Vellore Mutiny & Rani Velu Nachiyar Gallery",
      "Bilingual digital audio guide with classical Tamil nadaswaram cues",
      "Commemorative Fort St. George archival pass & historical map",
    ],
  },
];
