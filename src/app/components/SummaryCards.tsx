"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { log } from "console";
import { TrendingUpIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

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

interface SummaryCardsProps {
  totalexpense: number;
  expensethismonth: number;
}

export default function SummaryCards({
  totalexpense,
  expensethismonth,
}: SummaryCardsProps) {
  return (
    <section className="grid gap-2 grid-cols-1 md:grid-cols-2">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Expenses</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            ₹{totalexpense}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>
            Expenses in {monthNames[new Date().getMonth()]}
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            ₹{expensethismonth}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
    </section>
  );
}
