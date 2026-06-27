"use client";

import { useState } from "react";
import { Expense } from "@/types/expense";

interface ExpenseFormProps {
    onAddExpense: (expense: Expense) => void;
}

const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !category || !amount || !date) {
            return;
        }

        const newExpense: Expense = {
            id: Date.now().toString(),
            title,
            category,
            amount: Number(amount),
            date,
        };

        onAddExpense(newExpense);

        // reset form
        setTitle("");
        setCategory("");
        setAmount("");
        setDate("");
    };

    return (
        <div className="h-full">
            <h2 className="text-2xl font-bold mb-6">Add Expense</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Expense Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border p-3 rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;