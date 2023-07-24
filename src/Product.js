import React, { useState } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from "react-router-dom";

function Product({ id, title, image, price, rating, quantity, setAlert }) {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();
  console.log("basket==>", basket);

  const addToBasket = () => {
    //dispatch the item into  the data layer
    if (basket.some((item) => item.id === id)) {
      navigate("/checkout");
    } else {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: id,
          title: title,
          image: image,
          price: price,
          rating: rating,
          quantity: quantity,
        },
      });
      const newAlert = {
        id: id,
        message: title,
      };
      setAlert((prevAlert) => [...prevAlert, newAlert]);
    }
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>
            <b>₹</b>
          </small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>
      <Link
        to={"/product"}
        state={{
          id: id,
          title: title,
          image: image,
          price: price,
          rating: rating,
          quantity: 1,
        }}
        
      >
        <img className="product__img" src={image} alt="" />
      </Link>
      <button onClick={addToBasket}>
        {basket.some((item) => item.id === id)
          ? "Go to Basket"
          : "Add to Basket"}
      </button>
    </div>
  );
}

export default Product;
