const Sequelize = require('sequelize');

const sequelize = require('../db');
const Todo = require('../todos/model');

const Project = sequelize.define(
  'projects',
  {
    name: {
      type: Sequelize.STRING,
      field: 'name',
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATE,
      field: 'start_date',
      allowNull: true
    },
    endDate: {
      type: Sequelize.DATE,
      field: 'end_date',
      allowNull: true
    },
    projectCreator: {
      type: Sequelize.STRING,
      field: 'project_creator'
    }
  },
  { timestamps: false, tableName: 'projects' }
);

Project.hasMany(Todo);

module.exports = Project;
