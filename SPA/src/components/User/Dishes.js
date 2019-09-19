import React from "react";

const Dishes = props => {
  const dishes = props.dishes.map(dish => (
    <div className="dropdown-item" key={dish._id}>
      {`${dish.name}  ${dish.cost} zł`}  { dish.quantity !== 1 ? `x${dish.quantity}` : null }
    </div>
  ));

  return (
    <div className="dropright col">
      <button
        className="btn btn-dark dropdown-toggle col"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
      </button>
      <div className="dropdown-menu text-center" >
        {dishes}
      </div>
    </div>
  );
};

export default Dishes;
