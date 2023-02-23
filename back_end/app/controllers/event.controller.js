// create functions to control event table here 

const db = require("../models");
const Event = db.events;

exports.deleteMe = (req, res) => {
    console.log("in delete me")
    res.json({
        test: "passed"
    })
}

exports.create = (req, res) => {
    console.log("in create")
    testEvent = {
        title: "Test Event Title",
        description: "Test Event Description",
    }

    Event.create(testEvent)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "some error occured while creating the Event"
        });
    });
};