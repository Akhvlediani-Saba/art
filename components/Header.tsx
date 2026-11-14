"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "./AppProvider";
import { RosetteMark } from "./Instruments";

export function Header() {
  const { t, lang, setLang, user, logout } = useApp();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/#books", label: t.navBooks },
    { href: "/#how", label: t.navHow },
    { href: "/#about", label: t.navAbout },
    { href: "/#contact", label: t.navContact },
  ];

  return (
    <>
      <div className="demo-banner">{t.demoBanner}</div>
      <header className="container header">
        <Link href="/" className="logo">
          <RosetteMark />
          {t.artist}
        </Link>
        <nav className="nav-links" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="lang" role="group" aria-label="Language">
            <button type="button" aria-pressed={lang === "ka"} onClick={() => setLang("ka")}>
              ქარ
            </button>
            <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
          {user ? (
            <button type="button" className="btn btn-outline hide-m" onClick={logout} title={user}>
              {t.logout}
            </button>
          ) : (
            <Link href="/activate" className="btn btn-outline hide-m">
              {t.login}
            </Link>
          )}
          <button
            type="button"
            className="burger"
            aria-label={t.menu}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>
      {open && (
        <nav className="mobile-menu" aria-label={t.menu}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          {user ? (
            <button type="button" className="btn btn-gold" onClick={() => { logout(); setOpen(false); }}>
              {t.logout}
            </button>
          ) : (
            <Link href="/activate" className="btn btn-gold" onClick={() => setOpen(false)}>
              {t.login}
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
