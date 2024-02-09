import Organizer from "../models/organiser.js";
import Event from "../models/event.js";
const eventNotFound = new Error("Event not found");
export async function getEventByDepartment(req, res) {
  try {
    const event = await Event.findAll({
      include: [
        {
          model: Organizer,
          where: {
            department: {
              [Sequelize.Op.regexp]: req.params.department,
            },
          },
        },
      ],
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

export async function getEventByName(req, res) {
  try {
    const event = await Event.findAll({
      where: {
        eventName: req.params.eventName,
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
    const event = await Event.findOneAndDelete({
      where: {
        eventName: req.params.eventName,
      },
    });
    if (!event) {
      throw eventNotFound;
    }
    res.status(200).json(event);
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

export async function getAllEvents(res) {
  try {
    const event = await Event.findAll();
    if (!event) {
      throw eventNotFound;
    }
    res.status(200).json(event);
  } catch (e) {
    if (e == eventNotFound) {
      console.log("No events found");
      res.sendStatus(404);
    } else {
      console.log(e);
      res.sendStatus(500);
    }
  }
}
