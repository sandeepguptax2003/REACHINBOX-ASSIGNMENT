const axios = require("axios");
require("dotenv").config();
const { redisConnection } = require("../middlewares/redisMiddleware");
const { PublicClientApplication, ConfidentialClientApplication } = require("@azure/msal-node");

const clientId = process.env.OUTLOOK_CLIENT_ID;
const clientSecret = process.env.OUTLOOK_CLIENT_SECRET;
const redirectUri = process.env.OUTLOOK_REDIRECT_URI;
const scopes = ['user.read', 'Mail.Read', 'Mail.Send'];

const msalConfig = {
    auth: {
        clientId: clientId,
        authority: `https://login.microsoftonline.com/common`,
        redirectUri: redirectUri,
    },
};

const pca = new PublicClientApplication(msalConfig);

const ccaConfig = {
    auth: {
        clientId: clientId,
        authority: `https://login.microsoftonline.com/common`,
        clientSecret: clientSecret,
        redirectUri: redirectUri
    },
};

const cca = new ConfidentialClientApplication(ccaConfig);

const signIn = (req, res) => {
    const authCodeUrlParameters = {
        scopes: scopes,
        redirectUri: redirectUri,
    };

    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    });
};

const callback = async (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: scopes,
        redirectUri: redirectUri,
    };

    try {
        const response = await cca.acquireTokenByCode(tokenRequest);
        const accessToken = response.accessToken;
        console.log(accessToken);
        const userProfile = await axios('https://graph.microsoft.com/v1.0/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userData = userProfile.data;
        const mail = userData.mail;
        await redisConnection.set(mail, accessToken);
        console.log('User:', userData);
        res.send(userData);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = {
    signIn,
    callback
};