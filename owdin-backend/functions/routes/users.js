const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const express = require("express");

const router = express.Router();

router.get("/getAllUsers", async (req, res) => {
  try {
    const usersSnapshot = await getFirestore().collection("users").get();
    const users = Object.fromEntries(
      usersSnapshot.docs.map((doc) => [doc.data().userId, doc.data().name])
    );
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getUserById", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "User ID is not present in request" });
  }
  try {
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
    return res.status(200).json({ userData });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/createUser", async (req, res) => {
  const { name, email } = req.body;
  const { userId } = req.user.uid;
  if (!name || !email) {
    return res.status(400).json({ error: "One or more fields is missing in request" });
  }
  const newUserDoc = {
    userId,
    name,
    email,
    createdAt: Timestamp.now(),
  };

  try {
    // Creating User only when it does not already exists
    const querySnapshot = await getFirestore()
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (!querySnapshot.empty) {
      return res.status(200).json({ result: "User already exists" });
    } else {
      await getFirestore().collection("users").add(newUserDoc);
      return res.status(200).json({ result: "User created" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
