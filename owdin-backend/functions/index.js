// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const validateFirebaseIdToken = require("./middleware/authMiddleware");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");

const cors = require("cors");
const express = require('express')
const expenseRoutes = require('./routes/expense')
const userRoutes = require("./routes/users")

const app = express()
app.use(cors());
app.options('*', cors()); // Handles preflight for every route

// app.use(express.json());       // JSON body parser
app.use(validateFirebaseIdToken)
app.use("/expense",expenseRoutes)
app.use("/users",userRoutes)

initializeApp();

exports.owdin = onRequest(app)