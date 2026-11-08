import type { CSSProperties } from "react";

/** Placeholder cover drawn in code — swap for the real cover image later. */
export function BookCover({
  name,
  sub,
  color,
  strings,
  size = "md",
  style,
}: {
  name: string;
  sub?: string;
  color: string;
  strings: number;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
}) {
  const xs = Array.from({ length: strings }, (_, i) => 60 - (strings - 1) * 4 + i * 8);
  return (
    <div className={`cover cover-${size}`} style={{ background: color, ...style }}>
      <svg aria-hidden="true" viewBox="0 0 120 120" className="cover-art">
        <circle cx="60" cy="60" r="44" fill="none" stroke="#E3B252" strokeWidth="2" />
        <circle cx="60" cy="60" r="14" fill="#14110F" />
        {xs.map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="120" stroke="#F3EBDD" strokeWidth="1.4" />
        ))}
      </svg>
      <div>
        <div className="cover-name">{name}</div>
        {sub && <div className="cover-sub">{sub}</div>}
      </div>
    </div>
  );
}
