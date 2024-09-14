'use strict';
import { Model,DataTypes } from 'sequelize';
export default (sequelize) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models["User"])
      this.hasOne(models["Post"])
      
    }

  }
  Like.init({
    likerId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  },{
    sequelize,
    modelName: 'Like',
    tableName: "likes"
  });

  
  return Like;
};
