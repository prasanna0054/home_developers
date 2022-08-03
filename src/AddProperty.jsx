import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./AddExtras.css";
import axios from "axios";
import { toast } from "react-toastify";

function AddProperty() {
  const [input, setInput] = useState({
    about: "",
    description: "",
    price: "",
    imageURL: "",
    imageURL1: "",
    imageURL2: "",
    imageURL3: "",
    imageURL4: "",
    imageURL5: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }
  function handleClick(event) {
    event.preventDefault();
    const newProperty = {
      about: input.about,
      description: input.description,
      price: input.price,
      imageURL: input.imageURL,
      imageURL1: input.imageURL1,
      imageURL2: input.imageURL2,
      imageURL3: input.imageURL3,
      imageURL4: input.imageURL4,
      imageURL5: input.imageURL5,
    };
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    axios
      .post("http://localhost:5000/addProperty", newProperty)
      .then((response) => console.log(response));
    toast.success("Property have been added successfully");
  }

  return (
    <div className="form">
      <h1>Add Property</h1>

      <input
        type="text"
        placeholder="Enter Product Details"
        name="about"
        className="box"
        value={input.about}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Enter Description"
        name="description"
        className="box"
        value={input.description}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Enter Price"
        name="price"
        className="box"
        value={input.price}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Enter Image URL"
        name="imageURL"
        className="box"
        value={input.imageURL}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Enter Image URL 1"
        name="imageURL1"
        className="box"
        value={input.imageURL1}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Enter Image URL 2"
        name="imageURL2"
        className="box"
        value={input.imageURL2}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Enter Image URL 3"
        name="imageURL3"
        className="box"
        value={input.imageURL3}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Enter Image URL 4"
        name="imageURL4"
        className="box"
        value={input.imageURL4}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Enter Image URL 5"
        name="imageURL5"
        className="box"
        value={input.imageURL5}
        onChange={handleChange}
      />

      <Button className="bt" onClick={handleClick}>
        Add Property
      </Button>
    </div>
  );
}

export default AddProperty;
