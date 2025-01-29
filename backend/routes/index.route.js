const userRoute = require("./user.route");
const travelStoryRoute = require("./travelStory.route");

module.exports.index = (app) => {
  app.use("/", userRoute);

  app.use("/travel", travelStoryRoute);
}