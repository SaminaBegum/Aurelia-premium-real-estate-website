export const cn=(...c:(string|false|null|undefined)[])=>c.filter(Boolean).join(' ');
export const fmtAed=(n:number)=>'AED '+n.toLocaleString('en-US');
