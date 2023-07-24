import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetailedProduct.css";
import { useStateValue } from "./StateProvider";

export default function DetailedProduct() {
  const [{ basket }, dispatch] = useStateValue();
  const navigator = useNavigate();
  const location = useLocation();
  console.log(location);
  const props = location.state;

  const handleAddToBasket = () => {
    if (basket.some((item) => item.id === props.id)) {
      navigator("/checkout");
    } else {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: props.id,
          title: props.title,
          image: props.image,
          price: props.price,
          rating: props.rating,
          quantity: props.quantity,
        },
      });
    }
  };

  const handleBuyNow = () => {
    navigator("/payment", {
      state: {
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.price,
        rating: props.rating,
        quantity: props.quantity,
      },
    });
  };
  return (
    <div className="detailed__product">
      <div className="detailed__product__info">
        <p>{props.title}</p>
        <p className="detailed__product__price">
          <small>
            <b>₹</b>
          </small>
          <strong>{props.price}</strong>
        </p>
        <div className="detailed__product__rating">
          {Array(props.rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>

      <img className="detailed__product__img" alt="" src={props.image} />

      <div className="detailed__product__button">
        <button
          className="detailed__product__addToBasket"
          onClick={handleAddToBasket}
        >
          {basket.some((item) => item.id === props.id)
            ? "Go to Basket"
            : "Add to Basket"}
        </button>

        <button className="detailed__product__BuyNow" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}
