import { db } from "@/database";
import { Order } from "@/models";


export default function handler(req, res) {
    
    switch( req.method ) {

        case 'GET':
            return getOrders(req, res);

        default:
            return res.status(400).json({ message: 'Bad request'});

    }

}

const getOrders = async(req, res) => {
    
    await db.connect();
    const orders = await Order.find()
        .sort({ createdAt: 'desc' })
        .populate('user', 'name email')
        .lean();
    await db.disconnect();

    return res.status(200).json( orders )

}
