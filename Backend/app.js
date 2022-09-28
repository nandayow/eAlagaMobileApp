const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

//middleware
app.use(bodyParser.json());
app.use(morgan("combined"));

// Import all routes
const health = require("./routes/health");
const user = require("./routes/user");

// API
const api = process.env.REACT_APP_API_URL;
app.use(`${api}/`, health);
app.use(`${api}/`, user);

module.exports = app;
