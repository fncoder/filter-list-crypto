const express = require('express')
const app = express();

app.use(express.static(__dirname + '/static'));

const port = process.env.PORT || 3001

app.listen(port)
