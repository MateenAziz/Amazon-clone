import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        {/* <img className="checkout__ad" src="" alt="" /> */}
        <h2 className="checkout__title">Your Shopping Basket</h2>
        {basket?.map((item) => (
          <CheckoutProduct key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            quantity={item.quantity}
          />
        ))}
      </div>

      <div className="checkout__right">
        <h3>{user?.email}</h3>
        <h2>Your Subtotal will go here</h2>
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
