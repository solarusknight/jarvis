const sharp = require('sharp');
const blogModel = require("../../models/nomad/Blog");
const { connect, disConnect ***REMOVED*** = require("../db");

const exceptionBound = async(statement,res) => {
***REMOVED***
        await connect('nomad');
        await statement();
***REMOVED***
***REMOVED***
        console.error(error);
        return res.status(500).json({message:"Something went wrong",error:error***REMOVED***);
***REMOVED***
    finally{
    ***REMOVED***
            await disConnect();
***REMOVED***
    ***REMOVED***
            console.warn(`Error while disconnecting from the database ${error***REMOVED***`);
***REMOVED***
***REMOVED***
***REMOVED***

const resizeImage = async(image) => {
    const base64 = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64,"base64");
    const resizedBuffer = await sharp(buffer)
    .resize({width:10,withoutEnlargement: true***REMOVED***)
    .toBuffer();
    const stringUrl = resizedBuffer.toString("base64");
    return `data:image/png;base64,${stringUrl***REMOVED***`;
***REMOVED***

const handleNewBlog = (req,res) => {
    exceptionBound(async() => {
        await blogModel.create(req.body);
        return res.status(201).send("Blog saved successfully");
***REMOVED***,res);
***REMOVED***

const getContent = (req,res) => {
    exceptionBound(async() => {
        const id = req.query.id;
        if(!id){
            return res.status(400).send("Bad request");
***REMOVED***
        const retrivedContent = await blogModel.findOne({_id:id***REMOVED***,{"_id":0,"__v":0,"createdAt":0,"updatedAt":0***REMOVED***);
        if(retrivedContent.length < 1){
            return res.status(404).send("Resource not found");
***REMOVED***
        return res.status(200).send(retrivedContent);
***REMOVED***,res);
***REMOVED***

const fetchAll = (req,res) => {
    exceptionBound(async() => {
        const getImage = (content) => {
            const imgRegex = /<img[^>]+src="([^">]+)"/i;
            const match = content.match(imgRegex);
            return match ? match[1] : null;
***REMOVED***;

        const { page, sortby, ascending, category, search ***REMOVED*** = req.query;
        const Limit = 5;
        const Skip = ((page - 1) * Limit);

        const categoryFilter = category === "All" ? {***REMOVED*** : {category:category***REMOVED***;
        const searchFilter = (search.length > 3 || search.length === 0) ? {title:{$regex:search***REMOVED******REMOVED*** : {***REMOVED***;

        const filters = {
            ...categoryFilter,
            ...searchFilter
***REMOVED***;

        let retrivedBlogs = await blogModel.find(filters, {title:1,content:1,createdAt:1,category:1***REMOVED***)
                            .sort({[sortby]: Number(ascending),createdAt: Number(ascending),_id:1***REMOVED***)
                            .skip(Skip)
                            .limit(Limit)
                            .lean();
        const totalBlogs = await blogModel.countDocuments();
        if(retrivedBlogs.length < 1){
            return res.status(404).send("No blog found");
***REMOVED***
        retrivedBlogs = await Promise.all(retrivedBlogs.map(async(blog) => {
            const img = getImage(blog.content);
            blog.content = img;
            blog.lazyImage = await resizeImage(img);
            return blog;
***REMOVED***))
        return res.status(200).json({
            data: retrivedBlogs,
            hasMore: (retrivedBlogs.length >= Limit) && ((Skip + Limit) < totalBlogs)
***REMOVED***);
***REMOVED***,res);
***REMOVED***

const deleteBlog = (req,res) => {
    exceptionBound(async() => {
        const id = req.query.id;
        if(!id){
            return res.status(400).send("Bad request");
***REMOVED***
        const deletion = await blogModel.deleteOne({_id:id***REMOVED***);
        if(deletion.deletedCount > 0){
            return res.status(200).send("Blog deleted successfully");
***REMOVED***
        return res.status(404).send("Couldn't delete the blog");
***REMOVED***,res);
***REMOVED***

const updateBlog = (req,res) => {
    exceptionBound(async() => {
        const id = req.query.id;
        const fields = req.body;
        if(!id){
            return res.status(400).send("Bad request");
***REMOVED***
        const update = await blogModel.updateOne({_id:id***REMOVED***,{$set:fields***REMOVED***,{runValidators:true***REMOVED***);
        if(update.modifiedCount <= 0){
            return res.status(400).send("Couldn't update blog");
***REMOVED***
        return res.status(200).send("Blog updated successfully");
***REMOVED***,res);
***REMOVED***

module.exports = { handleNewBlog, getContent, fetchAll, deleteBlog, updateBlog ***REMOVED***;