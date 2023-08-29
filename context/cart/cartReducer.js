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
   
      default:
         return state;
   }
}
