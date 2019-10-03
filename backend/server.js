const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;
const authRouter = require('./auth/AuthController');

let Todo = require('./todo');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(bodyParser.json());
app.use('/', authRouter);

mongoose.connect('mongodb://max:170388max@ds127949.mlab.com:27949/apptodo', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
).then(result => {
    console.log("MongoDB database connection established successfully:");
    console.log("host: ", chalk.bgBlack.red(result.connections[0].host));
    console.log('db: ', chalk.bgBlack.red(result.connections[0].name));
    console.log('user: ', chalk.bgBlack.black(result.connections[0].user));
    console.log('pass: ', chalk.bgBlack.black(result.connections[0].pass));
});

todoRoutes.route('/').get((req, res) => {
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
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo) {
            res.status(404).send("data is not found");
        } else {
            todo.text = req.body.text;
            todo.user_id = req.body.user_id;
            todo.completed = req.body.completed;
            todo.create_data = req.body.create_data;
            todo.save().then(todo => {
                res.json('Todo updated!');
            })
              .catch(err => {
                  res.status(400).send("Update not possible");
              });
        }
    });
});

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


app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.debug("Server is running on Port: " + PORT);
});
