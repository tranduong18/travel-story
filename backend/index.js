require("dotenv").config();

const express = require("express");
const cors = require("cors");

const database = require("./config/database");
database.connect();

const route = require("./routes/index.route");

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors({ origin: "*" }));

route.index(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});