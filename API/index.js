const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./Controller/UserController");
const authRoute = require("./routes/auth");
const productRoute = require("./Controller/ProductController");
const cartRoute = require("./Controller/CartController");
const orderRoute = require("./Controller/OrderController");
const stripeController = require("./Controller/stripeController");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.post("/stripe/payment", stripeController);
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});