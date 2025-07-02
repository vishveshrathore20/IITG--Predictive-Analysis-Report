const express = require('express');
const router = express.Router();
const Company = require('../company');

// Add company
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const exists = await Company.findOne({ name });
    if (exists) return res.status(400).json({ message: 'Company already exists' });
    const newCompany = new Company({ name, employees: [], attendance: [] });
    await newCompany.save();
    res.status(201).json({ message: 'Company added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all company names
router.get('/', async (req, res) => {
  const companies = await Company.find({}, 'name');
  res.json(companies);
});

// Get full data of one company
router.get('/:name', async (req, res) => {
  const company = await Company.findOne({ name: req.params.name });
  if (!company) return res.status(404).json({ message: "Company not found" });
  res.json(company);
});

// Upload today's attendance
router.post('/attendance/:name', async (req, res) => {
  const { date, todaySheet } = req.body;
  const company = await Company.findOne({ name: req.params.name });
  if (!company) return res.status(404).json({ message: "Company not found" });

  // Add new employees if not already present
  todaySheet.forEach(emp => {
    const exists = company.employees.find(e => e.name === emp.name);
    if (!exists) company.employees.push(emp);
  });

  // Store attendance
  const presentNames = todaySheet.map(e => e.name);
  company.attendance.push({ date, presentNames });
  await company.save();

  res.json({ message: "Attendance saved successfully" });
});

module.exports = router;
