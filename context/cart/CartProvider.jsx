import {  useReducer } from 'react';

;
import { CartContext, cartReducer } from '.';



const CART_INITIAL_STATE = {
    cart: [],
    
}


export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE );

    
    return (
        <CartContext.Provider value={{
            ...state,

        }}>
            { children }
        </CartContext.Provider>
    )
};