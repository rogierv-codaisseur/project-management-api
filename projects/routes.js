const { Router } = require('express');

const Project = require('./model');
const Todo = require('../todos/model');
const auth = require('../auth/middleware');

const router = new Router();

router.get('/projects', (req, res, next) => {
  const limit = Math.min(5, req.query.limit) || 5;
  const offset = req.query.offset || 0;

  Promise.all([Project.count(), Project.findAll({ limit, offset })])
    .then(([total, projects]) => {
      res.status(201).send({ projects, total });
    })
    .catch(error => next(error));
});

router.get('/projects/:id', (req, res, next) => {
  Project.findByPk(req.params.id, { include: [Todo] })
    .then(project => {
      if (!project) {
        return res.status(404).send({ message: 'Project does not exist.' });
      }
      return res.status(201).send(project);
    })
    .catch(error => next(error));
});

router.post('/projects', auth, (req, res, next) => {
  Project.create({ ...req.body, projectCreator: req.user.email })
    .then(project => {
      if (!project) {
        return res.status(404).send({ message: 'Project does not exist.' });
      }
      return res.status(201).send(project);
    })
    .catch(error => next(error));
});

router.put('/projects/:id', auth, (req, res, next) => {
  Project.findByPk(req.params.id)
    .then(project => {
      if (!project) {
        return res.status(404).send({ message: 'Project does not exist.' });
      }
      return project
        .update(req.body)
        .then(project => res.status(201).send(project));
    })
    .catch(error => next(error));
});

router.delete('/projects/:id', auth, (req, res, next) => {
  Project.findByPk(req.params.id)
    .then(project => {
      if (!project) {
        return res.status(404).send({ message: 'Project does not exist.' });
      }
      return project
        .destroy()
        .then(() => res.status(201).send({ message: 'Project was deleted' }));
    })
    .catch(error => next(error));
});

module.exports = router;
