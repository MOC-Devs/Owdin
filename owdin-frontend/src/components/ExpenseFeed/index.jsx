import {useSelector } from "react-redux";
import ExpenseCard from "./ExpenseCard";
import { selectExpenses } from "../../features/expense/selector";
const ExpenseFeed = () => {
    const expenses = useSelector(selectExpenses)

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