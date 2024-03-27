import mongoose from "mongoose";

// set rules for product
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      max_length: 55,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      max_length: 55,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: false,
      default: null,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["coffee", "smoothie", "tea", "milkshake", "breakfast", "bakery"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      max_length: 1000,
    },
    planningTo: {
      type: String,
      required: true,
      trim: true,
      enum: ["dine-in", "take-away", "both"],
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// to remove sellerId field
productSchema.method.toJSON = function () {
  let obj = this.toObject();
  delete obj.sellerId;
  return obj;
};

// create table and export
const Product = mongoose.model("Product", productSchema);

export default Product;
