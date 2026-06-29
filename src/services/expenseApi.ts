const API_URL = "https://ejp-task-2-server.vercel.app";


// create
export const createExpense = async (data: any) => {
    const res = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
};


// get all
export const getExpenses = async () => {
    const res = await fetch(`${API_URL}/expenses`);

    return res.json();
};


// delete
export const deleteExpense = async (id: string) => {
    const res = await fetch(`${API_URL}/expenses/${id}`, {
        method: "DELETE",
    });

    return res.json();
};