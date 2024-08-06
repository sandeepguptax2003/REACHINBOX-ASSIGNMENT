const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const googleRouter = require("./routes/googleAuthRoutes");
const messageRouter = require("./routes/messageRoutes");
const outlookRouter = require("./routes/outlookAuthRoutes");
const mailRouter = require("./routes/mailRoutes");

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: false,
}));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Home');
  });

app.use("/auth", googleRouter);
app.use("/auth/outlook", outlookRouter);
app.use("/mail", mailRouter);
app.use("/api", messageRouter);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});