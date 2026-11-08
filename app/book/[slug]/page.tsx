"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import { BookCover } from "@/components/BookCover";
import { getBook } from "@/lib/data";

export default function BookPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useApp();
  const book = getBook(slug);
  const [qty, setQty] = useState(1);
  const [paid, setPaid] = useState(false);

  if (!book) {
    return (
      <div className="container section stack">
        <h1 className="h2">{t.notFound}</h1>
        <Link href="/">{t.home}</Link>
      </div>
    );
  }

  const strings = book.slug === "guitar" ? 6 : 3;

  return (
    <>
      <nav className="container crumbs" aria-label="Breadcrumb">
        <Link href="/">{t.home}</Link> / <Link href="/#books">{t.booksTitle}</Link> /{" "}
        <span style={{ color: "var(--cream)" }}>{book.title[lang]}</span>
      </nav>

      <section className="container product">
        <div className="product-media">
          <BookCover size="lg" name={book.name[lang]} sub={`${t.bookSub} · ${t.artist}`} color={book.color} strings={strings} />
        </div>

        <div className="product-info">
          <h1 className="h1" style={{ fontSize: "clamp(30px, 6vw, 46px)" }}>{book.title[lang]}</h1>
          <p className="lead">{book.desc[lang]}</p>

          <div className="choices" role="radiogroup" aria-label={t.format}>
            <button type="button" role="radio" aria-checked="true" className="choice">
              <b>{t.printed}</b>
              <span>{t.printedNote}</span>
            </button>
            <button type="button" role="radio" aria-checked="false" className="choice" disabled>
              <b>{t.pdf}</b>
              <span>{t.soon}</span>
            </button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
            <span className="price" style={{ fontSize: 34 }}>{t.price}</span>
            <div className="qty" role="group" aria-label={t.qty}>
              <button type="button" aria-label={t.less} onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span aria-live="polite">{qty}</span>
              <button type="button" aria-label={t.more} onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <fieldset className="fieldset">
            <legend>{t.delivery}</legend>
            <label className="radio"><input type="radio" name="ship" defaultChecked /> {t.ship1}</label>
            <label className="radio"><input type="radio" name="ship" /> {t.ship2}</label>
            <label className="radio"><input type="radio" name="ship" /> {t.ship3}</label>
          </fieldset>

          <div className="btn-row">
            <button type="button" className="btn btn-gold btn-lg" style={{ flex: "1 1 240px" }} onClick={() => setPaid(true)}>
              {t.buyCard}
            </button>
            <button type="button" className="btn btn-ghost btn-lg" style={{ flex: "1 1 200px" }} onClick={() => setPaid(true)}>
              {t.addCart}
            </button>
          </div>
          {paid && <p className="note" role="status">{t.demoPay}</p>}
          <p className="muted">{t.payNote}</p>
        </div>
      </section>

      <section className="light">
        <div className="container section stack" style={{ gap: 28 }}>
          <h2 className="h2" style={{ fontSize: "clamp(28px, 5vw, 36px)" }}>{t.inBook}</h2>
          <ol className="toc">
            {book.lessons.map((l, i) => (
              <li key={i}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <Link href={`/lesson/${book.slug}/${i + 1}`}>{l[lang]}</Link>
                  <small>{t.videoLesson}{i === 0 ? ` · ${t.free}` : ""}</small>
                </div>
              </li>
            ))}
          </ol>
          <p style={{ fontSize: 14, color: "#5a4e43" }}>{t.tocNote}</p>
        </div>
      </section>
    </>
  );
}
