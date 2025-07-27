import { getAuth, onAuthStateChanged } from "firebase/auth";

export const balanceInAnExpense = (expense, userId) => {
  let balance = 0;
  if (expense.lenderId === userId) {
    balance = expense.amount;
  }
  for (let split of expense.lendees) {
    if (split.userId === userId) {
      balance -= split.share;
    }
  }
  return balance;
};

export const filterUsers = (searchPrefix, users) =>
  Object.entries(users).filter(([userId, displayName]) =>
    displayName.toLowerCase().startsWith(searchPrefix.toLowerCase())
  );

export const convertToIntlDate = (timestamp) => {
  const date = new Date(timestamp._seconds * 1000);
  const formatted = new Intl.DateTimeFormat('en-US',{
    hour: "numeric",
    minute: "2-digit",
    day: "2-digit",
    month: "long"
  }).format(date);
  return formatted;
};

export const validateExpense = (expense)=>{
  if(!expense.description){
    return "Description should not be empty"
  }
  if(expense.amount<=0){
    return "Amount should be a positive number"
  }
  if(expense.split && !Object.keys(expense.split).length){
    return "Split among at least 1 people"
  }
  return null
}
