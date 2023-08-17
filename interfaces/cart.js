import { ValidSize } from './';

export const ICartProduct = {
    
    _id: String,
    image: String,
    price: Number,
    size: [ValidSize],
    slug: String,
    title: String,
    gender: ['salchichas','chorizos','ahumados','quesos'],
    quantity: Number,
}