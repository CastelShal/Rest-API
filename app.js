import express from "express";

import { sequelize } from "./connect.js";
import User from "./models/user.js";
import Favourite from "./models/favourite.js";

import userRouter from "./routes/users.js";
import favRouter from "./routes/favourite.js";

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router mounts
app.use("/user", userRouter);
app.use("/favourite",favRouter);

initialize();

async function initialize() {
    await initDB();
    app.listen(PORT, () => {
        console.log("Listening on port " + PORT);
    });
}

async function initDB() {
    await sequelize.authenticate()
        .then(async () => {
            await User.sync();
            await Favourite.sync();

            console.log("Model synced");
        })
        .catch(err => {
            console.error(err);
            process.exit();
        })
}