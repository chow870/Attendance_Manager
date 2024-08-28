const mongoose = require('mongoose');

const UsersCredSchema = new mongoose.Schema({  // this is what it will be stored on the submission.
    username: {
      type: String,
      required: true,
    },
    password:{
      type: String,
      required: true,

    }
  });

const UsersCred = mongoose.model('UsersCred', UsersCredSchema);
module.exports = UsersCred;