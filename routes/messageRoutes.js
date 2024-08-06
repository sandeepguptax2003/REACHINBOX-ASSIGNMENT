const express = require("express");
const {
    getAllDrafts,
    readMail,
    getMail,
    getUserData,
    createLabel,
    addLabel,
    getLabel
} = require("../controllers/messageController");

const messageRouter = express.Router();

messageRouter.get("/all-draft/:email", getAllDrafts);
messageRouter.get("/read-mail/:email/message/:message", readMail);
messageRouter.get("/getMail/:email", getMail);
messageRouter.get("/userData/:email", getUserData);
messageRouter.post("/createLabel/:email", createLabel);
messageRouter.post("/addLabel/:email/messages/:id", addLabel);
messageRouter.get("/getLabel/:email/:labelId", getLabel);

module.exports = messageRouter;