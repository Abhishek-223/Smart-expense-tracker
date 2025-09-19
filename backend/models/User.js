import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    loginType: { type: String, enum: ["local", "google"], default: "local" }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
