
import { db } from '../../../database'
import { Order, Product, User } from '../../../models';


export default async function handler(req, res) {

    await db.connect();
    
    // const numberOfOrders = await Order.count();
    // const paidOrders = await Order.find({ isPaid: true }).count();
    // const numberOfClients = await User.find({ role: 'client' }).count();
    // const numberOfProducts = await Product.count();
    // const productsWithNoInventory = await Product.find({ inStock: 0 }).count();
    // // lte 10 es menor igual a 10
    // const lowInventory = await Product.find({ inStock: { $lte: 10 } }).count();

    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        // lte 10 es menor igual a 10
        Product.find({ inStock: { $lte: 10 } }).count(),
    ]);

    
    await db.disconnect();

    res.status(200).json({
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders: numberOfOrders - paidOrders
    })


}