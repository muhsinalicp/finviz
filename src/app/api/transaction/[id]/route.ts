import connectToDB from "@/db/connection";
import Transaction from "@/models/transaction";
import { getEnv } from "@/utils/getEnv";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const uri = getEnv("MONGO_URI");
  await connectToDB(uri);

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "param id is required" },
      { status: 400 }
    );
  }

  await Transaction.findByIdAndDelete(id);

  return NextResponse.json({ message: "Transaction deleted" });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  await Transaction.findByIdAndUpdate(id, {
    $set: body,
  });

  return NextResponse.json({ message: "Transaction updated" });
}
