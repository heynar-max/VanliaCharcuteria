
import { db,} from '../../../database'
import { Product } from '../../../models'



export default function handler(req, res) {

    switch( req.method ) {
        case 'GET':
            return getProducts( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const getProducts = async(req, res) => {
    
    

    await db.connect();
    const products = await Product.find()
                                .select('title images price inStock slug -_id')
                                .lean();

    await db.disconnect();

    return res.status(200).json( products );

}
