import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import "../styles/Cart.css";
import { CartContext } from "../context/CartContext";
import { assets } from "../assets/frontend_assets/assets";
const Cart = () => {
  const { cart, removeFromCart, getTotalAmount, updateQuantity } =
    useContext(CartContext);

  const increaseCount = (index) => {
    updateQuantity(index, cart[index].quantity + 1);
  };

  const decreaseCount = (index) => {
    updateQuantity(index, Math.max(cart[index].quantity - 1, 1));
  };
  return (
    <div className="cart-container">
      <Navbar />
      <div className="cart-itme-container">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        <ul className="cart-ul-container ">
          {cart.map((items, index) => {
            return (
              <li key={index}>
                <div className="cart-items-title">
                  <img src={items.image} className="cart-image" />
                  <h1 className="cart-name">{items.name}</h1>
                  <h1 className="cart-price">${items.price}</h1>
                  <div className="cart-buttons-container">
                    <button
                      type="button"
                      onClick={() => decreaseCount(index)}
                      className="cart-buttons cart-minus"
                    >
                      -
                    </button>
                    <p>{items.quantity}</p>
                    <button
                      onClick={() => increaseCount(index)}
                      type="button"
                      className="cart-buttons cart-puls"
                    >
                      +
                    </button>
                  </div>
                  <p>${items.price * items.quantity}</p>
                  <img
                    src={assets.cross_icon}
                    alt="Remove"
                    onClick={() => removeFromCart(index)}
                    className="remove-image"
                  />
                </div>
                <hr />
              </li>
            );
          })}
        </ul>
        <div className="cart-buttom">
          <div className="cart-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cart-totoal-details">
                <p>Subtotle</p>
                <p>${getTotalAmount()}</p>
              </div>
              <hr />
              <div className="cart-totoal-details">
                <p>Delivery Free</p>
                <p>$2</p>
              </div>
              <hr />
              <div className="cart-totoal-details">
                <b>Total</b>
                <b>${getTotalAmount() + 2}</b>
              </div>
            </div>
            <button type="button">PROCED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
