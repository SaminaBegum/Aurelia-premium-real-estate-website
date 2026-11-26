import React from 'react';
import { A } from '@/lib/assets';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface Props {
  eyebrow?: string;
  title: string;
  sub?: string;
  img?: string;
  crumbs?: string[][];
  children?: React.ReactNode;
}

export default function InnerPageBanner({
  eyebrow,
  title,
  sub,
  img = 'office.jpg',
  crumbs,
  children,
}: Props) {
  return (
    <section
      className="ph"
      style={{ '--bg': `url(${A(img)})` } as React.CSSProperties}
    >
      <div className="w">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <small>{eyebrow}</small>}
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
        {children}
      </div>
    </section>
  );
}