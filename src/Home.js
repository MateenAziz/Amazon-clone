import React, { useState } from "react";
import "./Home.css";
import Product from "./Product";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@mui/material/Alert";
import { MenuItem, Select } from "@mui/material";
import { first_row_data, second_row_data, third_row_data } from "./data";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";

function Home() {
  const [alerts, setAlerts] = useState([]);
  const [{ searchText }] = useStateValue();

  const handleIsAddedtoBasket = (updatedAlerts) => {
    setAlerts(updatedAlerts);
    console.log(alerts[0]);
  };

  const handleClose = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://m.media-amazon.com/images/I/61TU67iBmeL._SX3000_.jpg"
          alt=""
        />
        <div className="home__rows">
          <div className="home__row">
            {first_row_data
              .filter((item) => {
                return searchText.toLowerCase() === ""
                  ? item
                  : item.title
                      .toLowerCase()
                      .includes(searchText.toLowerCase()) ||
                      item.price
                        .toString()
                        .toLowerCase()
                        .includes(searchText.toLowerCase());
              })
              .map((item) => (
                <Product
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                  quantity={item.quantity}
                  setAlert={handleIsAddedtoBasket}
                />
              ))}
          </div>
          <div
            style={{ minWidth: 200, display: "inline-block", flex: "150px" }}
          >
            <Select
              labelId="horizontal-dropdown-label"
              id="horizontal-dropdown"
              className="horizontal__dropdown"
            >
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>
          </div>

          <div className="home__row">
            {second_row_data
              .filter((item) => {
                return searchText.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(searchText.toLowerCase());
              })
              .map((item) => (
                <Product
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                  quantity={item.quantity}
                  setAlert={handleIsAddedtoBasket}
                />
              ))}
          </div>

          <div className="home__row">
            {third_row_data
              .filter((item) => {
                return searchText.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(searchText.toLowerCase());
              })
              .map((item) => (
                <Product
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                  quantity={item.quantity}
                  setAlert={handleIsAddedtoBasket}
                />
              ))}
          </div>
          <div className="dropdown">
            <span>Hover me</span>
            <div className="dropdown-content">
              <a href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
            </div>
          </div>
        </div>
        {alerts.map((alert) => (
          <Snackbar
            key={alert.id}
            open={true}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={() => handleClose(alert.id)}
          >
            <MuiAlert>
              Product : <u>{alert.message}</u> is Added to the basket
            </MuiAlert>
          </Snackbar>
        ))}
      </div>
    </div>
  );
}

export default Home;
