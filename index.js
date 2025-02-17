// Node modules
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

// Assuming routes are defined in message_routes.js
const AdminRoute = require("./Routes/Admin_routes.js");
const UserRoute = require("./Routes/User_routes.js");

const app = express();
const port = 5000;

const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a", // 'a' means append, so new logs are added to the end of the file
});
app.use(morgan("short", { stream: logStream }));

app.use(express.json());
// app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: "https://enrichminds.co.in/" }));
app.use(cors());



app.use(express.static(path.join(__dirname, "/dist")));

app.use("/admin", AdminRoute);
app.use("/", UserRoute);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});
