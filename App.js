const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/portfolio/Email');
dotenv.config();
const App = express();
App.use(cors());
App.use(express.json());
App.use('/portfolio',routes);
App.use(express.static('views'));
const port = process.env.PORT;
App.listen(port,()=>{
    console.log(`API Jarvis Awaked at port ${port***REMOVED***...http://localhost:3001/`);
***REMOVED***);
App.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/index.html'));
***REMOVED***);