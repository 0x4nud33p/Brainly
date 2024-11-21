import mongoose from "mongoose";
import User from "./user.model.js";
import Tags from "./tags.model.js";

const contentSchema = new mongoose.Schema({
  link: {
    type: String,
    trim: true,
    required: [true, "Link is required"],
  },
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    trim: true,
    required: [true, "Content is required"],
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tags,
      required: false,
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: [true, "User ID is required"],
  },
});


const Content = mongoose.model("Content", contentSchema);

export default Content;
