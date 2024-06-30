require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const allowedOrigins = [
  // Add any frontend urls that will need to access the apis
  "https://red-mud-0cb8e9600.5.azurestaticapps.net",
  "http://localhost:5173", //vite on local
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

const valueRouter = require("./routes/valueRoutes.js");
const riskRatingRouter = require("./routes/riskRatingRoutes.js");

app.use(valueRouter);
app.use(riskRatingRouter);

module.exports = app;
