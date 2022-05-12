import React, {useState, useContext } from 'react'

import axios from "axios";

import { Link,useNavigate } from "react-router-dom";

import { methodContext } from "../../App";

export const Register = () => {
  const navigate = useNavigate();

  const {message, setMessage} = useContext(methodContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickRegister = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    axios
      .post("http://localhost:5000/users/", {
        firstName: firstName,
        lastName: lastName,
        age: age,
        country: country,
        email: email,
        password: password
      })
      .then((result) => {
        console.log(result.data.message);
        setMessage(result.data.message);
        navigate("/Login")
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setMessage(error.response.data.message);
      });
  };
  return (
  
    <div>Register:
    <br />
      <Link to="/login">Login</Link>
      <br />
      <input
        type="text"
        placeholder="First Name "
        name="First Name"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Last Name "
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <br />
      <input
        type="number"
        placeholder="Age "
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Country "
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      <br />
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
      <button onClick={clickRegister}>Register</button>
    </div>
  )
}


// export default Register;