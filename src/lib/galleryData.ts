export interface GalleryEntry {
  id: string;
  image: string;
  text: string;
  wiki: string;
  summary: string;
  years?: string;
  region?: string;
}

export interface IconicMoment {
  id: string;
  label: string;
  sublabel: string;
  image: string;
  description: string;
  location: string;
  year: string;
  wiki?: string;
}

export const FREEDOM_FIGHTERS: GalleryEntry[] = [
  { id: "bhagat-singh", text: "Bhagat Singh", years: "1907-1931", region: "Banga, Punjab", wiki: "https://en.wikipedia.org/wiki/Bhagat_Singh", summary: "Bhagat Singh was a legendary Indian anti-colonial revolutionary whose martyrdom at age 23 electrified the national independence struggle against British rule.", image: "/bhagat-singh-hero.png" },
  { id: "subhas-chandra-bose", text: "Subhas Chandra Bose", years: "1897-1945", region: "Cuttack, Odisha", wiki: "https://en.wikipedia.org/wiki/Subhas_Chandra_Bose", summary: "Netaji Subhas Chandra Bose was an Indian nationalist leader whose defiant patriotism made him a hero in India. He revived and led the Azad Hind Fauj (Indian National Army).", image: "/museum/moment-ina.png" },
  { id: "kanaklata-barua", text: "Kanaklata Barua", years: "1924-1942", region: "Gohpur, Assam", wiki: "https://en.wikipedia.org/wiki/Kanaklata_Barua", summary: "Kanaklata Barua was an Assamese freedom fighter and AISF leader. At just 17 years old, she led a procession bearing the Tricolor toward the Gohpur police station during the Quit India Movement before being martyred.", image: "/museum/kanaklata-barua.png" },
  { id: "matangini-hazra", text: "Matangini Hazra", years: "1869-1942", region: "Tamluk, Bengal", wiki: "https://en.wikipedia.org/wiki/Matangini_Hazra", summary: "Matangini Hazra was an Indian revolutionary who participated in the Quit India Movement. Shot by police while holding the National Flag high, she continued chanting Vande Mataram until her last breath.", image: "/museum/matangini-hazra.png" },
  { id: "alluri-sitarama-raju", text: "Alluri Sitarama Raju", years: "1897-1924", region: "Rampa, Andhra Pradesh", wiki: "https://en.wikipedia.org/wiki/Alluri_Sitarama_Raju", summary: "Alluri Sitarama Raju led the Rampa Rebellion of 1922 against colonial forest laws in the Eastern Ghats. Uniting indigenous tribal communities, he waged guerrilla attacks against British police stations before his martyrdom.", image: "/museum/alluri-sitarama-raju.png" },
  { id: "tirot-sing", text: "U Tirot Sing", years: "1795-1835", region: "Khasi Hills, Meghalaya", wiki: "https://en.wikipedia.org/wiki/U_Tirot_Sing", summary: "U Tirot Sing Syiem was a Khasi chief who declared war against the British East India Company to protect the Khasi Hills from colonial road construction.", image: "/museum/tirot-sing.png" },
  { id: "velu-nachiyar", text: "Velu Nachiyar", years: "1730-1796", region: "Sivaganga, Tamil Nadu", wiki: "https://en.wikipedia.org/wiki/Velu_Nachiyar", summary: "Rani Velu Nachiyar was the Queen of Sivaganga and the first Indian queen to wage war against the British East India Company. Known as Veeramangai, she successfully defeated colonial forces and reclaimed her kingdom.", image: "/museum/velu-nachiyar.png" },
  { id: "begum-hazrat-mahal", text: "Begum Hazrat Mahal", years: "1820-1879", region: "Awadh, Uttar Pradesh", wiki: "https://en.wikipedia.org/wiki/Begum_Hazrat_Mahal", summary: "Begum Hazrat Mahal was a key leader during the Indian Rebellion of 1857. Following the exile of Nawab Wajid Ali Shah, she took charge of Awadh and fiercely resisted the British siege of Lucknow.", image: "/museum/begum-hazrat-mahal.png" },
  { id: "khudiram-bose", text: "Khudiram Bose", years: "1889-1908", region: "Midnapore, Bengal", wiki: "https://en.wikipedia.org/wiki/Khudiram_Bose", summary: "Khudiram Bose was one of the youngest revolutionaries of the Indian independence movement. Executed at the age of 18 for his role in the Muzaffarpur action, his bravery inspired generations.", image: "/museum/khudiram-bose.png" },
  { id: "pritilata-waddedar", text: "Pritilata Waddedar", years: "1911-1932", region: "Chittagong, Bengal", wiki: "https://en.wikipedia.org/wiki/Pritilata_Waddedar", summary: "Pritilata Waddedar was a Bengali revolutionary nationalist under Surya Sen. She led a historic raid on the Pahartali European Club in Chittagong, challenging colonial racial supremacy.", image: "/museum/pritilata-waddedar.png" },
  { id: "ram-prasad-bismil", text: "Ram Prasad Bismil", years: "1897-1927", region: "Shahjahanpur, UP", wiki: "https://en.wikipedia.org/wiki/Ram_Prasad_Bismil", summary: "Ram Prasad Bismil was a co-founder of the Hindustan Republican Association and a patriot poet. He led the Kakori train action of 1925 and penned iconic patriotic verses before his martyrdom.", image: "/museum/ram-prasad-bismil.png" },
  { id: "ashfaqulla-khan", text: "Ashfaqulla Khan", years: "1900-1927", region: "Shahjahanpur, UP", wiki: "https://en.wikipedia.org/wiki/Ashfaqulla_Khan", summary: "Ashfaqulla Khan was an Indian freedom fighter and poet who co-founded the HRA alongside Ram Prasad Bismil. He stands as a timeless symbol of communal harmony in the freedom struggle.", image: "/museum/ashfaqulla-khan.png" }
];

