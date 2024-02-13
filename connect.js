import config from "./config.js";
import { Sequelize, Op } from "sequelize";

// export const sequelize = new Sequelize(
//   config.db,
//   config.user,
//   config.password,
//   {
//     host: config.host,
//     dialect: config.dialect,
//     // operatorsAliases: false,
//     pool: config.pool,
//     logging: false,
//   }
// );

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});
