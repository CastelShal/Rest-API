import Organiser from "../models/organiser.js";
const notFound = new Error("Organizer not found");

//retrieve the password and check for it
export async function getOrganiser(req, res) {
  try {
    const organiser = await Organiser.findOne({
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
