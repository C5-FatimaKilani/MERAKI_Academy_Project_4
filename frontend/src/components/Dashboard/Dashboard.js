
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
    //   headers: {
    //     authorization: "Bearer " + token,
    //   },
    })
    .then((result) => {
      console.log(result);
      setCategories(result.data.categories);
      
    })
    .catch((err) => {
      console.log(err);
    });
}

const addCategoryButton = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:5000/categories/`,
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
  };

     useEffect(() => {
        console.log(token);
        getAllCategories()
        
      }, []);
return(
    <div>
        Dashboard:
        {categories &&
        categories.map((category) => {
          return (
            <div>
              <p> Title : {category.title} </p>
              <br />

              <p> Image : {category.img} </p>
              <br />

              <button onClick={addCategoryButton}>Adding Category</button>
            </div>
          );
        })}

    </div>
)
}