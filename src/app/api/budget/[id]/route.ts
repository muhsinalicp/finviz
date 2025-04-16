import { NextRequest, NextResponse } from "next/server";
import type { NextApiResponse } from "next"; // optional, for type safety
import Budget from "@/models/budget";
import connectToDB from "@/db/connection";
import { getEnv } from "@/utils/getEnv";

// 👇 This is the key: explicitly type context properly
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    await connectToDB(getEnv("MONGO_URI"));
    const deleted = await Budget.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Budget deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
