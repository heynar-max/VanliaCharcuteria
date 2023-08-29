import { types } from "@/types/types";



export const cartReducer = (state , action) => {
   switch (action.type) {

      case types.LoadCart:
         return{ ...state,
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
   
      default:
         return state;
   }
}
