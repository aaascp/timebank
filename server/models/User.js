const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  facebookId: { type: String, required: true, unique: true, sparse: true },
  name: { type: String, required: true, unique: true },
  account: { type: String, required: true, unique: true }
});

mongoose.model("user", userSchema);
