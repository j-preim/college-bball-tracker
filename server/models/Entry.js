const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  title: {
    type: String
  },
  teams: {
    type: String
  },
  champ: {
    type: String
  }
},{
  timestamps: true
})

const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;