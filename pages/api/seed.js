import { db, seedDatabase } from '../../database';
import { Product, User } from '../../models';

    

export default async function handler( req, res) {

    if (  process.env.NODE_ENV === 'production'){
        return res.status(401).json({ message: 'No tiene acceso a este API'});
    }

    await db.connect();

    await User.deleteMany();
    await User.insertMany( seedDatabase.initialData.users );

    await Product.deleteMany();
    await Product.insertMany( seedDatabase.initialData.products );
    await db.disconnect();


    res.status(200).json({ message: 'Proceso realizado correctamente' });
}