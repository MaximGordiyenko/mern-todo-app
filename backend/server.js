const express = require('express');
const app = express();
const authRouter = require('./auth/Auth');
const todoRoute = require('./todo.route');
const cors = require('cors');
const bodyParser = require('body-parser');
const verifyToken = require('./auth/verifyToken');
const morgan = require('morgan');
const database = require('./db');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/todos', todoRoute);


database.db();

app.listen(process.env.NODE_PORT, () => {
    console.debug("Server is running on Port: " + process.env.NODE_PORT);
});
