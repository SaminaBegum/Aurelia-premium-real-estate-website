import React, { useRef } from 'react';
import { useInView } from '@/hooks/useInView';

export function Reveal({
  children,
  className = '',
  d = 0,
}: {
  children: React.ReactNode;
  className?: string;
  d?: number;
}) {
  const r = useRef<HTMLDivElement>(null);

  useInView(r, () => r.current?.classList.add('in'));

  return (
    <div
      ref={r}
      className={'rv ' + className}
      style={{ transitionDelay: d + 'ms' }}
    >
      {children}
    </div>
  );
}