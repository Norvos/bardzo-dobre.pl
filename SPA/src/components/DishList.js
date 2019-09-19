import React from 'react';


const DishList = props => {
  const dishes = props.dishes.map(dish => <li key={dish._id} className="list-group-item d-flex justify-content-between align-items-center">{dish.name} {dish.quantity > 1 ? <b>x{dish.quantity}</b> : null}</li>);
  return (<>
  <ul className="list-group-flush">
    {dishes}
  </ul></>);
}
 
export default DishList;