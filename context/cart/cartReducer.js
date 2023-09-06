import { types } from "@/types/types";



export const cartReducer = (state , action) => {
   
   switch (action.type) {

      case types.LoadCart:
         return{ ...state,
            isLoaded: true,
         cart: [...state.cart,...action.payload]
         }

      case types.Update:
      return {
         ...state,
         cart: [...action.payload]
      };

      case types.Quantity:
      return {
         ...state,
         cart: state.cart.map( product => {
            if ( product._id !== action.payload._id ) return product;
            if ( product.size !== action.payload.size ) return product;
            return action.payload;
         })
      };

      case types.Remove:
      return {
         ...state,
         // cart: state.cart.filter( product => !(product._id === action.payload._id && product.size === action.payload.size ))
         cart: state.cart.filter( product => {
            if (product._id === action.payload._id && product.size === action.payload.size ){
               return false;
            }
            return true;
         })
      };

      case types.Summary:
         return {
            ...state,
            ...action.payload
         }
   
      default:
         return state;
   }
}
