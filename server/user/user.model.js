import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    max_length: 25,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    max_length: 25,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    max_length: 55,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ["buyer", "seller"],
  },
});

// to remove password field
userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

// create table and export
const User = mongoose.model("User", userSchema);

export default User;
