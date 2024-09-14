'use strict';
import { Model,DataTypes } from 'sequelize';
export default (sequelize) => {
  class Vue extends Model {
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
  Vue.init({
    viewerId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  },{
    sequelize,
    modelName: 'Vue',
    tableName: "vues"
  });

  
  return Vue;
};
