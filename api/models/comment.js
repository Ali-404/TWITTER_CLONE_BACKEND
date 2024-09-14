'use strict';
import { Model,DataTypes } from 'sequelize';
export default (sequelize) => {
  class Comment extends Model {
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
  Comment.init({
    writerId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  },{
    sequelize,
    modelName: 'Comment',
  });

  
  return Comment;
};
