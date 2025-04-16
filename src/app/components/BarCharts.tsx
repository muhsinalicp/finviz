"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarChartProps {
  chartData: {
    month: string;
    amount: number;
  }[];
}

const chartConfig = {
  desktop: {
    label: "amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const date = new Date();

export function BarChartLabel({ chartData }: BarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Expenses</CardTitle>
        <CardDescription>
          January {date.getFullYear()} - {chartData[chartData.length - 1].month}{" "}
          {date.getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="amount" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
