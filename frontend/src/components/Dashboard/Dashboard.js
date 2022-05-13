import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { methodContext } from "../../App";

//Dashboard component
export const Dashboard = () => {
  const { token, setToken, message, setMessage } = useContext(methodContext);

  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [show, setShow] = useState(false);
//================================================================================
  const getAllCategories = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/categories`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      if (result.data.success) {
        setCategories(result.data.categories);
        setMessage("");
        setShow(true);
        setUserId(result.data.userId);
      } else throw Error;
    } catch (error) {
      return setMessage(error.response.data.message);
    }
    setMessage("Error happened while Get Data, please try again");
  };
//================================================================================
  const addCategoryButton = async (e) => {
    e.preventDefault();
    try {
      const category = { title, img };

      const result = await axios.post(`http://localhost:5000/categories/`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
//================================================================================
  useEffect(() => {
    getAllCategories();
  }, []);
//================================================================================
  return (
    <>
    <div>
        
      {show &&
        categories.map((category) => {
          return (
            <div>
              <div className="category">
                <div>{category.title} </div>
                <div>{category.img} </div>
              </div>

              <button onClick={addCategoryButton}>Adding Category</button>
            </div>
          );
        })}
          {message && <div>{message}</div>}
          
    </div>
   </>
  );
};
