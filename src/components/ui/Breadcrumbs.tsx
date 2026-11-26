import React from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumbs = ({ items }: { items: string[][] }) => (
  <nav className="crumbs" aria-label="Breadcrumb">
    {items.map(([t, to]) =>
      to ? (
        <span key={t}>
          <Link to={to}>{t}</Link>
          <i>/</i>
        </span>
      ) : (
        <b key={t}>{t}</b>
      ),
    )}
  </nav>
);