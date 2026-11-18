// Builds the path data for the home page's night scene and writes it to
// scene.ts beside this script. Nothing imports this file, so it stays out of
// the site build; rerun it after changing a shape:
//
//     node docs/.vitepress/theme/home/art/make-scene.mjs
//
// Every layer is drawn on its own canvas (see the viewBox sizes below) and
// HomeScene.vue stacks them. The ranges fill on past the bottom of their
// canvas, so a layer that parallax pushes down never shows a lower edge. A seeded random source keeps the output stable
// from run to run, so a rerun only changes what you changed.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), 'scene.ts');

function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seeded(5005);
const between = (lo, hi) => lo + rand() * (hi - lo);
const n = v => String(Math.round(v * 10) / 10);
const pts = list => list.map(([x, y]) => `${n(x)},${n(y)}`).join(' ');

/** A skyline: peaks (x, height, half-width) over a base line, roughened by
 *  midpoint displacement so the slopes look weathered. */
function ridge(baseY, peaks, rough, left, right, steps = 7, swell = 0) {
  let line = [[left, 0], [right, 0]];
  let r = rough;
  for (let i = 0; i < steps; i++) {
    const next = [];
    for (let j = 0; j < line.length - 1; j++) {
      const [ax, ay] = line[j];
      const [bx, by] = line[j + 1];
      next.push([ax, ay], [(ax + bx) / 2, (ay + by) / 2 + between(-r, r)]);
    }
    next.push(line[line.length - 1]);
    line = next;
    r *= 0.58;
  }
  return line.map(([x, noise]) => {
    let lift = swell * (1 + Math.sin(x / 190 + 1.3)) / 2;
    for (const [px, h, w] of peaks) {
      lift = Math.max(lift, h * Math.max(0, 1 - Math.abs(x - px) / w) ** 1.2);
    }
    return [x, baseY - lift + noise];
  });
}

function ridgeY(line, x) {
  for (let i = 0; i < line.length - 1; i++) {
    const [ax, ay] = line[i];
    const [bx, by] = line[i + 1];
    if (ax <= x && x <= bx) return ay + ((by - ay) * (x - ax)) / (bx - ax);
  }
  return line[line.length - 1][1];
}

const fill = (line, bottom) =>
  `M${n(line[0][0])},${bottom} L${pts(line)} L${n(line[line.length - 1][0])},${bottom} Z`;
const stroke = line => `M${pts(line)}`;

/** The moonlit face of each peak: from the summit down the slope that faces
 *  the moon (to the right), then back up a ragged gully. */
function litFaces(line, peaks, depth) {
  let d = '';
  for (const [px, h, w] of peaks) {
    if (h < 60) continue;
    const top = line.reduce((best, p) => (Math.abs(p[0] - px) < Math.abs(best[0] - px) ? p : best));
    const span = w * between(0.45, 0.62);
    const slope = line.filter(([x]) => x >= top[0] && x <= top[0] + span);
    if (slope.length < 3) continue;
    const back = [];
    const end = slope[slope.length - 1];
    const drop = Math.min(depth, h * 0.7);
    const steps = 6;
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      back.push([
        end[0] - (end[0] - top[0]) * t + between(-6, 6),
        end[1] + drop * Math.sin(Math.PI * (1 - t)) * 0.55 + (top[1] - end[1]) * t + between(-5, 5)
      ]);
    }
    d += `M${pts(slope)} L${pts(back)} Z`;
  }
  return d;
}

/** Snow on the tallest summits: a cap that follows the ridge a little way
 *  down each side with a ragged lower edge. */
function snowCaps(line, peaks, minHeight) {
  let d = '';
  for (const [px, h] of peaks) {
    if (h < minHeight) continue;
    const top = line.reduce((best, p) => (Math.abs(p[0] - px) < Math.abs(best[0] - px) ? p : best));
    const reach = h * 0.16;
    const cap = line.filter(([, y], i) => {
      const x = line[i][0];
      return Math.abs(x - top[0]) < h * 0.5 && y < top[1] + reach;
    });
    if (cap.length < 3) continue;
    const left = cap[0];
    const right = cap[cap.length - 1];
    const under = [];
    const teeth = 7;
    for (let i = teeth - 1; i > 0; i--) {
      const x = left[0] + ((right[0] - left[0]) * i) / teeth;
      const y = ridgeY(line, x) + (i % 2 ? reach * between(0.5, 0.9) : reach * between(0.1, 0.3));
      under.push([x, y]);
    }
    d += `M${pts(cap)} L${pts(under)} Z`;
  }
  return d;
}

