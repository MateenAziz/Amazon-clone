import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebaseDb.js";
import "./Login.css";
import { useStateValue } from "./StateProvider.js";

function Login() {
  const navigate = useNavigate(); //In react-router-dom v6 useHistory() is replaced by useNavigate().
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dispatch] = useStateValue();

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        //it successfully created new user with email and password
        console.log(auth);
        if (auth) {
          navigate("/");
        }
      })

      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="http://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login__signInButton"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>
        <p>
          By Signing-in you are agree to Amazon's terms and Conditions of Use
          and Sale. Please see over privacy policy, our cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          className="login__registerButton"
          type="submit"
          onClick={register}
        >
          Create Your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
