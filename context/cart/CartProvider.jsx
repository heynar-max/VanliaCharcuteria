
import {  useReducer } from 'react';

import { CartContext, cartReducer } from '.';

import { types } from '@/types/types';
import { ICartProduct } from '@/interfaces';



const CART_INITIAL_STATE   = {
    cart: [],
    
}


export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer , CART_INITIAL_STATE  );

    const addProductToCart = ( product = ICartProduct ) => {

        const productInCart = state.cart.some( p => p._id === product._id );
        if ( !productInCart ) return dispatch({ type: types.Update, payload:  product  })
    
        const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );
        if ( !productInCartButDifferentSize ) return dispatch({ type: types.Update, payload:  product  })

          // Acumular
        const updatedProducts = state.cart.map( p => {
            if ( p._id !== product._id ) return p;
            if ( p.size !== product.size ) return p;

            // Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
    });

    dispatch({ updatedProducts });
    
    }
    
    return (
        <CartContext.Provider value={{
            ...state,

            //methods
            addProductToCart,
        }}>
            { children }
        </CartContext.Provider>
    )
}