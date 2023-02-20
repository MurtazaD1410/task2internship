// imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

// middlewares
const app = express();
mongoose.set("strictQuery", true);

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

const Customer = require("./CustomerSchema");
const Transaction = require("./TransferSchema");

// db connect
const connectionURL =
  "mongodb+srv://admin:admin@cluster0.r1zjv0c.mongodb.net/bankingDB?retryWrites=true&w=majority";

mongoose
  .connect(connectionURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

// apis

// cutomer collection connection
app.get("/customersdata", async (req, res) => {
  try {
    const data = await Customer.find({});
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/customer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Customer.findById(id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.post("/transaction/new", async (req, res) => {
  const { from, to, amount } = req.body;
  try {
    const fromCust = await Customer.findById(from);
    const toCust = await Customer.findById(to);
    if (fromCust.balance < amount)
      return res.status(400).send("Amount greater than balance");
    fromCust.balance -= amount;
    toCust.balance += amount;
    await fromCust.save();
    await toCust.save();
    const newData = await Transaction.create({
      from,
      to,
      amount,
    });
    newData = await newData.populate("from to");
    res.status(200).json(newData);
  } catch (e) {
    console.log(e.message);
  }
});

// transfer collection connection

app.get("/transferdata", async (req, res) => {
  try {
    const data2 = await Transaction.find({}).populate("from to");
    res.status(200).json(data2);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

// listening
app.listen(PORT, () => {
  console.log(`listing to PORT ${PORT} `);
});
