// ============================================================
// +91 EVENTS — SITE LOGIC
// Reads BRAND / EVENTS / GALLERY_CONFIG from js/data.js and renders
// them into index.html. Non-technical staff should not need to
// touch this file — see js/data.js to update event/gallery content.
// ============================================================

// ---- Date helpers -------------------------------------------------
// Parsing "YYYY-MM-DD" with `new Date(iso)` treats it as UTC midnight,
// which rolls back a day once converted to Pacific local time. Build
// the date from its Y/M/D parts instead so comparisons stay correct
// no matter what timezone the visitor (or this event) is in.
function parseLocalDate(isoDateString) {
  const [year, month, day] = isoDateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getTodayMidnight() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

// Status is always computed fresh from today's date — never hardcoded —
// so the site stays accurate as real time passes.
function getEventStatus(event, todayMidnight) {
  const start = parseLocalDate(event.startDate);
  const end = parseLocalDate(event.endDate);
  if (todayMidnight < start) return "upcoming";
  if (todayMidnight > end) return "past";
  return "ongoing"; // inclusive of both the start and end date
}

const STATUS_LABEL = {
  upcoming: "Upcoming",
  ongoing: "Ongoing",
  past: "Past",
};

function formatDateRange(startIso, endIso) {
  const start = parseLocalDate(startIso);
  const end = parseLocalDate(endIso);
  const monthDay = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
  const year = start.getFullYear();

  if (startIso === endIso) {
    return `${monthDay.format(start)}, ${year}`;
  }
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${monthDay.format(start)}–${end.getDate()}, ${year}`;
  }
  return `${monthDay.format(start)} – ${monthDay.format(end)}, ${year}`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---- Register button (Eventbrite) ---------------------------------
// INTEGRATION POINT #2 — every Register button (hero + cards) is built
// from this one function, reading event.eventbriteUrl. Once real
// per-event Eventbrite links exist (see js/data.js), only that field
// needs to change — this function never does.
function registerButtonHtml(event, extraClass) {
  return `
    <a class="btn btn-register ${extraClass || ""}"
       href="${escapeHtml(event.eventbriteUrl)}"
       target="_blank" rel="noopener noreferrer"
       data-event-id="${escapeHtml(event.id)}">
      Register Now
    </a>`;
}

// ---- Hero -------------------------------------------------------------
// Brand-first hero: "+91 EVENTS" is the headline, not any single event.
// The nearest flagship event only supplies the background photo and a
// small "next up" pill — full event details live in the featured
// spotlight card at the top of the Events section instead (see
// renderFeaturedEvent below).
function renderHero() {
  const heroEl = document.getElementById("home");
  const flagship = EVENTS.find((e) => e.isFlagship);
  if (!heroEl) return;

  if (flagship) {
    heroEl.style.backgroundImage = `linear-gradient(180deg, rgba(24,17,34,0.62), rgba(24,17,34,0.88)), url("${flagship.heroImage}")`;
  }

  const nextUpPill = flagship
    ? `<a href="#events" class="hero-next-pill">
         <span class="pulse-dot" aria-hidden="true"></span>
         Next Up: ${escapeHtml(flagship.name)} — ${formatDateRange(flagship.startDate, flagship.endDate)}
       </a>`
    : "";

  heroEl.innerHTML = `
    <div class="hero-content">
      <p class="hero-kicker">Metro Vancouver's Cultural Events Collective</p>
      <h1 class="hero-brand">+91 <span>EVENTS</span></h1>
      <p class="hero-tagline">Dance <span class="hero-dot">•</span> Music <span class="hero-dot">•</span> Activities</p>
      <p class="hero-hook">${escapeHtml(BRAND.description)}</p>
      <div class="hero-actions">
        <a href="#events" class="btn btn-cta btn-lg">Explore Our Events</a>
        ${nextUpPill}
      </div>
      <div class="hero-trust-bar">
        ${flagship && flagship.soldOutPast ? `<span class="trust-item">🔥 Sold Out Last Time</span>` : ""}
        <span class="trust-item">💃 1000s of Dancers</span>
        <span class="trust-item">🎶 Live Orchestra</span>
        <span class="trust-item">📍 Burnaby, BC</span>
      </div>
    </div>
  `;
}

// ---- Featured event spotlight -----------------------------------------
// A marketing callout at the top of the Events section — this is where
// full event details (name/date/venue/description/Register) now live,
// since the hero above is brand-first rather than event-first.
function renderFeaturedEvent() {
  const container = document.getElementById("featured-event");
  const flagship = EVENTS.find((e) => e.isFlagship);
  if (!container || !flagship) return;

  const today = getTodayMidnight();
  const status = getEventStatus(flagship, today);

  container.innerHTML = `
    <article class="featured-spotlight">
      <div class="featured-media">
        <img src="${flagship.cardImage}" alt="${escapeHtml(flagship.name)}" loading="lazy" />
      </div>
      <div class="featured-body">
        <span class="featured-tag">★ Featured Event</span>
        <h3 class="featured-title">${escapeHtml(flagship.name)}</h3>
        <p class="event-card-meta">📅 ${formatDateRange(flagship.startDate, flagship.endDate)}</p>
        <p class="event-card-meta">📍 ${escapeHtml(flagship.venue)}</p>
        <p class="featured-desc">${escapeHtml(flagship.description)}</p>
        ${
          flagship.soldOutPast
            ? `<p class="featured-urgency">🔥 Sold out last time — this one's expected to go fast. Reserve your spot now.</p>`
            : ""
        }
        <div class="featured-actions">
          ${registerButtonHtml(flagship, "btn-lg")}
          <span class="badge badge--${status}">${STATUS_LABEL[status]}</span>
        </div>
      </div>
    </article>
  `;
}

// ---- Events grid ------------------------------------------------------
function eventCardHtml(event, status) {
  const isPast = status === "past";
  return `
    <article class="event-card ${isPast ? "event-card--past" : ""}" data-status="${status}">
      <div class="event-card-media">
        <img src="${event.cardImage}" alt="${escapeHtml(event.name)}" loading="lazy" />
        <span class="badge badge--${status}">${STATUS_LABEL[status]}</span>
        ${isPast ? `<div class="past-ribbon">Thank you for celebrating with us!</div>` : ""}
      </div>
      <div class="event-card-body">
        <h3 class="event-card-title">${escapeHtml(event.name)}</h3>
        <p class="event-card-meta">📅 ${formatDateRange(event.startDate, event.endDate)}</p>
        <p class="event-card-meta">📍 ${escapeHtml(event.venue)}</p>
        <p class="event-card-desc">${escapeHtml(event.description)}</p>
        ${registerButtonHtml(event)}
      </div>
    </article>
  `;
}

function renderEvents(filter) {
  const grid = document.getElementById("events-grid");
  if (!grid) return;
  const today = getTodayMidnight();

  const withStatus = EVENTS.map((event) => ({ event, status: getEventStatus(event, today) }));
  const visible =
    filter === "all" ? withStatus : withStatus.filter((item) => item.status === filter);

  if (visible.length === 0) {
    grid.innerHTML = `<p class="events-empty">No events in this category right now — check back soon!</p>`;
    return;
  }

  grid.innerHTML = visible
    .map(({ event, status }) => eventCardHtml(event, status))
    .join("");
}

function initFilterTabs() {
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderEvents(tab.dataset.filter);
    });
  });
}

// ---- Gallery ------------------------------------------------------------
function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  grid.innerHTML = GALLERY_CONFIG.images
    .map(
      (img) => `
      <figure class="gallery-item">
        <img src="${img.url}" alt="${escapeHtml(img.alt)}" loading="lazy" />
        ${img.credit ? `<figcaption>${escapeHtml(img.credit)}</figcaption>` : ""}
      </figure>`
    )
    .join("");
}

// ---- Header / nav ---------------------------------------------------------
function initStickyNav() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  });
}

function initMobileMenu() {
  const toggle = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-links");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

function initSmoothScroll() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// ---- Confetti / sparkle burst on Register buttons --------------------------
const CONFETTI_EMOJI = ["🎉", "✨", "🪔", "🎊", "💫"];

function spawnConfetti(x, y) {
  const container = document.createElement("div");
  container.className = "confetti-burst";
  container.style.left = `${x}px`;
  container.style.top = `${y}px`;

  const particleCount = 14;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");
    particle.className = "confetti-particle";
    particle.textContent = CONFETTI_EMOJI[i % CONFETTI_EMOJI.length];
    const angle = (360 / particleCount) * i + (Math.random() * 20 - 10);
    const distance = 60 + Math.random() * 50;
    particle.style.setProperty("--angle", `${angle}deg`);
    particle.style.setProperty("--distance", `${distance}px`);
    particle.style.animationDelay = `${Math.random() * 80}ms`;
    container.appendChild(particle);
  }

  document.body.appendChild(container);
  setTimeout(() => container.remove(), 900);
}

function initConfetti() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-register");
    if (!btn) return;
    spawnConfetti(e.clientX, e.clientY);
  });
}

// ---- Footer year -------------------------------------------------------------
function renderBrandDetails() {
  const igLink = document.getElementById("footer-instagram");
  const fbLink = document.getElementById("footer-facebook");
  const emailLink = document.getElementById("footer-email");
  const yearEl = document.getElementById("footer-year");
  const navCta = document.getElementById("nav-cta");

  if (igLink) {
    igLink.href = BRAND.instagramUrl;
    igLink.textContent = BRAND.instagramHandle;
  }
  if (fbLink) fbLink.href = BRAND.facebookUrl;
  if (emailLink) emailLink.href = `mailto:${BRAND.contactEmail}`;
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Persistent conversion path in the sticky nav — always points at the
  // flagship event's Eventbrite link (falls back to a plain scroll-to-events
  // link if no flagship event is configured).
  const flagship = EVENTS.find((e) => e.isFlagship);
  if (navCta && flagship) {
    navCta.href = flagship.eventbriteUrl;
  } else if (navCta) {
    navCta.href = "#events";
    navCta.removeAttribute("target");
  }
}

// ---- Boot -------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderFeaturedEvent();
  renderEvents("all");
  renderGallery();
  renderBrandDetails();
  initFilterTabs();
  initStickyNav();
  initMobileMenu();
  initSmoothScroll();
  initConfetti();
});
