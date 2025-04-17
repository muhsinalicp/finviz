import { Schema, models, model } from "mongoose";

const BudgetSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    month: {
      type: String,
      required: [true, "Month is required"],
    },
    budgetAmount: {
      type: Number,
      required: [true, "Budget amount is required"],
    },
    actualSpent: {
      type: Number,
      default: 0,
    },
    transactions: {
      type: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
      default: [],
    },
  },
  { timestamps: true }
);

const Budget = models.Budget || model("Budget", BudgetSchema);
export default Budget;
