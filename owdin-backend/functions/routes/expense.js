const { v4: uuidv4 } = require("uuid");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const express = require("express");

const router = express.Router();

router.get("/getExpense", async (req, res) => {
  try {
    // Get all expenses for user
    const expensesSnapshot = await getFirestore().collection("expense").get();
    const expenses = expensesSnapshot.docs.map((doc) => doc.data());
    return res.status(200).json(expenses);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/createExpense", async (req, res) => {
  const { amount, description, split } = req.body;
  const userId = req.user.uid;
  if (!amount || !split) {
    return res
      .status(400)
      .json({ error: "One or more fields is missing in request" });
  }

  try {
    // Creating expense doc to write
    const expenseId = uuidv4(); // Unique Id for this expense
    const expenseDoc = {
      id: expenseId,
      description,
      amount,
      lenderId: userId,
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
      return res.status(200).json({ result: "Expense Created" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
