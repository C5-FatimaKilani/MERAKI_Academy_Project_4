import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { methodContext } from "../../App";
import "./Navbar.css"
export const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, isLoggedIn, setIsLoggedIn } =
    useContext(methodContext);

  const logout = () => {
    localStorage.clear();
    setToken("");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="Navbar">

         <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
      {isLoggedIn ? (
        <><Link className="Link" to="/dashboard">
        Dashboard
      </Link>
      <Link className="Link" to="/CreateCategory">
        Add New Category
      </Link>
      <button className="logout" onClick={logout}>
        Logout
      </button>
      
      </>
      ) : (
        <>
          <Link className="Link" to="/login">Login</Link>
          <Link className="Link" to="/register">Register</Link>
        </>
      )}

      <button className="logout"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
};
