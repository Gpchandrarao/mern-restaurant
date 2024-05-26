import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { food_list } from "../assets/frontend_assets/assets";

import "../styles/FoodLists.css";

const FoodLists = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="food-list-container">
      <h1 className="food-list-heading">All Types Foods</h1>
      <ul className="food-list-ul-container">
        {food_list.map((each, index) => {
          return (
            <li key={index} className="food-list-li-container">
              <img src={each.image} alt={each.name} className="food-list-img" />
              <h1>{each.name}</h1>
              <h4>${each.price}</h4>
              <p>{each.description}</p>
              <div className="add-cart-container">
                <button
                  type="button"
                  className="minus"
                  onClick={() => addToCart(each.price, each.name, each.image)}
                >
                  + Add To Cart
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FoodLists;
