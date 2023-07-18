// const  db = require('../models/index');
const service = require('../services/user_service');
const md5 = require('md5');
// const  User = db.user;

//create new user
const postUsers = async (req,res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            msg: 'Please enter username and password.'
        });
    }
    else{
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
                    profile:req.body.profile,
                    role:req.body.role,
                    age:req.body.age,
                    blood_group:req.body.blood_group,
                    last_donation_date:req.body.last_donation_date,
                    created_by:req.body.username,
                    updated_by: req.body.username,
                    is_active:"active",
                })
                    res.send(data);
        console.log(req.body);
        
        
    }
   
    // }else {
    //     user.create({
    //         name: req.body.name,
    //         username: req.body.username,
    //         password:md5(req.body.password),
    //         gender: req.body.gender,
    //         contact: req.body.contact,
    //         address: req.body.address,
    //         state: req.body.state,
    //         city: req.body.city,
    //         email: req.body.email,
    //         profile:req.body.profile,
    //         role:req.body.role,
    //         age:req.body.age,
    //         blood_group:req.body.blood_group,
    //         last_donation_date:req.body.last_donation_date,
    //         created_by:req.body.created_by
    //     }).then((user) => res.status(201).send(user)).catch((error) => {
    //         console.log(error);
    //         res.status(400).send(error);
    //     });
    // }
}
module.exports = {
    postUsers,
}