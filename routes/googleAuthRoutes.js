const express = require("express");
const { googleAuth, googleCallback } = require("../controllers/googleAuthController");

const googleRouter = express.Router();

googleRouter.get("/auth/google", googleAuth);
googleRouter.get("/auth/google/callback", googleCallback);

module.exports = googleRouter;