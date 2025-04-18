"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Trash2Icon, PencilIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { set } from "mongoose";

interface Budget {
  _id: string;
  budgetAmount: number;
  actualSpent: number;
  category: string;
  month: string;
}

interface BudgetCardsProps {
  render: boolean;
}

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

export default function BudgetCards({ render }: BudgetCardsProps) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [change, setChange] = useState(false);

  const [editing, setEditing] = useState<Budget | null>(null);
  const [newAmount, setNewAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Budget[]>("/api/budget")
      .then((res) => {
        setBudgets(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch budgets:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [change, render]);

  async function deleteBudget(id: string) {
    try {
      const res = await axios.delete(`/api/budget/${id}`);
      if (res.data.message === "Budget deleted successfully") {
        setChange((v) => !v);
        toast.success("Budget deleted");
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || "Failed to delete budget";
      toast.error(msg);
    }
  }

  async function saveEdit() {
    if (!editing) return;
    const amountNum = Number(newAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    try {
      const res = await axios.put(`/api/budget/${editing._id}`, {
        budgetAmount: amountNum,
      });
      if (res.data.message === "Budget updated") {
        toast.success("Budget updated");
        setChange((v) => !v);
        setEditing(null);
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || "Failed to update budget";
      toast.error(msg);
    }
  }

  if (loading) {
    return (
      <div className="flex  justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <section className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {budgets.map((b) => {
          const pct = Number(
            ((b.actualSpent / b.budgetAmount) * 100).toFixed(2)
          );
          const thisMonth = new Date().getMonth();
          return (
            <Card
              key={b._id}
              className={`@container/card ${pct >= 100 ? "bg-red-300" : ""} ${
                thisMonth > Number(b.month[6]) - 1 ? "bg-yellow-300" : ""
              } `}
            >
              <CardHeader className="relative">
                <CardDescription>
                  Budget of {b.category} for{" "}
                  {monthNames[Number(b.month[6]) - 1]} ({b.month.split("-")[0]})
                </CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums">
                  ₹{b.budgetAmount}
                </CardTitle>
                {thisMonth > Number(b.month[6]) - 1 && (
                  <CardTitle className="text-xl font-semibold tabular-nums">
                    Expired
                  </CardTitle>
                )}
                <div className="absolute top-4 right-4 flex space-x-1">
                  <Badge
                    variant="outline"
                    className="p-2 hover:bg-secondary cursor-pointer"
                    onClick={() => {
                      setEditing(b);
                      setNewAmount(String(b.budgetAmount));
                    }}
                  >
                    <PencilIcon size={14} />
                  </Badge>
                  <Badge
                    variant="outline"
                    className="p-2 hover:bg-secondary cursor-pointer"
                    onClick={() => deleteBudget(b._id)}
                  >
                    <Trash2Icon size={14} />
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="flex flex-col items-start gap-2 text-sm">
                <div className="font-medium">
                  {b.actualSpent} / {b.budgetAmount} spent
                </div>
                <Progress value={pct} />
                <div
                  className={`text-muted-foreground ${
                    pct >= 100 ? "text-black font-bold" : ""
                  }`}
                >
                  You’ve used {pct}% of your <strong>{b.category}</strong>{" "}
                  budget
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </section>

      {editing && (
        <Dialog open onOpenChange={(open) => !open && setEditing(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Edit Budget of {editing.category} in{" "}
                {monthNames[Number(editing.month[6])]}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 my-4">
              <label className="block text-sm font-medium">
                Budget Amount (₹)
              </label>
              <Input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                min={1}
              />
            </div>
            <DialogFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button onClick={saveEdit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
