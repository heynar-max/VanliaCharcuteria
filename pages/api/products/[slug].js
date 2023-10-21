
import { db } from '../../../database';
import { Product } from '../../../models';




export default function handler(req, res) {
    
    
    switch( req.method ) {
        case 'GET':
            return getProductBySlug(req, res);

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

async function getProductBySlug(req, res) {

    await db.connect();
    const { slug } = req.query;
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if( !product ) {
        return res.status(404).json({
            message: 'Producto no encontrado'
        })
    }

        product.images = product.images.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
        });

        return product;

    return res.json( product );


}
