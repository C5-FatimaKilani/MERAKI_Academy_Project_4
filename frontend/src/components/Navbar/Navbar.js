
import { Link,useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { methodContext } from "../../App";

export const Navbar = () => {
    const navigate = useNavigate();
    const {token, setToken,isLoggedIn, setIsLoggedIn} = useContext(methodContext);

    const logout = () => {
        localStorage.clear("token");
        setToken(null);
        setIsLoggedIn(false);
        navigate("/login");
      };

    return(
        <div className="Navbar">
<Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>

     
      <button onClick={logout}>Log Out</button>
        </div>

    )
}