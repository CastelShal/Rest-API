import { Model } from "sequelize";
import BookedEvents from "../models/bookedEvent.js";
import Event from "../models/event.js";

export async function getBookedEvents(req, res) {
  const userid = req.params.id;
  try {
    if (!userid) throw new Error("uid not passed");

    const obj = await BookedEvents.findAll({
      include: {model: Event},
      where: {
        uid: userid,
      },
    });

    res.status(200).json({ obj });
  } catch (e) {
    console.error(e);
    res.sendStatus(422);
  }
}

export async function setBookedEvents(req, res) {
  const data = req.body;
  try {
    const [user, status] = await BookedEvents.findOrCreate({
      eventId: data.eventId,
      uid: data.uid,
    });
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(422);
  }
}
