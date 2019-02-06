const { Router } = require('express');

const Todo = require('./model');
const auth = require('../auth/middleware');

const router = new Router();

router.get('/todos', (req, res, next) => {
  const limit = Math.min(25, req.query.limit) || 25;
  const offset = req.query.offset || 0;

  Promise.all([Todo.count(), Todo.findAll({ limit, offset })])
    .then(([total, todos]) => {
      res.status(201).send({ todos, total });
    })
    .catch(error => next(error));
});

router.get('/todos/:id', (req, res, next) => {
  Todo.findByPk(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({ message: 'Todo does not exist.' });
      }
      return res.status(201).send(todo);
    })
    .catch(error => next(error));
});

router.post('/todos', auth, (req, res, next) => {
  Todo.create(req.body)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({ message: 'Todo does not exist.' });
      }
      return res.status(201).send(todo);
    })
    .catch(error => next(error));
});

router.put('/todos/:id', auth, (req, res, next) => {
  Todo.findByPk(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({ message: 'Todo does not exist.' });
      }
      return todo.update(req.body).then(todo => res.status(201).send(todo));
    })
    .catch(error => next(error));
});

router.delete('/todos/:id', auth, (req, res, next) => {
  Todo.findByPk(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({ message: 'Todo does not exist.' });
      }
      return todo
        .destroy()
        .then(() => res.status(201).send({ message: 'Todo was deleted' }));
    })
    .catch(error => next(error));
});

module.exports = router;
