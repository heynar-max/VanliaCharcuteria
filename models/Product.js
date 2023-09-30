import mongoose from 'mongoose';



const productSchema = new mongoose.Schema({
    description: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [{
        type: String,
        enum: {
            values: ['125','250','500','1000'],
            message: '{VALUE} no es un tamaño válido'
        }
    }],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    type: {
        type: String,
        enum: {
            values: ['ahumado','quesos','embutidos'],
            message: '{VALUE} no es un tipo válido'
        }
    },
    gender: {
        type: String,
        enum: {
            values: ['salchichas','chorizos','ahumados','quesos'],
            message: '{VALUE} no es una categoria válida'
        }
    }
},{
    timestamps: true
});

// TODO : crear indice 'index' de mongo  para buscar entre 2 columnas
productSchema.index({ title: 'text', tags: 'text' });


const Product = mongoose.models.Product || mongoose.model('Product',  productSchema);


export default Product;