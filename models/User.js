import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({

    name    : { type: String, required: true },
    email   : { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: {
            values: ['admin','super-user','SEO','client'],
            message: '{VALUE} no es un role válido',
            default: 'client',
            required: true
        }
    }
}, {
    timestamps: true,
})

const User = mongoose.models.User || mongoose.model('User',userSchema);

export default User;

// si quiere un grupo de roles va
// role: [{
// }]