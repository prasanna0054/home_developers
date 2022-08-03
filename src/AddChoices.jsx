import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./AddChoices.css";
import axios from "axios";
import { toast } from "react-toastify";

function AddChoices() {
  const [input, setInput] = useState({
    name: "",
    description: "",
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
    const newChoice = {
      name: input.name,
      description: input.description,
      imageURL: input.imageURL,
    };
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    axios
      .post("http://localhost:5000/addChoices", newChoice)
      .then((response) => console.log(response));
    toast.success("Choices have been added successfully");
  }

  return (
    <div className="form">
      <h1>Add Choices</h1>

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
        placeholder="Enter URL"
        name="imageURL"
        className="box"
        value={input.imageURL}
        onChange={handleChange}
      />

      <Button className="bt" onClick={handleClick}>
        Add Choices
      </Button>
    </div>
  );
}

export default AddChoices;
