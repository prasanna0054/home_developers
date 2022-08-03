require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer")
const smtpTransport = require("nodemailer-smtp-transport")
const Cards = require("./Models/card");
const Property = require("./Models/property");
const NewUser = require("./Models/signupModel");
const Extras = require("./Models/extras");
const Choices = require("./Models/choices");
const Basket = require("./Models/basket");
const Orders = require("./Models/orders");
const stripe = require("stripe")(process.env.STRIPE_KEY);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

//Authenticate Users
app.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  NewUser.findOne({ newEmail: email, confirmPassword: password }).then(
    (data) => {
      if (!data) {
        return res.status(400).send({ message: "No User Found" });
      } else {
        return res.send(data);
      }
    }
  );
});

//Post New users into the database
app.post("/signup", function (req, res) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const newEmail = req.body.email;
    const newPassword = hash;
    const confirmPassword = req.body.confirmPassword;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const role = "user";
    const register = new NewUser({
      newEmail,
      newPassword,
      confirmPassword,
      fName,
      lName,
      role,
    });
    register.save().then((err, data) => {
      if (data) {
        return res.send(data);
      } else {
        return res.send(err);
      }
    });
  });
});

//Adding Basket to Database
app.post("/addToCart", async function (req, res) {
  const basket = new Basket(req.body);
  const output = await basket.save();

  if (output) {
    Basket.find({ userId: req.body.userId }, (err, data) => {
      if (err) {
        res.statusCode(400);
        res.send(err);
        return;
      }
      res.send(data);
    });
  }
});

//Delete the product from the Cart Page
app.post("/removeFromCart", async function (req, res) {
  Basket.deleteOne({ _id: req.body._id }, (err, data) => {
    if (err) {
      res.statusCode(400);
      res.send(err);
      return;
    }
    Basket.find({ userId: req.body.userId }, (err, data) => {
      if (err) {
        res.statusCode(400);
        res.send(err);
        return;
      }
      res.send(data);
    });
  });
});

//remove from the cart after order successful
app.post("/emptyCart", async function (req, res) {
  Basket.deleteMany({}, (err, data) => {
    if (!data) {
      res.send({ err, message: "Error" });
    } else {
      res.send(data);
    }
  });
});

//Post Orders into the database
app.post("/order", function (req, res) {
  const order = new Orders(req.body);
  const output = order.save();
  res.send(output);
});

//Get Orders from the database

app.get("/order", function (req, res) {
  Orders.find({}, function (err, foundOrder) {
    if (!foundOrder) {
      res.send({ err, message: "No Order Found" });
    } else {
      res.send(foundOrder);
    }
  });
});

//Get Users from the database
app.get("/users", function (req, res) {
  NewUser.find({}, function (err, foundUser) {
    if (!foundUser) {
      res.send({ err, message: "No User Found" });
    } else {
      res.send(foundUser);
    }
  });
});

//GET User Cart
app.get("/cart/:userId", function (req, res) {
  Basket.find({ userId: req.params.userId }, function (err, foundItem) {
    if (!foundItem) {
      res.send({ err, message: "No Cards Found" });
    } else {
      res.send(foundItem);
    }
  });
});

//Adding Cards to Database
app.post("/addCards", function (req, res) {
  const card = new Cards(req.body);
  const output = card.save();
  res.send(output);
});

//Rendering the Cards on HomePage
app.get("/cards", function (req, res) {
  Cards.find({}, function (err, foundCard) {
    if (!foundCard) {
      res.send({ err, message: "No Cards Found" });
    } else {
      res.send(foundCard);
    }
  });
});

//Adding Properties to Database
app.post("/addProperty", function (req, res) {
  const property = new Property(req.body);
  const output = property.save();
  res.send(output);
});

//Rendering the properties
app.get("/properties", function (req, res) {
  Property.find({}, function (err, foundProperty) {
    // console.log(foundProperty, req.body.imageURL);
    if (!foundProperty) {
      res.send({ err, message: "No Property Found" });
    } else {
      res.send(foundProperty);
    }
  });
});

app.get("/properties/:id", function (req, res) {
  Property.findById({ _id: req.params.id }, function (err, foundProperty) {
    if (!foundProperty) {
      res.send({ err, message: "No Property Found" });
    } else {
      res.send(foundProperty);
    }
  });
});

// Adding Extras to Database
app.post("/addExtras", function (req, res) {
  const extra = new Extras(req.body);
  const output = extra.save();
  res.send(output);
});
//Rendering the Extras

app.get("/extras", function (req, res) {
  Extras.find({}, function (err, foundExtra) {
    if (!foundExtra) {
      res.send({ err, message: "No extras Found" });
    } else {
      res.send(foundExtra);
    }
  });
});

//Adding Choices to Database
app.post("/addChoices", function (req, res) {
  const extra = new Choices(req.body);
  const output = extra.save();
  res.send(output);
});

//Rendering the Choices
app.get("/choices", function (req, res) {
  Choices.find({}, function (err, foundChoice) {
    if (!foundChoice) {
      res.send({ err, message: "No extras Found" });
    } else {
      res.send(foundChoice);
    }
  });
});

//Post payment and send automated Email
app.post("/pay", function (req, res) {
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  }));
  
  var mailOptions = {
    from: 'crazzyboy333@gmail.com',
    to: "prasannakumar.nuniganti@gmail.com, prasanna0054@gmail.com",
    subject: 'You have got a new order',
    html:`
    <p>Hi,</p>

    <h3>You have received a new order, Please Login to your dashboard and check the order details</h3>
    
    <h5>Best Wishes</h5>

    <p>Home Developers Team</p>
    `
  };
  
  transporter.sendMail(mailOptions, function(err, data){
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent: ' + data.response);
    }
  });


  stripe.charges.create(
    {
      amount: req.body.amount,
      currency: "gbp",
      source: req.body.tokenId,
      description: "Payment has been made successfully",
    },
    function (stripeErr, stripeRes) {
      if (stripeErr) {
        return res.send(stripeErr);
      } else {
        res.send(stripeRes);
      }
    }
  );
});



app.listen(5000, function () {
  console.log("Server running on port 5000");
});
