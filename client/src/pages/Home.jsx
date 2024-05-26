import React from "react";
import Navbar from "../components/Navbar";

import "../styles/Home.css";
import Menu from "../components/Menu";
import FoodLists from "../components/FoodLists";

const Home = () => {
  return (
    <div className="home-main-container">
      <Navbar />
      <div className="home-items-container">
        <div className="home-header-img">
          <h1>
            Order your <br /> favourite food here
          </h1>
          <p>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest <br /> ingredients and culinary expertise.
            Our mission is to satisfy your cravings and elevate your <br />{" "}
            dining experience, one delicious meal at a time.
          </p>
          <button type="button">View Menu</button>
        </div>
        <div>
          <Menu />
        </div>
        <div>
          <FoodLists />
        </div>
      </div>
    </div>
  );
};

export default Home;
