const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/save", (req, res) => {
  const url =
    "mongodb+srv://beherarohit752:xGMBbX3grAHuxZJ8@cluster0.qu5fhmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(url);
  const db = client.db("sms26june24");
  const coll = db.collection("student");
  const record = {
    _id: req.body.rno, //data recieved in the request
    name: req.body.name,
    marks: req.body.marks,
  };
  coll
    .insertOne(record) //Inserts the record object into the student
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

// Fetches all doc from the "stud" collect's in MongoDb & then convert into an array..
app.get("/gs", (req, res) => {
  const url =
    "mongodb+srv://beherarohit752:xGMBbX3grAHuxZJ8@cluster0.qu5fhmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(url);
  const db = client.db("sms26june24");
  const coll = db.collection("student");
  coll
    .find({}) //Retrieve All Document from the "student" coll. {} means there is no spcific cond applied.
    .toArray() //Convert Fetch docum into an array
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

// Delete
app.delete("/rs", (req, res) => {
  const url =
    "mongodb+srv://beherarohit752:xGMBbX3grAHuxZJ8@cluster0.qu5fhmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  // Help to connect and interact with monogodb DataBase
  const client = new MongoClient(url);
  // selects the "sms26june24" database to work on it
  const db = client.db("sms26june24");
  // Accessing the "student" collection within the "sms26.." db.
  const coll = db.collection("student");
  const record = {
    _id: req.body.rno,
  };
  coll.deleteOne(record);
  coll
    .insertOne(record)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

app.put("/us", (req, res) => {
  const url =
    "mongodb+srv://beherarohit752:xGMBbX3grAHuxZJ8@cluster0.qu5fhmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster07";
  const client = new MongoClient(url);
  const db = client.db("sms26june24");
  const coll = db.collection("student");
  const whom = { _id: req.body.rno };
  const what = { $set: { name: req.body.name, marks: req.body.marks } };
  coll
    .updateOne(whom, what)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

app.listen(9000, () => {
  console.log("ready @9000");
});
