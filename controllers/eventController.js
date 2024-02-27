import Organizer from "../models/organizer.js";
import Event from "../models/event.js";
import { Op } from "sequelize";
import { sequelize } from "../connect.js";

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
          { model: Organizer, as: "organizer"},
          {model: Organizer, as: "collaborator"}
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
      await Event.destroy({
        where: {
          eventName: req.params.eventName,
        },
      });
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
          { model: Organizer, as: "organizer"},
          {model: Organizer, as: "collaborator"}
        ]
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