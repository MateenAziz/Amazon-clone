import React, { useEffect, useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";

export default function Payment() {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    //generates the spoecial strip secret which allows us to charge a customer
    const getClientSecret = async () => {
      const total = getBasketTotal(basket);
      if (total > 0) {
        const response = await axios({
          method: "post",
          //stripe expects the total in a currencies subunits
          url: `/payments/create?total=${total}`,
        });
        setClientSecret(response.data.clientSecret);
        console.log("client secret is >>>", response.data.clientSecret);
      }
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders", { replace: true });
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (
          <Link to={"/checkout"}>
            {basket?.reduce((total, item) => total + item.quantity, 0)}
          </Link>
          )
        </h1>
        <div className="payment__section">
          {/* {address} */}
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>mateenlangde@gmail.com</p>
            <p>123 Florida Lane</p>
            <p>Brodway Colony, Los Angeles, CA</p>
          </div>
        </div>

        <div className="payment__section">
          {/* products */}
          <div className="payment__title">
            <h3>Review item and delivery</h3>
          </div>
          <div className="payment__products">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          {/* payment total */}
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* Error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
