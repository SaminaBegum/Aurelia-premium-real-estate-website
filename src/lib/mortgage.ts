export function calcMortgage(
  price: number,
  downPct: number,
  ratePct: number,
  years: number,
) {
  const loan = price * (1 - downPct / 100);
  const r = ratePct / 1200;
  const n = years * 12;

  const emi = r
    ? (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    : loan / n;

  const total = emi * n;

  return { loan, emi, total, interest: total - loan };
}