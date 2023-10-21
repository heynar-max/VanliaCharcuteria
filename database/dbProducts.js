import { db } from './';
import { Product } from '../models';



export const getProductBySlug = async( slug ) => {

    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if ( !product ) {
        return null;
    }

    product.images = product.images.map( image => {
        // tambien sirve para verse en los Metatas, cuandos e comparte la imagen
        return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
    });

    // procesamientos de las imagenes cuando se suban al server
    return JSON.parse( JSON.stringify( product ) );
}


export const getAllProductSlugs = async()  => {


    await db.connect();
    const slugs = await Product.find().select('slug -_id').lean();
    await db.disconnect();

    return slugs;
}

export const getProductsByTerm = async ( term ) => {
    
    term = term.toString().toLowerCase();

    await db.connect();
    const products = await Product.find({
        $text: { $search: term }
    })
    .select('title images price inStock slug -_id')
    .lean();

    await db.disconnect();

    const updatedProducts = products.map( product => {
        product.images = product.images.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
        });

        return product;
    });


    return updatedProducts;
}


export const getAllProducts = async() => {

    await db.connect();
    const products = await Product.find().lean();
    await db.disconnect();

    const updatedProducts = products.map( product => {
        product.images = product.images.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
        });

        return product;
    });


    return JSON.parse( JSON.stringify( updatedProducts ) );
}


