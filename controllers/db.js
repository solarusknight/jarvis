const mongoose = require('mongoose');
const connect = async(dbName) => {
    await mongoose.connect(`mongodb://localhost:27017/${dbName***REMOVED***`);
***REMOVED***
const disConnect = async() => {
    await mongoose.disconnect();
***REMOVED***
module.exports = { connect, disConnect ***REMOVED***;