import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, title, image, price, rating, quantity }) {
  console.log(`Qty:${quantity}`);
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({ type: "REMOVE_FROM_BASKET", id: id });
  };

  const handleQuantity = (e) => {
    dispatch({
      type: "UPDATE_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        quantity: parseInt(e.target.value),
      },
    });
  };

  const qunatityRange = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        <button onClick={removeFromBasket}>Remove from Basket</button>
        <label className="quantity__label">Qty:</label>
        <select
          className="checkoutProduct__quantitydropdown"
          value={quantity}
          onChange={handleQuantity}
        >
          <option selected>{quantity}</option>
          {qunatityRange.map((i) => (
            <option key={i} value={quantity}>
              {i}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CheckoutProduct;
