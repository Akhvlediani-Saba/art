"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useApp } from "@/components/AppProvider";
import { BOOKS, DEMO_CODE } from "@/lib/data";

export default function ActivatePage() {
  const { t, lang, user, login, activate, ready } = useApp();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [book, setBook] = useState(BOOKS[0].slug);
  const [code, setCode] = useState("");
  const [codeErr, setCodeErr] = useState(false);

  // Already logged in → skip straight to the code step.
  useEffect(() => {
    if (ready && user && step === 1) setStep(2);
  }, [ready, user, step]);

  const heads: Record<number, [string, string]> = {
    1: [t.a1h, t.a1s],
    2: [t.a2h, t.a2s],
    3: [t.a3h, t.a3s],
  };

  function doLogin(e?: React.FormEvent, viaGoogle = false) {
    e?.preventDefault();
    if (viaGoogle) {
      login("demo@gmail.com");
      setStep(2);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailErr(true);
      return;
    }
    login(email);
    setStep(2);
  }

  function doActivate(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().toUpperCase() !== DEMO_CODE) {
      setCodeErr(true);
      return;
    }
    activate(book);
    setStep(3);
  }

  const chosen = BOOKS.find((b) => b.slug === book)!;

  return (
    <section className="container auth">
      <div className="auth-side">
        <p className="eyebrow">{t.step} {step} / 3</p>
        <h1>{heads[step][0]}</h1>
        <p style={{ color: "var(--text-2)", maxWidth: 440 }}>{heads[step][1]}</p>
        <div className="bars" aria-hidden="true">
          {[1, 2, 3].map((i) => <div key={i} className={i <= step ? "on" : ""} />)}
        </div>
      </div>

      <div className="auth-card">
        {step === 1 && (
          <form className="form" onSubmit={doLogin} noValidate>
            <button type="button" className="btn btn-google" onClick={() => doLogin(undefined, true)}>{t.google}</button>
            <div className="divider">{t.or}</div>
            <label className="field">
              {t.email}
              <input className="input" type="email" autoComplete="email" placeholder="name@example.com"
                value={email} onChange={(e) => { setEmail(e.target.value); setEmailErr(false); }} />
            </label>
            {emailErr && <p className="err" role="alert">{t.emailErr}</p>}
            <label className="field">
              {t.password}
              <input className="input" type="password" autoComplete="current-password" />
            </label>
            <button type="submit" className="btn btn-gold">{t.login}</button>
            <p className="muted" style={{ textAlign: "center" }}>
              {t.noAccount} <a href="#register">{t.register}</a>
            </p>
          </form>
        )}

        {step === 2 && (
          <form className="form" onSubmit={doActivate} noValidate>
            <div className="sticker">
              <div className="sticker-chip">{t.sticker}</div>
              <p style={{ fontSize: 14, color: "var(--text-2)" }}>{t.stickerNote}</p>
            </div>
            <label className="field">
              {t.whichBook}
              <select className="input" value={book} onChange={(e) => setBook(e.target.value)}>
                {BOOKS.map((b) => <option key={b.slug} value={b.slug}>{b.title[lang]}</option>)}
              </select>
            </label>
            <label className="field">
              {t.code}
              <input className="input input-code" type="text" autoComplete="off" placeholder="XXXX-XXXX-XXXX"
                value={code} onChange={(e) => { setCode(e.target.value); setCodeErr(false); }} />
            </label>
            {codeErr && <p className="err" role="alert">{t.codeErr} <b>{DEMO_CODE}</b></p>}
            <button type="submit" className="btn btn-gold">{t.activate}</button>
            <p className="muted">{t.oneCode} {t.demoCode} <b>{DEMO_CODE}</b></p>
          </form>
        )}

        {step === 3 && (
          <div className="stack" style={{ gap: 20, alignItems: "flex-start" }}>
            <div className="success-icon">
              <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#F4E8D2" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(24px, 5vw, 30px)", lineHeight: 1.25 }}>
              „{chosen.title[lang]}“ {t.activated}
            </h2>
            <p style={{ color: "var(--text-2)" }}>{t.allOpen}</p>
            <Link href={`/lesson/${chosen.slug}/1`} className="btn btn-gold btn-lg">{t.goLesson}</Link>
          </div>
        )}
      </div>
    </section>
  );
}
