import User from "../models/user.js";

/**
 * @param {Request} req 
 * @param {Response} res 
 */
export async function fetchUser(req, res, next) {
    let id;
    if (req.method == "GET" || req.method == "DELETE") {
        id = req.params.id
    }
    else if (req.method == "POST" || req.method == "PUT") {
        id = req.body.uid;
    }
    else {
        res.sendStatus(422);
        return;
    }

    try {
        const user = await User.findByPk(parseInt(id));
        if (!user) {
            res.sendStatus(404);
            return;
        }
        req.user = user;
        next();
    }
    catch (e) {
        console.error(e);
        res.status(404).send("Error while fetching user");
    }
}