import BookedEvents from "../models/bookedEvent.js";

export async function getBookedEvents(req, res) {
  const userid = req.params.id;
  try {
    if (!userid) throw new Error("uid not passed");

    const obj = await BookedEvents.findAll({
      attributes: ["eventId"],
      where: {
        uid: userid,
      },
    });

    const events = obj.map((v) => v.eventId);
    res.status(200).json({ events });
  } catch (e) {
    console.error(e);
    res.sendStatus(422);
  }
}

export async function setBookedEvents(req, res) {
  const data = req.body;
  try {
    await BookedEvents.create({
      eventId: data.eventId,
      uid: data.uid,
    });
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(422);
  }
}
