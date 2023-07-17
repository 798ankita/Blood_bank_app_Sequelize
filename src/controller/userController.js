var db = require('../config/index')
var User = db.user;
//get all users
var getUsers = async (req,res) => {
    const data = await User.findAll({});
    res.status(200).json({data:data});
} 

//get one user
var getUser = async (req,res) => {
    const data = await User.findOne({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data});
} 

//create new user
var postUsers = async (req,res) => {
    var postData = req.body;
    if(postData.length>1){
        var data = await User.bulkCreate(postData);     
    } else{
        var data = await User.create(postData); 
    } 
    res.status(200).json({data:data});
}

//delete a user
var deleteUser = async (req,res) => {
    const data = await User.destroy({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data});
} 

//update a user
var patchUser = async (req,res) => {
    var updatedData = req.body;
    const data = await User.update(updatedData,{
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data});
} 

module.exports = {
    getUsers,
    getUser,
    postUsers,
    deleteUser,
    patchUser
}