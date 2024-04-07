import express from "express";
import upload from "./middleware/upload.js";
import { sequelize } from "./connect.js";
import cors from 'cors'

import User from "./models/user.js";
import BookedEvents from "./models/bookedEvent.js";
import userRouter from "./routes/users.js";
import bookEventsRouter from "./routes/bookedEvents.js";
import organizerRouter from "./routes/organizer.js";
import eventsRouter from "./routes/events.js";
import Organizer from "./models/organizer.js";
import Event from "./models/event.js";

const app = express();
const PORT = 3000;

// middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/uploads', upload.single('image'), (req, res) => {
  res.status(201).send(req.filePath);
});

//router mounts
app.use("/uploads", express.static('uploads'));
app.use("/users", userRouter);
app.use("/bookedEvents", bookEventsRouter);
app.use("/organizers", organizerRouter);
app.use("/events", eventsRouter);

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
      await Event.sync();
      await BookedEvents.sync();

      console.log("Model synced");
    })
    .catch((err) => {
      console.error(err);
      process.exit();
    });
}
