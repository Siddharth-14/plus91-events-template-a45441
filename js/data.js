// ============================================================
// +91 EVENTS — SITE DATA
// ============================================================
// THIS IS THE ONLY FILE YOU SHOULD NEED TO EDIT to keep the
// website up to date. No HTML/CSS knowledge required.
//
// To add a new event: copy one of the objects inside the EVENTS
// array below (including the surrounding { and },), paste it as
// a new entry, and edit the fields. Save the file — the website
// will automatically show it in the right place (upcoming /
// ongoing / past is calculated for you from the dates).
//
// Dates must be written as "YYYY-MM-DD" (year-month-day), with
// no time of day. Example: September 26, 2026 is "2026-09-26".
// ============================================================

// ---- Brand & contact info shown in the header/footer ----
const BRAND = {
  name: "+91 Events",
  legalName: "+91 Cultural Events Society",
  tagline: "Dance | Music | Activities",
  description:
    "We specialize in curating exceptional cultural experiences that resonate with authenticity & charm.",
  city: "Burnaby, BC",
  region: "Metro Vancouver",
  instagramHandle: "@plus91events",
  instagramUrl: "https://www.instagram.com/plus91events",
  // PLACEHOLDER — swap in the real +91 Events Facebook page URL when available.
  facebookUrl: "#",
  // PLACEHOLDER — swap in a real inbox for the "Get in Touch" button.
  contactEmail: "hello@plus91events.ca",
};

// ---- Events ----
// Each event needs: id, name, presentedBy, venue, startDate, endDate,
// description (short hook line), heroImage, cardImage, eventbriteUrl,
// isFlagship (true for exactly ONE event — the one shown in the hero
// banner), and soldOutPast (true shows "sold out last time" flavor text).
//
// ============================================================
// INTEGRATION POINT #2 — Eventbrite
// Every event below has an `eventbriteUrl`. For this demo they all
// point at the generic Eventbrite homepage because individual event
// listings haven't been created yet. Once a real Eventbrite listing
// exists for an event, replace that event's eventbriteUrl with the
// specific listing link (e.g.
// "https://www.eventbrite.com/e/garba-nights-tickets-123456789").
// No other code needs to change — every Register button on the site
// (hero + every event card) reads this field automatically.
// ============================================================
const EVENTS = [
  {
    // REAL EVENT — sourced from the public @plus91events Instagram profile.
    id: "garba-nights-2026",
    name: "Garba Nights (with Live Orchestra)",
    presentedBy: "+91 Events",
    venue: "Bonsor Recreation Complex, 6550 Bonsor Ave, Burnaby, BC V5H 3G4",
    startDate: "2026-09-26",
    endDate: "2026-09-27",
    description:
      "Two nights of non-stop Garba to a full live orchestra — Metro Vancouver's biggest Navratri celebration returns.",
    // Photo: "Garba Dancers in Vadodara, India" by John Robert, Wikimedia Commons (CC BY-SA 4.0)
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Garba_Dancers_in_Vadodara%2C_India.jpg/1280px-Garba_Dancers_in_Vadodara%2C_India.jpg",
    // Photo: "Garba (dance)" by AKS.9955, Wikimedia Commons (CC BY-SA 4.0)
    cardImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Garba_%28dance%29.jpg/960px-Garba_%28dance%29.jpg",
    eventbriteUrl: "https://www.eventbrite.com",
    isFlagship: true,
    soldOutPast: true, // last run sold out — shows "grab your spot early" flavor text
  },
  {
    // DEMO / PLACEHOLDER EVENT — invented for this build to populate the
    // grid and demonstrate the "Past" status badge. Replace with a real
    // event (or delete this object) when ready.
    id: "navratri-metrotown-2026",
    name: "Navratri Night at Metrotown",
    presentedBy: "+91 Events",
    venue: "Metrotown Exhibition Hall, 4700 Kingsway, Burnaby, BC V5H 4N2",
    startDate: "2026-04-18",
    endDate: "2026-04-19",
    description:
      "Nine nights of dance, devotion, and community spirit in the heart of Burnaby.",
    // Photo: "Garba night in Bhopal" by Archies2804, Wikimedia Commons (CC BY-SA 4.0)
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Garba_night_in_Bhopal.jpg/1280px-Garba_night_in_Bhopal.jpg",
    cardImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Garba_night_in_Bhopal.jpg/960px-Garba_night_in_Bhopal.jpg",
    eventbriteUrl: "https://www.eventbrite.com",
    isFlagship: false,
    soldOutPast: false,
  },
  {
    // DEMO / PLACEHOLDER EVENT — dates deliberately straddle "today" so the
    // site demonstrates the pulsing "Ongoing" badge. Replace with a real
    // event (or delete this object) when ready.
    id: "holi-splash-2026",
    name: "Holi Splash",
    presentedBy: "+91 Events",
    venue: "Central Park Pavilion, 3000 Central Blvd, Burnaby, BC V5G 3N9",
    startDate: "2026-08-14",
    endDate: "2026-08-18",
    description:
      "Colors, music, and community fun in the park — a splash of joy for the whole family.",
    heroImage:
      "https://images.unsplash.com/photo-1756661921244-35636963e096?auto=format&fit=crop&w=1600&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1756661921244-35636963e096?auto=format&fit=crop&w=800&q=80",
    eventbriteUrl: "https://www.eventbrite.com",
    isFlagship: false,
    soldOutPast: false,
  },
  {
    // DEMO / PLACEHOLDER EVENT — invented for this build to populate the
    // grid and demonstrate the "Upcoming" status badge further out.
    // Replace with a real event (or delete this object) when ready.
    id: "diwali-mela-2026",
    name: "Diwali Mela",
    presentedBy: "+91 Events",
    venue: "Bonsor Recreation Complex, 6550 Bonsor Ave, Burnaby, BC V5H 3G4",
    startDate: "2026-11-07",
    endDate: "2026-11-08",
    description:
      "Lights, sweets, and celebration — a festive market and stage show for the whole family.",
    heroImage:
      "https://images.unsplash.com/photo-1572798089532-487718bc9d26?auto=format&fit=crop&w=1600&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1572798089532-487718bc9d26?auto=format&fit=crop&w=800&q=80",
    eventbriteUrl: "https://www.eventbrite.com",
    isFlagship: false,
    soldOutPast: false,
  },
];

