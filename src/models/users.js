import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "E-mail is required"],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, "userName is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    trim: true,
  },
  adminId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  plan: {
    type: mongoose.Types.ObjectId,
    ref: "plan"
  },
  role: {
    type: mongoose.Types.ObjectId,
    ref: "roles",
    required: [true, "role is required"],
  },
  
});


const usersModel = new mongoose.Model('user', userSchema)

export default usersModel