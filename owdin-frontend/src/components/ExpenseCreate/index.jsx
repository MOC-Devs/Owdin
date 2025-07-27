import { useState } from "react";
import AddExpenseModal from "./AddExpenseModal";

const ExpenseCreate = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col justify-end items-center p-6">
      {/* Create Button */}
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        onClick={() => setShowModal(true)}
      >
        Create Expense
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-5 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
            <AddExpenseModal closeModal={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCreate;
