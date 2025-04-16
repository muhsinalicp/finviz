import { NextRequest, NextResponse } from "next/server";
import Budget from "@/models/budget";
import connectToDB from "@/db/connection";
import { getEnv } from "@/utils/getEnv";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectToDB(getEnv("MONGO_URI"));

    const deleted = await Budget.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Budget deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectToDB(getEnv("MONGO_URI"));
    const body = await req.json();
    const { budgetAmount } = body;

    if (typeof budgetAmount !== "number" || budgetAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid or missing budgetAmount" },
        { status: 400 }
      );
    }

    const updated = await Budget.findByIdAndUpdate(
      id,
      { budgetAmount, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Budget updated", data: updated });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