/** A pine: tiers that widen toward the ground, drawn with whole-number
 *  relative steps to keep the path short. */
function pine(x, y, h) {
  const w = h * 0.38;
  const tiers = 3;
  const step = (h * 0.9) / tiers;
  const r = Math.round;
  let d = `M${r(x)},${r(y - h)}`;
  let cx = 0;
  let cy = 0;
  const to = (px, py) => {
    const dx = r(px) - cx;
    const dy = r(py) - cy;
    cx += dx;
    cy += dy;
    return `l${dx},${dy}`;
  };
  // Down the left side, then up the right
  const side = [];
  for (let i = 1; i <= tiers; i++) {
    const half = (w * i) / tiers / 2;
    side.push([half, step * i + h * 0.1 - step * 0.15], [half * 0.4, step * i - step * 0.15]);
  }
  side.pop();
  for (const [dx, dy] of side) d += to(-dx, dy);
  d += to(-w * 0.5, h + 3);
  d += to(w * 0.5, h + 3);
  for (const [dx, dy] of side.reverse()) d += to(dx, dy);
  return `${d}Z`;
}

function treeLine(line, from, to, every, minH, maxH) {
  let d = '';
  for (let x = from; x < to; x += every * between(0.55, 1.3)) {
    d += pine(x, ridgeY(line, x) + 2, between(minH, maxH));
  }
  return d;
}

// ---------------------------------------------------------------- stars
// Canvas 1600 x 900. Each star is a zero-length line with a round cap, so a
// group of stars is one short path and its stroke width sets their size.
// Stars thin out toward the horizon. Two steady sizes, then three groups
// that twinkle on their own clocks.
function stars() {
  const groups = { small: '', medium: '', twinkleA: '', twinkleB: '', twinkleC: '' };
  const twinkles = ['twinkleA', 'twinkleB', 'twinkleC'];
  for (let i = 0; i < 260; i++) {
    const x = Math.round(between(0, 1600));
    const y = Math.round(640 * rand() ** 1.7);
    const roll = rand();
    const key = roll < 0.62 ? 'small' : roll < 0.84 ? 'medium' : twinkles[i % 3];
    groups[key] += `M${x} ${y}h0`;
  }
  // A few bright stars drawn as four-point glints
  const glints = [];
  for (const [x, y, s] of [[180, 120, 7], [470, 60, 5], [760, 170, 6], [1010, 90, 5], [1390, 250, 6], [300, 330, 4.5], [1180, 360, 4]]) {
    const k = s * 0.18;
    glints.push(`M${x},${y - s} L${n(x + k)},${n(y - k)} L${x + s},${y} L${n(x + k)},${n(y + k)} L${x},${y + s} L${n(x - k)},${n(y + k)} L${x - s},${y} L${n(x - k)},${n(y - k)} Z`);
  }
  return { ...groups, glints: glints.join('') };
}

// ---------------------------------------------------------------- ranges
// Far range: canvas 2400 x 500. Tall at both sides, low in the middle where
// the city stands, so a phone (which sees only the middle) still gets a
// horizon and a desktop gets mountains framing the title.
const farPeaks = [
  [140, 250, 260], [430, 360, 300], [700, 270, 230], [930, 190, 210], [1120, 130, 200],
  [1300, 150, 190], [1490, 205, 200], [1720, 300, 250], [1990, 370, 300], [2280, 260, 260]
];
const far = ridge(470, farPeaks, 18, -40, 2440);

// Mid hills: canvas 2400 x 380, rolling and wooded.
const midPeaks = [[260, 190, 420], [720, 120, 330], [960, 96, 200], [1130, 70, 170], [1290, 104, 190], [1470, 84, 200], [1720, 140, 330], [2160, 200, 420]];
const mid = ridge(372, midPeaks, 14, -40, 2440, 6, 46);

