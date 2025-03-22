import React, { createContext,useState } from "react";
import all from '../Components/Assets/all.js'

export const StoreContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};

    for(let index=0;index<all.length+1;index++)
    {
        cart[index]=0;
    }
    return cart;
}

const StoreContextProvider = (props)=>{


    const [CartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(CartItems);
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const contextValue = {
        all,CartItems,addToCart,removeFromCart
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;