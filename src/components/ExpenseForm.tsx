"use client";

import { useState } from "react";
import { Expense } from "@/types/expense";

interface ExpenseFormProps {
    onAddExpense: (expense: Expense) => Promise<void> | void;
}

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newExpense: Expense = {
            title,
            category,
            amount: Number(amount),
            date,
        };

        await onAddExpense(newExpense);

        // reset form
        setTitle("");
        setCategory("");
        setAmount("");
        setDate("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <input
                type="text"
                placeholder="Expense title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                required
            />

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                required
            />

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                required
            />

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                required
            />

            <button
                type="submit"
                className="w-full rounded-2xl bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700"
            >
                Add Expense
            </button>

        </form>
    );
}