import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, EMPTY_THE_CART } from './action-types/cart-actions';

  //add cart action
export const addToCart = item =>{
  return{
      type: ADD_TO_CART,
      item }
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

export const emptyTheCart = () =>{
  return{type: EMPTY_THE_CART}
}