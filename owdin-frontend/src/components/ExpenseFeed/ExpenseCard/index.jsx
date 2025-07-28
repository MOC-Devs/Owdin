import { useSelector } from "react-redux";
import { balanceInAnExpense, convertToIntlDate } from "../../../app/utils"
import { selectAllUsers, selectAuthUser } from "../../../features/auth/selectors";

const ExpenseCard = ({ expense }) => {
    const users = useSelector(selectAllUsers)
    const {uid: userId} = useSelector(selectAuthUser)
    const balance = balanceInAnExpense(expense,userId);
    return (
        <div
            key={expense.id}
            className="bg-white shadow-md p-4 rounded-lg flex justify-between"
        >
            <div>
                <div className="text-gray-800 font-semibold">
                    User {users[expense.lenderId]} paid ₹{expense.amount}
                </div>
                <div className="text-sm text-gray-500">
                    Split with: {expense.lendees.map(l => users[l.userId]).join(', ')}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                    {convertToIntlDate(expense.createdAt)}
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div className="font-light text-sm">{balance>0?'You are owed ':'You owe '}</div>
                <div className="text-sm text-center">{balance}</div>
            </div>
        </div>
    )
}

export default ExpenseCard