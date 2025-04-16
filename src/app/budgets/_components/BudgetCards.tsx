"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface renderProps {
  render: boolean;
}
export default function BudgetCards({ render }: renderProps) {
  const [change, setChange] = useState(false);

  const [data, setdata] = useState([
    {
      _id: "",
      budgetAmount: 0,
      actualSpent: 0,
      category: "",
      month: "",
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/budget");
      setdata(res.data);
    };
    fetchData();
  }, [change, render]);

  async function deleteBudget(id: String) {
    try {
      const res = await axios.delete(`/api/budget/${id}`);
      if (res.data.message === "Budget deleted") {
        setChange(!change);
        toast.success("budget deleted successfully");
      }
    } catch (err: any) {
      if (err.response && err.response.data?.error) {
        toast.error(`${err.response.data.error}`);
      } else {
        toast.error("Failed to delete budget. Please try again.");
      }
    }
  }

  return (
    <section className="grid gap-2 grid-cols-1 md:grid-cols-3">
      {data.map(({ _id, budgetAmount, actualSpent, category, month }, i) => (
        <Card className="@container/card" key={i}>
          <CardHeader className="relative">
            <CardDescription>Budget ({month})</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              ₹{budgetAmount}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge
                onClick={(e) => deleteBudget(_id)}
                variant="outline"
                className="flex gap-1 rounded-lg text-xs p-2 hover:bg-secondary"
              >
                <Trash2Icon className="size-4" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {actualSpent} / {budgetAmount} spent
            </div>
            <Progress value={(actualSpent / budgetAmount) * 100} />
            <div className="text-muted-foreground">
              You’ve used {(actualSpent / budgetAmount) * 100}% of your{" "}
              <strong>{category}</strong> budget
            </div>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
