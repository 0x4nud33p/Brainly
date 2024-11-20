import mongoose from "mongoose";
import User from "./user.model.js";
import Tags from "./tags.model.js";

const contentSchema = new mongoose.Schema({
  link: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  content : {
    type : String,
    trim : true,
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
  },
});

const Content = mongoose.model("Content", contentSchema);

export default Content;
