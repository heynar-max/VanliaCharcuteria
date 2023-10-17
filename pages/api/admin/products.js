
import { isValidObjectId } from 'mongoose';


import { db } from '@/database';
import { Product } from '@/models';




export default function handler(req, res) {
    
        switch (req.method) {
            case 'GET':
                return getProducts( req, res );
                // PUT para actualizar
            case 'PUT':
                return updateProduct( req, res );
                // POST para crear
            case 'POST':
                return createProduct( req, res )
                
            default:
                return res.status(400).json({ message: 'Bad request' });
        }
        
    
    }

    const getProducts = async(req, res) => {
        
        await db.connect();

        const products = await Product.find()
            .sort({ title: 'asc' })
            .lean();

        await db.disconnect();

        // TODO:
        


        res.status(200).json( products );

    }


    const updateProduct = async(req, res) => {
        
        const { _id = '', images = [] } = req.body;

        if ( !isValidObjectId( _id ) ) {
            return res.status(400).json({ message: 'El id del producto no es válido' });
        }
        
        if ( images.length < 2 ) {
            return res.status(400).json({ message: 'Es necesario al menos 2 imágenes' });
        }

        // TODO: posiblemente tendremos un localhost:3000/products/asdasd.jpg


        try {
            
            await db.connect();
            const product = await Product.findById(_id);
            if ( !product ) {
                await db.disconnect();
                return res.status(400).json({ message: 'No existe un producto con ese ID' });
            }

            // TODO: eliminar fotos en Cloudinary
            
            
            product.set(req.body);
            await product.save();
            await db.disconnect();
            

            return res.status(200).json( product );
            
        } catch (error) {
            console.log(error);
            await db.disconnect();
            return res.status(400).json({ message: 'Revisar la consola del servidor' });
        }

    }

    const createProduct = async(req, res) => {
    
    const { images = [] } = req.body ;

    if ( images.length < 2 ) {
        return res.status(400).json({ message: 'El producto necesita al menos 2 imágenes' });
    }
    
    // TODO: posiblemente tendremos un localhost:3000/products/asdasd.jpg
    
    try {
        await db.connect();
        const productInDB = await Product.findOne({ slug: req.body.slug });
        if ( productInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'Ya existe un producto con ese slug' });
        }
        
        const product = new Product( req.body );
        await product.save();
        await db.disconnect();

        res.status(201).json( product );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
    }

}

