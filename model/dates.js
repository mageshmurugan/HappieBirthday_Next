import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const dateSchema = new Schema({
  names: String,
  nam: String,
  email: String,
  date: String,
  year: String,
  ip: String,
});

export default model("Dates", dateSchema);
