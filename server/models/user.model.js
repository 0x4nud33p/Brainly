import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 5, unique : true},
    password: { type: String, required: true, minlength: 8 },
});


const User = mongoose.model("User", userSchema);

export default User;
