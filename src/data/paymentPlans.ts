export interface PaymentPlan {
    k: string;
    rows: [string, string][];
}

// Indicative plans – final terms are confirmed by the developer.
export const PAYMENT_PLANS: PaymentPlan[] = [
    {
        k: '20 / 80',
        rows: [
            ['Down payment', '10%'],
            ['3 months after booking', '5%'],
            ['6 months after booking', '5%'],
            ['On completion', '80%'],
        ],
    },
    {
        k: '35 / 65',
        rows: [
            ['Down payment', '15%'],
            ['3 months after booking', '10%'],
            ['6 months after booking', '10%'],
            ['On completion', '65%'],
        ],
    },
    {
        k: '50 / 50',
        rows: [
            ['Down payment', '20%'],
            ['3 months after booking', '10%'],
            ['6 months after booking', '10%'],
            ['9 months after booking', '10%'],
            ['On completion', '50%'],
        ],
    },
];