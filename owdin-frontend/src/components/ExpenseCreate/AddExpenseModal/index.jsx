import { useState } from "react";
import SelectSearch from "./SelectSearch";
import { useDispatch, useSelector } from "react-redux";
import { createExpenseRequest } from "../../../features/expense";
import { validateExpense } from "../../../app/utils";
import { selectAllUsers } from "../../../features/auth/selectors";


const AddExpenseModal = ({closeModal}) => {
  const users = useSelector(selectAllUsers);
  const initialState = { description: "", amount: 0, split: {} };
  const [expense, setExpense] = useState(initialState);
  const [selectedUsers, setSelectedUsers] = useState(new Set([]));
  const [validationError,setValidationError] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const toggleSelectedUser = (userId) => {
    setSelectedUsers((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.has(userId) ? newSet.delete(userId) : newSet.add(userId);
      return newSet;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSplit = {};
    selectedUsers.forEach((userId) => {
      newSplit[userId] = expense.amount / selectedUsers.size;
    });
    const error = validateExpense({...expense,split: newSplit})
    if(error){
      setValidationError(error)
      return
    }
    setExpense((prevExpense) => ({
      ...prevExpense,
      split: newSplit,
    }));
    dispatch(createExpenseRequest({...expense,split: newSplit}))
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-700">Add New Expense</h2>

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={expense.description}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={expense.amount}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <div className="text-gray-600 font-medium">Select Users to Split</div>

      <SelectSearch
        users={users}
        selectedUsers={selectedUsers}
        toggleSelectedUser={toggleSelectedUser}
      />

      <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
        {[...selectedUsers].map((userId) => (
          <li key={userId} className="flex justify-between items-center px-4 py-2">
            <span>{users[userId]}</span>
            <input
              type="number"
              value={expense.amount / selectedUsers.size || 0}
              disabled
              className="w-24 border border-gray-300 rounded-md px-2 py-1 bg-gray-50 text-right"
            />
          </li>
        ))}
      </ul>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit
      </button>
      {validationError && <p className="text-red-600 text-center">
        {validationError}
      </p>}
    </form>
  );
};

export default AddExpenseModal;
