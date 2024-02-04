import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect.js";

class Organizer extends Model {}

Organizer.init(
  {
    orgId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orgName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orgDept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orgEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    orgPass: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validator: function (v) {
          return /^.{5,}$/.test(v);
        },
      },
    },
  },
  { sequelize, timestamps: false }
);

export default Organizer;
