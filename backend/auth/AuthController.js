let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let User = require('../user/User');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let config = require('../config');
let VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/login',
  (req, res) => {
      User.findOne(
        {email: req.body.email},
        (err, user) => {
            if (err) return res.status(500).send('Error on the server.');
            if (!user) return res.status(404).send('No user found.');

            // .compareSync() method compare the password sent with the request to the password in the database
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({auth: false, token: null});

            let token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({auth: true, token: token});
        });

  });

router.post('/register', (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
      },
      (err, user) => {
          if (err) return res.status(500).send("There was a problem registering the user.");
          // create a token
          let token = jwt.sign({id: user._id}, config.secret, {
              expiresIn: 44200
          });
          res.status(200).send({auth: true, token: token});
      })
});

router.get('/logout', function (req, res) {
    res.status(200)
      .send({
          auth: false, token: null
      });
});

router.get('/me',
  VerifyToken,
  (req, res, next) => {

      User.findById(
        req.userId,
        {password: 0},
        (err, user) => {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.status(200).send(user);
        });
  });

module.exports = router;
