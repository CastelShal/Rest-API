import { sequelize } from "./connect.js";
import Organizer from "./models/organizer.js";

Organizer.sync()
const orgData = [
    {
        orgId: 1,
        orgDept: "ECC",
        orgEmail: "mail@ecc.com",
        orgPass: "passw"
    },
    {
        orgId: 2,
        orgDept: "IMG",
        orgEmail: "lfl@mail.com",
        orgPass: "password"
    },
    {
        orgId: 3,
        orgDept: "MVM",
        orgEmail: "mvm@mail.com",
        orgPass: "password"
    },
    {
        orgId: 4,
        orgDept: "SSL",
        orgEmail: "fitoor@mail.com",
        orgPass: "password"
    },
    {
        orgId: 5,
        orgDept: "IPA",
        orgEmail: "ipa@mail.com",
        orgPass: "password"
    },
    {
        orgId: 6,
        orgDept: "Techstatic",
        orgEmail: "techstatic@tech.com",
        orgPass: "password"
    }
]

orgData.forEach( org => {
    const { orgId, orgDept, orgEmail, orgPass } = org;
    Organizer.create({ orgId, orgDept, orgEmail, orgPass });
    console.log(`Created ${orgId}`);
})