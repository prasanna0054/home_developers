import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";

function AddCard() {
  const [input, setInput] = useState({
    title: "",
    propertyId: "",
    type: "",
    imageURL: "",
    price: "",
  });

  const [property, setProperty] = useState([]);

  React.useEffect(() => {
    const getProperty = async () => {
      const response = await axios.get(`http://localhost:5000/properties`);
      const responseData = await response.data;
      console.log(responseData);
      setProperty(responseData);
    };

    getProperty();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }
  function handleClick(event) {
    event.preventDefault();
    const newCard = {
      title: input.title,
      propertyId: input.propertyId,
      type: input.type,
      price: input.price,
      imageURL: input.imageURL,
    };
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    axios
      .post("http://localhost:5000/addCards", newCard)
      .then((response) => console.log(response));
    toast.success("Cards have been added successfully");
  }

  return (
    <div className="form">
      <h1>Add Cards</h1>

      <input
        type="text"
        placeholder="Enter House Title"
        name="title"
        className="box"
        value={input.title}
        onChange={handleChange}
      />

      <select
        className="box"
        name="propertyId"
        placeholder="Select Property"
        value={input.propertyId}
        onChange={handleChange}
      >
        {property.map((item) => {
          console.log(item)
          return <option value={item._id}>{item.about}</option>
        })}
      </select>

      <input
        type="text"
        placeholder="Enter type of house"
        name="type"
        className="box"
        value={input.type}
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
        placeholder="Enter URL"
        name="imageURL"
        className="box"
        value={input.imageURL}
        onChange={handleChange}
      />

      <Button className="bt" onClick={handleClick}>
        Add Cards
      </Button>
    </div>
  );
}

export default AddCard;
