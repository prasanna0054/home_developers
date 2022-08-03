import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";
import Signup from "./Signup";
import Cards from "./Cards";
import House from "./House";
import Extras from "./Extras";
import Choices from "./Choices";
import { ToastContainer } from "react-toastify";
import Cart from "./Cart";
import Admin from "./Admin";
import Invoice from "./Invoice";

function App() {
  const [userData, setUserData] = useState({ isLogged: false });
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData?.isLogged) {
      setUserData(storedUserData);
    }
  }, []);
  return (
    <Router>
      <div>
        <Header setUserData={setUserData} userData={userData} />

        <ToastContainer />

        <Routes>
          <Route
            path="/"
            element={
              (userData.isLogged &&
                (userData?.role === "admin" ||
                  userData?.role === "supplier") && (
                  <>
                    <Admin />
                  </>
                )) || (
                <>
                  <Main />
                  <Cards />
                </>
              )
            }
          />

          {userData.isLogged &&
          !(userData?.role === "admin" || userData?.role === "supplier") ? (
            <Route path="/extras" element={<Extras />} />
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}

          {!userData.isLogged ? (
            <Route
              path="/login"
              element={
                <>
                  <Login setUserData={setUserData} userData={userData} />
                </>
              }
            />
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
          <Route
            path="/Invoice"
            element={
              <>
                <Invoice />
              </>
            }
          />
          {userData.isLogged &&
          !(userData?.role === "admin" || userData?.role === "supplier") ? (
            <Route
              path="/cart"
              element={
                <>
                  <Cart />
                </>
              }
            />
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}

          <Route path="/signup" element={<Signup />} />
          {userData.isLogged ? (
            <Route
              // path="/house/:id"
              path="/house/:id"
              element={
                <>
                  <House />
                  <Choices />
                </>
              }
            />
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
