import React, { useEffect, useState } from 'react';
import { calcMortgage } from '@/lib/mortgage';

interface Props {
  amt?: number;
  cur?: '₹' | 'AED';
  rate?: number;
  title?: string;
}

export function MortgageCalculator({
  amt = 10000000,
  cur = '₹',
  rate = 8.5,
  title = 'Mortgage calculator',
}: Props) {
  const [pr, setPr] = useState(amt);
  const [dp, setDp] = useState(20);
  const [rt, setRt] = useState(rate);
  const [yr, setYr] = useState(20);

  useEffect(() => setPr(amt), [amt]);

  const { loan, emi, interest, total } = calcMortgage(pr, dp, rt, yr);

  const F = (x: number) =>
    cur + ' ' + Math.round(x).toLocaleString(cur === '₹' ? 'en-IN' : 'en-US');

  const pc = Math.round((loan / total) * 100);
  const step = cur === '₹' ? 500000 : 25000;

  return (
    <div className="calc">
      <h3>{title}</h3>

      <label>
        <span>
          Property price <b>{F(pr)}</b>
        </span>
        <input
          type="range"
          min={step * 4}
          max={amt * 3}
          step={step}
          value={Math.min(pr, amt * 3)}
          onChange={(e) => setPr(+e.target.value)}
        />
      </label>

      <label>
        <span>
          Down payment <b>{dp}%</b>
        </span>
        <input
          type="range"
          min={5}
          max={80}
          value={dp}
          onChange={(e) => setDp(+e.target.value)}
        />
      </label>

      <label>
        <span>
          Interest rate <b>{rt}%</b>
        </span>
        <input
          type="range"
          min={2}
          max={12}
          step={0.1}
          value={rt}
          onChange={(e) => setRt(+e.target.value)}
        />
      </label>

      <label>
        <span>
          Tenure <b>{yr} years</b>
        </span>
        <input
          type="range"
          min={5}
          max={30}
          value={yr}
          onChange={(e) => setYr(+e.target.value)}
        />
      </label>

      <div className="emi">
        <small>Estimated monthly payment</small>
        <b>{F(emi)}</b>
      </div>

      <div className="split" aria-hidden="true">
        <i style={{ width: pc + '%' }} />
      </div>

      <div className="lg">
        <span>
          <u />
          Principal {F(loan)}
        </span>
        <span>
          <u className="g" />
          Interest {F(interest)}
        </span>
      </div>

      <p className="fine">
        Indicative only. Actual rates and eligibility depend on your lender.
      </p>
    </div>
  );
}