// Near ground: canvas 2400 x 240. High pine-covered shoulders at the sides,
// open in the middle so the road and the city stay in view.
const nearPeaks = [[120, 170, 520], [560, 70, 360], [1840, 80, 380], [2300, 180, 540]];
const near = ridge(236, nearPeaks, 8, -40, 2440, 6);

// ---------------------------------------------------------------- city
// Canvas 1000 x 440: Naerlan on its hill, walled, with a keep, towers,
// rooftops and a gatehouse facing the viewer.
const city = [];
const lit = [[], [], [], []];
const BASE = 330; // top of the hill under the wall

function rect(x, y, w, h) {
  return `M${n(x)},${n(y)} h${n(w)} v${n(h)} h${n(-w)} Z`;
}

function crenels(x, y, w, merlon = 6) {
  // Merlons along the top edge of a wall that starts at x, y
  let d = `M${n(x)},${n(y)}`;
  const count = Math.max(2, Math.round(w / (merlon * 2)));
  const step = w / (count * 2 - 1);
  for (let i = 0; i < count * 2 - 1; i++) {
    d += i % 2 === 0 ? ` v${n(-merlon)} h${n(step)} v${n(merlon)}` : ` h${n(step)}`;
  }
  return `${d} v4 h${n(-w)} Z`;
}

function tower(x, w, top, { roof = 'cone', roofH = w * 1.25, base = BASE + 40 } = {}) {
  city.push(rect(x - w / 2, top, w, base - top));
  if (roof === 'cone') {
    const eave = w * 0.16;
    city.push(`M${n(x - w / 2 - eave)},${n(top + 2)} L${n(x)},${n(top - roofH)} L${n(x + w / 2 + eave)},${n(top + 2)} Z`);
    // Finial
    city.push(rect(x - 0.8, top - roofH - 9, 1.6, 10));
  } else {
    city.push(crenels(x - w / 2 - 2, top, w + 4, 5));
  }
}

function house(x, w, h, roofH, base = BASE + 6) {
  city.push(rect(x, base - h, w, h));
  city.push(`M${n(x - 3)},${n(base - h + 1)} L${n(x + w / 2)},${n(base - h - roofH)} L${n(x + w + 3)},${n(base - h + 1)} Z`);
}

function windowAt(x, y, group, w = 3.2, h = 5.2) {
  lit[group].push(rect(x - w / 2, y, w, h));
}

// Hill under the city, wide enough to meet the mid range at both sides
const hill = [];
for (let i = 0; i <= 40; i++) {
  const x = -60 + (1120 * i) / 40;
  const t = (x - 500) / 560;
  const y = BASE + 10 + 150 * Math.min(1, Math.abs(t) ** 2.4) + between(-2, 2);
  hill.push([x, y]);
}
city.push(fill(hill, 440));

// Rooftops behind the wall, back row first
for (let x = 250; x < 760; x += between(16, 30)) {
  if (x > 455 && x < 545) continue;
  const w = between(14, 26);
  const h = between(24, 52);
  house(x, w, h, between(9, 16), BASE + 2);
  if (rand() < 0.55) windowAt(x + w / 2, BASE + 2 - h + between(6, h - 12), Math.floor(rand() * 4));
}

// The keep, its spire and two side towers
city.push(rect(452, 168, 96, BASE - 168 + 10));
city.push(crenels(448, 168, 104, 7));
tower(500, 30, 112, { roof: 'cone', roofH: 64, base: 172 });
tower(462, 20, 150, { roof: 'cone', roofH: 34, base: 172 });
tower(538, 20, 156, { roof: 'cone', roofH: 32, base: 172 });
// Banner on the spire
city.push('M500.8,26 v-14 h1.6 v14 Z M502.4,12 L520,15.5 L511,18 L520,21 L502.4,22 Z');
for (const [x, y, g] of [[476, 190, 0], [500, 196, 1], [524, 190, 2], [488, 232, 3], [512, 232, 0], [500, 140, 2], [462, 170, 1], [538, 176, 3], [476, 270, 2], [524, 268, 1]]) {
  windowAt(x, y, g, 4, 7);
}

// A domed temple to the right of the keep
city.push(rect(640, 238, 54, BASE - 238 + 6));
city.push('M636,240 C636,200 698,200 698,240 Z');
city.push(rect(666, 192, 2, 16));
windowAt(654, 262, 1, 4, 9);
windowAt(667, 262, 3, 4, 9);
windowAt(680, 262, 0, 4, 9);

