import React, { useState } from "react";
import image from "/src/assets/logo.jpg";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie"
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState("");
  const navegate = useNavigate();


  const successViwe = (token) => {
    Cookies.set('jwt_token', token, )
    navegate('/')
  }

  const onsubmitForm = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = "http://localhost:8000/user/user-login";
      const formData = {email, password}
      const options = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(apiUrl, options);
      if (res.ok) {
        const data = res.json();
        successViwe(data.token)
      } else {
        setShowError(data.error);
      }
    } catch (error) {
      console.log(error);
      setShowError(error);
      setError(true);
    }
  };

  // const jwtToken = Cookies.get("jwt_token")
  // if(jwtToken !== undefined){
  //   return navegate("/")
  // }
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
            className="login-inptus"
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
            className="login-inptus"
            required
          />
          <div className="login-buttons">
            <button className="login-submit but" type="submit">
              Submit
            </button>
            <Link to="/register">
              <button className="login-with-number but" type="button">
                Don't Have a Accont
              </button>
            </Link>
          </div>
          <p className="login-error">{error && showError}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
