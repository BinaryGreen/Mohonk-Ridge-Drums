const orders = [
    {
        orderId: 220,
        orderedBy: 12345,
        items: [
            {
                itemId: 1,
                material: 'Beech',
                construction: 'Stave',
                diameter: 12,
                depth: 4,
                thickness: 4,
                finish: 'Green Sparkle',
                hardware: 'Satin Chrome',
                price: 350
            },
            {
                itemId: 2,
                material: 'Oak',
                construction: 'Steambent',
                diameter: 8,
                depth: 3.5,
                thickness: 3.5,
                finish: 'Orange',
                hardware: 'Brass',
                price: 300
            }
        ],
        address: '123 Main Street, New Paltz, New York 12561',
        total: 650
    },
    {
        orderId: 221,
        orderedBy: 12345,
        items: [
            {
                itemId: 1,
                material: 'Birch',
                construction: 'Segment',
                diameter: 14,
                depth: 3.9,
                thickness: 3.7,
                finish: 'Black Sparkle',
                hardware: 'Chrome',
                price: 460
            },
        ],
        address: '123 Main Street, New Paltz, New York 12561',
        total: 460
    },
    {
        orderId: 222,
        orderedBy: 67890,
        items: [
            {
                itemId: 1,
                material: 'Mahogany',
                construction: 'Ply',
                diameter: 10,
                depth: 4,
                thickness: 3.5,
                finish: 'Shell Material',
                hardware: 'Chrome',
                price: 300
            }
        ],
        address: '60 West Boulevard, Coffeeville, New York, 03045',
        total: 300
    }
];

const getOrders = () => orders;

function getUserOrders(userId) {
    const orderList = orders.filter((o) => o.orderedBy === userId);
    return orderList;
}

module.exports = { getOrders, getUserOrders };