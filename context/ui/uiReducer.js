





export const uiReducer = ( state, action) => {

   switch (action.type) {
      case '[UI] - ToggleMenu':
         return {
            ...state,
            isMenuOpen: !state.isMenuOpen
         }

         default:
            return state;
   }

}