"use client";
import { useState } from "react";
import BudgetCards from "./_components/BudgetCards";
import BudgetForm from "./_components/BudgetForm";

function page() {
  const [render, setRender] = useState(false);

  return (
    <section className="py-8 pr-8 w-full space-y-6">
      <BudgetForm render={render} setRender={setRender} />
      <BudgetCards render={render} />
    </section>
  );
}

export default page;
