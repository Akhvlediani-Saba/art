import { useId, type CSSProperties } from "react";

/*
 * Hand-drawn style instrument illustrations for the "wood & string" design.
 * Frets on both necks follow the real 12-tone spacing (scale × (1 − 2^(−n/12))).
 */

type ArtProps = { className?: string; style?: CSSProperties; label?: string };

function a11y(label?: string) {
  return label ? { role: "img" as const, "aria-label": label } : { "aria-hidden": true as const };
}

export function Panduri({ className, style, label }: ArtProps) {
  const id = useId().replace(/:/g, "");
  const top = `pt${id}`, neck = `pn${id}`;
  // Georgian panduri: flat spruce top with angled shoulders tapering to a narrow
  // base, dark neck with a scrolled head, three side tuners, painted rosette.
  const frets = [118, 142, 165, 186, 206, 225, 242, 259, 274, 289, 302, 315];
  const inlays = [153.5, 196, 233.5, 266.5];
  const leaves = [45, 135, 225, 315].map((a) => {
    const r = (a * Math.PI) / 180;
    return { x: 80 + 31 * Math.cos(r), y: 420 + 31 * Math.sin(r), a: a + 90 };
  });
  return (
    <svg viewBox="0 0 160 600" className={className} style={style} {...a11y(label)}>
      <defs>
        <linearGradient id={top} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#C99A5E" />
          <stop offset="0.12" stopColor="#E6C893" />
          <stop offset="0.5" stopColor="#EED6A6" />
          <stop offset="0.88" stopColor="#E2C38C" />
          <stop offset="1" stopColor="#BF8F55" />
        </linearGradient>
        <linearGradient id={neck} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#2A170C" />
          <stop offset="0.5" stopColor="#5A3519" />
          <stop offset="1" stopColor="#2A170C" />
        </linearGradient>
      </defs>
      {/* three side tuners with ivory keys */}
      {[34, 56, 78].map((y) => (
        <g key={y}>
          <path d={`M68 ${y} H44`} stroke="#B9B2A6" strokeWidth="3" />
          <ellipse cx="38" cy={y} rx="9" ry="6.5" fill="#F1EBDD" stroke="#8C8478" strokeWidth="1" />
          <circle cx="78" cy={y} r="2.6" fill="#D8D2C6" />
        </g>
      ))}
      {/* head with scroll */}
      <path d="M68 98 L64 24 C64 11 72 4 83 4 C95 4 101 12 99 23 L95 98 Z" fill={`url(#${neck})`} stroke="#140A04" strokeWidth="1.4" />
      <path d="M99 22 C108 18 109 7 100 4 C94 2 90 8 94 12" fill="none" stroke="#140A04" strokeWidth="3" strokeLinecap="round" />
      {/* body: angled shoulders, long taper, narrow base */}
      <path d="M64 330 H96 L146 392 Q151 398 150 405 L125 582 Q124 592 114 592 H46 Q36 592 35 582 L10 405 Q9 398 14 392 Z" fill={`url(#${top})`} stroke="#8A5E30" strokeWidth="1.6" />
      <path d="M66 336 H94 L141 394 Q145 399 144 405 L120 579 Q119 586 112 586 H48 Q41 586 40 579 L16 405 Q15 399 19 394 Z" fill="none" stroke="#B08048" strokeWidth="0.8" strokeOpacity="0.6" />
      {[40, 58, 102, 120].map((x) => (
        <path key={x} d={`M${x} 400 L${80 + (x - 80) * 0.75} 580`} stroke="#C9A06A" strokeWidth="0.6" strokeOpacity="0.5" />
      ))}
      {/* neck + fingerboard running onto the top */}
      <path d="M68 98 L65 336 L80 356 L95 336 L92 98 Z" fill={`url(#${neck})`} />
      <rect x="67" y="96" width="26" height="4" fill="#EFE4CC" />
      {frets.map((y, i) => (
        <path key={y} d={`M${67.6 - i * 0.2} ${y} H${92.4 + i * 0.2}`} stroke="#CFC6B4" strokeWidth="1.4" />
      ))}
      {inlays.map((y) => (
        <circle key={y} cx="80" cy={y} r="2.2" fill="#EFE4CC" />
      ))}
      {/* painted rosette around the soundhole */}
      <circle cx="80" cy="420" r="37" fill="none" stroke="#2A170C" strokeWidth="1" />
      <circle cx="80" cy="420" r="33" fill="none" stroke="#D9922E" strokeWidth="5" strokeDasharray="5 3" />
      <circle cx="80" cy="420" r="28" fill="none" stroke="#B83F28" strokeWidth="1.6" strokeDasharray="1.5 2.5" />
      {leaves.map((l) => (
        <ellipse key={l.a} cx={l.x} cy={l.y} rx="2.6" ry="5" fill="#3F7A3A" transform={`rotate(${l.a} ${l.x} ${l.y})`} />
      ))}
      <circle cx="80" cy="420" r="24" fill="#140A04" />
      {/* bone bridge, strings to the tail */}
      <rect x="64" y="508" width="32" height="7" rx="2" fill="#F3EEE2" stroke="#B9B2A6" strokeWidth="0.8" />
      <path d="M78 34 L76 98 L75 511 L77 590" fill="none" stroke="#ECE6DA" strokeWidth="0.95" />
      <path d="M78 56 L80 98 L80 511 L80 590" fill="none" stroke="#ECE6DA" strokeWidth="0.8" />
      <path d="M78 78 L84 98 L85 511 L83 590" fill="none" stroke="#ECE6DA" strokeWidth="0.7" />
      <rect x="72" y="586" width="16" height="5" rx="1.5" fill="#2A170C" />
    </svg>
  );
}

