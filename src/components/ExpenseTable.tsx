import { Expense } from "@/types/expense";

interface ExpenseTableProps {
    expenses: Expense[];
}

const ExpenseTable = ({ expenses }: ExpenseTableProps) => {
    return (
        <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">
                Expense History
            </h2>

            {expenses.length === 0 ? (
                <p className="text-gray-500">
                    No expenses added yet.
                </p>
            ) : (
                <table className="w-full text-left">
                    <thead className="border-b">
                        <tr>
                            <th className="py-3">Name</th>
                            <th className="py-3">Category</th>
                            <th className="py-3">Date</th>
                            <th className="py-3">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="border-b">
                                <td className="py-3">{expense.title}</td>

                                <td className="py-3">
                                    {expense.category}
                                </td>

                                <td className="py-3">
                                    {expense.date}
                                </td>

                                <td className="py-3">
                                    ৳ {expense.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ExpenseTable;