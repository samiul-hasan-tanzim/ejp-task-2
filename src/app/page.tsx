"use client";

import { useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import BalanceCard from "@/components/BalanceCard";
import ExpenseTable from "@/components/ExpenseTable";
import { Expense } from "@/types/expense";

export default function Home() {
  const [balance, setBalance] = useState(50000);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = (expense: Expense) => {
    // add new expense
    setExpenses((prev) => [...prev, expense]);

    // minus balance
    setBalance((prev) => prev - expense.amount);
  };

  return (
    <main className="grid grid-cols-12 min-h-screen">

      {/* Left Side → Form */}
      <section className="col-span-3 border-r p-6">
        <ExpenseForm onAddExpense={handleAddExpense} />
      </section>

      {/* Right Side */}
      <section className="col-span-9 p-6 space-y-6">

        {/* Balance */}
        <BalanceCard balance={balance} />

        {/* Expense List */}
        <ExpenseTable expenses={expenses} />

      </section>

    </main>
  );
}