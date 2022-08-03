import React from "react";
import Card from "react-bootstrap/Card";
import "./Cards.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import BedIcon from "@mui/icons-material/Bed";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { StateManagement } from "./Context/context";

function Cards() {
  const { cards, orders } = StateManagement();
  const currentUserProperties = Object.entries(orders).reduce(
    (acc, [key, obj]) => {
      obj.productsInfo.forEach((pro) => {
        if (pro.productType === "property")
          acc = {
            ...acc,
            [pro.productId]: pro,
          };
      });
      return acc;
    },
    {}
  );

  console.log(currentUserProperties);

  return (
    <div>
      {cards.map((card) => (
        <div key={card._id}>
          <Card className="card" style={{ width: "19rem" }}>
            <Card.Img variant="top" src={card.imageURL} />
            <Card.Body>
              <Card.Title>
                <h4 className="des">{card.title}</h4>
              </Card.Title>

              <p>
                <BedIcon /> {card.type}
              </p>
              <p>
                <CurrencyPoundIcon /> {card.price}
              </p>
              <p>
                <LocationOnIcon /> 5-10 Kms Away from the City
              </p>

              {!currentUserProperties[card.propertyId] ? (
                <Link to={`/house/${card.propertyId}`}>
                  <Button className="btn" variant="secondary">
                    View More Details
                  </Button>
                </Link>
              ) : (
                <Button className="btn" variant="secondary" disabled>
                  Sold
                </Button>
              )}
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Cards;
