
import {  useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { CartContext, cartReducer } from '.';

import { types } from '@/types/types';
import { ICartProduct } from '@/interfaces';



const CART_INITIAL_STATE   = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    
}


export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer , CART_INITIAL_STATE  );

    // Efecto
    useEffect(() => {
        try {
            // ? si existe ( Cookie.get('cart') ) parsealo : de lo contrario agreglo vacio []
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart') ): [];
            dispatch({ type: types.LoadCart, payload: cookieProducts  });
        }catch (error) {
            dispatch({ type: types.LoadCart, payload: [] });
        }
        
    }, []);

    // Cookie solo graba String Cookie.set('cart'), por que nuestro cart es un objecto, hay que
    // SETalizarlo asi JSON.stringify( state.cart )
    useEffect(() => {
        Cookie.set('cart', JSON.stringify( state.cart ));
    }, [state.cart]);

    useEffect(() => {
        
        // previousValue es el valor anterior y  currenValue es la iteracion actual del arreglo
        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev , 0 );
        const subTotal = state.cart.reduce( ( prev, current ) => (current.price * current.quantity) + prev, 0 );
        const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    
        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * ( taxRate + 1 )
        }

        dispatch({ type: types.Summary, payload: orderSummary });
    }, [state.cart]);

    const addProductToCart = ( product = ICartProduct ) => {

        const productInCart = state.cart.some( p => p._id === product._id );
        if ( !productInCart ) return dispatch({ type: types.Update, payload:[...state.cart,  product ]  })
    
        const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );
        if ( !productInCartButDifferentSize ) return dispatch({ type: types.Update, payload:[...state.cart,  product ]  })

          // Acumular
        const updatedProducts = state.cart.map( p => {
            if ( p._id !== product._id ) return p;
            if ( p.size !== product.size ) return p;

            // Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
    });
// MIRA
    dispatch({type: types.Update, payload: updatedProducts });
    
    }

    const updateCartQuantity = ( product) => {
        dispatch({ type: types.Quantity, payload: product });
    }

    const removeCartProduct = ( product ) => {
        dispatch({ type: types.Remove, payload: product });
    }
    
    return (
        <CartContext.Provider value={{
            ...state,

            //methods
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
        }}>
            { children }
        </CartContext.Provider>
    )
}