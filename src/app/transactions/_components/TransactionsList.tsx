"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type data = [
  {
    _id: string;
    category: string;
    description: string;
    amount: number;
    date: string;
  }
];

interface renderProps {
  render: boolean;
}

function TransactionsList({ render }: renderProps) {
  const [transactions, setTransactions] = useState<data>([
    {
      _id: "",
      category: "",
      description: "",
      amount: 0,
      date: "",
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    amount: 0,
    description: "",
    category: "",
    date: "",
  });

  const [change, setChange] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/transaction");
        setTransactions(res.data);
        setLoading(false);
      } catch (error: any) {
        const i = error?.response?.data?.error;
        {
          i && toast.error(i);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [render, change]);

  async function deleteTransaction(id: string) {
    const res = await axios.delete(`/api/transaction/${id}`);

    if (res.data.message === "Transaction deleted") {
      setChange(!change);
      toast.success("Transaction deleted");
    }
  }

  async function handleUpdate(id: string) {
    try {
      const res = await axios.put(`/api/transaction/${id}`, editData);
      if (res.data.message === "Transaction updated") {
        setChange(!change);
        toast.success("Transaction updated");
        setEditingId(null);
      }
    } catch (err: any) {
      console.log(err);
      const msg = err.response?.data?.message || "Failed to update transaction";
      toast.error(msg);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  return (
    <section className="w-[100%]">
      <Table className="w-full">
        <TableCaption>your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(({ _id, category, description, amount, date }) => (
            <TableRow key={_id}>
              {editingId === _id ? (
                <>
                  <TableCell className="font-medium">
                    <input
                      type="date"
                      placeholder="edit date"
                      className="border rounded px-2 py-1 w-full"
                      value={editData.date}
                      onChange={(e) =>
                        setEditData({ ...editData, date: e.target.value })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="edit description"
                      className="border rounded px-2 py-1 w-full"
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      placeholder="edit amount"
                      className="border rounded px-2 py-1 w-full"
                      value={editData.amount}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          amount: Number(e.target.value),
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={category}
                      onValueChange={(e) => {
                        setEditData({ ...editData, category: e });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="entertainment">
                          Entertainment
                        </SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="space-x-1 text-right">
                    <Button onClick={() => handleUpdate(_id)} variant="default">
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingId(null)}
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="font-medium">
                    {date.split("T")[0]}
                  </TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>{amount}</TableCell>
                  <TableCell>{category}</TableCell>
                  <TableCell className="text-right space-x-1 py-2">
                    <Button
                      onClick={() => {
                        setEditingId(_id);
                        setEditData({
                          amount,
                          description,
                          category,
                          date: date.split("T")[0],
                        });
                      }}
                      variant="outline"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteTransaction(_id)}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default TransactionsList;
