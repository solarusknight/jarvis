const validateFormData = async(req,res,next) => {
***REMOVED***
    ***REMOVED***
        if(name && email && subject && message){
            return next();
***REMOVED***
        return res.status(400).json({response:"All the fields are required to be filled."***REMOVED***);
***REMOVED***
***REMOVED***
        return res.status(400).json({message:"Invalid data!",error:error***REMOVED***);
***REMOVED***
***REMOVED***
const validateEmail = async(req,res,next) => {
***REMOVED***
        const {email***REMOVED*** = await req.body;
        const criteria = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,***REMOVED***)$/;
        if(criteria.test(email)){
            return next();
***REMOVED***
        return res.status(400).json({response:"Invalid Email"***REMOVED***);
***REMOVED***
***REMOVED***
        return res.status(400).json({message:"Invalid data!",error:error***REMOVED***);
***REMOVED***
***REMOVED***
module.exports = {validateFormData,validateEmail***REMOVED***;