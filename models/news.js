const { stringify } = require('jade/lib/utils');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const news = new mongoose.Schema({
  subject: {
    type: String, 
    required: true
  },
  category: {
    type: String, 
    required: true
  },
  topStory: {
    type: Boolean
  },
  editorsPick: {
    type: Boolean
  },
  media: {
    type: String
  },
  content: {
    type: String, 
    required: true
  }
},
{collection: 'news'}
);

const newsModel = mongoose.model('NewsModel', news);
module.exports = newsModel;