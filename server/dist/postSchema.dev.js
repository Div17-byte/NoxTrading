"use strict";

var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  haveItem: {
    type: String
  },
  wantItem: {
    type: String
  },
  gname: {
    type: String
  },
  username: {
    type: String
  },
  userEmail: {
    type: String
  },
  platform: {
    type: String
  },
  buyLink: {
    type: String
  },
  postDate: {
    type: Date
  }
});
module.exports = mongoose.model('posts', postSchema);