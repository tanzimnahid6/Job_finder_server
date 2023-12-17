const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  }
});

const Job = mongoose.model('jobFinder', jobSchema ,'job');

module.exports = Job;
