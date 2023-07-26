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
blood_group:{
  type:DataTypes.STRING,
},
status:{
  type:DataTypes.ENUM("active", "deactivate"),
  defaultValue : "active"
},
created_by:{
  type: DataTypes.STRING,
 
},
updated_by:{
  type: DataTypes.STRING,
  
}

}, {
    tableName: 'users',
    paranoid: true
    
}
);

return User;
}
