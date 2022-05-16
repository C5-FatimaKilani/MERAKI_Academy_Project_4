import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import useParams
import { useParams } from "react-router-dom";
import "./GetProducts.css"
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
const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      getProductsByCategory();
    } catch (error) {
      console.log(error);
    }
  };
//===========================================
const addComment = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/products/${id}/comments`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getProductsByCategory();
    } catch (error) {
      console.log(error.response);
    }
  };
//===========================================

//===========================================
useEffect(() => {
    getProductsByCategory();
  }, []);
//===========================================
return(
    <>
    <br />
    {products.length &&
      products.map((product, index) => (
        <div key={index} className="product">
          <div>{product.title}</div>
          <div>{product.description}</div>
          <div>{product.price}</div>
          <div>
            {product.comments ? (
              product.comments.map((comment, i) => {
                return (
                  <p className="comment" key={i}>
                    {comment.comment}
                  </p>
                );
              })
            ) : (
              <></>
            )}
          </div>
          {product.category === categoryId && (
            <>
              {updateBox && productId === product._id && (
                <form>
                  <br />
                  <input
                    type="text"
                    defaultValue={product.title}
                    placeholder="product title here"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <br />

                  <textarea
                    placeholder="product description here"
                    defaultValue={product.description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </form>
              )}
              <button
                className="delete"
                onClick={() => deleteProduct(product._id)}
              >
                X
              </button>
              <button
                className="update"
                onClick={() =>updateClick(product)}
              >
                Update
              </button>
            </>
          )}
          <div>
            <textarea
              className="commentBox"
              placeholder="comment..."
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              className="commentBtn"
              onClick={() => {
                addComment(product._id);
              }}
            >
              Add comment
            </button>
          </div>
        </div>
      ))}
    {message && <div>{message}</div>}
  </>
)


}