"use client";

import { useApp } from "./AppProvider";

export function Footer() {
  const { t, resetDemo } = useApp();
  return (
    <footer id="contact" className="footer">
      <div className="container footer-inner">
        <div className="footer-logo">{t.artist}</div>
        <div className="footer-links">
          <a href="mailto:[email]">[email]</a>
          <a href="#contact">Instagram</a>
          <a href="#contact">YouTube</a>
          <a href="#contact">{t.terms}</a>
          <button type="button" className="linklike" onClick={resetDemo}>
            {t.resetDemo}
          </button>
        </div>
      </div>
    </footer>
  );
}
