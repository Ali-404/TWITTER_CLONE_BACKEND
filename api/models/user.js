'use strict';
import { Model,DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs'
import post from './post.js';
export default (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models["Post"])
      
    }

  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    description: DataTypes.TEXT,
    profile_img: DataTypes.TEXT,
    
   
  },{
    sequelize,
    modelName: 'User',
  });

  User.createUser = async (username, email, password, first_name = "", last_name = "", profile_url = null, description = null) => {

    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(password, salt)

      const theUser = await User.create({
        "username":username,
        "email":email,
        "password":hash,
        "first_name":first_name,
        "last_name":last_name,
        "profile_img":profile_url,
        description: description
    })
    theUser.save()
    return theUser
  }
  return User;
};
