# BUILD.md — Heritage \& Culture Digital Museum

**Team POWERHOUSE** | Theme: Preserving, Verifying \& Making India's Lesser-Known Historical Stories, Freedom Fighters \& Cultural Heritage Accessible

Feed this file to the Antigravity agent as the single source of truth. Build in the section order below — each section is a discrete screen/state in the user flow.

\---

## 1\. Tech Stack

|Layer|Choice|
|-|-|
|Framework|Next.js (App Router) + TypeScript react js + vite or any framework|
|Styling|Tailwind CSS|
|Components|shadcn/ui base + react-bits, unlumen-ui, skiper-ui component packs|
|Backend|Supabase (see Section 6 — required, do not skip)|
|Hosting|Cloudflare Pages|

Assumption: Next.js is used since shadcn/ui and skiper-ui both assume it. Flag to Jeevan if a different framework is preferred.

Install commands to run as encountered in the build (do not substitute other libraries for these):

```
npx shadcn add @skiper-ui/skiper28
npx shadcn@latest add @react-bits/CircularGallery-TS-CSS
npx shadcn@latest add @unlumen-ui/hover-expand
```

\---

## 2\. Global Design Rules

* No purple or blue gradients anywhere in the UI.
* No generic "AI slop" layouts — every section must look intentionally designed, not templated.
* Apple-style glassmorphism (frosted blur, soft borders, subtle depth) on cards, modals, and the navbar.
* Strict design consistency: one type scale, one spacing scale, one color system used throughout.
* Tone is serious and dignified — this is about national history, not a festive product landing page. Avoid cartoonish icons or playful animation easing.
* Color system: base it around the Indian tricolor (saffron, white, India green) used sparingly as accents against a neutral (off-white / charcoal) base — not as loud gradients.
* Typography: one serif or serif-adjacent display face for headings (gravitas), one clean sans for body text. "POWERHOUSE" wherever it appears uses **Impact font, bright red, large size**.
* All copy is written to read like a guided museum narration, not marketing copy.

\---

## 3\. Prefilled Content (for the intro screen)

Use this as-is unless Jeevan edits it.

**Problem being addressed:**
Most of India's freedom struggle is remembered through a handful of well-known names, while hundreds of regional revolutionaries, local uprisings, and cultural traditions are fading from public memory and are absent from mainstream education. There is no accessible, verified, single destination where these stories are preserved and made engaging for a younger, digital-first audience.

**Key features:**

* A digital museum walkthrough of lesser-known freedom fighters and cultural heritage, verified against public historical records
* Interactive galleries and iconic-moment cards with sourced descriptions and links for further reading
* A fictional guided tour booking system so users can plan an in-person visit experience
* A personal dashboard to track saved stories and booked tours

**Solution overview:**
POWERHOUSE is a digital museum that combines archival storytelling with interactive design — letting users explore forgotten freedom fighters and cultural heritage, then book a guided museum tour experience end-to-end, all in one platform.

**Team info:**

* Arjun V — 1EP24IC007
* Jeevan Jaikumar — 1EP24IC015
* Harsh Jangir — 1EP24IC012
* Team Name: **POWERHOUSE** (Impact font, bright red, large, top-center of the intro screen)

\---

## 4\. Page-by-Page Build Spec

### 4.1 Intro Screen

Glassmorphic full-screen layout containing, in order:

1. "POWERHOUSE" — Impact font, bright red, large, top-center
2. Project introduction (Heritage \& Culture theme)
3. Problem being addressed (Section 3 content)
4. Key features (Section 3 content)
5. Brief solution overview (Section 3 content)
6. Team/project information (Section 3 content)
7. A single "Proceed" button, glassmorphic, centered at the bottom

### 4.2 Login \& Registration

* Email-based auth only. No OAuth, no social login.
* **Register fields:** email, name, phone number, age, gender
* **Login fields:** email, password
* On success: show a "Registration successful" / "Login successful" confirmation state before moving on
* Backed by Supabase Auth (see Section 6)

### 4.3 Loading Screen

* Progress bar / percentage counter animating 0% → 100%
* Glassmorphic styling consistent with the rest of the site
* Transitions automatically into the scroll intro on completion

### 4.4 Scroll Intro (3D Perspective Text)

* Component: `@skiper-ui/skiper28`
* Small, subtle grey "scroll down" prompt at the bottom of the screen after loading completes
* On scroll, render 3D perspective text reading something like: *"India gained its independence from the British on 15th August 1947..."* (agent to extend into 2–3 short narrated lines, factually accurate, no embellishment)
* As the text sequence ends, the screen lifts/transitions to reveal the hero section

### 4.5 Hero Section

* Background: large Indian flag waving/fluttering in wind, sky behind it, birds occasionally flying across the foreground
* Headline: "Happy 79th Independence Day" (or equivalent — verify the correct anniversary number against the current year before shipping)
* Glass navbar overlaying the hero (frosted, fixed on scroll)
* Navbar includes the ambient sound toggle (see Section 5) and the user profile icon (see 4.10) once logged in

### 4.6 Circular Gallery — Freedom Fighters \& Heritage

