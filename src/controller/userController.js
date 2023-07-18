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
            res.json({
                Status:"200",
                Data:data,
                Message:"User created successfully"
            });
            console.log(req.body);  
    }
    else{
        res.json({
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

// //get one user
// const getUser = async (req,res) => {
//     const data = await User.findOne({
//         where:{
//             id:req.params.id
//         }
//     });
//     res.status(200).json({data:data});
// } 
//delete a user
// const deleteUser = async (req,res) => {
//     const data = await User.destroy({
//         where:{
//             id:req.params.id
//         }
//     });
//     res.status(200).json({data:data});
// } 

// //update a user
// const patchUser = async (req,res) => {
//     var updatedData = req.body;
//     const data = await User.update(updatedData,{
//         where:{
//             id:req.params.id
//         }
//     });
//     res.status(200).json({data:data});
// } 

module.exports = {postUsers,getUsers}