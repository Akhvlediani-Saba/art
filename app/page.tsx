"use client";

import Link from "next/link";
import { useApp } from "@/components/AppProvider";
import { BookCover } from "@/components/BookCover";
import { BOOKS } from "@/lib/data";

export default function Home() {
  const { t, lang } = useApp();
  const steps = [
    { n: "01", title: t.step1t, body: t.step1b },
    { n: "02", title: t.step2t, body: t.step2b },
    { n: "03", title: t.step3t, body: t.step3b },
  ];

  return (
    <>
      <section className="container hero" id="top">
        <div className="hero-text">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="h1">{t.heroTitle}</h1>
          <p className="lead">{t.heroSub}</p>
          <div className="btn-row" style={{ paddingTop: 8 }}>
            <a href="#books" className="btn btn-gold btn-lg">{t.ctaBuy}</a>
            <Link href="/activate" className="btn btn-ghost btn-lg">{t.ctaHave}</Link>
          </div>
        </div>
        <div className="hero-covers">
          <BookCover name={BOOKS[0].name[lang]} sub={t.bookSub} color={BOOKS[0].color} strings={3} style={{ transform: "rotate(-4deg)" }} />
          <BookCover name={BOOKS[1].name[lang]} sub={t.bookSub} color={BOOKS[1].color} strings={6} style={{ transform: "rotate(3deg) scale(.92)" }} />
        </div>
      </section>

      <section id="how" className="light section">
        <div className="container stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 12, maxWidth: 680 }}>
            <p className="eyebrow">{t.howEyebrow}</p>
            <h2 className="h2">{t.howTitle}</h2>
          </div>
          <div className="grid grid-steps">
            {steps.map((s) => (
              <div key={s.n} className="card-light">
                <div className="num">{s.n}</div>
                <h3 style={{ fontSize: 21, fontWeight: 600 }}>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="books" className="container section">
        <div className="section-head">
          <div className="stack" style={{ gap: 12 }}>
            <p className="eyebrow">{t.booksEyebrow}</p>
            <h2 className="h2">{t.booksTitle}</h2>
          </div>
          <p className="muted">{t.pdfSoon}</p>
        </div>
        <div className="grid grid-books">
          {BOOKS.map((b, i) => (
            <article key={b.slug} className="book-card">
              <BookCover size="sm" name={b.name[lang]} color={b.color} strings={i === 0 ? 3 : 6} />
              <div className="book-card-body">
                <h3>{b.title[lang]}</h3>
                <p style={{ color: "var(--text-2)", fontSize: 15 }}>{b.desc[lang]}</p>
                <ul className="feats">
                  <li>— {t.featLessons}</li>
                  <li>— {t.featVideo}</li>
                  <li>— {t.featQr}</li>
                </ul>
                <div className="price-row">
                  <span className="price">{t.price}</span>
                  <Link href={`/book/${b.slug}`} className="btn btn-gold">{t.buy}</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--surface)" }}>
        <div className="container section split">
          <div className="split-side">
            <p className="eyebrow">{t.freeEyebrow}</p>
            <h2 className="h2" style={{ fontSize: "clamp(28px, 5vw, 40px)" }}>{t.freeTitle}</h2>
            <p style={{ color: "var(--text-2)" }}>{t.freeBody}</p>
            <div><Link href="/lesson/panduri/1" className="btn btn-gold">{t.freeCta}</Link></div>
          </div>
          <div className="split-main">
            <div className="video-box">
              <Link href="/lesson/panduri/1" className="play-btn" aria-label={t.freeCta}>
                <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#14110F" /></svg>
              </Link>
              <span className="video-label">[{t.videoLesson}]</span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="container section split">
        <div className="photo-ph">{t.photoPh}</div>
        <div className="split-main">
          <p className="eyebrow">{t.aboutEyebrow}</p>
          <h2 className="h2">{t.artist}</h2>
          <p style={{ color: "var(--text-2)", maxWidth: 620 }}>{t.aboutBody}</p>
          <a href="#contact" style={{ fontWeight: 600 }}>{t.aboutLink}</a>
        </div>
      </section>
    </>
  );
}
