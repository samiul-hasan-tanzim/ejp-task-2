interface BalanceCardProps {
    balance: number;
}

const BalanceCard = ({ balance }: BalanceCardProps) => {
    return (
        <div className="border rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-500 mb-2">
                Remaining Balance
            </p>

            <h1 className="text-4xl font-bold">
                ৳ {balance.toLocaleString()}
            </h1>
        </div>
    );
};

export default BalanceCard;