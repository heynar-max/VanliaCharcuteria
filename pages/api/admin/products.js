


import { db } from '@/database';
import { Product } from '@/models';




export default function handler(req, res) {
    
        switch (req.method) {
            case 'GET':
                return getProducts( req, res );
                
            case 'PUT':
                return updateProduct( req, res );

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
        // actualizar imagenes



        res.status(200).json( products );

    }