// A tall watchtower on the left
tower(355, 26, 150, { roof: 'cone', roofH: 48, base: BASE + 4 });
windowAt(355, 176, 2, 4, 7);
windowAt(355, 214, 0, 4, 7);

// Curtain wall with towers and the gatehouse in the middle
city.push(rect(215, BASE - 34, 570, 74));
city.push(crenels(215, BASE - 34, 570, 6));
for (const [x, top] of [[215, BASE - 76], [330, BASE - 62], [670, BASE - 62], [785, BASE - 76]]) {
  tower(x, 30, top, { roof: 'cone', roofH: 34, base: BASE + 70 });
  windowAt(x, top + 16, Math.floor(rand() * 4), 3.6, 6);
}
// Gatehouse: two squat towers either side of the gate
tower(470, 34, BASE - 70, { roof: 'crenel', base: BASE + 24 });
tower(530, 34, BASE - 70, { roof: 'crenel', base: BASE + 24 });
city.push(rect(470, BASE - 52, 60, 20));
city.push(crenels(466, BASE - 52, 68, 5));
windowAt(470, BASE - 56, 0, 4, 7);
windowAt(530, BASE - 56, 2, 4, 7);

// The gate arch, lit from inside, and the road out of it
const gate = `M486,${BASE + 20} V${BASE - 12} A14,14 0 0 1 514,${BASE - 12} V${BASE + 20} Z`;
const road = `M486,${BASE + 20} C470,${BASE + 60} 420,${BASE + 75} 440,${BASE + 110} S 520,${BASE + 130} 470,440 L560,440 C 590,${BASE + 126} 520,${BASE + 112} 492,${BASE + 96} S 512,${BASE + 50} 514,${BASE + 20} Z`;
// Torches either side of the gate
const torches = [[477, BASE - 6], [523, BASE - 6]];

// ---------------------------------------------------------------- dragon
// Canvas 160 x 80, facing right. Drawn by hand; the wings are separate so
// they can beat.
const dragon = {
  body:
    'M2,47 L9,42 L8,47 L13,46 ' +
    'C34,50 56,45 76,39 C88,35 98,33 109,33 ' +
    'C119,32 126,26 133,21 C138,17 145,16 151,18 L156,20 L159,23 ' +
    'C153,24 147,25 141,28 C133,33 124,40 112,43 ' +
    'C104,45 97,46 90,46 L91,51 L85,53 L83,46 ' +
    'C78,46 72,47 66,48 L65,53 L58,55 L59,48 ' +
    'C42,52 24,53 13,49 L8,52 L9,49 Z ' +
    'M145,17 L139,9 L143,16 Z',
  wingNear: 'M100,36 Q93,20 90,6 Q70,-1 48,0 Q63,8 54,18 Q69,19 66,30 Q78,26 80,40 Z',
  wingFar: 'M106,33 Q102,20 100,8 Q86,3 72,4 Q81,9 76,16 Q87,15 86,26 Q93,25 94,34 Z'
};

const art = {
  stars: stars(),
  far: {
    fill: fill(far, 900),
    lit: litFaces(far, farPeaks, 120),
    snow: snowCaps(far, farPeaks, 290),
    rim: stroke(far)
  },
  mid: {
    fill: fill(mid, 800) + treeLine(mid, -20, 760, 26, 20, 38) + treeLine(mid, 1660, 2420, 26, 20, 38),
    rim: stroke(mid)
  },
  near: {
    fill: fill(near, 600) + treeLine(near, -30, 720, 15, 28, 60) + treeLine(near, 1700, 2430, 15, 28, 60)
  },
  city: {
    body: city.join(''),
    road,
    gate,
    windows: lit.map(group => group.join('')),
    torches
  },
  dragon
};

const header = `// Generated by make-scene.mjs in this folder. Edit that script and rerun it
// rather than changing these paths by hand.
`;
writeFileSync(OUT, `${header}export const art = ${JSON.stringify(art, null, 2)} as const;\n`);
const size = JSON.stringify(art).length;
console.log(`wrote ${OUT} (${size} bytes of path data)`);
