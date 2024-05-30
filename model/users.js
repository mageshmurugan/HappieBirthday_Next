import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const userSchema = new Schema({
  phone: String,
});

export default model("User", userSchema);
