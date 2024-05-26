import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import searchImg from "../assets/frontend_assets/search_icon.png";
import basketImg from "../assets/frontend_assets/basket_icon.png";
import profileImg from "../assets/frontend_assets/profile_icon.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const [category, setCategory] = useState("home");
  const [show, setShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`Navbar-container ${show ? "nav-tranfer" : ""}`}>
      <Link to="/" className="link">
        <h1 className="navbar-heading">GV Restaurant.</h1>
      </Link>
      <ul className="ul-container">
        <Link to="/" className="link">
          <li
            onClick={() => setCategory("home")}
            className={category === "home" ? "category-active" : ""}
          >
            home
          </li>
        </Link>
        <li
          onClick={() => setCategory("menu")}
          className={category === "menu" ? "category-active" : ""}
        >
          menu
        </li>
        <li
          onClick={() => setCategory("contactus")}
          className={category === "contactus" ? "category-active" : ""}
        >
          contact us
        </li>
      </ul>
      <div className="profile-container">
        <img src={searchImg} alt="search img" />
        <Link to="/cart" className="link">
          <img
            src={basketImg}
            alt="basket img"
            onClick={() => setCategory("cart")}
            className={category === "cart" ? "category-active" : ""}
          />
        </Link>
        <img src={profileImg} alt="profile img" />
      </div>
    </div>
  );
};

export default Navbar;
