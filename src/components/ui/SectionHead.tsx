import React from 'react';

export const SectionHead = ({
  eyebrow,
  title,
  sub,
  right,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  right?: React.ReactNode;
}) => (
  <div className="sech">
    <div>
      {eyebrow && <small>{eyebrow}</small>}
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
    {right}
  </div>
);