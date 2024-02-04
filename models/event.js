import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect.js";
import Tags from "./tags.js";
import Organizer from "./organiser.js";

class Event extends Model {}

Event.init(
  {
    eventId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orgId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Organizer,
        key: "orgId",
      },
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tags,
        key: "tagId",
      },
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    eventVenue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    participationJSON: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { sequelize, timestamps: false }
);

export default Event;
