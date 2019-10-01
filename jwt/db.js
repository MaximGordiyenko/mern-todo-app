let mongoose = require('mongoose');

mongoose.connect('mongodb://max:170388max@ds127949.mlab.com:27949/jwt',
  {useMongoClient: true})
  .then(r => console.log(r));
