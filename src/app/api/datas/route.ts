import connectToDB from "@/db/connection";
import Transaction from "@/models/transaction";
import { getEnv } from "@/utils/getEnv";
import { NextRequest, NextResponse } from "next/server";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//     food: "#FF6B6B",          // Soft red
//     transport: "#4ECDC4",     // Aqua blue
//     utilities: "#FFD166",     // Warm yellow
//     entertainment: "#6A4C93", // Deep purple
//     shopping: "#FFA69E",      // Peach
//     other: "#BDBDBD",         // Gray

const colors = ["#FF6B6B", "#4ECDC4", "#FFD166", "#6A4C93"];

export async function GET(req: NextRequest) {
  const uri = getEnv("MONGO_URI");
  await connectToDB(uri);
  const transactions = await Transaction.find().sort({ date: -1 });
  const lasttransations = await Transaction.find()
    .sort({ createdAt: -1 })
    .limit(4);

  let totalexpense = 0;
  let expensethismonth = 0;

  transactions.forEach((item) => {
    if (item.amount > 0) {
      totalexpense += item.amount;
    }
  });

  transactions.forEach((txn: any) => {
    const date = new Date(txn.date);
    const month = date.getMonth();
    if (month === new Date().getMonth()) {
      expensethismonth += txn.amount;
    }
  });

  const monthlyTotals: Record<string, number> = {};
  const categoryTotals: Record<string, number> = {};

  monthNames.forEach((month) => {
    monthlyTotals[month] = 0;
  });

  transactions.forEach((txn: any) => {
    const date = new Date(txn.date);
    const month = monthNames[date.getMonth()];
    monthlyTotals[month] += txn.amount;
  });

  const chartData = monthNames.map((month) => ({
    month,
    amount: monthlyTotals[month],
  }));

  transactions.forEach((txn: any) => {
    if (!categoryTotals[txn.category]) {
      categoryTotals[txn.category] = 0;
    }
    categoryTotals[txn.category] += txn.amount;
  });

  const pieData = Object.entries(categoryTotals).map(
    ([category, amount], i) => ({
      category,
      amount,
      fill: colors[i % colors.length],
    })
  );

  return NextResponse.json({
    totalexpense: totalexpense,
    chartData,
    pieData,
    expensethismonth,
    lasttransations,
  });
}
