import mongoose from "mongoose";
import User from "./user.model";

const linkSchema = new mongoose.Schema({
  hash: {
    type: String,
    trim: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

const Link = moongoose.model("Link", linkSchema);

export default Link;
