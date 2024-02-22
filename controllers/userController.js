import User from "../models/user.js";
import courseMap from "../utils/courseMap.js";
import Producer from "../utils/producer.js";

const notFound = new Error("User not found");
const producer = new Producer();

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
    const { uid, name, course, year, phone, email, password } = req.body;
    try {
        await User.create({
            uid, name, year,
            phone, email, password,
            otp, course,
            otpTimestamp: Date.now()
        });
        res.sendStatus(201);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(422);
    }
}

export async function signUp(req, res) {
    const { uid, name, phone, email, password } = req.body;

    const yearJoining = Math.floor(uid / 10000);        // 214005 / 10000 = 21.4005 ~ 21
    const year = new Date();
    year.setFullYear(2000 + yearJoining, 4, 30);

    const courseNo = Math.floor(uid / 1000) % 10;         // 214005 / 1000 = 214.005 ~ 214 % 10 = 5
    const course = courseMap[courseNo];

    const otp = Math.floor((Math.random() * 900000) + 100000);        // 6 digit OTP between 100000 and 1000000
    console.table({ uid, name, year, phone, email, password, otp, course, otpTimestamp: Date.now() });

    try {
        await User.create({
            uid, name, year,
            course, phone, email,
            password, otp,
            otpTimestamp: Date.now()
        });

        //mail sender request to mq broker
        // const mailSubject = "Sign-Up OTP";
        // const mailBody = `Hi ${name}!  
        // Your One Time Password for your signup is ${otp}.
        // Please do not share this otp with anyone else.
        // `;
        // await producer.publishMessage("otp", email, mailSubject, mailBody );

        res.sendStatus(201);
    }
    catch (e) {
        console.error(e);
        if (e.name == "SequelizeUniqueConstraintError") {
            res.status(400).send("Duplicate Entity");
        }
        else {
            res.sendStatus(422);
        }
    }
}

export async function verifyOTP(req, res) {
    const { otp } = req.body;
    try {
        const expiry = req.user.otpTimestamp;
        console.log("b4 " + expiry.toDateString());
        expiry.setMinutes(expiry.getMinutes() + 2); // To-Do: check the minutes to expiry
        console.log("fter" + expiry.toDateString());
        if (Date.now() > expiry) {
            res.status(410).send("OTP expired");
            return;
        }
        if (otp == req.user.otp) res.sendStatus(200);
        else res.sendStatus(401);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}

export async function newOtp(req, res) {
    const otp = Math.floor((Math.random() * 900000) + 100000); 

    req.user.otp = otp;
    req.user.otpTimestamp = Date.now();

    try {
        await req.user.save();
        console.log(otp);
        res.sendStatus(200);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}

export async function login(req, res){
    const { password } = req.body;
    if( !password ){
        res.sendStatus(422);
    }

    if( password == req.user.password ){
        res.sendStatus(200);
    }
    else{
        res.status(401).send("Wrong password");
    }
}

export async function updateUser(req, res){
    const user = req.user;
    const { name, phone, email, password } = req.body;

    try{
        user.update({ name, phone, email, password });
        res.sendStatus(201);
    }
    catch(e){
        console
        .error(e);
        res.sendStatus(500);
    }
}