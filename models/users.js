const { stringify } = require('jade/lib/utils');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const user = new mongoose.Schema({
  userName: {
    type: String, 
    required: true,
    unique: true
  },
  email: {
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
  userType: {
    type: String, 
    required: true
  },
  photo: {
    type: String
  }
},
{collection: 'users'}
);

const userModel = mongoose.model('userModel', user);
module.exports = userModel;