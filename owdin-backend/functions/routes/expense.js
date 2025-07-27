const {v4:uuidv4} = require("uuid")
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const express = require("express");

const router = express.Router();

router.get("/getExpense", async (req, res) => {
  // Get all expense for user
  let expenses;
  try {
    const expensesSnapshot = await getFirestore().collection("expense").get();
    expenses = expensesSnapshot.docs.map((doc) => doc.data());
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Database error while fetching expenses" });
  }
  return res.status(200).json(expenses);
});

router.post("/createExpense", async (req, res) => {
  const { amount, description, split } = req.body;
  // Creating expense doc to write
  const expenseId = uuidv4();

  const expenseDoc = {
    id: expenseId,
    description,
    amount,
    lenderId: req.user.uid,
    lendees: Object.entries(split).map(([key, value]) => ({
      userId: key,
      share: value,
    })),
    createdAt: Timestamp.now(),
  };

  // Writing the expense doc in expense collection
  const writeExpenseDoc = await getFirestore()
    .collection("expense")
    .add(expenseDoc);

  // Writing individual entries of expense in lend collection
  for (const [lendee, value] of Object.entries(split)) {
    const lendDoc = {
      id: expenseId,
      amount: value,
      lendorId: req.user.uid,
      lendeeId: lendee,
      createdAt: Timestamp.now(),
    };
    const writeLendDoc = await getFirestore().collection("lend").add(lendDoc);
  }
  return res.status(200).json({ message: "Expense written to db" });
});

module.exports = router
