import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
  },
  { timestamps: true }
);

export default mongoose.model("task", taskSchema);
