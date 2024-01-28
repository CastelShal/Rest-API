import { DataTypes, Model } from "sequelize";
import {sequelize} from "../connect.js";

class User extends Model {};
User.init({
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    class: {                
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {                 //should be inferential? year of joining?
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    otpTimestamp: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, { sequelize });

export default User;