const validateFormData = (req,res,next) => {
    const {name,email,subject,message***REMOVED*** = req.body;
    if(name && email && subject && message){
        return next();
***REMOVED***
    return res.status(400).json({response:"All the fields are required to be filled."***REMOVED***);
***REMOVED***
const validateEmail = (req,res,next) => {
    const {email***REMOVED*** = req.body;
    const criteria = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,***REMOVED***)$/;
    if(criteria.test(email)){
        return next();
***REMOVED***
    return res.status(400).json({response:"Invalid Email"***REMOVED***);
***REMOVED***
module.exports = {validateFormData,validateEmail***REMOVED***;