"use client";

import { useEffect, useState } from "react";
// import ExpenseSidebar from "@/components/sidebar/ExpenseSidebar";
import BalanceCard from "@/components/dashboard/BalanceCard";
import ExpenseTable from "@/components/dashboard/ExpenseTable";
import { Expense } from "@/types/expense";
import ExpenseSidebar from "@/components/sidebar/ExpensePieChart";

const API_URL = "http://localhost:5000";

export default function HomePage() {
  const [initialBalance] = useState(50000);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // edit state
  const [editingExpense, setEditingExpense] =
    useState<Expense | null>(null);

  // GET
  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${API_URL}/expenses`);
      const data = await res.json();

      if (data.success) {
        setExpenses(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // POST
  const handleAddExpense = async (expense: Expense) => {
    try {
      const res = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...expense,
          createdAt: new Date(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        fetchExpenses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const handleDeleteExpense = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/expenses/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        fetchExpenses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // PATCH
  const handleUpdateExpense = async (
    id: string,
    updatedExpense: Expense
  ) => {
    try {
      const res = await fetch(
        `${API_URL}/expenses/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExpense),
        }
      );

      const data = await res.json();

      if (data.success) {
        fetchExpenses();
        setEditingExpense(null); // reset edit mode
      }
    } catch (error) {
      console.log(error);
    }
  };

  // when click edit button
  const handleEditClick = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const balance =
    initialBalance -
    expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

  return (
    <main className="grid min-h-screen grid-cols-12 bg-slate-50">

      <section className="col-span-3">
        <ExpenseSidebar
          expenses={expenses}
          onAddExpense={handleAddExpense}
          onUpdateExpense={handleUpdateExpense}
          editingExpense={editingExpense}
        />
      </section>

      <section className="col-span-9 p-8 space-y-8">

        <BalanceCard balance={balance} />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ExpenseTable
            expenses={expenses}
            onDeleteExpense={handleDeleteExpense}
            onEditExpense={handleEditClick}
          />
        )}

      </section>

    </main>
  );
}