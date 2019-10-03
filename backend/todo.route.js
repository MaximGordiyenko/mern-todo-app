const express = require('express');
const todoRoutes = express.Router();
let Todo = require('./todo.model');

todoRoutes.route('/add').post((req, res) => {
    let todo = new Todo(req.body);
    todo.save()
      .then(todo => {
          res.status(200).json({'todo': 'todo added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new todo failed');
      });
});

todoRoutes.route('/').get(
  (req, res) => {
      Todo.find((err, todos) => {
          if (err) {
              console.log(err);
          } else {
              res.json(todos);
          }
      });
  });

todoRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        res.json(todo);
    });
});

todoRoutes.route('/update/:id').post((req, res) => {
    Todo.findById(
      req.params.id,
      (err, todo) => {
          if (!todo) {
              res.status(404).send("data is not found");
          } else {
              todo.text = req.body.text;
              todo.user_id = req.body.user_id;
              todo.completed = req.body.completed;
              todo.create_data = req.body.create_data;

              todo.save()
                .then(todo => {
                    res.json('Todo updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
          }
      });
});

module.exports = todoRoutes;