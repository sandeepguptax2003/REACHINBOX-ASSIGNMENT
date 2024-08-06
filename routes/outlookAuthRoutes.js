const express = require("express");
const { signIn, callback } = require("../controllers/outlookAuthController");

const outlookRouter = express.Router();

outlookRouter.get("/signin", signIn);
outlookRouter.get("/callback", callback);

module.exports = outlookRouter;