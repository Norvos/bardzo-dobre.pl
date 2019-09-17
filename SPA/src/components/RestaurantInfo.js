import React from "react";

const RestaurantInfo = props => {
  const {name, description, open} = props.restaurant;
  return (
    <>
      <h4 className="mb-4">{name}</h4>
      <p className="text-justify">{description}</p>
      <p>
        Restauracja jest w tej chwili:
        {open ? (
          <span className="text-success"> otwarta </span>
        ) : (
          <span className="text-danger"> zamknięta </span>
        )}
      </p>
    </>
  );
};

export default RestaurantInfo;
