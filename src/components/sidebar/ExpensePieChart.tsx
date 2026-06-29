"use client";

import { useEffect, useState } from "react";
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
    onUpdateExpense: (id: string, expense: Expense) => Promise<void> | void;
    editingExpense: Expense | null;
}

const COLORS = ["#4F46E5", "#7C3AED", "#EC4899", "#14B8A6"];

export default function ExpenseSidebar({
    expenses,
    onAddExpense,
    onUpdateExpense,
    editingExpense,
}: ExpenseSidebarProps) {

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        amount: "",
        date: "",
    });

    // 🔥 when click edit → fill form
    useEffect(() => {
        if (editingExpense) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                title: editingExpense.title,
                category: editingExpense.category,
                amount: String(editingExpense.amount),
                date: editingExpense.date,
            });
        }
    }, [editingExpense]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data: Expense = {
            title: formData.title,
            category: formData.category,
            amount: Number(formData.amount),
            date: formData.date,
        };

        if (editingExpense && editingExpense._id) {
            await onUpdateExpense(editingExpense._id, data);
        } else {
            await onAddExpense(data);
        }

        setFormData({
            title: "",
            category: "",
            amount: "",
            date: "",
        });
    };

    const groupedData = expenses.reduce((acc: Record<string, number>, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    const chartData = Object.entries(groupedData).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <aside className="h-screen overflow-y-auto p-6 border-r bg-white flex flex-col">

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Title"
                    className="input"
                />

                <input
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Category"
                    className="input"
                />

                <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                    }
                    placeholder="Amount"
                    className="input"
                />

                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                    }
                    className="input"
                />

                <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl w-full">
                    {editingExpense ? "Update Expense" : "Add Expense"}
                </button>

            </form>

            <div className="mt-8 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={chartData} dataKey="value" outerRadius={80}>
                            {chartData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </aside>
    );
}