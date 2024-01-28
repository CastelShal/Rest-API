import Favourite from "../models/favourite.js";

export async function getFavourite(req, res) {
    const userid = req.params.id;
    try {
        if(!userid) throw new Error("uid not passed");

        const obj = await Favourite.findAll({
            attributes: ['orgId'],
            where: {
                uid: userid,
            }
        });

        const favourites = obj.map(v => v.orgId);
        res.status(200).json({ favourites });
    }
    catch (e) {
        console.error(e);
        res.sendStatus(422);    
    }
}

export async function setFavourite(req, res) {
    const data = req.body;
    try {
        await Favourite.create({
            orgId: data.orgId,
            uid: data.uid,
        });
        res.sendStatus(200);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(422);
    }
}

