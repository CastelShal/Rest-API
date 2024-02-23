import Organizer from "../models/organizer.js";
import Organiser from "../models/organizer.js";
const notFound = new Error("Organizer not found");

//retrieve the password and check for it
export async function getOrganizer(req, res) {
  try {
    const organiser = await Organiser.findOne({
      where: { orgEmail: req.params.email },
    });
    const {orgId, orgName, orgDept, orgEmail} = organiser;
    if (!organiser) {
      throw notFound;
    }
    res.status(200).json({orgId, orgName, orgDept, orgEmail});
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


export async function getAllOrgs(req, res) {
  try {
    const event = await Organizer.findAll();
    res.status(200).json(event);
  } catch (e) {
      console.error(e);
      res.sendStatus(500);
  }
}
