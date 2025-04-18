import connectToDB from "@/db/connection";
import Budget from "@/models/budget";
import Transaction from "@/models/transaction";
import { getEnv } from "@/utils/getEnv";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const uri = getEnv("MONGO_URI");
    await connectToDB(uri);

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "param id is required" },
        { status: 400 }
      );
    }

    const transaction = await Transaction.findById(id);

    const yearMonth = new Date(transaction.date).toISOString().slice(0, 7);

    await Budget.findOneAndUpdate(
      {
        category: transaction.category,
        month: yearMonth,
      },
      {
        $pull: { transactions: transaction._id },
        $inc: { actualSpent: -transaction.amount },
      }
    );

    await Transaction.findByIdAndDelete(id);

    return NextResponse.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("Transaction DELETE error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const uri = getEnv("MONGO_URI");
    await connectToDB(uri);

    const { id } = await params;
    const body = await req.json();

    if (
      !id ||
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

    const transaction = await Transaction.findById(id);

    let newAmount = body.amount - transaction.amount;

    const oldBudget = await Budget.findOne({
      transactions: id,
    });

    if (oldBudget) {
      if (oldBudget.actualSpent + newAmount > oldBudget.budgetAmount) {
        return NextResponse.json(
          { message: `Budget exceeded than ${oldBudget.budgetAmount}` },
          { status: 400 }
        );
      }
      oldBudget.actualSpent += newAmount;
      oldBudget.save();
    }

    await Transaction.findByIdAndUpdate(id, {
      $set: body,
    });

    return NextResponse.json({ message: "Transaction updated" });
  } catch (error) {
    console.error("Transaction PUT error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
