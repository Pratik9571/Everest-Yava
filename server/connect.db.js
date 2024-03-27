import mongoose from "mongoose";

const dbName = "Everest-Yava";
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://praatik:pratik11@cluster0.lpem50d.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log("Database connection established....");
  } catch (error) {
    console.log("Database connection failed...");
    console.log(error.message);
  }
};

export default connectDB;
