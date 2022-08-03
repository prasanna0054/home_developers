import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const Cart = createContext();

function Context({ children }) {
  const [cart, setCart] = useState([]);
  const [extras, setExtras] = useState({});
  const [choices,setChoices] = useState({});
  const [properties, setProperties] = useState({});


  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const getProperties = async () => {
    const response = await axios.get("http://localhost:5000/properties");
    const responseData = await response.data;
    setProperties(
      responseData.reduce((acc,item)=> {
        acc = {
          ...acc,
          [item._id]:item,
        }
        return acc;
      },{})
    );
    console.log("properties", responseData);
  };


  const getChoices = async () => {
    const response = await axios.get("http://localhost:5000/choices");
    const responseData = await response.data;
    setChoices(
      responseData.reduce((acc,item)=> {
        acc = {
          ...acc,
          [item._id]:item,
        }
        return acc;
      },{})
    );
    console.log("choices", responseData);
  };

  const getExtras = async () => {
    const response = await axios.get("http://localhost:5000/extras");
    const responseData = await response.data;
    setExtras(
      responseData.reduce((acc, item) => {
        acc = {
          ...acc,
          [item._id]: item,
        };
        return acc;
      }, {})
    );
  };

  useEffect(()=>{
    getExtras();
    getChoices();
    getProperties();
  },[])



  
  useEffect(() => {
    getCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getCart = async () => {
    const response = await axios.get("http://localhost:5000/cart/" + userId);
    const responseData = await response.data;
    setCart(responseData);
  };


  const addToCartAndRefreshCart = async (cartItem) => {
    try {
      const { data } = await axios.post("/addToCart", { ...cartItem });
      setCart(data);
    } catch (err) {
      console.error(err);
      toast.error("Something when wrong while adding to cart....");
    }
  };

  const removeFromCartAndRefreshCart = async (cartItem) => {
    try {
      const { data } = await axios.post("/removeFromCart", { ...cartItem });
      setCart(data);
    } catch (err) {
      console.error(err);
      toast.error("Something when wrong while removing from cart....");
    }
  };

  return (
    <Cart.Provider value={{ cart, setCart, addToCartAndRefreshCart,removeFromCartAndRefreshCart, getCart,extras,choices,properties}}>
      {children}
    </Cart.Provider>
  );
}

export const StateManagement = () => {
  return useContext(Cart);
};

export default Context;
