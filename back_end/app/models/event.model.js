// defining the event table properties here

module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
    });
  
    return Event;
  };
  