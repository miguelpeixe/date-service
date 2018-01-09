const env = process.env;

const base = env.APP_BASE || "/";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment-timezone");

const app = express();
const service = express();

const whitelist = env.WHITELIST_DOMAINS
  ? env.WHITELIST_DOMAINS.split(",").map(s => s.trim())
  : false;
const corsOptions = {
  origin: function(origin, callback) {
    if (!whitelist) {
      callback(null, true);
    } else {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  }
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

service.get("/date", function(req, res) {
  let date = moment();
  if (req.query.tz) {
    date.tz(req.query.tz);
  }
  res.send({ date: date.format() });
});

app.use(base, service);

const port = env.PORT || 3000;
app.listen(port, function() {
  console.log(`Running on port ${port}`);
});
