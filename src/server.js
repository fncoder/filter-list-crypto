const express = require('express')
const app = express();

const staticFiles = __dirname + './../dist';

app.use(express.static(staticFiles));

const port = process.env.PORT || 3001

app.listen(port)
