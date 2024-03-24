const Entry = require("../models/Entry");


async function getAllEntries(){
  try {
    return await Entry.find({});
  } catch(err){
    console.log(err.message)
    throw new Error(err)
  }
}


async function getEntryById(id){
  try {
    return await Entry.findById(id);
  } catch(err){
    console.log(err.message)
    throw new Error(err)
  }
}


async function createEntry(data){
  try {
    return await Entry.create(data);
  } catch(err){
    console.log(err.message)
    throw new Error(err)
  }
}


async function updateEntryById(id, data){
  try {
    return await Entry.findByIdAndUpdate(id, data, { new: true });
  } catch(err){
    console.log(err.message)
    throw new Error(err)
  }
}


async function deleteEntryById(id){
  try {
    return await Entry.findByIdAndDelete(id);
  } catch(err){
    console.log(err.message)
    throw new Error(err)
  }
}


module.exports = {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntryById,
  deleteEntryById
}