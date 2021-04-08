import { MarketItem } from 'domains/market/types';

export type OrderStatus = 'Placed' | 'Payed' | 'Finished' | 'Cancelled';

export type Order = {
    supplier: string; // supplier id
    client: string; // client id
    createdAt: Date;
    deliveryDate: Date;
    location: string; // location id
    items: MarketItem[];
    sum: string;
    status: OrderStatus;
};
