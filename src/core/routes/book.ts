export const book = Object.freeze({
    // public routes
    home: '/',
    market: '/market',
    categories: '/categories',

    // private routes
    profile: '/profile',

    // Customer specific routes
    clientEdit: '/client/edit',
    orders: '/orders',
    lists: '/lists',
    locationsList: '/locations',
    newOrder: '/new-order',

    // Supplier specific routes
    supplierLists: '/supplier-lists',
    deliveryConditions: '/delivery-conditions',
    supplierOrders: '/supplier-orders',
});
