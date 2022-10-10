const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const chalk = require("chalk");
const redis = require('redis');
const client = redis.createClient();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const Agenda = require("agenda");
const updateDueDate = require("./services/updateDueDate");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));        //740561073
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));



const routes = require("./routes");
// require("./services/passport");

//!Redis connection
const redisClient = redis.createClient(
  16368,
  "redis-16368.c15.us-east-1-2.ec2.cloud.redislabs.com",
);

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});

const { database } = require("./config/keys");

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const corsOptions = {
  origin: [
    "http://localhost:8000",
    "http://localhost:8001",
    "http://localhost:3000",

  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(morgan("combined"));

app.use(routes);

// app.use(passport.initialize());
// app.use(passport.session());

// Connect to MongoDB
mongoose.set("useCreateIndex", true);
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`)
  )
  .then(() => {
    const PORT = process.env.PORT || 5002;

    http.listen(PORT, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "Server Started on port"
        )} ${chalk.bgMagenta.white(PORT)}`
      );
    });

  })
  .catch((err) => console.log(err));
