import React, { useState } from "react";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fName: "",
    lName: "",
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
    const newUser = {
      email: input.email,
      password: input.password,
      confirmPassword: input.confirmPassword,
      fName: input.fName,
      lName: input.lName,
    };
    axios
      .post("http://localhost:5000/signup", newUser)
      .then(() => {
        toast.success("You are registered Successfully, Please Login");
        navigate("/login");
      })

      .catch((err) => {
        console.log(JSON.stringify(err));
        toast.error("Something's wrong,Please Try again");
      });
  }

  return (
    <div>
      <form className="signup">
        <h1>Hello there!</h1>
        <input
          onChange={handleChange}
          className="box"
          name="email"
          type="email"
          value={input.email}
          placeholder="Enter Email Address"
        />

        <input
          onChange={handleChange}
          className="box"
          name="password"
          type="Password"
          value={input.password}
          placeholder="Enter Password"
        />

        <input
          onChange={handleChange}
          className="box"
          name="confirmPassword"
          type="Password"
          value={input.confirmPassword}
          placeholder="Confirm Password"
        />

        <input
          onChange={handleChange}
          className="box"
          name="fName"
          type="text"
          value={input.fName}
          placeholder="First Name"
        />

        <input
          onChange={handleChange}
          className="box"
          name="lName"
          type="text"
          value={input.lName}
          placeholder="Last Name"
        />

        <Button
          variant="secondary"
          onClick={handleClick}
          size="md"
          className="btn"
          type="submit"
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export default Signup;
