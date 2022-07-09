require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const cartItemRoute = require("./routes/cartItemRoute");
const orderRoute = require("./routes/orderRoute");

const authenticate = require("./middlewares/authenticate");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");

const app = express();

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);
app.use("/users", authenticate, userRoute);
app.use("/products", productRoute);
app.use("/cartItems", authenticate, cartItemRoute);
app.use("/orders", authenticate, orderRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
