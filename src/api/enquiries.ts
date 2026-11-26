import { post } from './client';

export type EnquiryType =
    | 'project'
    | 'property'
    | 'contact'
    | 'list-property'
    | 'management'
    | 'career';

/** Sends any website form to the backend: POST {VITE_API_URL}/enquiries */
export const submitEnquiry = (
    type: EnquiryType,
    data: Record<string, string>,
) =>
    post('/enquiries', {
        type,
        ...data,
        page: location.hash,
        at: new Date().toISOString(),
    });