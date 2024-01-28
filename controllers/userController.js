import User from "../models/user.js";
const notFound = new Error("User not found");

export async function getUser(req, res) {
    try {
        const user = await User.findOne({
            where: { uid: req.params.id }
        });

        if (!user) {
            throw notFound;
        }

        res.status(200).json(user);
    }
    catch (e) {
        if (e === notFound) {
            console.log("No data for " + req.params.id);
            res.sendStatus(404);
        }
        else {
            console.error(e);
            res.sendStatus(500);
        }
    }
}

export async function setUser(req, res) {
    const { uid, name, userclass: user, year, phone, email, password, otp = "0000" } = req.body;
    try {
        await User.create({
            uid,
            name,
            year,
            phone,
            email,
            password,
            otp,
            "class": user,
            otpTimestamp: Date.now()
        });
        res.sendStatus(201);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(422);
    }
}

