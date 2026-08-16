# +91 Events Website

The public marketing site for **+91 Events** (+91 Cultural Events Society) —
a Metro Vancouver company curating Indian cultural events (Garba nights,
Navratri, Diwali, Holi, and more).

Plain HTML/CSS/JS, no build step, no framework. Just open `index.html` in a
browser, or drop the folder on any static file host (Netlify, GitHub Pages,
S3, etc.) — nothing to compile.

## Running it locally

Double-click `index.html`, or serve it with any static server, e.g.:

```bash
npx serve .
```

## Deploying to Streamlit Community Cloud

The site is still plain HTML/CSS/JS under the hood — `streamlit_app.py` is
a thin wrapper that reads `index.html` / `css/styles.css` / `js/data.js` /
`js/main.js` at runtime and embeds them in a Streamlit page, so editing
`js/data.js` updates both the plain static site and the Streamlit version
with no extra steps.

1. Push this repo to GitHub (including `streamlit_app.py` and
   `requirements.txt`).
2. Go to [share.streamlit.io](https://share.streamlit.io) and sign in with
   GitHub.
3. Click **New app**, pick this repo/branch, and set **Main file path** to
   `streamlit_app.py`.
4. Click **Deploy**. Streamlit installs `requirements.txt` and the site
   goes live at `https://<your-app-name>.streamlit.app`.

Any time you push a change to `js/data.js` (new event, new gallery photo,
etc.), the deployed Streamlit app picks it up automatically on the next
reload — no redeploy step needed.

## Updating the site (for the events team)

**You almost never need to touch anything except [`js/data.js`](js/data.js).**
That file has three parts:

1. **`BRAND`** — company name, Instagram/Facebook links, contact email,
   location. Edit these directly.
2. **`EVENTS`** — an array of event objects. To add a new event, copy an
   existing object (from the opening `{` to the closing `},`), paste it as a
   new entry, and edit the fields:
   - `startDate` / `endDate` — format `"YYYY-MM-DD"`, no time of day.
   - `eventbriteUrl` — the event's Eventbrite ticket link.
   - `isFlagship: true` on **exactly one** event — that's the one shown in
     the big hero banner at the top of the site.
   - Everything else (name, venue, description, images) is plain text/URLs.

   The **status badge** (Upcoming / Ongoing / Past) is calculated
   automatically by comparing each event's dates to today — you never set
   it by hand, and it stays correct as time passes.
3. **`GALLERY_CONFIG.images`** — the photo grid on the Gallery section.
   Each entry is `{ url, alt, credit }`. The images currently there are
   placeholder photos (clearly marked `"DEMO IMAGE"` in their alt text)
   sourced from Wikimedia Commons and Pexels — several require the
   photographer credit shown in `credit` (visible on hover under each
   photo) per their license. Once real event photos replace them, the
   `credit` field can be removed.

### Two things that still need real values later

- **Eventbrite links** — every event's `eventbriteUrl` currently points to
  the generic `eventbrite.com` homepage as a placeholder (no per-event
  listings exist yet). Once a real listing is created for an event, paste
  its specific Eventbrite URL into that event's `eventbriteUrl` field.
- **Gallery photos** — for now the gallery uses hardcoded demo stock
  images. The intent is for the team to manage a shared Google Drive
  folder of event photos, with a small script or feed pulling that
  folder's contents into `GALLERY_CONFIG.images` automatically. See the
  comment block above `GALLERY_CONFIG` in `js/data.js` for where that
  integration plugs in — `renderGallery()` in `js/main.js` only needs
  `images` to stay an array of `{ url, alt }` objects, so no other code
  changes when that's wired up.

## File structure

```
index.html            Page markup/structure
css/styles.css         All styling (palette, layout, animations)
js/data.js             Events, gallery, and brand info — the file to edit
js/main.js             Rendering logic — status badges, filters, nav, etc.
assets/icons/          Favicon
streamlit_app.py       Streamlit Community Cloud entry point (embeds the site above)
requirements.txt       Python deps for Streamlit Cloud (just `streamlit`)
.streamlit/config.toml Streamlit theme colors matched to the site's palette
```
