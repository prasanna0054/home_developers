import React from "react";
import { Table } from "react-bootstrap";
import { StateManagement } from "./Context/context";
import "./Orders.css";

function Orders() {
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
  return (
    <div className="order">
      <h2>List of orders</h2>
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
          ) : (
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
    </div>
  );
}

export default Orders;
