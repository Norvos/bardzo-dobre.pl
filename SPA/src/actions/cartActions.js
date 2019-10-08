import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, EMPTY_CART, DISMISS_ALERT, SAVE_CART } from './action-types/cart-actions';

  //add cart action
export const addToCart = item =>{
  return{
      type: ADD_TO_CART,
      item }
}

export const dismissAlert = () =>{
  return{
      type: DISMISS_ALERT,}
}


//remove item action
export const removeItem = item => {
  return{
      type: REMOVE_ITEM,
      item
  }
}
//subtract qt action
export const subtractQuantity= item=>{
  return{
      type: SUB_QUANTITY,
      item
  }
}
//add qt action
export const addQuantity= item=>{
  return{
      type: ADD_QUANTITY,
      item
  }
}

export const emptyCart = () =>{
  return{type: EMPTY_CART}
}


export const saveCart = () =>{
  return{type: SAVE_CART}
}