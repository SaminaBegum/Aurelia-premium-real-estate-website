import type { Field } from './types';

export const NAME_FIELDS: Field[] = [
    ['First name', 'text', undefined, true],
    ['Last name', 'text', undefined, true],
    ['Email', 'email'],
    ['Mobile', 'tel'],
];

export const MESSAGE_FIELD: Field = ['Message', 'area'];

export const ENQUIRY_FIELDS: Field[] = [
    ['Full name', 'text'],
    ['Email', 'email'],
    ['Mobile', 'tel'],
    ['Message', 'area'],
];

export const LIST_PROPERTY_FIELDS: Field[] = [
    ['I want to', 'select', ['Sell my property']],
    ['I am a', 'select', ['Property owner', 'Real estate agent']],
    ...NAME_FIELDS,
    ['Property location', 'text'],
    [
        'Property type',
        'select',
        ['Apartment', 'Villa', 'Townhouse', 'Office', 'Penthouse'],
    ],
    ['Additional details (optional)', 'area'],
];

export const CAREER_FIELDS: Field[] = [
    ...NAME_FIELDS,
    ['Role you’re applying for', 'text'],
    ['Tell us about yourself', 'area'],
];