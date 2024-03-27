import express from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./user/user.routes.js";
import productRoutes from "./product/product.routes.js";
import cartRoutes from "./cart/cart.routes.js";
import cors from "cors";

const app = express();

// to make app understand json
app.use(express.json());

// use cors
app.use(cors());

// registering routers
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);

// to connect to the Database
connectDB();

// Setting port and making app to listen into it
const PORT = 8002;
app.listen(PORT, () => {
  console.log(`App is listening to ${PORT} port....`);
});
