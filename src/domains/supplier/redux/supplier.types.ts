import { MarketItem } from 'domains/market/types';
import { Order } from 'domains/orders/types';

export type DeliveryCondition = {
    name: string;
    value: string;
};

export type SupplierItem = {
    _id: MarketItem;
    price: number;
    stock: number;
};

export type SupplierDto = {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    address: string;
    city: string;
    orders: Order[];
    uploadPreview: MarketItem[];
    itemsList: SupplierItem[];
    discount: number;
    paymentAccount: unknown;
    googleSheetsLink: string;
    conditions: DeliveryCondition[];
    analyticsData: Array<unknown>;
    lastVisit: string;
    userpic: string;
    role: string;
};
