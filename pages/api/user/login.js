
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';




export default function handler(req, res ) {
    
    switch( req.method ) {
        case 'POST':
            return loginUser(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

const loginUser = async(req, res) => {
    
    const { email = '', password = ''  } = req.body;

    await db.connect();
    // preguntar si existe un usuario con el email
    const user = await User.findOne({ email });
    await db.disconnect();

    if ( !user ) {
        return res.status(400).json({ message: 'Correo o contraseña no válidos - EMAIL' })
    }
    
    if ( !bcrypt.compareSync( password, user.password ) ) {
        return res.status(400).json({ message: 'Correo o contraseña no válidos - PASSWORD' })
    }

    const { role, name} = user;


    return res.status(200).json({
    
        user: {
            email, role, name
        }
    })


}
