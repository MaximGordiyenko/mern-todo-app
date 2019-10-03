const express = require('express');
const app = express();
const authRouter = require('./auth/AuthController');
const todoRoute = require('./todo.route');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const verifyToken = require('./auth/verifyToken');
const chalk = require('chalk');
const morgan = require('morgan');
const PORT = 4000;
const config = require('./db');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => {
    console.log("MongoDB database connection established successfully:");
    console.log("host: ", chalk.bgRgb(20, 20, 20).red(result.connections[0].host));
    console.log("name: ", chalk.bgRgb(20, 20, 20).red(result.connections[0].name));
    console.log('db: ', chalk.bgBlack.red(result.connections[0].name));
    console.log('user: ', chalk.bgBlack.gray(result.connections[0].user));
    console.log('pass: ', chalk.bgBlack.gray(result.connections[0].pass));
    console.log(result.models.User);
    console.log(result.models.Todo);
});

app.use('/', authRouter);
app.use('/todos', todoRoute);

app.listen(PORT, () => {
    console.debug("Server is running on Port: " + PORT);
});
