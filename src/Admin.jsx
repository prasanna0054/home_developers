import { Tab } from "bootstrap";
import React from "react";
import { Tabs } from "react-bootstrap";
import AddCard from "./AddCard";
import AddChoices from "./AddChoices";
import AddExtras from "./AddExtras";
import AddProperty from "./AddProperty";
import Orders from "./Orders";
import "./Admin.css";
import Supplier from "./Supplier";

function Admin() {
  const userData = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="admin">
      <hr />

      {userData && userData.role === "admin" ? (
        <>
          <Tabs
            defaultActiveKey="Orders"
            id="admin-tab-example"
            className="mb-3"
          >
            <Tab eventKey="Add-Property" title="Add Property">
              <AddProperty />
            </Tab>
            <Tab eventKey="AddCards" title="Add Cards">
              <AddCard />
            </Tab>
            <Tab eventKey="AddExtras" title="Add Extras">
              <AddExtras />
            </Tab>
            <Tab eventKey="AddChoices" title="AddChoices">
              <AddChoices />
            </Tab>
            <Tab eventKey="Orders" title="Orders">
              <Orders />
            </Tab>
          </Tabs>
        </>
      ) : userData.role === "supplier" ?  <Tabs
            defaultActiveKey="Supplier"
            id="admin-tab-example"
            className="mb-3"
          >
            <Tab eventKey="Supplier" title="Orders">
              <Supplier />
            </Tab>
          
          </Tabs> : <div>Not Allowed</div> }

     
    </div>
  );
}

export default Admin;
