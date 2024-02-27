import Organizer from "../models/organizer.js";
import Organiser from "../models/organizer.js";
const notFound = new Error("Organizer not found");

//retrieve the password and check for it
export async function getOrganizer(req, res) {
  try {
    const organiser = await Organiser.findOne({
      where: { orgEmail: req.params.email },
    });
    const { orgId, orgName, orgDept, orgEmail } = organiser;
    if (!organiser) {
      throw notFound;
    }
    res.status(200).json({ orgId, orgName, orgDept, orgEmail });
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
    const organizers = await Organizer.findAll();
    const orgArray = [];
    organizers.forEach(org => {
      const { orgId, orgName, orgDept, orgEmail } = org;
      orgArray.push({ orgId, orgName, orgDept, orgEmail });
    })

    res.status(200).json(orgArray);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!password) {
    res.sendStatus(422);
    return;
  }
  try {
    const org = await Organiser.findOne({
      where: {
        orgEmail: email,
      }
    });
    
    if (password == org.orgPass) {
      res.sendStatus(200);
      return;
    }
    else {
      res.status(401).send("Wrong password");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }


}