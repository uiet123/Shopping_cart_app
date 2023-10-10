import React, { useContext, useReducer } from 'react'
import { createContext } from 'react'
import {faker} from "@faker-js/faker"
import {cartReducer, productReducer} from './Reducers';
const Cart = createContext();
function Context({children}) {
  const products = [...Array(20)].map(() =>({
    id:faker.string.uuid(),
    name:faker.commerce.productName(),
    price:faker.commerce.price(),
    image:faker.image.urlLoremFlickr({ category: 'fashion' }),
    inStock:faker.number.int({min:0, max:10}),
    fastDelivery:faker.datatype.boolean(),
    ratings:faker.number.int({min:0, max:5}),
  }))
   const[state, dispatch] = useReducer(cartReducer,{
    products:products,
    cart:[]
   })

   const [productState, productDispatch] = useReducer(productReducer,{
    byStock: false,
    byFastDelivery: false,
    searchQuery: "",
   })
  return (
    <Cart.Provider value={{state, dispatch, productState, productDispatch}}>
        {children}
    </Cart.Provider>
  )
}

export default Context;
export const CartState = () =>{
  return useContext(Cart);
}