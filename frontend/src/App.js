import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Navbar } from "./components/Navbar/Navbar";
import { Dashboard } from "./components/Dashboard/Dashboard";

import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useState, createContext } from "react";
import { CreateCategory } from "./components/Createcategory/Createcategory";

export const methodContext = createContext();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [message, setMessage] = useState("");
  return (
    <div className="App">
      <h1>Welcome in SooqCom</h1>
      <methodContext.Provider
        value={{
          token,
          setToken,
          isLoggedIn,
          setIsLoggedIn,
          message,
          setMessage,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createCategory" element={<CreateCategory />} />
          {/* Route /:category -> insidecomponent useParams*/}

          {/* <Route path="/category/create" element={<CreateCategory />}/> */}
        </Routes>
      </methodContext.Provider>
    </div>
  );
};

export default App;
