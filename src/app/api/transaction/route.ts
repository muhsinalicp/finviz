import connectToDB from "@/db/connection";
import Budget from "@/models/budget";
import Transaction from "@/models/transaction";
import { getEnv } from "@/utils/getEnv";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const uri = getEnv("MONGO_URI");
  await connectToDB(uri);

  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: NextRequest) {
  try {
    const uri = getEnv("MONGO_URI");
    await connectToDB(uri);

    const body = await req.json();
    const { amount, date, description, category } = body;

    if (!amount || !date || !description || !category) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const transactionMonth = new Date(date).toISOString().slice(0, 7);

    const budget = await Budget.findOne({
      category,
      month: transactionMonth,
    });

    if (budget) {
      const totalAfterTxn = budget.actualSpent + Number(amount);
      if (totalAfterTxn > budget.budgetAmount) {
        return NextResponse.json(
          { message: "Budget exceeded" },
          { status: 400 }
        );
      }
    }

    const transaction = await Transaction.create({
      amount,
      date,
      description,
      category,
    });

    if (budget) {
      budget.actualSpent += Number(amount);
      budget.transactions.push(transaction._id);
      await budget.save();
    }

    return NextResponse.json(
      { message: "Transaction created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Transaction POST error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
