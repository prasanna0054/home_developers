import React, { useState, useEffect } from "react";
import "./Choices.css";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import axios from "axios";
import { StateManagement } from "./Context/context";
import { Link } from "react-router-dom";

function Choices() {
  const [choices, setChoices] = useState([]);
  const { cart, addToCartAndRefreshCart } = StateManagement();
  const [choicesAlreadyInCart, setChoicesAlreadyInCart] = useState({});

  useEffect(() => {
    const choicesAlreadyInCart = cart.reduce((acc, currItem) => {
      if (currItem.productType === "choice") {
        acc = { ...acc, [currItem.productId]: true };
      }
      return acc;
    }, {});
    setChoicesAlreadyInCart(choicesAlreadyInCart);
  }, [cart]);
  console.log(choicesAlreadyInCart);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  function addToCart(choice) {
    addToCartAndRefreshCart({
      productId: choice._id,
      productType: "choice",
      quantity: choice.count,
      userId,
    });
  }

  useEffect(() => {
    getChoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChoices = async () => {
    const response = await axios.get("http://localhost:5000/choices");
    const responseData = await response.data;
    setChoices(
      responseData.map((item) => ({
        ...item,
        count: choicesAlreadyInCart[item._id]?.quantity ?? 1,
      }))
    );
    console.log("choices", responseData);
  };

  return (
    <div>
      <h2> Choose Your Choices </h2>

      {choices.map((choice) => (
        <div key={choice._id}>
          <Card className="main">
            <div className="img">
              <Card.Img variant="top" src={choice.imageURL} />
            </div>
            <Card.Body>
              <Card.Title>{choice.name}</Card.Title>
            </Card.Body>

            <Button
              onClick={() => addToCart(choice)}
              className="btn2"
              variant="secondary"
              disabled={choicesAlreadyInCart[choice._id] ?? false}
            >
              {choicesAlreadyInCart[choice._id]
                ? "Already in cart"
                : "Add to cart"}
            </Button>
          </Card>
        </div>
      ))}

      <h2> For Extras Click this button Below </h2>
      <Link to="/Extras">
          <Button size='lg' className="btn1" variant="secondary">
            Extras
          </Button>
        </Link>

    </div>
  );
}

export default Choices;
