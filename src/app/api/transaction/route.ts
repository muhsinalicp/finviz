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
  const uri = getEnv("MONGO_URI");
  await connectToDB(uri);

  const body = await req.json();

  if (
    !body ||
    !body.amount ||
    !body.date ||
    !body.description ||
    !body.category
  ) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const transaction = await Transaction.create({
    amount: body.amount,
    date: body.date,
    description: body.description,
    category: body.category,
  });

  const transactionMonth = new Date(body.date).toISOString().slice(0, 7);

  const budget = await Budget.findOne({
    category: body.category,
    month: transactionMonth,
  });

  if (budget) {
    budget.actualSpent += body.amount;
    await budget.save();
  }

  return NextResponse.json({ message: "Transaction created" });
}
