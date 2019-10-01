const express = require('express');
const app = express();
// let app = require('./app');
let port = 3001;

app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
