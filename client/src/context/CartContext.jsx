import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
import Cookies from "js-cookie";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState("");
  const [tokenTrue, setTokenTrue] = useState(false);

  const url = "http://localhost:8000";
  const addToCart = (itemPrice, name, image) => {
    setCart((prevCart) => [
      ...prevCart,
      { price: itemPrice, name, image, quantity: 1 },
    ]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      setToken(Cookies.get("token"));
      setTokenTrue(true);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalAmount,
        url,
        token,
        setToken,
        tokenTrue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
