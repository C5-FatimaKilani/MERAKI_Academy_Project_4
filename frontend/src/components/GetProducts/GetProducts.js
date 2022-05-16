import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import useParams
import { useParams } from "react-router-dom";
import { methodContext } from "../../App";

//============================================
const Products =() =>{
    const { token } = useContext(methodContext);

// {id} from useParams
const { id } = useParams();

    const getProductsByCategory = async() => {
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