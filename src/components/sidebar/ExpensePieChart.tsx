"use client";

import { useState } from "react";
import { Expense } from "@/types/expense";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

interface ExpenseSidebarProps {
    expenses: Expense[];
    onAddExpense: (expense: Expense) => Promise<void> | void;
}

const COLORS = ["#4F46E5", "#7C3AED", "#EC4899", "#14B8A6"];

export default function ExpenseSidebar({
    expenses,
    onAddExpense,
}: ExpenseSidebarProps) {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        amount: "",
        date: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newExpense: Expense = {
            title: formData.title,
            category: formData.category,
            amount: Number(formData.amount),
            date: formData.date,
        };

        await onAddExpense(newExpense);

        setFormData({
            title: "",
            category: "",
            amount: "",
            date: "",
        });
    };

    const groupedData = expenses.reduce(
        (acc: Record<string, number>, expense) => {
            acc[expense.category] =
                (acc[expense.category] || 0) + expense.amount;
            return acc;
        },
        {}
    );

    const chartData = Object.entries(groupedData).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <aside className="h-screen overflow-y-auto border-r bg-gradient-to-b from-slate-50 to-white p-6 flex flex-col">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">
                    Expense Tracker
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Track every spending
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Expense title"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            title: e.target.value,
                        })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            category: e.target.value,
                        })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            amount: e.target.value,
                        })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            date: e.target.value,
                        })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                    type="submit"
                    className="w-full rounded-2xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700"
                >
                    Add Expense
                </button>
            </form>

            <div className="mt-10 rounded-3xl bg-white p-4 shadow-md">
                <h3 className="mb-4 text-sm font-semibold text-slate-700">
                    Expense Distribution
                </h3>

                {chartData.length === 0 ? (
                    <p className="text-sm text-slate-400">
                        No expenses yet
                    </p>
                ) : (
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    outerRadius={85}
                                >
                                    {chartData.map((_, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </aside>
    );
}