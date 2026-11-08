"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/data";
import { DICT, type Dict } from "@/lib/i18n";

/*
 * Demo state for the test deployment. Language, the "logged in" email and the
 * activated books live in localStorage — NOT secure, replaced by a real backend
 * (accounts, activation codes, signed video URLs) in the next stage.
 */

type Ctx = {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
  owned: string[];
  activate: (slug: string) => void;
  resetDemo: () => void;
  ready: boolean;
};

const AppCtx = createContext<Ctx | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — state stays in memory */
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ka");
  const [user, setUser] = useState<string | null>(null);
  const [owned, setOwned] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLangState(read<Lang>("lang", "ka"));
    setUser(read<string | null>("user", null));
    setOwned(read<string[]>("owned", []));
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value: Ctx = {
    lang,
    t: DICT[lang],
    setLang: (l) => {
      setLangState(l);
      write("lang", l);
    },
    user,
    login: (email) => {
      setUser(email);
      write("user", email);
    },
    logout: () => {
      setUser(null);
      write("user", null);
    },
    owned,
    activate: (slug) => {
      const next = owned.includes(slug) ? owned : [...owned, slug];
      setOwned(next);
      write("owned", next);
    },
    resetDemo: () => {
      setUser(null);
      setOwned([]);
      write("user", null);
      write("owned", null);
    },
    ready,
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp(): Ctx {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp must be used inside AppProvider");
  return c;
}
