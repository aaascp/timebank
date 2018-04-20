const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceCategorySchema = new Schema({
  name: { type: String, required: true },
  subcategory: String
});

const serviceSchema = new Schema(
  {
    userName: { type: String, required: true, ref: "User" },
    category: { type: serviceCategorySchema, required: true },
    description: { type: String, required: true },
    neighborhood: String
  },
  { collection: "service" }
);

mongoose.model("service", serviceSchema);
