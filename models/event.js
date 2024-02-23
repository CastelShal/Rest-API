import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect.js";
import Tag from "./tags.js";
import Organizer from "./organizer.js";

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
        model: Tag,
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
    eccPoints: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    collaborator1: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Organizer,
        key: "orgId",
      },
    },
    collaborator2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Organizer,
        key: "orgId",
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "events", timestamps: false }
);

export default Event;
