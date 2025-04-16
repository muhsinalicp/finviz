import Budget from "@/models/budget";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  await Budget.findByIdAndDelete(id);

  return NextResponse.json({ message: "Budget deleted" });
}
