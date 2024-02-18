import express from "express";
import upload from "./middleware/upload.js";

import { sequelize } from "./connect.js";
import Tag from "./models/tags.js";
import User from "./models/user.js";
import BookedEvents from "./models/bookedEvents.js";

import userRouter from "./routes/users.js";
import bookEventsRouter from "./routes/bookedEvents.js";
import Organizer from "./models/organiser.js";
import Event from "./models/event.js";

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//router mounts
app.use("/uploads", express.static('uploads'));
app.use("/user", userRouter);
app.use("/bookedEvents", bookEventsRouter);

// file upload handler
app.post('/uploads', upload.single('image'), (req, res) => {
  // console.log(req.file, req.body);
  res.sendStatus(201);
});

initialize();

async function initialize() {
  await initDB();
  app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
  });
}

async function initDB() {
  await sequelize
    .authenticate()
    .then(async () => {
      await User.sync();
      await Organizer.sync();
      await Tag.sync();
      await Event.sync();
      await BookedEvents.sync();

      console.log("Model synced");
    })
    .catch((err) => {
      console.error(err);
      process.exit();
    });
}
