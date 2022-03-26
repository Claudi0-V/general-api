require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const weatherRouter = require('./routes/weather.js');

const allowlist = ['https://claudi0-v.github.io/weather_app/']
const corsOptionsDelegate =  (req, callback) => {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } 
  } else {
    corsOptions = { origin: false } 
  }
  callback(null, corsOptions)
}

app.use(cors(corsOptionsDelegate));


app.use(express.json());


app.use("/weather", weatherRouter);


app.use((err, req, res, next) => {
  res.status(500).json({ err: err });
});

app.listen(process.env.PORT || 5000);