export const ICONIC_MOMENTS: IconicMoment[] = [
  { id: "dandi-march", label: "Dandi Salt March", sublabel: "Dandi, Gujarat - 1930", location: "Dandi, Gujarat", year: "1930", description: "Gandhi's 24-day 384km civil disobedience march protesting colonial salt laws.", image: "/museum/moment-dandi.png", wiki: "https://en.wikipedia.org/wiki/Salt_March" },
  { id: "jallianwala-bagh", label: "Jallianwala Bagh Massacre", sublabel: "Amritsar, Punjab - 1919", location: "Amritsar, Punjab", year: "1919", description: "Crucial turning point where peaceful gatherers were targeted, hardening national resolve.", image: "/museum/jallianwala-bagh.png", wiki: "https://en.wikipedia.org/wiki/Jallianwala_Bagh_massacre" },
  { id: "quit-india", label: "Quit India Movement", sublabel: "Bombay - 1942", location: "Bombay", year: "1942", description: "The Do or Die call issued by Mahatma Gandhi demanding immediate British withdrawal.", image: "/museum/moment-quit-india.png", wiki: "https://en.wikipedia.org/wiki/Quit_India_Movement" },
  { id: "bhagat-singh", label: "Bhagat Singh's Legacy", sublabel: "Lahore - 1931", location: "Lahore Central Jail", year: "1931", description: "The martyrdom of Bhagat Singh, Rajguru, and Sukhdev that galvanized the youth of India.", image: "/museum/moment-bhagat-singh.png", wiki: "https://en.wikipedia.org/wiki/Bhagat_Singh" },
  { id: "ina-march", label: "Azad Hind Fauj Campaign", sublabel: "Southeast Asia - 1943", location: "Imphal / Kohima", year: "1943", description: "Subhas Chandra Bose leading the Indian National Army under the banner Give me blood I will give you freedom.", image: "/museum/moment-ina.png", wiki: "https://en.wikipedia.org/wiki/Indian_National_Army" }
];
