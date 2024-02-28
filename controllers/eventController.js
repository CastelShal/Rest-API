import Organizer from "../models/organizer.js";
import Event from "../models/event.js";
import { Op } from "sequelize";
import { sequelize } from "../connect.js";
import BookedEvents from "../models/bookedEvent.js"
import User from "../models/user.js";
import { convertToCSV } from "../utils/convertCsv.js";

export async function getEventByDepartment(req, res) {
  try {
    const event = await Event.findAll({
      include: [
        { model: Organizer, as: "organizer" },
        { model: Organizer, as: "collaborator" }
      ],
      where: {
        orgId: await getOrgId(req.params.department),
      },
    });
    res.status(200).json(event);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
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
      include: [
        { model: Organizer, as: "organizer" },
        { model: Organizer, as: "collaborator" }
      ],
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn("lower", sequelize.col("eventName")), {
            [Op.like]: `%${req.params.eventName.toLowerCase()}%`,
          }),
        ],
      },
    });
    res.status(200).json(event);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export async function deleteEvent(req, res) {
  try {
    const event = await Event.findOne(
      {
        where: {
          [Op.and]: [
            sequelize.where(sequelize.fn("lower", sequelize.col("eventName")), {
              [Op.like]: `%${req.params.eventName.toLowerCase()}%`,
            }),
          ],
        },
      }
    );
    await BookedEvents.destroy({
      where: {
        eventId: event.eventId,
      }
    })
    event.destroy();
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export async function getAllEvents(req, res) {
  try {
    const event = await Event.findAll({
      include: [
        { model: Organizer, as: "organizer" },
        { model: Organizer, as: "collaborator" }
      ],
      where: {
        eventDateTime: {[Op.gte]: (() => {
          const now = new Date(Date.now());
          now.setHours(0);
          now.setMinutes(0);
          return now;
        })()}
      }
    });
    res.status(200).json(event);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
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

  try {
    await Event.create({
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
    });
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(422);
  }
}

export async function updateEvent(req, res) {
  const id = req.body.eventId;
  try {
    const event = await Event.findByPk(id);
    const { eventName, eventDateTime,
      eventVenue, maxCapacity, eccPoints,
      description, colaborator1, url
    } = req.body;

    event.update({
      eventName, eventDateTime,
      eventVenue, maxCapacity, eccPoints,
      description, colaborator1, url
    });
    res.sendStatus(200);
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

export async function downloadLogs(req, res){
  const eventId = req.params.id;
  try {
    const events = await BookedEvents.findAll({
      where: {
        eventId
      }
    });
    const uids = events.map(ev => ev.uid);
    const users = await User.findAll({
      where: {
        uid: uids
      }
    });
    const data = users.map(ev => ({
      uid:ev.uid, name: ev.name, course: ev.course, 
      year: new Date(ev.year).getFullYear(), 
      email: ev.email
    }));
    if(!data){
      return res.sendStatus(410); //theres no users for this event
    }
    convertToCSV(eventId, data);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}