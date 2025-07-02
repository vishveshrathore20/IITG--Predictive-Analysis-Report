const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require("./DB");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`✅ Resume Parser running at http://localhost:${PORT}`);
});

const companyRoutes = require('./routes/company');
app.use('/api/company', companyRoutes);

connectDB();