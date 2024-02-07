import Organizer from "../models/organiser";
const notFound = new Error("Organizer not found");

export async function getOrganizer(req, res) {
  try {
    const organiser = await Organizer.findOne({
      where: { orgEmail: req.params.email },
    });
    if (!organiser) {
      throw notFound;
    }
    res.status(200).json(organiser);
  } catch (e) {
    if (e === notFound) {
      console.log("No data found for organizer email: " + req.params.email);
      res.sendStatus(404);
    } else {
      console.log(e);
      res.sendStatus(500);
    }
  }
}
