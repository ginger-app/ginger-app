import { SupplierDto } from 'domains/supplier/redux/supplier.types';

export type MarketItem = {
    _id: string;
    name: string;
    unit: string;
    category: string;
    prices: Record<string, number>;
    stock: Record<string, number>;
    minPrice: number;
    maxPrice: number;
    image: string;
    suppliers: Record<string, SupplierDto>; // Supplier type
};

export type MarketCategory = {
    items: MarketItem[];
    filteringOptions: string[];
    image: string;
    _id: string;
    name: string;
};

export type OrderStatus =
    | 'Pending'
    | 'Awaiting collection'
    | 'Awaiting shipment'
    | 'Shipping'
    | 'Completed'
    | 'Cancelled';

export type OrderItem = {
    item: MarketItem;
    supplier: SupplierDto;
    price: number;
    amount: number;
};

export type Order = {
    _id: string;
    supplier: string;
    client: string;
    deliveryDate: Date;
    location: string;
    items: OrderItem[];
    sum: string;
    status: OrderStatus;
};

export type NewOrder = {
    supplier: string;
    sum: string;
    location: string;
    items: {
        amount: number;
        item: string;
        price: number;
        supplier: string;
    }[];
};
