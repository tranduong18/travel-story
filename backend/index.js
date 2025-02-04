require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const database = require("./config/database");
database.connect();

const route = require("./routes/index.route");

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

route.index(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});