"use client";

import { Expense } from "@/types/expense";
import { Trash2, Pencil } from "lucide-react";

interface ExpenseTableProps {
    expenses: Expense[];
    onDeleteExpense: (id: string) => void;
    onEditExpense: (expense: Expense) => void;
}

export default function ExpenseTable({
    expenses,
    onDeleteExpense,
    onEditExpense,
}: ExpenseTableProps) {
    return (
        <div className="rounded-3xl bg-white p-6 shadow-md border border-slate-100">

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">
                    Expense History
                </h2>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-500">
                    {expenses.length} Items
                </span>
            </div>

            {expenses.length === 0 ? (
                <div className="py-10 text-center text-slate-400">
                    No expenses added yet
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">

                        <thead>
                            <tr className="border-b text-left text-sm text-slate-500">
                                <th className="pb-4">Title</th>
                                <th className="pb-4">Category</th>
                                <th className="pb-4">Date</th>
                                <th className="pb-4">Amount</th>
                                <th className="pb-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {expenses.map((expense) => (
                                <tr
                                    key={expense._id}
                                    className="border-b border-slate-100 hover:bg-slate-50"
                                >
                                    <td className="py-4 font-medium">
                                        {expense.title}
                                    </td>

                                    <td className="py-4">
                                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-600">
                                            {expense.category}
                                        </span>
                                    </td>

                                    <td className="py-4 text-slate-500">
                                        {expense.date}
                                    </td>

                                    <td className="py-4 font-semibold text-red-500">
                                        - ৳ {expense.amount}
                                    </td>

                                    <td className="py-4 flex gap-2">

                                        <button
                                            onClick={() => onEditExpense(expense)}
                                            className="rounded-lg p-2 hover:bg-blue-50"
                                        >
                                            <Pencil size={18} className="text-blue-500" />
                                        </button>

                                        <button
                                            onClick={() =>
                                                expense._id &&
                                                onDeleteExpense(expense._id)
                                            }
                                            className="rounded-lg p-2 hover:bg-red-50"
                                        >
                                            <Trash2 size={18} className="text-red-500" />
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
}