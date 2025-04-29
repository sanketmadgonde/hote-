// Backend/models/User.js
import  mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String
});

export default mongoose.model("User", userSchema);
