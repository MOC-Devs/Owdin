import { useState } from "react";
import AddExpenseModal from "./AddExpenseModal";

const ExpenseCreate = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* Create Button */}
      <button
        className="fixed bottom-10 right-5 w-16 h-16 bg-green-500 rounded-full text-white text-3xl px-2 py-3 hover:bg-blue-700 transition"
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute text-2xl top-0.5 right-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
            <div className="">
              <AddExpenseModal closeModal={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCreate;
