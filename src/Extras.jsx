import React, { useState, useEffect } from "react";
import "./Extras.css";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import axios from "axios";
import { StateManagement } from "./Context/context";

function Extras() {
  const { cart, addToCartAndRefreshCart } = StateManagement();
  const [extrasAlreadyInCart, setExtrasAlreadyInCart] = useState({});
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    const extrasAlreadyInCart = cart.reduce((acc, currItem) => {
      if (currItem.productType === "extra") {
        acc = { ...acc, [currItem.productId]: true };
      }
      return acc;
    }, {});
    setExtrasAlreadyInCart(extrasAlreadyInCart);
  }, [cart]);

  const userId = JSON.parse(localStorage.getItem("user"))._id;

  function addToCart(extra) {
    addToCartAndRefreshCart({
      productId: extra._id,
      productType: "extra",
      quantity: extras.count,
      userId,
    });
  }

  useEffect(() => {
    getExtras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getExtras = async () => {
    const response = await axios.get("http://localhost:5000/extras");
    const responseData = await response.data;
    setExtras(
      responseData.map((item) => ({
        ...item,
        count: extrasAlreadyInCart[item._id]?.quantity ?? 1,
      }))
    );
  };


  return (
    <div className="top">
      <h2>Choose your Extras </h2>
      {extras.map((extra, index) => (
        <div key={extra._id}>
          <Card className="main">
            <div className="img">
              <Card.Img variant="top" src={extra.imageURL} />
            </div>
            <Card.Body>
              <Card.Title>{extra.name}</Card.Title>
              <Card.Text>
                <p>
                  {extra.currency} {extra.price}
                </p>
              </Card.Text>
            </Card.Body>

            <Button
              onClick={() => addToCart({ ...extra, index })}
              className="btn1"
              disabled={extrasAlreadyInCart[extra._id] ?? false}
              variant="secondary"
            >
              {extrasAlreadyInCart[extra._id]
                ? "Already In Cart"
                : "Add to Cart"}
            </Button>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Extras;
