import "./Header.css";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from '@mui/material';
import { StateManagement} from './Context/context'


function Header(props) {
  const { userData, setUserData } = props;
  const handleLogOut = () => {
    setUserData({
      isLogged: false,
    });
    localStorage.removeItem("user");
    toast.success("You have been logged out successfully");
  };

  const {cart,getCart} = StateManagement()
  
  useEffect(()=>{
    getCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="nav-bar">
      <div className="navbar_options brand">
        <Link to="/">
          <h1>Home-Developers </h1>
        </Link>
      </div>
      {!userData.isLogged ? (
        <div className="navbar_options">
          <h4>
            <NavLink to="/login">Login</NavLink>
          </h4>
        </div>
      ) : (
        <Button variant="secondary" onClick={handleLogOut}>
          Log Out
        </Button>
      )}

      <div className="navbar_options">
        <Link to="/Extras">
          <h4>Extras</h4>
        </Link>
      </div>
      <div className="navbar_options">
        <h4>
        <Link to="/cart">

  <Badge badgeContent={cart.length} color="secondary">
    <ShoppingCartIcon />
  </Badge>
  </Link>

  
       </h4>
      </div>
    </div>
  );
}

export default Header;
