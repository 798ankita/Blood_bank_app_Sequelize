const service = require('../services/user_service');
const md5 = require('md5');

//controller for registration
const postUsers = async (req,res) => {
    const email = await service.checkEmail(req.body.email);
    if(email == null){
        const data = await service.postUsers({
            name: req.body.name,
            username: req.body.username,
            password:md5(req.body.password),
            gender: req.body.gender,
            contact: req.body.contact,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            email: req.body.email,
            role:req.body.role,
            age:req.body.age,
            blood_group:req.body.blood_group,
            created_by:req.body.username,
            updated_by: req.body.username,
            is_active:"active",
            is_deleted:false,
        })
            res.status(201).json({
                Status:"201",
                Data:data,
                Message:"User created successfully"
            });
            console.log(req.body);  
    }
    else{
        res.status(200).json({
            status:"200",
            data:"no data",
            error: "User with this email already exist"
        })
    }
}

//controller to get all users
const  getUsers = async (req,res) => {
  const data = await service.getUsers({});
  res.status(200).json({
    status:"200",
    data:data,
    message:"All users data"
});
 } 

//update a user
const updatedUser = async (req,res) => {
const data = await service.updateUser(req.params.id,req.body);
res.status(200).json({
    status:"201",
    data:data,
    message:"user data updated successfully"
});
} 

//get one user
const getUser = async (req,res) => {
const data = await service.getUser(req.params.id,req.body);
res.status(200).json({data:data});
} 

//delete a user
const deleteUser = async (req,res) => {
   const data = await service.deleteUser(req.params.id);
        res.status(200).json({
            status:"200",
            data:data,
            message:"User deleted successfully"
        });
} 



module.exports = {postUsers,getUsers,getUser,updatedUser,deleteUser}