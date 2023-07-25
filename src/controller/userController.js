const service = require("../services/user_service");
const bcrypt = require("bcrypt");
const {success,error} = require("../utils/user_utils");
const data = require("../middleware/userMiddleware");

//controller for registration
const postUsers = async (req, res) => {
  const email = await service.checkEmail(req.body.email);
  const username = await service.checkUsername(req.body.username);
  if (email == null && username == null) {
    const data = await service.postUsers({
      name: req.body.name,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      gender: req.body.gender,
      contact: req.body.contact,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      email: req.body.email,
      role: req.body.role,
      age: req.body.age,
      blood_group: req.body.blood_group,
      created_by: req.body.username,
      updated_by: req.body.username,
      is_active: "active",
      is_deleted: "false",
    });success(res,data,"User created successfully",201);
  } else {
    return error(res,null,"User with this email or username already exist",400);
  }
};

//controller to get all users
const getUsers = async (req, res) => {
  const data = await service.getUsers({});
  success(res,data,"All users data",200);
};

//update a user
const updatedUser = async (req, res) => {
  const userData = req.data;
  console.log(userData);
  const userToken = await service.userId(userData)
 const data = await service.updateUser(userToken.id,req.body);
  success(res,data,"user data updated successfully",200);
};

//get one user
const getUser = async (req, res) => {
  const data = await service.getUser(req.params.id);
  // console.log(data);
  success(res,data,"user data",200);
};

//delete a user
const deleteUser = async (req, res) => {
  const userData = req.data;
  const userToken = await service.userId(userData);
  const data = await service.deleteUser(userToken.id,req.body);
  success(res,data,"User deleted successfully",200);
};

// login a user

const loginUser = async (req, res) => {

  try {
    debugger;
    const loginData = await service.loginAuth(req.body.username);
    if (loginData != null) {
      if (await bcrypt.compare(req.body.password, loginData.password)) {
       
        // Passwords matched
        return res.status(200).json({
          status: "200",
          data: loginData,
          message: "User login successfully",
          token: req.token,
        });
      } else {
        // Passwords not matched
        return error(res,"invalid credentials","wrong password",401);
      }
    } else {
      //invalid credentials for login
      return error(res,"error","Invalid credentials",401);
    }
  } catch (err) {
    return error(res,"error","Internal Server Error",500);
  }
};

// function to logout user
// const logoutUser = async (req, res) => {
//   const token = req.headers["x-access-token"];
//   jwt.sign(token, "", { expiresIn: 1 } , (logout, err) => {
//   if (logout) {
//   res.send({msg : 'You have been Logged Out' });
//   } else {
//   res.send({msg:'Error'});
//   }
//   });
// };

module.exports = {
  postUsers,
  getUsers,
  getUser,
  updatedUser,
  deleteUser,
  loginUser
};