const orders = [
    {
        orderId: 653,
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
                hardware: 'Satin Chrome'
            },
            {
                itemId: 2,
                material: 'Oak',
                construction: 'Steambent',
                diameter: 8,
                depth: 3.5,
                thickness: 3.5,
                finish: 'Orange',
                hardware: 'Brass'
            }
        ],
        address: '123 Main Street, New Paltz, New York 12561',
        price: 650
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
                hardware: 'Chrome'
            }
        ],
        address: '60 West Boulevard, Coffeeville, New York, 03045',
        price: 300
    }
];

let getOrders = () => orders;

function order(order) {

    const newOrder = {
        orderId: orders[orders.length - 1].orderId + 1,
        orderedBy: localStorage.getItem('user').userId,
        items: [

        ],
        address: localStorage.getItem('user').address,
        price: null
    }

}

module.exports = { getOrders };