export function Guitar({ className, style, label }: ArtProps) {
  const id = useId().replace(/:/g, "");
  const top = `gt${id}`, neck = `gn${id}`;
  const frets = [98, 119, 139, 158, 176, 193, 208, 223, 237, 251, 263, 275, 287, 297, 307, 317, 325, 334, 342];
  const tuners = [22, 40, 58];
  const strings: [number, number, number, number, number][] = [
    [98, 58, 99, 95, 1.4],
    [98, 40, 103.5, 101, 1.2],
    [98, 22, 108, 107, 1],
    [122, 22, 112, 113, 0.8],
    [122, 40, 116.5, 119, 0.7],
    [122, 58, 121, 125, 0.6],
  ];
  return (
    <svg viewBox="0 0 220 560" className={className} style={style} {...a11y(label)}>
      <defs>
        <radialGradient id={top} cx="45%" cy="60%" r="65%">
          <stop offset="0" stopColor="#EAC88C" />
          <stop offset="1" stopColor="#B57C3B" />
        </radialGradient>
        <linearGradient id={neck} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#21130A" />
          <stop offset="0.5" stopColor="#4A2C17" />
          <stop offset="1" stopColor="#21130A" />
        </linearGradient>
      </defs>
      {tuners.map((y) => (
        <g key={y}>
          <path d={`M98 ${y} H84 M122 ${y} H136`} stroke="#9C968C" strokeWidth="3" />
          <ellipse cx="80" cy={y} rx="6" ry="4.5" fill="#D8D2C6" />
          <ellipse cx="140" cy={y} rx="6" ry="4.5" fill="#D8D2C6" />
        </g>
      ))}
      <path d="M95 74 L89 14 C89 8 95 4 110 4 C125 4 131 8 131 14 L125 74 Z" fill={`url(#${neck})`} stroke="#120A05" strokeWidth="1.5" />
      {tuners.map((y) => (
        <g key={`p${y}`}>
          <circle cx="98" cy={y} r="2.6" fill="#D8D2C6" />
          <circle cx="122" cy={y} r="2.6" fill="#D8D2C6" />
        </g>
      ))}
      <path d="M110 280 C70 280 50 295 52 330 C54 360 72 370 68 390 C60 410 30 430 32 475 C35 530 80 545 110 545 C140 545 185 530 188 475 C190 430 160 410 152 390 C148 370 166 360 168 330 C170 295 150 280 110 280 Z" fill={`url(#${top})`} stroke="#3A1E0C" strokeWidth="5" />
      <path d="M110 286 C74 286 57 300 58 330 C60 358 78 370 74 391 C66 412 38 432 39 475 C42 524 82 538 110 538 C138 538 178 524 181 475 C182 432 154 412 146 391 C142 370 160 358 162 330 C163 300 146 286 110 286 Z" fill="none" stroke="#EFE4CC" strokeWidth="1" />
      <circle cx="110" cy="380" r="31" fill="none" stroke="#3A1E0C" strokeWidth="7" strokeDasharray="3 2" />
      <circle cx="110" cy="380" r="24" fill="#140A04" />
      <path d="M95 76 L92 352 H128 L125 76 Z" fill={`url(#${neck})`} />
      <rect x="95" y="72" width="30" height="4" fill="#EFE4CC" />
      {frets.map((y, i) => (
        <path key={y} d={`M${94.8 - i * 0.14} ${y} H${125.2 + i * 0.14}`} stroke="#BDB6A8" strokeWidth="1.3" />
      ))}
      {[129, 167, 200, 230].map((y) => (
        <circle key={y} cx="110" cy={y} r="2.6" fill="#EFE4CC" />
      ))}
      <circle cx="104" cy="269" r="2.6" fill="#EFE4CC" />
      <circle cx="116" cy="269" r="2.6" fill="#EFE4CC" />
      <rect x="86" y="468" width="48" height="10" rx="2" fill="#21130A" />
      <path d="M91 470 H129" stroke="#EFE4CC" strokeWidth="1.6" />
      {strings.map(([px, py, nx, sx, w]) => (
        <path key={`${px}${py}`} d={`M${px} ${py} L${nx} 76 L${sx} 471`} fill="none" stroke="#E6E1D6" strokeWidth={w} />
      ))}
    </svg>
  );
}

