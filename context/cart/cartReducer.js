

import { CartState } from '.';
import { ICartProduct } from '../../interfaces';

export const cartReducers = (state, action) => {
      switch (action.type) {
      case '[Cart] - LoadCart from cookies | storage':
         return {
            ...state,
            ICartProduct: action.payload, 
         };
   
      case '[Cart] - Add Products':
         
         return {
            ...state,
            ICartProduct: [...state.ICartProduct, ...action.payload], 
         };
   
      default:
         return state;
      }
   };

