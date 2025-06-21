export function balanceInAnExpense(expense, userId) {
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
}