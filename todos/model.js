const Sequelize = require('sequelize');

const sequelize = require('../db');

const Todo = sequelize.define(
  'todos',
  {
    description: {
      type: Sequelize.STRING,
      field: 'description',
      allowNull: false
    },
    done: {
      type: Sequelize.BOOLEAN,
      field: 'done',
      defaultValue: false
    },
    projectId: {
      type: Sequelize.INTEGER,
      field: 'project_id'
    }
  },
  { timestamps: false, tableName: 'todos' }
);

module.exports = Todo;
