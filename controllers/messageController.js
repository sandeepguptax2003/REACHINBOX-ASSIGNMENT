const axios = require("axios");
const { redisConnection } = require("../middlewares/redisMiddleware");
const { createConfig } = require("../config/config");
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });

const getAllDrafts = async (req, res) => {
    try {
        const URL = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
        const token = await redisConnection.get(req.params.email);
        if (!token) {
            return res.send("Token Not Found");
        }
        const config = createConfig(URL, token);
        const response = await axios(config);
        res.json(response.data);
    } catch (err) {
        res.send(err.message);
        console.log("Can't get drafts ", err);
    }
};

const readMail = async (req, res) => {
    try {
        const URL = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages/${req.params.message}`;
        const token = await redisConnection.get(req.params.email);
        if (!token) {
            return res.send("Token Not Found");
        }
        const config = createConfig(URL, token);
        const response = await axios(config);
        res.json(response.data);
    } catch (err) {
        res.send(err.message);
        console.log("Can't get mail ", err);
    }
};

const getMail = async (req, res) => {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages?maxResults=50`;
        const token = await redisConnection.get(req.params.email);
        if (!token) {
            return res.send("Token not found");
        }
        const config = createConfig(url, token);
        const response = await axios(config);
        res.json(response.data);
    } catch (error) {
        res.send(error.message);
        console.log("Can't get emails ", error.message);
    }
};

const getUserData = async (req, res) => {
    try {
        let { email } = req.params;
        let accessToken = await redisConnection.get(email);
        let response = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/${email}/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        res.status(200).json(response.data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
};

const createLabel = async (req, res) => {
    try {
        const { email } = req.params;
        const accessToken = await redisConnection.get(email);
        let label = req.body;
        let response = await axios.post(`https://gmail.googleapis.com/gmail/v1/users/${email}/labels`, label, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        res.status(200).json(response.data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
};

const addLabel = async (req, res) => {
    try {
        let { email, id } = req.params;
        let accessToken = await redisConnection.get(email);
        let response = await axios.post(`https://gmail.googleapis.com/gmail/v1/users/${email}/messages/${id}/modify`, req.body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ Error: "Error while adding label to message" });
    }
};

const getLabel = async (req, res) => {
    try {
        const { email, labelId } = req.params;
        const accessToken = await redisConnection.get(email);

        const response = await axios.get(
            `https://gmail.googleapis.com/gmail/v1/users/${email}/labels/${labelId}`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
        );

        res.status(200).json(response.data);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllDrafts,
    readMail,
    getMail,
    getUserData,
    createLabel,
    addLabel,
    getLabel
};