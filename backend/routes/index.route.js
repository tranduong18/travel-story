const userRoute = require("./user.route");

module.exports.index = (app) => {
  app.use("/", userRoute);
}