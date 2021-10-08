import { 
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants';

const cartReducers = ( store = { cartItems: [], shippingAddress: {} }, action ) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;

            const existItem = store.cartItems.find(x => x.product === item.product);

            if(existItem){
                return {
                    ...store,
                    cartItems: store.cartItems.map(x=>
                        x.product === existItem.product ? item : x
                    )
                }
            }else{            
                return {
                    ...store,
                    cartItems: [...store.cartItems, item],
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...store,
                cartItems: store.cartItems.filter(x => x.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...store,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...store,
                paymentMethod: action.payload
            }
        default:
            return store;
    }
}

export { cartReducers };