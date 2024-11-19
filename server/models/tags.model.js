import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
});

const Tags = mongoose.model("Tags", tagsSchema);

export default Tags;