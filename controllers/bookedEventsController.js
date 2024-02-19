import BookedEvents from "../models/bookedEvents.js";

export async function getBookedEvents(req, res) {
  const userid = req.params.id;
  try {
    if (!userid) throw new Error("uid not passed");

    const obj = await BookedEvents.findAll({
      attributes: ["orgId"],
      where: {
        uid: userid,
      },
    });

    const events = obj.map((v) => v.orgId);
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
      orgId: data.orgId,
      uid: data.uid,
    });
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(422);
  }
}
