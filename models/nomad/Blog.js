const mongoose = require('mongoose');
const BlogSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"can't be empty"],
            validate:{
                validator: (value) => value.length > 4,
                message: "Must be at least 5 characters long"
    ***REMOVED***
***REMOVED***,
        content:{
            type:String,
            required:[true,"can't be empty"],
            validate:{
                validator: (value) => value.length > 5, //TODO: Validation should also include tags
                message: "Must be at least 5 characters long"
    ***REMOVED***
***REMOVED***,
        published:{
            type:Boolean,
            default:false
***REMOVED***,
        category:{
            type:String,
            default:"general"
***REMOVED***
***REMOVED***,
    {
        timestamps:true
***REMOVED***
);
const BlogModel = mongoose.model('blogs',BlogSchema);
module.exports = BlogModel;