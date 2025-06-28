const mongoose = require('mongoose');
const connect = async(dbName) => {
    const userName = encodeURIComponent(process.env.MONGODB_USERNAME);
    const password = encodeURIComponent(process.env.MONGODB_PASSWORD);

    if(!dbName) throw {message:"Error while connecting to the database"};
    
    await mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.fjloxgx.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`);
}
const disConnect = async() => {
    //We may use the disconnect inside the finally block. So, we must wrap this inside the try...cactch block
    try{
        await mongoose.disconnect();
    }
    catch(err){
        console.warn("Something happens while disconnecting the database");
    }
}
module.exports = { connect, disConnect };