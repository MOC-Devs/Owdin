const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const express = require("express");

const router = express.Router();

router.get("/getAllUsers", async (req, res) => {
  // Giving list of all users
  const usersSnapshot = await getFirestore().collection("users").get();

  const users = Object.fromEntries(
    usersSnapshot.docs.map((doc) => [doc.data().userId, doc.data().name])
  );
  return res.status(200).json(users);
});

router.get("/getUserById", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    res.status(400).json({ error: "Missing userId" });
    return;
  }
  const querySnapshot = await getFirestore()
    .collection("users")
    .where("userId", "==", userId)
    .limit(1)
    .get();
  if (querySnapshot.empty) {
    return res.status(404).json({ error: "User Not Found" });
  }
  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data();

  return res.status(200).json({ result: userData });
});

router.post("/createUser", async (req, res) => {
  const { userId, name, email } = req.body;
  const newUserDoc = {
    userId,
    name,
    email,
    createdAt: Timestamp.now(),
  };
  // Creating User only when it does not already exists
  const querySnapshot = await getFirestore()
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();
  if (querySnapshot.empty) {
    const writeResult = await getFirestore()
      .collection("users")
      .add(newUserDoc);
    return res.status(200).json({
      result: `User created with write id: ${writeResult.id}`,
    });
  }
  res.status(200).json({
    result: `User already exists`,
  });
});

module.exports = router