/** Guitar soundhole seen from the front: mosaic rosette with six strings across it. */
export function Rosette({ className, style, label }: ArtProps) {
  const gauges: [number, number, string][] = [
    [162, 3.2, "#D9C49A"],
    [189, 2.6, "#D9C49A"],
    [216, 2.1, "#D9C49A"],
    [243, 1.6, "#EFE4CC"],
    [270, 1.2, "#EFE4CC"],
    [297, 0.9, "#EFE4CC"],
  ];
  return (
    <svg viewBox="0 0 460 460" className={className} style={style} {...a11y(label)}>
      <circle cx="230" cy="230" r="222" fill="#2E2218" />
      <circle cx="230" cy="230" r="206" fill="none" stroke="#EFE3CB" strokeOpacity="0.45" strokeWidth="2" />
      <circle cx="230" cy="230" r="194" fill="none" stroke="#D6A957" strokeWidth="16" strokeDasharray="6 4" />
      <circle cx="230" cy="230" r="183" fill="none" stroke="#EFE3CB" strokeOpacity="0.45" strokeWidth="2" />
      <circle cx="230" cy="230" r="176" fill="none" stroke="#B83F28" strokeWidth="8" strokeDasharray="2 6" />
      <circle cx="230" cy="230" r="168" fill="none" stroke="#EFE3CB" strokeOpacity="0.45" strokeWidth="2" />
      <circle cx="230" cy="230" r="158" fill="none" stroke="#D6A957" strokeWidth="10" strokeDasharray="14 3 3 3" />
      <circle cx="230" cy="230" r="146" fill="#0D0906" />
      {gauges.map(([x, w, c]) => (
        <path key={x} d={`M${x} 0 V460`} stroke={c} strokeWidth={w} strokeLinecap="round" />
      ))}
    </svg>
  );
}

/** Small rosette used as the logo mark. */
export function RosetteMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden="true">
      <circle cx="17" cy="17" r="15" fill="none" stroke="#D6A957" strokeWidth="4" strokeDasharray="2.5 2" />
      <circle cx="17" cy="17" r="9" fill="#B83F28" />
      <circle cx="17" cy="17" r="4" fill="#17110C" />
    </svg>
  );
}

/** Horizontal strings used as section dividers: 3 for panduri, 6 for guitar. */
export function StringLines({ count = 3, color = "#D6A957", className }: { count?: 3 | 6; color?: string; className?: string }) {
  const h = count === 3 ? 36 : 48;
  const gap = count === 3 ? 10 : 7;
  return (
    <svg width="100%" height={h} viewBox={`0 0 1280 ${h}`} preserveAspectRatio="none" aria-hidden="true" className={className} style={{ display: "block" }}>
      {Array.from({ length: count }, (_, i) => (
        <path key={i} d={`M0 ${8 + i * gap} H1280`} stroke={color} strokeWidth={2 - i * (count === 3 ? 0.4 : 0.25)} />
      ))}
    </svg>
  );
}
