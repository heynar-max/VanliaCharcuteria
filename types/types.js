import { ICartProduct } from "@/interfaces"



export const types ={
    LoadCart: {
        type: "[Cart] - LoadCart from cookies | storage",
        payload: ICartProduct
    },
    Update:{
        type:'[Cart] - Update products in cart',
        payload: ICartProduct,
    },
}
