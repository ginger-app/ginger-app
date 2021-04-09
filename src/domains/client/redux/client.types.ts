import { Order } from 'domains/orders/types';

export interface ChosenSuppliers {
    itemId: string;
    data: {
        ['string']: {
            ['string']: string[];
        };
    };
}

export type ClientDto = {
    name: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    locations: string[];
    orders: Order[];
    unfinishedOrder: Order;
    chosenSuppliers: ChosenSuppliers[];
    paymentMethods: string[];
    analyticsData: Array<any>;
    role: string;
    lastVisit: Date;
    registrationDate: Date;
    userpic: string;
};
