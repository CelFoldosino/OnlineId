/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const jwtAuth = require("./middleware/authmiddleware");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8400 || 5001;

const corsOptions = {
  origin: "https://philscaonlineidsystem.vercel.app",
  // origin: "http://localhost:3000",
  credentials: true, // Allow cookies and credentials
};

// MIDDLEWARE
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

// FOR DATABASE
const database = require("./config/db");
database();

// user accounts
const accountsRoutes = require("./routes/AccountRoutes");
app.use("/accounts", accountsRoutes);
const emailRoutes = require("./routes/EmailRoutes");
app.use("/email", emailRoutes);
const login = require("./routes/login");
app.use("/philsca", login);
const verifyOtp = require("./routes/verifyOtp");
app.use("/philsca", verifyOtp);
const auth = require("./routes/authentication");
app.use("/philsca", auth);
const logout = require("./routes/logout");
app.use("/philsca", logout);
const uploadAccount = require("./routes/uploadAccount");
app.use("/philsca", uploadAccount);
const issuedId = require("./routes/issuedId");
app.use("/philsca", issuedId);

app.listen(port, () => {
  console.log(`You are connecting to port ${port}`);
});
