"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BarChartLabel } from "./components/BarCharts";
import SummaryCards from "./components/SummaryCards";
import { PieCharts } from "./components/PieChart";
import LastTrans from "./components/LastTrans";
import { toast } from "sonner";
import { set } from "mongoose";

export default function Home() {
  const [data, setData] = useState({
    expensethismonth: 0,
    pieData: [
      {
        category: "",
        amount: 0,
        fill: "",
      },
    ],
    lasttransations: [
      {
        amount: 0,
        description: "",
        category: "",
        date: "",
      },
    ],
    totalexpense: 0,
    chartData: [
      { month: "January", amount: 0 },
      { month: "February", amount: 0 },
      { month: "March", amount: 0 },
      { month: "April", amount: 0 },
      { month: "May", amount: 0 },
      { month: "June", amount: 0 },
      { month: "July", amount: 0 },
      { month: "August", amount: 0 },
      { month: "September", amount: 0 },
      { month: "October", amount: 0 },
      { month: "November", amount: 0 },
      { month: "December", amount: 0 },
    ],
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchData = async () => {
        const res = await axios.get("/api/datas");
        setData(res.data);
        setLoading(false);
      };
      fetchData();
    } catch (error: any) {
      const mes = error?.response?.data?.error || "Failed to fetch data";
      toast.error(mes);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  return (
    <section className="py-8 pr-8 space-y-4">
      <SummaryCards
        totalexpense={data.totalexpense}
        expensethismonth={data.expensethismonth}
      />
      <BarChartLabel chartData={data.chartData} />
      <PieCharts pieData={data.pieData} />
      <LastTrans lasttransations={data.lasttransations} />
    </section>
  );
}
