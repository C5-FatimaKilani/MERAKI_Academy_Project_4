
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { methodContext } from "../../App";

//Dashboard component
export const Dashboard = () => {
    const { token, setToken, message, setMessage } = useContext(methodContext);

    const [categories, setCategories] = useState([]);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

const getAllCategories = (e) => {
     // e.preventDefault();
     axios
    .get(`http://localhost:5000/categories`, {
      headers: {
        authorization: "Bearer " + token,
      },
    })
    .then((result) => {
      console.log(result);
      setCategories(result.data.categories);
      
    })
    .catch((err) => {
      console.log(err);
    });
}

     useEffect(() => {
        console.log(token);
        getAllCategories()
        
      }, []);
return(
    <div>
        Dashboard:


    </div>
)
}