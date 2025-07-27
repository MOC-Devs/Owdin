import { useDispatch, useSelector } from "react-redux";
import ExpenseCard from "./ExpenseCard";
import { selectExpenses } from "../../features/expense/selector";
import { useEffect } from "react";
import { selectAuthUser } from "../../features/auth/selectors";
import { fetchExpensesRequest } from "../../features/expense";

const ExpenseFeed = () => {
    const user = useSelector(selectAuthUser)
    const expenses = useSelector(selectExpenses)
    const dispatch = useDispatch()

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