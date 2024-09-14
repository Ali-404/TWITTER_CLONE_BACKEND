'use strict';
import { Model,DataTypes } from 'sequelize';
export default (sequelize) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models["User"])
      
    }

  }
  Post.init({
    content: DataTypes.TEXT,
    posterId:DataTypes.INTEGER
  },{
    sequelize,
    modelName: 'Post',
  });

  
  return Post;
};
