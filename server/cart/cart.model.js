import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
  orderedQuantity: {
    type: Number,
    require: true,
    min: 1,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
