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
  const body = `pb${id}`, top = `pt${id}`, neck = `pn${id}`;
  const frets = [104, 125, 145, 164, 182, 199, 214, 229, 243, 257, 269, 281];
  const holes = [0, 60, 120, 180, 240, 300].map((a) => [70 + 13 * Math.cos((a * Math.PI) / 180), 405 + 13 * Math.sin((a * Math.PI) / 180)]);
  return (
    <svg viewBox="0 0 140 560" className={className} style={style} {...a11y(label)}>
      <defs>
        <radialGradient id={body} cx="42%" cy="62%" r="62%">
          <stop offset="0" stopColor="#C98A4B" />
          <stop offset="0.7" stopColor="#8A4E24" />
          <stop offset="1" stopColor="#4E2A12" />
        </radialGradient>
        <radialGradient id={top} cx="42%" cy="58%" r="68%">
          <stop offset="0" stopColor="#E6BE80" />
          <stop offset="1" stopColor="#A9743C" />
        </radialGradient>
        <linearGradient id={neck} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#3B2010" />
          <stop offset="0.5" stopColor="#6A3C1C" />
          <stop offset="1" stopColor="#3B2010" />
        </linearGradient>
      </defs>
      {/* rear tuning pegs */}
      <path d="M54 26 H38 M54 50 H38 M86 38 H102" stroke="#2A160A" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="34" cy="26" rx="6" ry="9" fill="#6A3C1C" stroke="#2A160A" strokeWidth="1.2" />
      <ellipse cx="34" cy="50" rx="6" ry="9" fill="#6A3C1C" stroke="#2A160A" strokeWidth="1.2" />
      <ellipse cx="106" cy="38" rx="6" ry="9" fill="#6A3C1C" stroke="#2A160A" strokeWidth="1.2" />
      {/* head */}
      <path d="M58 82 L54 22 C54 10 62 4 70 4 C78 4 86 10 86 22 L82 82 Z" fill={`url(#${neck})`} stroke="#2A160A" strokeWidth="1.5" />
      <circle cx="70" cy="13" r="3" fill="#2A160A" />
      <circle cx="64" cy="26" r="2.4" fill="#E3BE7A" />
      <circle cx="76" cy="38" r="2.4" fill="#E3BE7A" />
      <circle cx="64" cy="50" r="2.4" fill="#E3BE7A" />
      {/* carved body + soundboard */}
      <path d="M57 286 C40 310 20 360 16 420 C12 490 40 546 70 546 C100 546 128 490 124 420 C120 360 100 310 83 286 Z" fill={`url(#${body})`} stroke="#E3BE7A" strokeWidth="1.2" />
      <path d="M60 300 C46 322 28 368 25 422 C22 485 46 534 70 534 C94 534 118 485 115 422 C112 368 94 322 80 300 Z" fill={`url(#${top})`} stroke="#5A3319" strokeWidth="1.2" />
      <path d="M62 307 C49 328 32 370 29 422 C26 481 48 528 70 528 C92 528 114 481 111 422 C108 370 91 328 78 307 Z" fill="none" stroke="#6B3A1A" strokeWidth="1" strokeDasharray="2 2" />
      {/* neck + frets */}
      <path d="M60 84 L57 322 H83 L80 84 Z" fill={`url(#${neck})`} />
      <rect x="59" y="80" width="22" height="4" fill="#EFE4CC" />
      {frets.map((y, i) => (
        <path key={y} d={`M${59.5 - i * 0.14} ${y} H${80.5 + i * 0.14}`} stroke="#CFC6B4" strokeWidth="1.6" />
      ))}
      {/* cluster of small sound holes */}
      <circle cx="70" cy="405" r="19" fill="none" stroke="#6B3A1A" strokeWidth="1" />
      <circle cx="70" cy="405" r="4" fill="#2A160A" />
      {holes.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="#2A160A" />
      ))}
      {/* bridge, tail button, strings */}
      <rect x="54" y="476" width="32" height="7" rx="1.5" fill="#2A160A" />
      <path d="M56 477.5 H84" stroke="#EFE4CC" strokeWidth="1.4" />
      <rect x="64" y="532" width="12" height="6" rx="2" fill="#2A160A" />
      <path d="M64 26 L65 82 L63 478 L67 535" fill="none" stroke="#F2E6CC" strokeWidth="0.95" />
      <path d="M64 50 L70 82 L70 478 L70 535" fill="none" stroke="#F2E6CC" strokeWidth="0.8" />
      <path d="M76 38 L75 82 L77 478 L73 535" fill="none" stroke="#F2E6CC" strokeWidth="0.7" />
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
      <circle cx="230" cy="230" r="222" fill="#E6D4B2" />
      <circle cx="230" cy="230" r="206" fill="none" stroke="#3A2617" strokeWidth="2" />
      <circle cx="230" cy="230" r="194" fill="none" stroke="#A87C3A" strokeWidth="16" strokeDasharray="6 4" />
      <circle cx="230" cy="230" r="183" fill="none" stroke="#3A2617" strokeWidth="2" />
      <circle cx="230" cy="230" r="176" fill="none" stroke="#8C2F1B" strokeWidth="8" strokeDasharray="2 6" />
      <circle cx="230" cy="230" r="168" fill="none" stroke="#3A2617" strokeWidth="2" />
      <circle cx="230" cy="230" r="158" fill="none" stroke="#A87C3A" strokeWidth="10" strokeDasharray="14 3 3 3" />
      <circle cx="230" cy="230" r="146" fill="#24170E" />
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
      <circle cx="17" cy="17" r="15" fill="none" stroke="#A87C3A" strokeWidth="4" strokeDasharray="2.5 2" />
      <circle cx="17" cy="17" r="9" fill="#3A2617" />
    </svg>
  );
}

/** Horizontal strings used as section dividers: 3 for panduri, 6 for guitar. */
export function StringLines({ count = 3, color = "#D9C49A", className }: { count?: 3 | 6; color?: string; className?: string }) {
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
