"""Build the README banner and docs button as self-contained SVGs.

Text is converted to outlines so the banner looks the same everywhere GitHub
shows it (an <img> SVG cannot load web fonts).

    pip install fonttools
    python3 .github/assets/make_banner.py <fonts-dir>

<fonts-dir> holds Cinzel-Bold.ttf and Cinzel-Regular.ttf (static instances of
Google Fonts' Cinzel at weights 700 and 400, e.g.
`python3 -m fontTools.varLib.instancer Cinzel[wght].ttf wght=700 -o Cinzel-Bold.ttf`)
and JetBrainsMono-Regular.ttf. The SVGs are written next to this script.
"""
import random
import sys
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

FONTS = Path(sys.argv[1])
OUT = Path(__file__).parent

BOLD = TTFont(FONTS / "Cinzel-Bold.ttf")
REG = TTFont(FONTS / "Cinzel-Regular.ttf")
MONO = TTFont(FONTS / "JetBrainsMono-Regular.ttf")


def text_width(font, text, size, tracking=0.0):
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]
    upm = font["head"].unitsPerEm
    w = sum(hmtx[cmap[ord(c)]][0] for c in text) * size / upm
    return w + tracking * size * (len(text) - 1)


def text_path(font, text, x, y, size, tracking=0.0, anchor="start"):
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    hmtx = font["hmtx"]
    upm = font["head"].unitsPerEm
    s = size / upm
    if anchor == "middle":
        x -= text_width(font, text, size, tracking) / 2
    elif anchor == "end":
        x -= text_width(font, text, size, tracking)
    pen = SVGPathPen(gs, ntos=lambda v: f"{v:.1f}".rstrip("0").rstrip("."))
    cx = x
    for c in text:
        g = cmap[ord(c)]
        gs[g].draw(TransformPen(pen, (s, 0, 0, -s, cx, y)))
        cx += hmtx[g][0] * s + tracking * size
    return pen.getCommands()


def ridge(rng, y0, peaks, rough, left=-20, right=1300):
    """A skyline: sharp peaks (x, height, half-width) over a base line, plus
    midpoint-displacement detail so the slopes look weathered."""
    pts = [(left, 0.0), (right, 0.0)]
    r = rough
    for _ in range(8):
        nxt = []
        for (ax, ay), (bx, by) in zip(pts, pts[1:]):
            nxt += [(ax, ay), ((ax + bx) / 2, (ay + by) / 2 + rng.uniform(-r, r))]
        nxt.append(pts[-1])
        pts = nxt
        r *= 0.6
    out = []
    for x, n in pts:
        lift = max([h * max(0.0, 1 - abs(x - px) / w) ** 1.15 for px, h, w in peaks] + [0])
        out.append((x, y0 - lift + n))
    return out


def ridge_y(pts, x):
    for (ax, ay), (bx, by) in zip(pts, pts[1:]):
        if ax <= x <= bx:
            return ay + (by - ay) * (x - ax) / (bx - ax)
    return pts[-1][1]


def poly(pts, bottom):
    body = " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    return f"M{pts[0][0]:.1f},{bottom} L{body} L{pts[-1][0]:.1f},{bottom} Z"


def castle(x, base):
    """A small keep and two towers, crenellated, standing on `base`."""
    parts = []

    def tower(cx, w, h, merlons):
        top = base - h
        n = merlons * 2 - 1
        mw = w / n
        px = cx - w / 2
        d = f"M{px:.1f},{base + 70} V{top - 5}"
        for i in range(n):
            px += mw
            d += f" H{px:.1f}"
            if i < n - 1:
                d += f" V{top if i % 2 == 0 else top - 5}"
        parts.append(d + f" V{base + 70} Z")

    tower(x, 46, 40, 4)
    tower(x - 30, 16, 62, 2)
    tower(x + 30, 16, 56, 2)
    tower(x + 4, 10, 78, 1)
    # Spire flag pole
    parts.append(f"M{x + 3.4},{base - 78} V{base - 96} H{x + 4.6} V{base - 78} Z")
    parts.append(f"M{x + 4.6},{base - 96} L{x + 18},{base - 91} L{x + 4.6},{base - 86} Z")
    return " ".join(parts)


