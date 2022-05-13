import React, {  useState, useContext } from "react";
import axios from "axios";
import { methodContext } from "../../App";

import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { token, setToken, message, setMessage, isLoggedIn, setIsLoggedIn } =
    useContext(methodContext);

    const clickLogin = (e) => {
      // prevent the form from refreshing the whole page
      e.preventDefault();
  
      axios
        .post("http://localhost:5000/login/", {
          email: email,
          password: password,
        })
        .then((result) => {
          setToken(result.data.token);
          setIsLoggedIn(true);
        
          setMessage("loged in succefully")
          navigate("/dashboard");
          localStorage.setItem("token",result.data.token)
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setIsLoggedIn(false);
          setMessage(error.response.data.message);
        });
    };
  
  return (
   
    <div>Login
       
             <input
        type="email"
        placeholder="Email "
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <input
        type="password"
        placeholder="Password "
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button onClick={clickLogin}>Login</button>
      <br />
      {message}
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  )
}

