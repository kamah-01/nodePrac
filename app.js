const express = require('express');
const bodyParser = require('body-parser');
const registerRoutes = require('./routes/registerServe');
const loginRoutes = require('./routes/loginServe');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.use(registerRoutes);
app.use(loginRoutes);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

module.exports = app;