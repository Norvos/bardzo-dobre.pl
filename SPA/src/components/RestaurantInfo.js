import React from "react";

const RestaurantInfo = props => {
  const {name, description, open} = props.restaurant;
  return (
    <div className="card">
      <h4 className="mb-4 card-header">{name}</h4>
      <p className="text-justify card-body">{description}</p>
      <p className='card-footer text-center'>
        Restauracja jest w tej chwili:
        {open ? (
          <span className="text-success"> otwarta </span>
        ) : (
          <span className="text-danger"> zamknięta </span>
        )}
      </p>
    </div>
  );
};

export default RestaurantInfo;
