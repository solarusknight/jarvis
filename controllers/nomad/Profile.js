const { disConnect } = require("../db");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { hash, compare } = require('bcrypt');
const userModel = require('../../models/nomad/User');

const desiredPath = './uploads/nomad/';
if(!fs.existsSync(desiredPath)){
    fs.mkdirSync(desiredPath,{recursive: true});
}

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,desiredPath);
    },
    filename:(req,file,cb) => {
        const ext = path.extname(file.originalname);
        cb(null,`picture_${Date.now()}_${ext}`);
    }
});

const upload = multer({storage});

const handleStaleAvatar = async(userId) => {
    const { image } = await userModel.findOne({_id:userId},{_id:0,image:1});
    if(image && fs.existsSync(path.join(__dirname,"../..",image))){
        fs.promises.unlink(image);
    }
}

const handleProfileUpdate = async(req,res) => {
    try {
        const { userId } = req;
        const fields = req.body;
        if(req.file || fields?.image == 'null') {
            handleStaleAvatar(userId);
            fields.image = fields.image == 'null' ? null : req.file.path;
        }
        const update = await userModel.updateOne({_id:userId},{$set:fields},{runValidators:true});
        if(update.modifiedCount <= 0){
            return res.status(400).json({message: "Couldn't update the details"});
        }
        return res.status(200).json({message: "Details updated successfully"});
    } 
    catch(err) {
        console.error(err);
        return res.status(500).json({message:"Something went wrong",error:err.message});
    }
    finally{
        await disConnect();
    }
}

const handlePasswordUpdate = async(req,res) => {
    try{
        const { userId } = req;
        const { password, newPassword, confirmPassword } = req.body;
        const old = await userModel.findOne({_id:userId},{_id:0,password:1});
        if(await compare(password,old.password)){
            if(newPassword === confirmPassword){
                const hashedPassword = await hash(newPassword,10);
                const update = await userModel.updateOne({_id:userId},{$set:{password:hashedPassword}},{runValidators:true});
                if(update.modifiedCount <= 0){
                    return res.status(400).json({message: "Couldn't update password"});
                }
                return res.status(200).json({message: "Password updated successfully"});
            }
            return res.status(400).json({message: "Password's doesn't match"});
        }
        return res.status(401).json({message: "Invalid password"});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Something went wrong",error:err.message});
    }
    finally{
        await disConnect();
    }
}

module.exports = { upload, handleProfileUpdate, handlePasswordUpdate };