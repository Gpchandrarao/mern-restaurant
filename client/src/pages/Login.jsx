import React, { useContext, useState, useEffect } from "react";
import image from "/src/assets/logo.jpg";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/Login.css";
import { CartContext } from "../context/CartContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState("");
  const { url, setToken } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("token");
    if (jwtToken) {
      navigate("/");
    }
  }, [navigate]);

  const successView = (token) => {
    localStorage.setItem("token", token);
    Cookies.set("token", token);
    setToken(token);
    navigate("/");
  };

  const onsubmitForm = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${url}/user/user-login`;
      const formData = { email, password };
      const options = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(apiUrl, options);
      if (res.ok) {
        const data = await res.json();
        successView(data.token);
      } else {
        const errorData = await res.json();
        setShowError(errorData.error);
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setShowError("An unexpected error occurred");
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-items-container">
        <div className="login-logo-container">
          <img src={image} className="login-image-logo" alt="image-logo" />
          <h1 className="login-logo-name">Restaurant</h1>
        </div>
        <form className="login-form-container" onSubmit={onsubmitForm}>
          <label htmlFor="login-email" className="label">
            EMAIL
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            id="email"
            className="input-login"
            required
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
            className="input-login"
            required
          />
          <div className="login-buttons">
            <button className="login-submit but" type="submit">
              Submit
            </button>
            <Link to="/register">
              <button className="login-with-number but" type="button">
                Don't Have an Account
              </button>
            </Link>
          </div>
          {error && <p className="login-error">{showError}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
