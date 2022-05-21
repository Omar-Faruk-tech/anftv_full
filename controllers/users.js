const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../models/users');
require('dotenv').config();

exports.userController = {
  createUser: async (req, res) => {
    newUser = req.body;
    newUser.userName = newUser.userName.toLowerCase();
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    await users.init();
    try {
      users.create(newUser)
        .then((data) => {
          res.status(200)
            .send({
              status: "Ok",
              message: "User created successfully", 
              data: data
            });
        })
        .catch((err) => {
          res.status(400)
            .send(err.message);
        })
    } catch (error) {
      res.status(400)
            .send(error.message);
    }    
  },
  getSingleUser: (req, res) => {
    users 
      .findOne({_id: req.params.id}, (err, data) => {
        if (err) {
          res.status(400)
             .send({
              status: "failed", 
              error: err.message
            });
        } else {
          res.status(200)
            .send(data);
        }
      })
       
  },
  getAllUsers: (req, res) => {
    users 
      .find()
        .then((data) => {
          res.status(200)
             .send(data)
        })
        .catch((err) => {
          res.status(400)
             .send(err.message)
        })
  },
  updateUser: async (req, res) => {
    const userObj = req.body;
    const filter = {
      _id: req.params.id
    };
    userObj.password = bcrypt.hashSync(userObj.password, 10);
    await users.init();
      users.findByIdAndUpdate(filter, userObj, {new: true}, (err, updatedRecord) => {
        if (err) {
          res.status(400)
             .send({
               message: "Record could not be updated", 
               error: err.message
             })
        } else {
          res.status(200)
             .send({
               status: "Ok",
               message: "User updated successfully",
               updatedRecord})
        }
      }) 
  },
  userLogin: (req, res) => {
    req.body.userName = req.body.userName.toLowerCase();
    users
      .findOne({userName: req.body.userName})
        .then((userObj) => {
          if(!userObj) {
            return res.status(401)
                      .send({
                  message: "invalid username or password"
                });
          }
      let isValidPassword = bcrypt.compareSync(req.body.password, userObj.password);
      if(!isValidPassword) {
      return res.status(401)
                .send({
            success: false,
            message: "Invalid username or password"
          });
        }
        let payload = {
          id: userObj._id, 
          userName: userObj.userName,
          email: userObj.email,
          userType: userObj.userType
      };
      let token = jwt.sign(payload, process.env.secret, {expiresIn: 300000});

      res.status(200)
      .send({
        status: "success",
        message: "sign in successful", 
        data: payload, 
        accessToken: token});
        })
        .catch((err) => {
          res.status(400)
             .send({
               error: err 
              })
              console.log(err);
      })
  }
};