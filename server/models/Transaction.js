const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  debitAccount: { type: String, required: true, ref: "User" },
  creditAccount: { type: String, required: true, ref: "User" },
  service: { type: Schema.Types.ObjectId, ref: "Service" },
  value: { type: Number, default: 0 },
  transactionType: { type: String, required: true },
  createdAt: { type: Number, required: true }
});

mongoose.model("transaction", transactionSchema);
