const express = require('express')
const route = require('./src/routes/index.js')

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(route)

app.listen(port)

console.log('Sistema Rondando na Porta: ' + port)
