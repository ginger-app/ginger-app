export const book = Object.freeze({
    // public routes
    home: '/',
    market: '/market',
    categories: '/categories',

    // Customer specific routes
    clientProfile: '/client',
    clientEdit: '/client/edit',
    orders: '/orders',
    lists: '/lists',
    locationsList: '/locations',
    newOrder: '/new-order',

    // Supplier specific routes
    supplierProfile: '/supplier',
    supplierEdit: '/supplier/edit',
    supplierLists: '/supplier-lists',
    deliveryConditions: '/delivery-conditions',
    supplierOrders: '/supplier-orders',
});
