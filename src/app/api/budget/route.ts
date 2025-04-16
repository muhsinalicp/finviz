import Budget from "@/models/budget";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

const budgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  month: z.string().regex(/^\d{4}-\d{2}$/, "Month must be in YYYY-MM format"),
  budgetAmount: z.number().positive("Budget must be greater than 0"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    body.budgetAmount = Number(body.budgetAmount);

    const parsed = budgetSchema.parse(body);

    const existing = await Budget.findOne({
      category: parsed.category,
      month: parsed.month,
    });

    if (existing) {
      return NextResponse.json(
        { error: "Budget for this category and month already exists." },
        { status: 400 }
      );
    }

    await Budget.create(parsed);

    return NextResponse.json(
      { message: "Budget saved", data: parsed },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const budgets = await Budget.find();

  return NextResponse.json(budgets);
}
