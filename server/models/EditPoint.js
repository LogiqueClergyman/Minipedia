import Mongoose from "mongoose";
const EditPoint = new Mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    previousVersion: {
      type: String,
      required: true,
    },
    newVersion: {
      type: String,
      required: true,
    },
    modifiedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default Mongoose.model("EditPoint", EditPoint);