* Component: `@react-bits/CircularGallery-TS-CSS`
* 12 cards total. Suggested set, weighted toward lesser-known figures per the competition theme — adjust as needed:

  1. Matangini Hazra
  2. Kanaklata Barua
  3. Tirot Sing
  4. Alluri Sitarama Raju
  5. Velu Nachiyar
  6. Begum Hazrat Mahal
  7. Khudiram Bose
  8. Pritilata Waddedar
  9. Ram Prasad Bismil
  10. Ashfaqulla Khan
  11. Dandi Salt March (cultural/historical event card)
  12. Jallianwala Bagh (cultural/historical event card)
* On card click: open a glassmorphic modal with a short verified summary and a "Read more on Wikipedia" link button pointing to the correct article for that entry

### 4.7 Iconic Moments — Hover Expand

* Component: `@unlumen-ui/hover-expand`
* 5 cards, each with: image, event/movement name, one-line description, location
* Suggested set:

  1. Dandi March — Gandhi's Salt Satyagraha — Dandi, Gujarat
  2. Jallianwala Bagh Massacre — Amritsar, Punjab
  3. Quit India Movement launch — Bombay, 1942
  4. Bhagat Singh's execution — Lahore Central Jail
  5. Azad Hind Fauj (INA) march — led by Subhas Chandra Bose

### 4.8 Booking Flow (Fictional Museum Tour)

1. **Calendar step:** user selects a date. On selection, the calendar slides left and the booking form slides in.
2. **Booking form fields:**

   * Date (carried from calendar)
   * Number of people
   * Adult / Child split
   * Museum city — 5 options only: Bangalore, Chennai, Delhi, Kolkata, Mumbai
   * Email, name
3. **Bill summary:** ₹1000 per adult, ₹500 per child (below 12) — auto-calculated from the counts above
4. **Pay Now button** → show "Payment Successful" state (mocked, no real payment gateway required)
5. **Ticket generation:** render a ticket in the style of Apple Wallet / BookMyShow / District — glassmorphic card, tagged "79th Independence Day", showing date, city, headcount, and a booking reference
6. Close button on the ticket returns the user to the hero section

### 4.9 Footer

* "POWERHOUSE" in Impact font, bright red (same treatment as the intro screen)
* "Made by Powerhouse" tag
* Standard footer links/info as needed (about, contact, credits/sources for historical content)

### 4.10 User Dashboard

* Accessible via profile icon in the navbar (top corner)
* Shows: name, phone number, age, gender
* Shows: list of booked tours with full details (date, city, headcount, reference) pulled from persisted booking data

\---

## 5\. Ambient Sound

* Toggle switch in the navbar, default **on**
* Loops an ambient/patriotic instrumental track in the background
* **Flag:** already in the folder as song.mp3
* Browsers block autoplay-with-sound by default. Implement the loop so it starts on the user's first interaction (e.g. the "Proceed" click) rather than assuming true autoplay will work on page load.

\---

## 6\. Backend \& Data Requirements — Read Before Building

Cloudflare Pages is static/edge hosting only. It does not include a database. Given the features requested (real login/registration, persisted bookings, dashboard history), **a backend is required — this is not optional for what's been asked for.**

**Recommendation: Supabase**

* Handles email/password auth directly (matches the "no OAuth" requirement out of the box)
* Postgres database for user profiles and bookings
* Built-in Storage buckets if you want manageable image uploads later
* Client SDK works fine from a Cloudflare Pages–hosted frontend — no server needed for basic CRUD, calls go straight to Supabase's API
* Free tier is enough for a competition build

**What needs Supabase specifically:**

* User registration/login and profile fields (email, name, phone, age, gender) → `Auth` + a `profiles` table
* Booking records (date, headcount, city, ticket reference) → a `bookings` table, so the dashboard can show past bookings on any future login
* Ticket data → same `bookings` table, no separate system needed

**What does NOT need a database:**

* Freedom fighter / heritage card content (12 gallery cards, 5 iconic moment cards) — this is static content, ship it as JSON/constants in the repo, not database rows
* Images for those cards — static assets in `/public`, no storage bucket needed unless you want to let non-developers update them later
* The ambient audio file — static asset in `/public`

**Deployment note:** since Supabase calls are client-side, a static export of the Next.js site works on Cloudflare Pages without needing the `@cloudflare/next-on-pages` adapter. Only add that adapter if server-rendered routes end up being necessary.

\---

## 7\. Known Risks to Flag Before Building

1. **Autoplay policy:** "default on" ambient sound will not literally autoplay with sound in most browsers until the user interacts with the page once — design the intro/loading flow so the first interaction (Proceed button) is what actually starts the loop.
2. **"79th Independence Day" copy:** double-check this number against the actual current year at time of submission before it ships.
3. **Historical accuracy:** every fact used in gallery cards, iconic moments, and the 3D scroll-intro text must be checked against a reliable source before the agent writes final copy — this is a heritage/verification-themed project, factual errors would undercut the pitch itself.

\---

## 8\. Asset Checklist

* \[ ] Ambient background audio file , `.mp3`/`.ogg`
* \[ ] Flag image/video asset for the hero background (waving flag, sky, birds)
* \[ ] 12 images for the circular gallery cards
* \[ ] 5 images for the hover-expand iconic moments
* \[ ] Wikipedia links verified for each of the 12 gallery entries

