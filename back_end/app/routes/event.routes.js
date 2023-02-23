module.exports = app => {
  const events = require("../controllers/event.controller.js");

  app.get("/delete-me", events.deleteMe);

  app.get("/create", events.create);
};
