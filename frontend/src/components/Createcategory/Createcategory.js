import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { methodContext } from "../../App";

//===============================================================
export const CreateCategory = () => {
  const { token, isLoggedIn } = useContext(methodContext);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================
  const createCategoryButton = async (e) => {
    e.preventDefault();
    try {
      const category = {
        title,
        img,
      };
      const result = await axios.post(
        "http://localhost:5000/categories",
        category,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        setStatus(true);
        setMessage("The category has been created successfully");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };
  return <div>
<>
<form onSubmit={createCategoryButton}>
        <br />
        <input
          type="text"
          placeholder="category title here"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        {/* <img {setImg("")} /> */}
        <br />
        <button>Create New Category</button>
      </form>
      <br />
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}

</>
  </div>;
};
