import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect.js";

class Tag extends Model {}
Tag.init(
  {
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, modelName: "tags" }
);

export default Tag;
