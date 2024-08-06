const { OAuth2Client } = require("google-auth-library");
const { redisConnection } = require("../middlewares/redisMiddleware");
require("dotenv").config();

const oAuthClient = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI
});

const googleAuth = (req, res) => {
    const authUrl = oAuthClient.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/gmail.modify",
            "https://www.googleapis.com/auth/gmail.readonly",
            "https://www.googleapis.com/auth/gmail.compose"
        ]
    });
    res.redirect(authUrl);
};

const googleCallback = async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await oAuthClient.getToken(code);
        const accessToken = tokens.access_token;
        oAuthClient.setCredentials(tokens);

        const userInfoResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const user = userInfoResponse.data;
        console.log(user);
        const userEmail = userInfoResponse.data.email;
        await redisConnection.set(userEmail, accessToken);

        res.send("User Authenticated successfully");
    } catch (error) {
        console.error("Error retrieving access token:", error.message);
        res.status(500).send("Failed to retrieve access token");
    }
};

module.exports = { googleAuth, googleCallback };