def banner():
    W, H = 1280, 400
    rng = random.Random(5005)

    stars = []
    for i in range(120):
        x, y = rng.uniform(0, W), rng.uniform(0, 250)
        r = rng.choice([0.6, 0.8, 0.8, 1.0, 1.2, 1.6])
        cls = f' class="tw{i % 4}"' if r >= 1.0 else ""
        stars.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r}"{cls}/>')

    far = ridge(rng, 300, [(96, 74, 190), (250, 40, 130), (470, 18, 120), (840, 26, 130), (1010, 48, 130), (1215, 70, 150)], 10)
    mid = ridge(rng, 336, [(170, 34, 210), (620, 14, 220), (1000, 30, 220)], 8)
    near = ridge(rng, 372, [(420, 8, 260), (1130, 10, 240)], 6)

    # The castle sits on the left peak, clear of the title
    cx = 100
    base = ridge_y(far, cx) + 4

    title = text_path(BOLD, "ADVENTURES UNLIMITED", W / 2, 166, 66, 0.06, "middle")
    sub = text_path(REG, "A FAN REFERENCE FOR THE MUD OF THAREL", W / 2, 214, 21, 0.22, "middle")
    prompt = "> connect tharel.net 5005"
    pw = text_width(MONO, prompt, 19)
    px = W / 2 - (pw + 14) / 2
    mono = text_path(MONO, prompt, px, 268, 19)
    rule_w = 250

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-labelledby="t">
<title id="t">Adventures Unlimited: a fan reference for the MUD of Tharel. Connect to tharel.net port 5005.</title>
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#070c16"/>
    <stop offset=".55" stop-color="#14203a"/>
    <stop offset="1" stop-color="#273549"/>
  </linearGradient>
  <radialGradient id="moonglow">
    <stop offset="0" stop-color="#3fb1f2" stop-opacity=".45"/>
    <stop offset=".35" stop-color="#3fb1f2" stop-opacity=".12"/>
    <stop offset="1" stop-color="#3fb1f2" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="halo" cx=".5" cy=".42" r=".55">
    <stop offset="0" stop-color="#3fb1f2" stop-opacity=".16"/>
    <stop offset="1" stop-color="#3fb1f2" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#e9f6ff"/>
    <stop offset=".5" stop-color="#a9d5ef"/>
    <stop offset="1" stop-color="#3fb1f2"/>
  </linearGradient>
  <linearGradient id="rule" x1="0" x2="1">
    <stop offset="0" stop-color="#3fb1f2" stop-opacity="0"/>
    <stop offset=".5" stop-color="#3fb1f2"/>
    <stop offset="1" stop-color="#3fb1f2" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#3fb1f2" stop-opacity="0"/>
    <stop offset="1" stop-color="#3fb1f2" stop-opacity=".10"/>
  </linearGradient>
  <filter id="glow" x="-10%" y="-40%" width="120%" height="180%">
    <feGaussianBlur stdDeviation="7" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <clipPath id="frame"><rect width="{W}" height="{H}" rx="18"/></clipPath>
</defs>
<style>
  .tw0 {{ animation: tw 3.1s ease-in-out infinite; }}
  .tw1 {{ animation: tw 4.3s ease-in-out .8s infinite; }}
  .tw2 {{ animation: tw 5.7s ease-in-out 1.9s infinite; }}
  .tw3 {{ animation: tw 3.7s ease-in-out 2.6s infinite; }}
  .cursor {{ animation: blink 1.1s steps(1) infinite; }}
  .drift {{ animation: drift 18s ease-in-out infinite alternate; }}
  @keyframes tw {{ 0%, 100% {{ opacity: 1; }} 50% {{ opacity: .25; }} }}
  @keyframes blink {{ 0%, 55% {{ opacity: 1; }} 56%, 100% {{ opacity: 0; }} }}
  @keyframes drift {{ from {{ transform: translateX(-30px); }} to {{ transform: translateX(30px); }} }}
  @media (prefers-reduced-motion: reduce) {{
    .tw0, .tw1, .tw2, .tw3, .cursor, .drift {{ animation: none; }}
  }}
