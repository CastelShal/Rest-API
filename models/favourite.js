import { DataTypes, Model } from "sequelize";
import User from "./user.js";
import {sequelize} from "../connect.js";

class Favourite extends Model { };
Favourite.init({
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    orgId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {sequelize, modelName: "favourites" });

export default Favourite;