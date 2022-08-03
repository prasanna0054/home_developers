import React from "react";
import { Button, Table } from "react-bootstrap";
import { StateManagement } from "./Context/context";
import "./Invoice.css";

function Invoice() {
  const { orders, extras, choices, users, properties } = StateManagement();

  const getProductDetails = (currentCartItem) => {
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

  const getUserName = (obj) => {
    let fullName = "";
    const user = users[obj.userId];
    fullName = (user?.fName ?? "") + (user?.lName ?? "");
    return [user?.newEmail ?? "", fullName];
  };

  const getTotal = (products) => {
    return products.reduce((acc, currentCartItem) => {
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
  const cardObjectToArray = Object.entries(orders);

function handleClick(){
    window.print();
}

  return (
    <div className="invoice">
      <h2>Invoice</h2>
      <div className="invoice-admin">
  <dl>
        <dt>Home Developers</dt>
        <dt>Leicester</dt>
        <dt>info@home-developers.com</dt>
        <dt>+44 7404010010</dt>
        <dt>© Copyright Home Developers 2022</dt>
      </dl>
      </div>
<h2>Thank you for making the Payment, Your Order Details Follows</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Username</th>
            <th>Email Id</th>
            <th>Product info</th>
            <th>Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {cardObjectToArray.length ? (
            cardObjectToArray.map(([key, obj], index) => {
              const [EmailId, fullName] = getUserName(obj);
              return (
                <tr key={key}>
                  <td>{index + 1}</td>
                  <td>{fullName}</td>
                  <td>{EmailId}</td>

                  <td>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Product Name</th>
                          <th>Product Type</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {obj.productsInfo.map((product, index) => {
                          return (
                            <tr key={key + index}>
                              <td>{index + 1}</td>
                              <td>
                                {getProductDetails(product)?.name ?? "-NA-"}
                              </td>
                              <td>{product.productType}</td>
                              <td>
                                {product.productType === "property"
                                  ? "£"
                                  : getProductDetails(product)?.currency ?? ""}
                                {getProductDetails(product)?.price ?? "FREE"}
                              </td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td></td>
                          <td></td>
                          <td>Total :</td>
                          <td>{"£" + getTotal(obj.productsInfo)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </td>

                  <td>{obj.paymentDate}</td>
                </tr>

              );

            })
            
          )
          
          
           : (
            <tr>
              <td>No Data</td>
              <td>No Data</td>
              <td>No Data</td>
              <td>No Data</td>
              <td>No Data</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Button variant="light" onClick={handleClick}> Download Invoice</Button>
    </div>
  );
}

export default Invoice;
