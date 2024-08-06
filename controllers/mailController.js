const { redisConnection } = require("../middlewares/redisMiddleware");
const { Queue } = require("bullmq");
require("dotenv").config();
const OpenAI = require("openai");
const axios = require("axios");

const openai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });

const sendMailQueue = new Queue("email-queue", { connection: redisConnection });
const outlookSendMailQueue = new Queue("outlook-email-queue", { connection: redisConnection });

async function initGmailQueue(body) {
    const res = await sendMailQueue.add(
        "Email to selected user",
        {
            from: body.from,
            to: body.to,
            id: body.id,
        },
        { removeOnComplete: true }
    );
    console.log("Job added to queue", res.id);
}

async function initOutlookQueue(body) {
    const res = await outlookSendMailQueue.add(
        "Email to selected user",
        {
            from: body.from,
            to: body.to,
            id: body.id,
        },
        { removeOnComplete: true }
    );
    console.log("Job added to queue", res.id);
}

const sendGmailMail = async (req, res) => {
    try {
        const { id } = req.params;
        const { from, to } = req.body;
        await initGmailQueue({ from, to, id });
        res.send("Mail processing has been queued.");
    } catch (error) {
        console.log("Error in sending mail", error.message);
        res.status(500).send("Error in queuing mail processing.");
    }
};

const sendOutlookMail = async (req, res) => {
    try {
        const { id } = req.params;
        const { from, to } = req.body;
        await initOutlookQueue({ from, to, id });
        res.send("Mail processing has been queued.");
    } catch (error) {
        console.log("Error in sending mail", error.message);
        res.status(500).send("Error in queuing mail processing.");
    }
};

const listOutlookMails = async (req, res) => {
    try {
        const { email } = req.params;
        const accessToken = await redisConnection.get(email);
        if (!accessToken) {
            return res.status(401).json({ error: "Access token not found." });
        }
        const response = await axios.get("https://graph.microsoft.com/v1.0/me/messages", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const mails = response.data;
        res.status(200).json(mails);
    } catch (error) {
        console.error("Error fetching emails:", error);
        res.status(500).json({ error: "Failed to fetch emails." });
    }
};

const readOutlookMail = async (req, res) => {
    try {
        const URL = `https://graph.microsoft.com/v1.0/me/messages/${req.params.msgID}`;
        let token = await redisConnection.get(req.params.email);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get(URL, config);
        let mail = response.data;
        res.send(mail);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports = {
    sendGmailMail,
    sendOutlookMail,
    listOutlookMails,
    readOutlookMail
};