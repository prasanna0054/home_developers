import React, { useEffect, useState } from "react";
import { StateManagement } from "./Context/context";
import "./Cart.css";
import { Button, Modal } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Success from "./Success";
import { useNavigate } from "react-router-dom";
const STRIPE_KEY =
  "pk_test_51Kn03aFDtWcCex8f3orCfrcmzsuch1AUFd6UG6mWe28iDuHfo6G5P6WfFnvMTf5NFulpcALDU7FmYDZFqIy8YTJy00khu13TWd";

function Cart() {
  const {
    cart,
    extras,
    choices,
    properties,
    removeFromCartAndRefreshCart,
    getOrder,
    getCards,
  } = StateManagement();
  const [token, setToken] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  function RemoveCart(itemRemoved) {
    removeFromCartAndRefreshCart(itemRemoved);
  }

  function onToken(token) {
    setToken(token);
    console.log(token);
  }

  const onSuccessPaymentClose = () => {
    setShowSuccess(false);
    navigate("/Invoice");
  };

  const getTotal = () => {
    return cart.reduce((acc, currentCartItem) => {
      if (currentCartItem.productType === "choice") {
        return acc;
      }
      if (currentCartItem.productType === "extra") {
        return acc + +extras?.[currentCartItem.productId]?.price ?? 0;
      }
      if (currentCartItem.productType === "property") {
        return acc + +properties?.[currentCartItem.productId]?.price ?? 0;
      }

      return acc;
    }, 0);
  };

  const totalPrice = getTotal();

  useEffect(() => {
    token && getPay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const getPay = async () => {
    try {
      const response = await axios.post("http://localhost:5000/pay", {
        tokenId: token.id,
        amount: totalPrice * 100,
      });
      console.log(response.data);

      const orders = await axios.post("http://localhost:5000/order", {
        userId: JSON.parse(localStorage.getItem("user"))._id,
        productsInfo: cart.map(({ productId, productType }) => ({
          productId,
          productType,
        })),
        paymentToken: token.id,
        totalAmount: totalPrice * 100,
        paymentDate: Date.now(),
      });

      console.log(orders.data);

      cart.forEach((element) => {
        RemoveCart(element);
      });

      getOrder();
      getCards();
      setShowSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getDetails = (currentCartItem) => {
    if (currentCartItem.productType === "choice") {
      return choices?.[currentCartItem.productId] ?? {};
    }
    if (currentCartItem.productType === "extra") {
      return extras?.[currentCartItem.productId] ?? {};
    }
    if (currentCartItem.productType === "property") {
      return (
        {
          ...properties?.[currentCartItem.productId],
          name: properties?.[currentCartItem.productId]?.about ?? "",
        } ?? {}
      );
    }

    return {};
  };

  return (
    <div className="cart-items">
      <h1 className="text-muted">Your cart</h1>

      {cart.map((details) => (
        <div className="cart-main">
          <div>
            <img
              className="cart-img"
              alt=""
              src={getDetails(details)?.imageURL ?? "-NA-"}
            />
          </div>

          <div className="productDetails">
            <h6 className="item-name">{getDetails(details)?.name ?? "-NA-"}</h6>
          </div>
          <div className="item-price">
            <div className="item-total">
              {" "}
              {details.productType === "property"
                ? "£"
                : getDetails(details)?.currency ?? ""}
              {getDetails(details)?.price ?? "FREE"}
            </div>
            <Button
              variant="link"
              size="lg"
              className="cancel-btn"
              onClick={() => RemoveCart(details)}
            >
              Remove
            </Button>
            <hr />
          </div>
        </div>
      ))}
      <hr style={{ height: 0.5 }} />
      <div className="checkout-items">
        <div className="cart-total">
          <div>
            <div className="cart-subtotal">Sub-Total</div>
            <div className="cart-length-items">{`${cart.length} items`}</div>
          </div>
          <div className="cart-amount">{`£ ${totalPrice}`}</div>
        </div>
        <StripeCheckout
          name="Home-Developers"
          description={`You are about to pay £${totalPrice}`}
          shippingAddress
          ComponentClass="div"
          billingAddress
          amount={totalPrice * 100}
          currency="GBP"
          email="info@house-developers.com"
          stripeKey={STRIPE_KEY}
          token={onToken}
        >
          <Button variant="primary" size="lg" className="button">
            Checkout
          </Button>
        </StripeCheckout>
        <Modal show={showSuccess} onHide={onSuccessPaymentClose}>
          <Modal.Header closeButton>
            <Modal.Title>Status</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Success />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onSuccessPaymentClose}>
              Click here for Invoice
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Cart;
