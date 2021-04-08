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
    suppliers: Record<string, any>; // Supplier type
};
