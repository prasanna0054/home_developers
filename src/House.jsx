import axios from "axios";
import "./House.css"
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import {  useParams } from "react-router-dom";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import { StateManagement } from "./Context/context";

function House() {
  let params = useParams();

  const { cart, addToCartAndRefreshCart } = StateManagement();

  const [property, setProperty] = useState({});

  
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  
  function addToCart(property) {
    addToCartAndRefreshCart({
      productId: property._id,
      productType: "property",
      quantity: 1,
      userId,
    });

    console.log(cart);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProperty = async () => {
      const response = await axios.get(
        `http://localhost:5000/properties/${params.id}`
      );
      const responseData = await response.data;
      console.log(responseData);
      setProperty(responseData);
    };

    getProperty();
  }, [params.id]);

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={property.imageURL}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={property.imageURL1}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={property.imageURL2}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={property.imageURL3}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={property.imageURL4}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={property.imageURL5}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className="about">
        <h2>{property.about}</h2>
        <p> {property.description}</p>
        <h2>Price of this Property is 
          <CurrencyPoundIcon />{property.price}
        </h2>
        <Button
          onClick={() => addToCart(property)}
          className="btn"
          variant="secondary"
        >
          Add to Cart
        </Button>


        <div className="features">
        <h2> Features </h2>
        <li>A modern design has been implemented for this House </li>
        <li>Enjoy the views from the beautiful river </li>
        <li>A Large storage room for storing all the items </li>
        <li>
          Close to almost all amenities i.e a local Shop, Pharmacy, Park,
          Takeaways, University, health centre, Gym etc.
        </li>
        <li>Beautifully decorated with standard indoor painting </li>
        <li>
          Space for Dishwasher, Washing Machine and refrigerator is provided for
          easy installation in the kitchen
        </li>
        <li>
          Kitchen is provided with stainless steel sink, Electric Gas Hob and
          Electrical Oven
        </li>
        <li>
          Bathroom is provided with a standard toilet with flush and a seat, a
          standard bathtub with a shower unit and taps, a standard tiled basin
          with a tap
        </li>
        <li>
          Sockets and ports were installed throughout house for WiFi, TelePhone
          and for all electronic purposes
        </li>

        </div>
      </div>
    </div>
  );
}

export default House;
