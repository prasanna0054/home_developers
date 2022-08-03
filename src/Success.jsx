import React from "react";
import { Alert } from "react-bootstrap";

function Success() {
  return (
    <div>
      <Alert variant="success">
        <Alert.Heading>Payment has been Successful</Alert.Heading>
        <p>Thank you for your payment, More details will follow soon....</p>
        <hr />
        <p className="mb-0">Invoice will be Sent Shortly</p>
      </Alert>
    </div>
  );
}

export default Success;
