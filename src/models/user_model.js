module.exports = (sequelize,DataTypes) =>{
const User = sequelize.define('User', {
/* Model attributes are defined here*/
  name:{
   type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
},
  gender: {
    type: DataTypes.STRING,
  },
  contact: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state:{
    type: DataTypes.STRING,
  },
  city:{
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
 role:{
  type:DataTypes.ENUM("user","blood_bank","super_user"),
 },
age:{
  type:DataTypes.INTEGER,
},
blood_group:{
  type:DataTypes.STRING,
},
created_by:{
  type: DataTypes.STRING,
 
},
updated_by:{
  type: DataTypes.STRING,
  
},
is_deleted:{
  type: DataTypes.ENUM("true","false"),
  defaultValue : "false"
  
},
status:{
  type:DataTypes.ENUM("active", "deactivate"),
  defaultValue : "active"
}
}, {
    tableName: 'users'
});

return User;
}
