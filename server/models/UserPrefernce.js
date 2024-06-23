import Mongoose from "mongoose";
const UserPreference = new Mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  darkMode: {
    type: Boolean,
    default: false,
    required: true
  },
  lastLogin: {
    type: Date,
  },
  streak: {
    type: Number,
    default: 0,
  },
  notifications: {
    type: [String],
    default: [],
  },
});
export default Mongoose.model("UserPreference", UserPreference);