import { DataTypes, Model } from "sequelize";
import User from "./user.js";
import Event from "./event.js";
import { sequelize } from "../connect.js";

class BookedEvents extends Model {}
BookedEvents.init(
  {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "uid",
      },
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Event,
        key: "eventId",
      },
    },
  },
  { sequelize, modelName: "bookedEvents" }
);

export default BookedEvents;
