import React, { createContext, useContext, useEffect, useState } from 'react';

interface Ctx {
  saved: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

const C = createContext<Ctx>({ saved: [], toggle() { }, has: () => false });

export const useSaved = () => useContext(C);

/** Keeps the visitor's shortlisted listing ids in localStorage. */
export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('aurelia-saved') || '[]');
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aurelia-saved', JSON.stringify(saved));
    } catch (e) { }
  }, [saved]);

  const toggle = (id: string) =>
    setSaved((x) => (x.includes(id) ? x.filter((i) => i !== id) : [...x, id]));

  return (
    <C.Provider value={{ saved, toggle, has: (id) => saved.includes(id) }}>
      {children}
    </C.Provider>
  );
}