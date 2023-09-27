import { ICartProduct, IUser } from "@/interfaces"



export const types ={
    LoadCart: {
        type: "[Cart] - LoadCart from cookies | storage",
        payload: ICartProduct
    },
    Update:{
        type:'[Cart] - Update products in cart',
        payload: ICartProduct,
    },
    Quantity:{
        type:'[Cart] - Change cart quantity',
        payload: ICartProduct,
    },
    Remove:{
        type:'[Cart] -Remove product in cart',
        payload: ICartProduct,
    },
    Summary:{
        type:'[Cart] -Update order summary',
        payload: {
            numberOfItems: Number,
            subTotal: Number,
            tax: Number,
            total: Number,
        },
    },
    Login:{
        type: '[Auth] - Login', 
        payload: IUser,
    },
    Logout:{
        type: '[Auth] - Logout', 
    },

    ShippingAddressLoad: {
        type: '[Cart] - LoadAddress from Cookies',
    },
    ShippingAddressUpdate: {
        type: '[Cart] - Update Address',
    },

    OrdenComplete: {
        type: '[Cart] - Orden Complete',
    },


}
