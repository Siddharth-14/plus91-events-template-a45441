"""
Streamlit Community Cloud entry point for the +91 Events website.

The site itself is plain HTML/CSS/JS (index.html, css/styles.css,
js/data.js, js/main.js) — that stays the source of truth so the
non-technical event-updating workflow described in README.md keeps
working unchanged. This file just reads those same files at runtime,
inlines the CSS/JS into one self-contained HTML document (required
because Streamlit renders components.html content inside a sandboxed
iframe, where relative links like "css/styles.css" can't resolve),
and embeds it with streamlit.components.v1.html.

To deploy: push this repo to GitHub, then on share.streamlit.io create
a new app pointing at this file (streamlit_app.py). See README.md for
the full walkthrough.
"""

import pathlib

import streamlit as st
import streamlit.components.v1 as components

BASE_DIR = pathlib.Path(__file__).parent

st.set_page_config(
    page_title="+91 Events — Cultural Events in Metro Vancouver",
    page_icon="🪔",
    layout="wide",
)

# Streamlit wraps every app in its own chrome (top padding, hamburger
# menu, footer). Strip that out so the embedded site can use the full
# browser window instead of sitting in a narrow, padded column.
st.markdown(
    """
    <style>
      #MainMenu, footer, header,
      [data-testid="stToolbar"],
      [data-testid="stDecoration"],
      [data-testid="stStatusWidget"] {
        visibility: hidden;
        height: 0;
      }
      .block-container, [data-testid="stAppViewBlockContainer"] {
        padding: 0 !important;
        max-width: 100% !important;
      }
      iframe {
        display: block;
      }
    </style>
    """,
    unsafe_allow_html=True,
)


def read(relative_path: str) -> str:
    return (BASE_DIR / relative_path).read_text(encoding="utf-8")


html = read("index.html")

# Inline the external stylesheet/scripts — components.html renders via
# an iframe srcdoc, so relative file paths in <link>/<script src> tags
# won't resolve there even though they work fine when index.html is
# opened directly as a static file.
html = html.replace(
    '<link rel="stylesheet" href="css/styles.css" />',
    f"<style>{read('css/styles.css')}</style>",
)
html = html.replace(
    '<script src="js/data.js"></script>',
    f"<script>{read('js/data.js')}</script>",
)
html = html.replace(
    '<script src="js/main.js"></script>',
    f"<script>{read('js/main.js')}</script>",
)
# The favicon link is meaningless inside an iframe (the browser tab icon
# is controlled by st.set_page_config's page_icon above instead).
html = html.replace(
    '<link rel="icon" type="image/svg+xml" href="assets/icons/favicon.svg" />',
    "",
)

# A tall-but-bounded frame with its own scrollbar keeps in-page anchor
# links (nav, "Explore Our Events", etc.) working via scrollIntoView —
# an iframe sized to exactly match its content has nothing left to
# scroll, which would break those jumps.
components.html(html, height=950, scrolling=True)
