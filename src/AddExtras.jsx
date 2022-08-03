import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./AddExtras.css";
import axios from "axios";
import { toast } from "react-toastify";

function AddExtras() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    currency: "",
    imageURL: "",
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
    const newExtra = {
      name: input.name,
      description: input.description,
      price: input.price,
      currency: input.currency,
      imageURL: input.imageURL,
    };
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    axios
      .post("http://localhost:5000/addExtras", newExtra)
      .then((response) => console.log(response));
    toast.success("Extras have been added successfully");
  }

  return (
    <div className="form">
      <h1>Add Extras</h1>

      <input
        type="text"
        placeholder="Enter Product Name"
        name="name"
        className="box"
        value={input.name}
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
        placeholder="Enter Currency"
        name="currency"
        className="box"
        value={input.currency}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Enter URL"
        name="imageURL"
        className="box"
        value={input.imageURL}
        onChange={handleChange}
      />

      <Button className="bt" onClick={handleClick}>
        Add Extras
      </Button>
    </div>
  );
}

export default AddExtras;
