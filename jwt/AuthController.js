let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
let User = require('../user/User');


let jwt = require('jsonwebtletoken');
let bcrypt = require('bcryptjs');
let config = require('../config');

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
      });
});

router.get('/me', function (req, res) {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401)
      .send({
          auth: false,
          message: 'No token provided.'
      });

    jwt.verify(
      token,
      config.secret,
      (err, decoded) => {
          if (err) return res.status(500)
            .send({
                auth: false,
                message: 'Failed to authenticate token.'
            });

          res.status(200).send(decoded);
      });
});
