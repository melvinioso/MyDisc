import mongoose from "mongoose";

const schema = new mongoose.Schema({
  brand: String,
  mold: String,
  plastic: String,
  weight: Number,
  speed: Number,
  glide: Number,
  turn: Number,
  fade: Number,
});

export const Disc = mongoose.model("Disc", schema);
