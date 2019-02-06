const express = require('express');
const bodyParser = require('body-parser');

const todoRouter = require('./todos/routes');
const projectRouter = require('./projects/routes');

const app = express();
const port = process.env.PORT || 4000;

app
  .use(bodyParser.json())
  .use(todoRouter)
  .use(projectRouter)
  .listen(port, () => console.log(`Listening on port ${port}`));
