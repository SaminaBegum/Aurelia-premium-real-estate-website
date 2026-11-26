import {describe,it,expect} from 'vitest';
import {calcMortgage} from '@/lib/mortgage';
describe('calcMortgage',()=>{
  it('computes a standard EMI',()=>{const r=calcMortgage(10000000,20,8.5,20);expect(r.loan).toBe(8000000);expect(Math.round(r.emi)).toBe(69426)});
  it('handles zero interest',()=>{const r=calcMortgage(1200000,0,0,10);expect(r.emi).toBe(10000);expect(r.interest).toBe(0)});
});
