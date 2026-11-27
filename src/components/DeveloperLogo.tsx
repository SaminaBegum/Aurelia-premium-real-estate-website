import React from 'react';
import { A } from '@/lib/assets';
import type { Developer } from '@/data/types';

export const DeveloperLogo = ({ d }: { d: Developer }) =>
    d.l ? (
        <img src={A(d.l)} alt={d.n} title={d.n} />
    ) : (
        <span className={'wm' + (d.w ? ' ' + d.w : '')}>{d.n}</span>
    );
