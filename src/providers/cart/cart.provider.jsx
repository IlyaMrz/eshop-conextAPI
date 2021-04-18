import React, { createContext, useState, useEffect } from 'react';

import { 
    addItemToCart, 
    removeItemFromCart, 
    filterItemFromCart,
    getCartItemsCount,
    getCartTotalCost 
} from './cart.utils';

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => {},
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {},
    cartItemCount: 0,
    total: 0
})

const CartProvider = ({ children }) => {
    const [hidden, setHidden] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [total, setTotal] = useState(0);

    const toggleHidden = () => setHidden(!hidden);
    const addItem = (item) => setCartItems(addItemToCart(cartItems, item))
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item))
    const clearItemFromCart = item => setCartItems(filterItemFromCart(cartItems, item))
    

    useEffect(()=>{
        setCartItemCount(getCartItemsCount(cartItems));
        setTotal(getCartTotalCost(cartItems));
    },[cartItems])

    return <CartContext.Provider value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        cartItemCount,
        clearItemFromCart,
        total
    }}>{children}</CartContext.Provider>
}

export default CartProvider;