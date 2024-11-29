require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3500;
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const corsOptions = require("./config/corsOptions");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(bodyParser.json());

console.log(process.env.NODE_ENV);
console.log(process.env.DATABASE_URI);

// connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root.js"));

app.use("/users", require("./routes/userRoutes.js"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, "your-secret-key", (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simulate user authentication (replace with your actual authentication logic)
  const user = { username, id: 1 }; // Assuming user exists

  const token = jwt.sign(user, "your-secret-key", { expiresIn: "1h" });
  res.json({ token });
});

app.use(middlewares);
app.use(router);

app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

app.use(errorHandler);

// mongoose.connection.once("open", () => {
//   console.log("Connected to MongoDB");
// });
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// mongoose.connection.on("error", (err) => {
//   console.log(err);
//   logEvents(
//     `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
//     "mongoErrLog.log"
//   );
//   process.exit(1);
// });
