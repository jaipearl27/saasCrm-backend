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
  role: {
    type: mongoose.Types.ObjectId,
    ref: "roles",
    required: [true, "role is required"],
  },
  permissions: [{ type: mongoose.Types.ObjectId, ref: "permissions" }],
});


const usersModel = new mongoose.Model('user', userSchema)

export default usersModel