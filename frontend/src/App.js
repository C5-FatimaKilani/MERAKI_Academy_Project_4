import {Register} from "./components/Register/Register"
import {Login} from "./components/Login/Login"
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import './App.css';
import React, {useState ,createContext} from 'react'
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
        <Route path="/register" element={<Register />}/>
        <Route path="login" element={<Login />}/>
      </Routes>
      </methodContext.Provider>
    </div>
  );
}

export default App;