// ============================================================
// INTEGRATION POINT #1 — Google Drive gallery
// `driveFolder` is a placeholder for a shared Google Drive folder ID
// that the +91 Events team will manage (staff just drop new event
// photos into that folder). A small script (Google Apps Script
// publishing the folder as a JSON feed, or a Google Drive/Photos API
// call) would later fetch that folder's file list and populate the
// `images` array below at load time — each entry only needs a
// {url, alt} shape, so renderGallery() in js/main.js never needs to
// change when the real integration is wired up.
//
// For now, `images` is a hardcoded list of royalty-free/creative-commons
// photos (Wikimedia Commons + Pexels) showing real groups of people
// playing Garba/Dandiya, standing in for real event photos. Every alt
// text below is prefixed "DEMO IMAGE" so this is unmistakable in the
// browser's dev tools and to screen reader users. Several of these
// require photographer credit under their license — see `credit` on
// each entry, surfaced in the small print under the gallery grid.
// ============================================================
const GALLERY_CONFIG = {
  driveFolder: null, // e.g. "1AbCdEfGhIjKlMnOpQrStUvWxYz" once real Drive integration is wired up
  images: [
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/World%27s_Largest_Garba_Festival.jpg/1280px-World%27s_Largest_Garba_Festival.jpg",
      alt: "DEMO IMAGE — replace via Drive integration: aerial view of tens of thousands of people dancing Garba in concentric circles at night",
      credit: "Saurabh sirohiya / Wikimedia Commons (CC BY-SA 4.0)",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Garba_Dancers_in_Vadodara%2C_India.jpg/960px-Garba_Dancers_in_Vadodara%2C_India.jpg",
      alt: "DEMO IMAGE — replace via Drive integration: a large crowd of people in colorful traditional outfits dancing Garba with arms raised",
      credit: "John Robert / Wikimedia Commons (CC BY-SA 4.0)",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Navratri_Garba.jpg/960px-Navratri_Garba.jpg",
      alt: "DEMO IMAGE — replace via Drive integration: a group of Garba dancers mid-motion, colorful skirts swirling under festival lights",
      credit: "Hardik jadeja / Wikimedia Commons (CC BY 3.0)",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Garba_%28dance%29.jpg/960px-Garba_%28dance%29.jpg",
      alt: "DEMO IMAGE — replace via Drive integration: dancers in vibrant embroidered Kutchi outfits performing Garba together",
      credit: "AKS.9955 / Wikimedia Commons (CC BY-SA 4.0)",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Garba_night_in_Bhopal.jpg/960px-Garba_night_in_Bhopal.jpg",
      alt: "DEMO IMAGE — replace via Drive integration: a group of women holding dandiya sticks together in front of a decorated Durga idol",
      credit: "Archies2804 / Wikimedia Commons (CC BY-SA 4.0)",
    },
    {
      url: "https://images.pexels.com/photos/17264037/pexels-photo-17264037.jpeg?auto=compress&cs=tinysrgb&w=960",
      alt: "DEMO IMAGE — replace via Drive integration: many hands holding colorful dandiya sticks together in a circle, bangles on every wrist",
      credit: "Pexels",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Rrrraas%21.jpg/960px-Rrrraas%21.jpg",
      alt: "DEMO IMAGE — replace via Drive integration: a group of dancers in matching red and white outfits performing Dandiya Raas with sticks raised",
      credit: "Brian Glanz / Wikimedia Commons (CC BY 2.0)",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Vibrant_culture.jpg/960px-Vibrant_culture.jpg",
      alt: "DEMO IMAGE — replace via Drive integration: a mother holding her baby while playing dandiya with a friend, a family moment at a festival",
      credit: "Atishaychoubey / Wikimedia Commons (public domain)",
    },
  ],
};
