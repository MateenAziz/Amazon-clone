import "./App.css";
import Header from "./Header";
import "./Header.css";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import React, { useEffect } from "react";
import { auth } from "./firebaseDb";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import DetailedProduct from "./DetailedProduct";

const promise = loadStripe(
  "pk_test_51NMWpOSBgtixbK91TG0J0tZJcocqoO1AYOQ4bEeyuylX8ktuRRAs9wUuh525lDXXxLriBrZg2YMHd2pNknVVuesv00nwgPYNLx"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //it will only run once when the app loads

    auth.onAuthStateChanged((authUser) => {
      console.log("USER IS >>>", authUser);

      if (authUser) {
        // user just logged in / the user was logged out
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // user logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    //BEM
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/checkout"
            element={
              <React.Fragment>
                {" "}
                <Header /> <Checkout />{" "}
              </React.Fragment>
            }
          ></Route>
          <Route
            path="/"
            element={
              <React.Fragment>
                {" "}
                <Header /> <Home />{" "}
              </React.Fragment>
            }
          ></Route>
          <Route path="/orders" element={<Navigate to="/" />} />
          <Route
            path="/payment"
            element={
              <React.Fragment>
                <Header />{" "}
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </React.Fragment>
            }
          ></Route>
         
            <Route path="/product" element={ <><Header/><DetailedProduct /></>}></Route>
      
        </Routes>
      </div>
    </Router>
  );
}

export default App;
