import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import cartReducer from './cart/cartReducer';


const composeEnhancers = composeWithDevTools({});

const initialStore = {
    cartReducer: {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) ?? []
    }
}


const store = createStore(
    rootReducer, initialStore, composeEnhancers()
)

export default store;

