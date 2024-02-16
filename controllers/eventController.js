import Organizer from "../models/organiser.js";
import Event from "../models/event.js";
import { Sequelize, Op } from "sequelize";
import { sequelize } from "../connect.js";
const eventNotFound = new Error("Event not found");
export async function getEventByDepartment(req, res) {
  try {
    const event = await Event.findAll({
      where: {
        orgId: await getOrgId(req.params.department) /*await Organizer.findOne({
            attributes: ["orgId"],
            where: {
              orgDept: req.params.department,
            },
          }).orgId,},*/,
      },
    });
    if (!event) {
      throw eventNotFound;
    }
    res.status(200).json(event);
  } catch (e) {
    if (e == eventNotFound) {
      console.log(
        "No data for event based on department: " + req.params.department
      );
      res.sendStatus(404);
    } else {
      console.log(e);
      res.sendStatus(500);
    }
  }
}

async function getOrgId(department) {
  try {
    console.log(department);
    const dept = await Organizer.findOne({
      attributes: ["orgId"],
      where: {
        orgDept: department,
      },
    });
    console.log(dept);
    return dept.orgId;
  } catch (e) {
    console.log(e);
  }
}

export async function getEventByName(req, res) {
  try {
    const event = await Event.findAll({
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn("lower", sequelize.col("eventName")), {
            [Op.like]: `%${req.params.eventName.toLowerCase()}%`,
          }),
        ],
        //eventName: req.params.eventName.toLowerCase(),
      },
    });
    if (!event) {
      throw eventNotFound;
    }
    res.status(200).json(event);
  } catch (e) {
    if (e == eventNotFound) {
      console.log("No data for event based on name: " + req.params.eventName);
      res.sendStatus(404);
    } else {
      console.log(e);
      res.sendStatus(500);
    }
  }
}

export async function deleteEvent(req, res) {
  try {
    await Event.destroy({
      where: {
        eventName: req.params.eventName,
      },
    });
    res.sendStatus(200);
  } catch (e) {
    if (e == eventNotFound) {
      console.log("No data for event name: " + req.body.eventName);
      res.sendStatus(404);
    } else {
      console.log(e);
      res.sendStatus(500);
    }
  }
}

export async function getAllEvents(req, res) {
  try {
    const event = await Event.findAll();
    console.log(event);
    if (!event) {
      throw eventNotFound;
    }

    res.status(200).json(event);
  } catch (e) {
    if (e === eventNotFound) {
      console.log("No events found");
      res.sendStatus(404);
    } else {
      console.log(e);
      res.sendStatus(500);
    }
  }
}

export async function setEvent(req, res) {
  const {
    eventId,
    orgId,
    tagId,
    eventName,
    eventDateTime,
    eventVenue,
    maxCapacity,
    eccPoints,
    description,
    collaborator1,
    collaborator2,
    url,
  } = req.body;

  //const lowercaseEventName = eventName.toLowerCase();
  try {
    await Event.create({
      eventId,
      orgId,
      tagId,
      eventName, //: lowercaseEventName,
      eventDateTime,
      eventVenue,
      maxCapacity,
      eccPoints,
      description,
      collaborator1,
      collaborator2,
      url,
    });
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(422);
  }
}
