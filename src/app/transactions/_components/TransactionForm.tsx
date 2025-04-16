"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a number greater than 0",
  }),
  date: z.string({
    required_error: "A date is required",
  }),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters",
    })
    .max(50, {
      message: "Description must be less than 50 characters",
    }),
  category: z.string({
    required_error: "Please select a category",
  }),
});

interface renderProps {
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TransactionForm({ setRender, render }: renderProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      date: new Date().toISOString().split("T")[0], // yyyy-mm-dd format
      description: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post("api/transaction", values);
    if (res.data.message === "Transaction created") {
      form.reset();
      toast("Transaction created");
      setRender(!render);
    } else {
      toast("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-8"
      >
        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="E.g. Grocery shopping" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add Transaction</Button>
      </form>
    </Form>
  );
}
