"use client";

import { useState } from "react";
import { Expense } from "@/types/expense";

interface ExpenseFormProps {
    onAddExpense: (expense: Expense) => void;
}

const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        amount: "",
        date: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newExpense: Expense = {
            title: formData.title,
            category: formData.category,
            amount: Number(formData.amount),
            date: formData.date,
        };

        onAddExpense(newExpense);

        setFormData({
            title: "",
            category: "",
            amount: "",
            date: "",
        });
    };

    return (
        <aside className="h-screen border-r bg-white p-6 flex flex-col">

            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">
                    Expense Tracker
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage your daily spending
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    placeholder="Expense title"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />

                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />

                <button
                    type="submit"
                    className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:opacity-90"
                >
                    Add Expense
                </button>
            </form>

            {/* pie chart পরে এখানে বসবে */}
            <div className="mt-10">
                Pie Chart Here
            </div>

        </aside>
    );
};

export default ExpenseForm;