"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";

const schema = z.object({
  category: z.string().min(1, "Category is required"),
  month: z.string().regex(/^\d{4}-\d{2}$/, "Month must be in YYYY-MM format"),
  budgetAmount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Enter a valid budget amount",
    }),
});

interface budgetFormProps {
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BudgetForm({ render, setRender }: budgetFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "",
      month: new Date().toISOString().slice(0, 7),
      budgetAmount: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      console.log("Saving budget:", values);
      const res = await axios.post("/api/budget", values);

      if (res.data.message === "Budget saved") {
        setRender(!render);
        toast.success("Budget saved successfully!");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err: any) {
      if (err.response && err.response.data?.error) {
        toast.error(`${err.response.data.error}`);
      } else {
        toast.error(" Failed to save budget. Please try again.");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-8 rounded-lg"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
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

        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Month (YYYY-MM)</FormLabel>
              <FormControl>
                <Input type="month" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budgetAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Amount (₹)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="5000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Set Budget</Button>
      </form>
    </Form>
  );
}
