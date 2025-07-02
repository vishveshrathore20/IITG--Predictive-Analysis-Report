const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  employees: [{ name: String, designation: String, location: String }],
  attendance: [{
    date: String,
    presentNames: [String]
  }]
});

module.exports = mongoose.model('Company', companySchema);
