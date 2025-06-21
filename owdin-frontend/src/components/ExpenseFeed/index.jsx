import ExpenseCard from "./ExpenseCard";

const expenses = [
    {
        id: 'exp1',
        timestamp: '2025-06-19T10:30:00Z',
        lenderId: 'user_001', // You
        amount: 1200,
        lendees: [
            { userId: 'user_002', share: 400 },
            { userId: 'user_003', share: 400 },
            { userId: 'user_004', share: 400 },
        ],
    },
    {
        id: 'exp2',
        timestamp: '2025-06-18T20:15:00Z',
        lenderId: 'user_003',
        amount: 900,
        lendees: [
            { userId: 'user_001', share: 300 },
            { userId: 'user_002', share: 300 },
            { userId: 'user_003', share: 300 },
        ],
    },
    {
        id: 'exp3',
        timestamp: '2025-06-17T14:00:00Z',
        lenderId: 'user_002',
        amount: 600,
        lendees: [
            { userId: 'user_001', share: 200 },
            { userId: 'user_002', share: 200 },
            { userId: 'user_004', share: 200 },
        ],
    },
    {
        id: 'exp4',
        timestamp: '2025-06-16T08:45:00Z',
        lenderId: 'user_004',
        amount: 400,
        lendees: [
            { userId: 'user_001', share: 133.33 },
            { userId: 'user_003', share: 133.33 },
            { userId: 'user_004', share: 133.34 },
        ],
    },
];
const userId = 'user_001';

const ExpenseFeed = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-6">
            <div className="w-full max-w-xl space-y-4">
                {
                    expenses.map(exp => <ExpenseCard expense={exp} />)
                }
            </div>

        </div>
    );
};

export default ExpenseFeed