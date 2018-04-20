const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  subcategories: [String]
});

mongoose.model("category", categorySchema);
