import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
  },
  { timestamps: true }
);

const Transaction =
  models.Transaction || model("Transaction", TransactionSchema);
export default Transaction;
