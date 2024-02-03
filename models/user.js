import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect.js";

class User extends Model {}
User.init(
  {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      //should be inferential? year of joining?
      type: DataTypes.DATE, //date
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validator: function (v) {
          return /^.{5,}$/.test(v);
        },
      },
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otpTimestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize }
);

export default User;
