import Mongoose from "mongoose";
const Comments = new Mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: [String],
    default: [],
    required: true
  },
  comments: {
    type: [Mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "Comments"
  },
  timestamp: true
});
export default Mongoose.model("Comments", Comments);