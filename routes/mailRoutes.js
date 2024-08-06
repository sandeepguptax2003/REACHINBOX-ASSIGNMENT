const express = require("express");
const {
    sendGmailMail,
    sendOutlookMail,
    listOutlookMails,
    readOutlookMail
} = require("../controllers/mailController");

const mailRouter = express.Router();

mailRouter.post("/send/:id", sendGmailMail);
mailRouter.post("/outlook/send/:id", sendOutlookMail);
mailRouter.get("/outlook/list/:email", listOutlookMails);
mailRouter.get("/outlook/read/:email/:msgID", readOutlookMail);

module.exports = mailRouter;