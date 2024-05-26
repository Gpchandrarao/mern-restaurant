import React, { useState } from "react";
import image from "/src/assets/logo.jpg";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState("");
  const navegate = useNavigate();

  const onsubmitForm = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = "http://localhost:8000/user/user-register";
      const formData = {username, email, password}
      const options = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(apiUrl, options);
      if (res.ok === true) {
        const data = res.json();
        navegate("/login");
      }
    } catch (error) {
      console.log(error);
      setShowError(error);
      setError(true);
    }
  };
  return (
    <div className="register-container">
      <div className="register-items-container">
        <div className="logo-container">
          <img src={image} className="image-logo" alt="image-logo" />
          <h1 className="logo-name">Restaurant</h1>
        </div>
        <form className="form-container" onSubmit={onsubmitForm}>
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            id="username"
            className="inptus"
            autoFocus
            required
          />
          <label htmlFor="email" className="label">
            EMAIL
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            id="email"
            className="inptus"
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
            className="inptus"
            required
          />
          <div className="buttons">
            <button className="submit but" type="submit">
              Submit
            </button>
            <Link to="/login">
              <button className="login-with-number but" type="button">
                Have a Accont
              </button>
            </Link>
          </div>
          {/* <p className="error">{error && showError}</p> */}
        </form>
      </div>
    </div>
  );
};

export default Register;