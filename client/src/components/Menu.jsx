import React, { useState } from "react";

import { menu_list } from "../assets/frontend_assets/assets";
import "../styles/Menu.css";

const Menu = () => {
  const [menuCategory, setMenuCategory] = useState("Salad");

  const showMenuCategory = (category) => {
    setMenuCategory(category);
  };

  return (
    <div className="menu-main-container">
      <h1 className="menu-heading">Explore Our Menu</h1>
      <ul className="menu-items-container">
        {menu_list.map((each, index) => {
          return (
            <li key={index} className={`menu-li-container `}>
              <img
                src={each.menu_image}
                alt={each.menu_name}
                className={`menu-images ${
                  menuCategory === each.menu_name ? "menuActive" : ""
                }`}
                onClick={() => showMenuCategory(each.menu_name)}
              />
              <p>{each.menu_name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
