import type { CSSProperties } from "react";
import { Guitar, Panduri } from "./Instruments";

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
  const Art = strings === 3 ? Panduri : Guitar;
  return (
    <div className={`cover cover-${size}`} style={{ background: color, ...style }}>
      <Art className={`cover-art ${strings === 3 ? "cover-art-panduri" : ""}`} />
      <div>
        <div className="cover-name">{name}</div>
        {sub && <div className="cover-sub">{sub}</div>}
      </div>
    </div>
  );
}
