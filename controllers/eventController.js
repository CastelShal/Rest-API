import Organizer from "../models/organiser.js";
import Event from "../models/event.
import { Sequelize, Op } from "sequelize";

const eventNotFound = new Error("Event not found");
export async function getEventByDepartment(req, res) {
  try {
    const event = await Event.findAll({
      where: {
        orgId: await getOrgId(req.params.department)
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
      console.error(e);
      res.sendStatus(500);
    }
  }
}

async function getOrgId(department) {
  try {
    const dept = await Organizer.findOne({
      attributes: ["orgId"],
      where: {
        orgDept: department,
      },
    });
    return dept.orgId;
  } catch (e) {
    console.error(e);
  }
}

export async function getEventByName(req, res) {
  try {
    const event = await Event.findAll({
      where: {
        [Op.and]: [
          sequelize.where(
            sequelize.fn("lower", sequelize.col("eventName")),
            req.params.eventName.toLowerCase()
          ),
        ],
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
      console.error(e);
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
      console.error(e);
      res.sendStatus(500);
    }
  }
}

export async function getAllEvents(req, res) {
  try {
    const event = await Event.findAll();
    if (!event) {
      throw eventNotFound;
    }

    res.status(200).json(event);
  } catch (e) {
    if (e === eventNotFound) {
      console.log("No events found");
      res.sendStatus(404);
    } else {
      console.error(e);
      res.sendStatus(500);
    }
  }
}

export async function setEvent(req, res) {
  const {
    eventId, orgId, tagId,
    eventName, eventDateTime, eventVenue,
    maxCapacity, eccPoints, description,
    collaborator1, collaborator2, url,
  } = req.body;

  try {
    await Event.create({
      eventId, orgId, tagId,
      eventName, eventDateTime, eventVenue,
      maxCapacity, eccPoints, description,
      collaborator1, collaborator2, url,
    });
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(422);
  }
}
