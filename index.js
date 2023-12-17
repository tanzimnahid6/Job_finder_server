const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const cors = require('cors') 
app.use(cors())





//connect mongodb
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://tanzimnahid6:pzInYUaN0bMm8b4l@cluster0.vejx43y.mongodb.net/jobFinder?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
const Job = require("./models");

//get all jobs from db==============
app.get("/jobs", async (req, res) => {
  const jobs = await Job.find({});
  res.send(jobs);
});
//get Single Job from db===========
app.get("/jobs/:id", async (req, res) => {
  const id = req.params.id;
  const job = await Job.findOne({ _id: id }).exec();
  res.send(job);
});

//create single job===============
app.post("/jobs", async (req, res) => {
  const body = req.body;
  const postedJob = await Job.create(body);
  res.send(postedJob);
});
//delete single job===============
app.delete("/jobs/:id", async (req, res) => {
  const id = req.params.id;

  const deletedJob = await Job.findByIdAndDelete(id);
  res.send(deletedJob);
});
//update singleJob===============
app.patch("/jobs/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const filter = { _id: id };
  const updatedJob = await Job.findOneAndUpdate(filter, body);
  res.send(updatedJob);
});

app.get("/", (req, res) => {
  res.send("Hello job finder server!");
});

app.listen(port, () => {
  console.log(`Server is listening on port  ${port}`);
});
