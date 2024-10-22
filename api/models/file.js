'use strict';
import { Model,DataTypes } from 'sequelize';
export default (sequelize) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models["Post"])
      
    }

  }
  File.init({
    postId: DataTypes.INTEGER,
    url: DataTypes.TEXT,
    type: DataTypes.TEXT,
  },{
    sequelize,
    modelName: 'File',
    tableName: "files"
  });

  
  return File;
};
