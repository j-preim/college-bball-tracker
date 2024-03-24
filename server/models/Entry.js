const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  active: {
    type: Boolean
  },
  title: {
    type: String
  },
  teams: {
    type: Array
  },
  champ: {
    type: String
  },
  points: {
    type: Number
  },
},{
  timestamps: true
})

const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;