import Mongoose from "mongoose";
const Notification = new Mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false,
    required: true
  },
  timestamp: true
});
export default Mongoose.model("Notification", Notification);