</style>
<g clip-path="url(#frame)">
  <rect width="{W}" height="{H}" fill="url(#sky)"/>
  <g fill="#cfe9fb">{''.join(stars)}</g>
  <circle cx="1196" cy="62" r="130" fill="url(#moonglow)"/>
  <circle cx="1196" cy="62" r="26" fill="#e6f4fd"/>
  <path d="M1196,36 a26,26 0 0 1 0,52 a20,26 0 0 0 0,-52 Z" fill="#9ccbe8" opacity=".35"/>
  <rect width="{W}" height="{H}" fill="url(#halo)"/>
  <path d="{poly(far, H)}" fill="#203453"/>
  <path d="{castle(cx, base)}" fill="#203453"/>
  <path d="M{" L".join(f"{x:.1f},{y:.1f}" for x, y in far)}" fill="none" stroke="#3fb1f2" stroke-opacity=".28" stroke-width="1.2"/>
  <circle cx="{cx - 30}" cy="{base - 44}" r="1.8" fill="#ffd27a" opacity=".9"/>
  <circle cx="{cx + 12}" cy="{base - 22}" r="1.8" fill="#ffd27a" opacity=".8"/>
  <path d="{poly(mid, H)}" fill="#15233c"/>
  <path d="M{" L".join(f"{x:.1f},{y:.1f}" for x, y in mid)}" fill="none" stroke="#3fb1f2" stroke-opacity=".14"/>
  <g class="drift"><rect x="-60" y="300" width="{W + 120}" height="100" fill="url(#mist)"/></g>
  <path d="{poly(near, H)}" fill="#0b1324"/>

  <path d="{title}" fill="#3fb1f2" opacity=".55" filter="url(#glow)"/>
  <path d="{title}" fill="url(#gold)"/>
  <rect x="{W / 2 - rule_w / 2}" y="186" width="{rule_w}" height="1.5" fill="url(#rule)"/>
  <path d="M{W / 2},181 l5,5.75 l-5,5.75 l-5,-5.75 Z" fill="#3fb1f2"/>
  <path d="{sub}" fill="#a9d5ef"/>
  <rect x="{px - 18}" y="242" width="{pw + 50}" height="38" rx="8" fill="#070c16" fill-opacity=".7" stroke="#3fb1f2" stroke-opacity=".45"/>
  <path d="{mono}" fill="#cfe9fb"/>
  <rect class="cursor" x="{px + pw + 8}" y="252" width="10" height="20" fill="#3fb1f2"/>
</g>
<rect x=".5" y=".5" width="{W - 1}" height="{H - 1}" rx="18" fill="none" stroke="#3fb1f2" stroke-opacity=".25"/>
</svg>
"""


def button():
    W, H = 640, 112
    label = text_path(BOLD, "READ THE DOCS", 116, 52, 30, 0.08)
    url = text_path(MONO, "nathanielinman.github.io/AdventuresUnlimited", 116, 82, 15.5)
    # An open book glyph
    book = (
        "M34,38 C42,34 52,34 60,39 V78 C52,73 42,73 34,77 Z "
        "M64,39 C72,34 82,34 90,38 V77 C82,73 72,73 64,78 Z"
    )
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-labelledby="t">
<title id="t">Read the docs at nathanielinman.github.io/AdventuresUnlimited</title>
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#14203a"/>
    <stop offset="1" stop-color="#273549"/>
  </linearGradient>
  <linearGradient id="edge" x1="0" x2="1">
    <stop offset="0" stop-color="#3fb1f2"/>
    <stop offset="1" stop-color="#a9d5ef"/>
  </linearGradient>
  <linearGradient id="shine" x1="0" x2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/>
    <stop offset=".5" stop-color="#fff" stop-opacity=".10"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
  <clipPath id="c"><rect x="3" y="3" width="{W - 6}" height="{H - 6}" rx="16"/></clipPath>
</defs>
<style>
  .shine {{ animation: shine 4.5s ease-in-out 1s infinite; }}
  .arrow {{ animation: nudge 1.6s ease-in-out infinite; }}
  @keyframes shine {{ 0% {{ transform: translateX(-260px); }} 40%, 100% {{ transform: translateX({W + 60}px); }} }}
  @keyframes nudge {{ 0%, 100% {{ transform: translateX(0); }} 50% {{ transform: translateX(6px); }} }}
  @media (prefers-reduced-motion: reduce) {{ .shine, .arrow {{ animation: none; }} }}
</style>
<rect x="3" y="3" width="{W - 6}" height="{H - 6}" rx="16" fill="url(#bg)"/>
<g clip-path="url(#c)"><rect class="shine" x="0" y="0" width="200" height="{H}" fill="url(#shine)" transform="translate(-260 0)"/></g>
<rect x="3" y="3" width="{W - 6}" height="{H - 6}" rx="16" fill="none" stroke="url(#edge)" stroke-width="2.5"/>
<path d="{book}" fill="none" stroke="#3fb1f2" stroke-width="3" stroke-linejoin="round"/>
<path d="M62,40 V80" stroke="#3fb1f2" stroke-width="2"/>
<path d="{label}" fill="#e9f6ff"/>
<path d="{url}" fill="#a9d5ef"/>
<g class="arrow"><path d="M560,56 H596 M582,42 L598,56 L582,70" fill="none" stroke="#3fb1f2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>
</svg>
"""


(OUT / "banner.svg").write_text(banner())
(OUT / "docs-button.svg").write_text(button())
