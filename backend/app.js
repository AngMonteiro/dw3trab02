//-- arquivo: app.js
const express = require('express');
require('dotenv').config({ quiet: true });
const router = require('./routes/router');
const app = express();
const port = 40000;

// Configuração do CORS (front-end roda em outra porta)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
