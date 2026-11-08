"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import { FREE_LESSON, getBook } from "@/lib/data";

/*
 * The URL printed as a QR code in the book: /lesson/<book>/<number>
 * e.g. /lesson/panduri/3. Same QR in every copy — access is decided by the
 * account (has this book been activated?), not by the link.
 */
export default function LessonPage() {
  const params = useParams<{ book: string; n: string }>();
  const { t, lang, user, owned, ready } = useApp();
  const book = getBook(params.book);
  const n = Number(params.n);
  const [tab, setTab] = useState<"play" | "practice">("play");
  const [speed, setSpeed] = useState(0.75);
  const [loop, setLoop] = useState(true);

  if (!book || !Number.isInteger(n) || n < 1 || n > book.lessons.length) {
    return (
      <div className="container section stack">
        <h1 className="h2">{t.notFound}</h1>
        <Link href="/">{t.home}</Link>
      </div>
    );
  }

  const isFree = n === FREE_LESSON;
  const unlocked = isFree || owned.includes(book.slug);
  const total = book.lessons.length;
  const title = book.lessons[n - 1][lang];

  return (
    <section className="container lesson-layout">
      <div className="lesson-main">
        <p className="muted">{book.title[lang]} · {t.page} [N]</p>
        <h1>{t.lesson} {n} — {title}</h1>

        <div className="tabs" role="tablist" aria-label={t.videoLesson}>
          <button type="button" role="tab" className="tab" aria-selected={tab === "play"} onClick={() => setTab("play")}>{t.play}</button>
          <button type="button" role="tab" className="tab" aria-selected={tab === "practice"} onClick={() => setTab("practice")}>{t.practice}</button>
        </div>

        {!ready ? (
          <div className="video-box" />
        ) : unlocked ? (
          <div className="video-box">
            {/* Placeholder: the real player (Bunny Stream / Cloudflare Stream, signed URL) goes here. */}
            <button type="button" className="play-btn" aria-label="Play">
              <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#14110F" /></svg>
            </button>
            {user && <span className="watermark">{user}</span>}
            <div className="progress-bar">
              <div className="track">
                <div className="track-fill" />
                {loop && <div className="track-loop" />}
              </div>
              <div className="times"><span>1:12</span><span>[{tab === "play" ? t.play : t.practice} — {t.videoPh}] · {speed}×</span><span>3:20</span></div>
            </div>
          </div>
        ) : (
          <div className="locked">
            <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E3B252" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
            <h2>{t.lockedH}</h2>
            <p>{t.lockedB}</p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <Link href="/activate" className="btn btn-gold">{t.enterCode}</Link>
              <Link href={`/book/${book.slug}`} className="btn btn-ghost">{t.buyBook}</Link>
            </div>
          </div>
        )}

        {unlocked && (
          <div className="controls">
            <div className="speeds" role="group" aria-label={t.tempo}>
              <span className="muted" style={{ paddingRight: 4 }}>{t.tempo}</span>
              {[0.5, 0.75, 1, 1.25].map((v) => (
                <button key={v} type="button" aria-pressed={speed === v} onClick={() => setSpeed(v)}>{v}×</button>
              ))}
            </div>
            <label className="check"><input type="checkbox" checked={loop} onChange={() => setLoop(!loop)} /> {t.loopAB}</label>
            <label className="check"><input type="checkbox" /> {t.metronome}</label>
          </div>
        )}

        <div className="stack" style={{ gap: 10, paddingTop: 6 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600 }}>{t.whatLearn}</h2>
          <p style={{ color: "var(--text-2)", maxWidth: 720 }}>{t.lessonPh}</p>
        </div>

        <div className="pager">
          {n > 1 ? (
            <Link href={`/lesson/${book.slug}/${n - 1}`} className="btn btn-ghost">← {t.lesson} {n - 1}</Link>
          ) : <span />}
          {n < total && (
            <Link href={`/lesson/${book.slug}/${n + 1}`} className="btn btn-gold">{t.lesson} {n + 1} →</Link>
          )}
        </div>
      </div>

      <aside className="sidebar" aria-label={t.lessons}>
        <h2>{t.lessons}</h2>
        <div className="meter"><div style={{ width: `${((n - 1) / total) * 100}%` }} /></div>
        <p className="muted" style={{ marginBottom: 8 }}>{n - 1} / {total} {t.done}</p>
        {book.lessons.map((l, i) => {
          const num = i + 1;
          const done = num < n;
          const cur = num === n;
          return (
            <Link key={num} href={`/lesson/${book.slug}/${num}`} className={`lesson-link${cur ? " current" : ""}`} aria-current={cur ? "page" : undefined}>
              <span className={`dot${done ? " done" : cur ? " cur" : ""}`}>{done ? "✓" : num}</span>
              <span>{l[lang]}</span>
              {num === FREE_LESSON && <span className="badge">{t.free}</span>}
            </Link>
          );
        })}
      </aside>
    </section>
  );
}
