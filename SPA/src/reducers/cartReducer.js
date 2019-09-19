import {ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,EMPTY_THE_CART,DISMISS_ALERT} from '../actions/action-types/cart-actions'

const initState = {
  addedItems:[],
  total: 0,
  restaurantID : "",
  alert:  false
}

const cartReducer = (state = initState,action)=>{
    
  if(action.type === ADD_TO_CART){
  const addedItem = action.item;
    //check if the action id exists in the addedItems
  const existed_item = state.addedItems.find(item=> action.item._id === item._id)

  if(state.restaurantID !== "") if(addedItem.restaurantID !== state.restaurantID ) return {...state, alert :true}

   if(existed_item)
   {
     existed_item.quantity += 1;
       return{
          ...state,
           total: state.total + existed_item.cost,}
  }
   else{
      addedItem.quantity = 1;
      state.restaurantID =  addedItem.restaurantID;
      //calculating the total
      let newTotal = state.total + addedItem.cost 
      
      return{
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total : newTotal,
      }
      
  }
}

if(action.type === REMOVE_ITEM){
  let itemToRemove = action.item;
  let new_items = state.addedItems.filter(item=> action.item._id !== item._id)
  
  //calculating the total
  let newTotal = state.total - (itemToRemove.cost * itemToRemove.quantity )
  return{
      ...state,
      addedItems: new_items,
      total: newTotal
  }
}

if(action.type === DISMISS_ALERT){
  console.log('dismiss');
  return{ ...state,alert:false}
}
//INSIDE CART COMPONENT
if(action.type=== ADD_QUANTITY){
  let addedItem = action.item;
    addedItem.quantity += 1 
    let newTotal = state.total + addedItem.cost
    return{
        ...state,
        total: newTotal
    }
}
if(action.type=== SUB_QUANTITY){  
  let addedItem = action.item;
  //if the qt == 0 then it should be removed
  if(addedItem.quantity === 1){
      let new_items = state.addedItems.filter(item => item._id !== action.item._id)
      let newTotal = state.total - addedItem.cost
      return{
          ...state,
          addedItems: new_items,
          total: newTotal
      }
  }
  else {
      addedItem.quantity -= 1
      let newTotal = state.total - addedItem.cost
      return{
          ...state,
          total: newTotal
      }
  }
}

if(action.type === EMPTY_THE_CART){  
    return {
        addedItems: [],
        total: 0,
        restaurantID : ""
    }
}

else return state;
}

export default cartReducer;