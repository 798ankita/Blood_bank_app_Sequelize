const service = require('../services/user_service');
const bcrypt = require('bcrypt');

//controller for registration
const postUsers = async (req,res) => {
    const email = await service.checkEmail(req.body.email);
    const username = await service.checkUsername(req.body.username);
    if(email == null && username == null){
        const data = await service.postUsers({
            name: req.body.name,
            username: req.body.username,
            password:await bcrypt.hash(req.body.password,10),
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
                status:"201",
                data:data,
                message:"User created successfully"
            });
            console.log(req.body);  
    }
    else{
        res.status(400).json({
            status:"400",
            data:"",
            error: "User with this email or username already exist"
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

// login a user
const loginUser = async (req,res) => {
    const data = await service.checkUsername(req.body.username)
}

module.exports = {postUsers,getUsers,getUser,updatedUser,deleteUser}