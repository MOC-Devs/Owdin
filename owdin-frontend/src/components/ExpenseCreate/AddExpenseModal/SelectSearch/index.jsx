import { useState } from "react";
import { filterUsers } from "../../../../app/utils";

const SelectSearch = ({ users, selectedUsers, toggleSelectedUser }) => {
  const [searchPrefix, setSearchPrefix] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const filteredUsers = filterUsers(searchPrefix, users);

  return (
    <div
      className="w-full max-w-sm focus-within:z-10"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <input
        type="text"
        onChange={(e) => setSearchPrefix(e.target.value)}
        value={searchPrefix}
        placeholder="Select Users"
        className="border border-gray-300 w-full rounded-lg py-2 px-4 focus:outline-none  focus:ring-2 focus:ring-blue-500"
      />
      {isFocused && (
        <div className=" bg-white border border-gray-200 rounded-lg shadow-md z-10 max-h-60 overflow-y-auto">
          {filteredUsers.map(([userId, displayName]) => (
            <div key={userId}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  toggleSelectedUser(userId);
                }}
                className={`w-full border-1 border-t-0 border-gray-400 ${
                  selectedUsers.has(userId) ? "bg-green-300" : ""
                }`}
              >
                {displayName}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectSearch;
