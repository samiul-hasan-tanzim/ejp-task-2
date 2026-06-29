interface BalanceCardProps {
    balance: number;
}

const BalanceCard = ({ balance }: BalanceCardProps) => {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 shadow-xl">

            {/* background blur */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

            <div className="relative z-10">

                <p className="text-sm font-medium uppercase tracking-wider text-indigo-100">
                    Remaining Balance
                </p>

                <h1 className="mt-3 text-5xl font-bold text-white">
                    ৳ {balance.toLocaleString()}
                </h1>

                <p className="mt-4 text-sm text-indigo-100">
                    Available amount after expenses
                </p>

            </div>
        </div>
    );
};

export default BalanceCard;