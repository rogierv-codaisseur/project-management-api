const express = require('express');
const bodyParser = require('body-parser');

const authRouter = require('./auth/routes');
const projectRouter = require('./projects/routes');
const todoRouter = require('./todos/routes');
const userRouter = require('./users/routes');

const app = express();
const port = process.env.PORT || 4000;

app
  .use(bodyParser.json())
  .use(authRouter)
  .use(projectRouter)
  .use(todoRouter)
  .use(userRouter)
  .listen(port, () => console.log(`Listening on port ${port}`));
