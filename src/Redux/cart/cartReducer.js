import initialState from './initialState';

const cartReducer = (state = initialState, actions) => {
    switch (actions.type) {

        case "ADD_TO_CART": {
            return {
                ...state,
                cartItems: [...state.cartItems, actions.payload]
            }
        }
        case "DELETE_FROM_CART": {
            return {
                ...state,
                cartItems: state.cartItems.filter(obj => obj.id !== actions.payload.id)
            }        
        }

        case "removeAllData":
            return {
                ...state,
                cartItems:[]
            }

        
        default: return state;
    }

}

export default cartReducer;