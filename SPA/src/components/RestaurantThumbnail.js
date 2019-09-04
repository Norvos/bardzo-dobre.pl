import React from 'react';
import '../styles/RestaurantThumbnail.css'
import {Redirect} from 'react-router-dom';

const RestaurantThumbnail = props => {

 const {name, address, description,open, _id} = props.restaurant;
 const closeStyle = {
   opacity : 0.6,
 }
  return (<>
  <div 
  className="card border-dark mb-3 bg-secondary text-white restaurant-thumbnail"
   style={open ? null : closeStyle}
   onClick={() => props.click(_id) }>
    <div className="card-header">
      {name}
    </div>
    <div className=" card-text">
    <h5 className="card-title">{description}</h5>
    <p className="card-text">{address}</p>
    </div>
</div> 
</>);
}
 
export default RestaurantThumbnail;