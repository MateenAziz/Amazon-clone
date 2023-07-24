const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NMWpOSBgtixbK91hDYqbzNY72bFHjiNW4Q65QkgsyG1u2XmCn6jWY5LGWorLxBEtmJgW9wQWtOokdTjY8uWBuhZ00ITkZ3aXO"
);

//API

//App config
const app = express();

//middlewarex
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (request, response) => response.status(200).send("Hello Mateen"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payemnt total >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  //OK - Created
  response.status(201).send({ clientSecret: paymentIntent.client_secret });
});
//Listen command
exports.api = functions.https.onRequest(app);
