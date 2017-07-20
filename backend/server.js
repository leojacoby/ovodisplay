const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const dbRoutes = require('./routes/databaseAccess.js')

app.use(express.static('build'));
app.use(bodyParser.json())
app.use('/db', dbRoutes)

app.listen(3000, () => {
  console.log("Server connected and paying attention on port 3000");
})
