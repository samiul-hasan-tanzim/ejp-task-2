export interface Expense {
    _id?: string;   // mongodb id
    title: string;
    category: string;
    amount: number;
    date: string;
}