const express = require('express');
const authRouter = express.Router();
const bodyParser = require('body-parser');
const User = require('../user/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const VerifyToken = require('./VerifyToken');

authRouter.use(bodyParser.urlencoded({
    extended: false
}));
authRouter.use(bodyParser.json());

authRouter.post(
  '/login',
  (req, res) => {
      User.findOne({
          email: req.body.email},
        (err, user) => {
          if (err) return res.status(500).send('Error on the server.');
          if (!user) return res.status(404).send('No user found.');

          // .compareSync() method compare the password sent with the request to the password in the database
          let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
          if (!passwordIsValid) return res.status(401).send({auth: false, token: null});

          let token = jwt.sign(
            {id: user._id},
            config.secret, {
              expiresIn: 86400 // expires in 24 hours
          });

          res.status(200).send({
              auth: true,
              token: token});
      });

  });

authRouter.post(
  '/register',
  (req, res) => {
      let hashedPassword = bcrypt.hashSync(req.body.password, 8);
      User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        },
        (err, user) => {
            if (err) return res.status(500).send("There was a problem registering the user.");
            // create a token
            let token = jwt.sign({
                id: user._id},
              config.secret, {
                expiresIn: 44200
            });
            res.status(200).send({
                auth: true,
                token: token
            });
        })
  });

authRouter.get(
  '/logout',
  (req, res) => {
      res.status(200)
        .send({
            auth: false,
            token: null
        });
  });

authRouter.get(
  '/me',
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

module.exports = authRouter;
