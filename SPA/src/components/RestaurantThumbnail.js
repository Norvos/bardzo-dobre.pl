import React from "react";
import "../styles/RestaurantThumbnail.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDoorClosed, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

library.add(faDoorClosed, faDoorOpen);

const RestaurantThumbnail = props => {
  const { name, address, description, open, _id } = props.restaurant;
  return (
      <div className="card border-secondary mb-3 restaurant-thumbnail bg-dark">
        <Link
          to={`/restaurant/${_id}`}
          style={{ textDecoration: "none", color: "white" }}>
          <div className="d-inline-flex justify-content-lg-center py-3">
            <h5 className="px-3 text-uppercase font-weight-bold"> {name}</h5>
            <div className="">
              {open ? (
                <FontAwesomeIcon icon="door-open" size="lg" />
              ) : (
                <FontAwesomeIcon icon="door-closed" size="lg" />
              )}
            </div>
          </div>
          <div className="card-body">
            <p className=" text-justify px-3 py-2">{description}</p>
            <h6 className="pt-2">{address}</h6>
          </div>
        </Link>
      </div>
  );
};

export default RestaurantThumbnail;
