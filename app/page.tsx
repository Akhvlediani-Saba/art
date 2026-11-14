"use client";

import Link from "next/link";
import { useApp } from "@/components/AppProvider";
import { Guitar, Panduri, Rosette, StringLines } from "@/components/Instruments";
import { BOOKS } from "@/lib/data";

export default function Home() {
  const { t, lang } = useApp();
  const steps = [
    { n: "I", title: t.step1t, body: t.step1b },
    { n: "II", title: t.step2t, body: t.step2b },
    { n: "III", title: t.step3t, body: t.step3b },
  ];

  return (
    <>
      <section className="container hero" id="top">
        <div className="hero-text">
          <p className="eyebrow">{t.heroStrings}</p>
          <h1 className="h1">{t.heroTitle}</h1>
          <p className="lead">{t.heroSub}</p>
          <div className="btn-row" style={{ paddingTop: 8 }}>
            <a href="#books" className="btn btn-gold btn-lg">{t.ctaBuy}</a>
            <Link href="/activate" className="btn btn-ghost btn-lg">{t.ctaHave}</Link>
          </div>
        </div>
        <div className="hero-art">
          <Rosette className="rosette" label={t.soundholeAlt} />
        </div>
      </section>

      <div className="string-band">
        <StringLines count={3} />
      </div>

      <section id="how" className="container section">
        <div className="stack" style={{ gap: 10, marginBottom: 40 }}>
          <h2 className="h2">{t.howTitle}</h2>
          <p style={{ color: "var(--muted)" }}>{t.howSub}</p>
        </div>
        <div className="fretboard" aria-hidden="true">
          <div><span className="inlay" /></div>
          <div><span className="inlay" /></div>
          <div><span className="inlay" /><span className="inlay" /></div>
        </div>
        <ol className="fret-steps">
          {steps.map((s) => (
            <li key={s.n}>
              <p className="eyebrow">{s.n} {t.fret}</p>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="books" className="book-panels">
        {BOOKS.map((b, i) => {
          const panduri = i === 0;
          const Art = panduri ? Panduri : Guitar;
          return (
            <article key={b.slug} className="book-panel" style={{ background: b.color }}>
              <Art className={panduri ? "panel-art panel-art-panduri" : "panel-art"} label={b.name[lang]} />
              <div className="book-panel-body">
                <p className="eyebrow">
                  {t.bookWord} {panduri ? "I" : "II"} · {panduri ? 3 : 6} {t.stringsWord}
                </p>
                <h3>{b.title[lang]}</h3>
                <p>{b.desc[lang]}</p>
                <ul>
                  <li>{t.featLessons}</li>
                  <li>{t.featVideo}</li>
                  <li>{t.featQr}</li>
                </ul>
                <div className="price-row">
                  <span className="price">{t.price}</span>
                  <Link href={`/book/${b.slug}`} className="btn btn-cream">{t.buy}</Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      <p className="container muted" style={{ paddingTop: 16 }}>{t.pdfSoon}</p>

      <section className="container section split">
        <div className="split-side">
          <p className="eyebrow">{t.freeEyebrow}</p>
          <h2 className="h2">{t.freeTitle}</h2>
          <p style={{ color: "var(--text-2)" }}>{t.freeBody}</p>
          <div><Link href="/lesson/panduri/1" className="btn btn-dark">{t.freeCta}</Link></div>
        </div>
        <div className="split-main">
          <div className="video-frame">
            <div className="video-box">
              <svg className="video-rings" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <circle cx="320" cy="180" r="150" fill="none" stroke="#3A2617" strokeWidth="14" strokeDasharray="6 4" />
                <circle cx="320" cy="180" r="128" fill="none" stroke="#3A2617" strokeWidth="2" />
              </svg>
              <Link href="/lesson/panduri/1" className="play-btn" aria-label={t.freeCta}>
                <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#F4E8D2" /></svg>
              </Link>
              <span className="video-label">[{t.videoLesson}]</span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-band">
        <div className="container section split">
          <div className="photo-ph">{t.photoPh}</div>
          <div className="split-main">
            <p className="eyebrow">{t.aboutEyebrow}</p>
            <h2 className="h2">{t.artist}</h2>
            <p style={{ color: "var(--text-2)", maxWidth: 620 }}>{t.aboutBody}</p>
            <a href="#contact" style={{ fontWeight: 600 }}>{t.aboutLink} →</a>
          </div>
        </div>
      </section>
    </>
  );
}
