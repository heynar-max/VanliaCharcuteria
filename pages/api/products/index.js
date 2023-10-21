
import { SHOP_CONSTANTS, db,} from '../../../database'
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
    
    const { gender = 'all' } = req.query;

    let condition = {};

    if ( gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`) ) {
        condition = { gender };
    }

    await db.connect();
    const products = await Product.find(condition)
                                .select('title images price inStock slug -_id')
                                .lean();

    await db.disconnect();

    const updatedProducts = products.map( product => {
        product.images = product.images.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
        });

        return product;
    })

    return res.status(200).json( updatedProducts );

}
