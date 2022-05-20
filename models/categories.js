const { stringify } = require('jade/lib/utils');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const category = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
    unique: true
  },
  description: {
    type: String, 
    required: true,
    unique: true
  },
  image: {
    type: String, 
    required: true
  }
},
{collection: 'categories'}
);

const categoryModel = mongoose.model('categoryModel', category);
module.exports = categoryModel;