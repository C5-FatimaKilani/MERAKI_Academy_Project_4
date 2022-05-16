import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import useParams
import { useParams } from "react-router-dom";
import { methodContext } from "../../App";

//============================================
const Products =() =>{
    const { token } = useContext(methodContext);

    const [products, setProducts] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [productId, setProductId] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");

// {id} from useParams
const { id } = useParams();

    const getProductsByCategory = async(id) => {
try{
    // http://localhost:5000/products/search_1?category=627a6466b593400661bbfd18
const result = await axios.get(`http://localhost:5000/products/search_1?category=${id}`,{
    headers: {
        Authorization: `Bearer ${token}`,
      }, 
});
if(result.data.success){
    setArticles(result.data.products);
    setMessage("");
}else throw Error;

}catch(error){
    setMessage(error.response.data.message);
}

    }
//===========================================
const updateProduct = async (id) => {
    try {
      await axios.put(`http://localhost:5000/products/${id}`, {
        title,
        description,
        price,
        img
      });
      getProductsByCategory();
    } catch (error) {
      console.log(error);
    }
  };
//===========================================
const updateClick = (product) => {
    setUpdateBox(!updateBox);
    setProductId(product._id);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    if (updateBox) updateProduct(product._id);
  };
//===========================================

//===========================================

//===========================================

//===========================================
useEffect(() => {
    getProductsByCategory();
  }, []);
//===========================================
return(
    <>
    <div>
        
    </div>
    </>
)


}