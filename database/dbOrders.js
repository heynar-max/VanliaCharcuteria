import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { Order } from '@/models';
import { validations } from '@/utils';



export const getOrderById = async( id ) => {
    // isValidObjectI de monggose si no es un id valido, es null, que no se conecte
    if ( !isValidObjectId(id) ){
        return null;
    }

    await db.connect();
    // la peticion 
    const order = await Order.findById( id ).lean();
    await db.disconnect();

    // si no hay una orders no hay que nada que mostrar
    if ( !order ) {
        return null;
    }
    // si tenemos una order
    return JSON.parse(JSON.stringify(order));


}


