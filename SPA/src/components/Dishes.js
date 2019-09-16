import React from "react";

const Dishes = props => {
  const dishes = props.dishes.map(dish => (
    <div className="dropdown-item" key={dish._id}>
      {`${dish.name}  ${dish.cost} zł  Ilość: ${dish.quantity} `}
    </div>
  ));

  return (
    <div className="dropdown">
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
