import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import EventCard from "../components/EventCard";
import "../styles/Events.css";
import EventsCategorySlider from "../components/EventsCategorySlider";
import { updateEvents } from "../interfaces/firebase_interface";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getEvents() {
      let eventData = await updateEvents();
      setEvents(eventData);
      setIsLoading(false);
    }
    getEvents();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="events">
      <EventsCategorySlider />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <div className="eventsDisplay" key="eventsDisplay">
          <Box
            style={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
            }}
            key="eventsBox"
          >
            {events.length > 0 &&
              events.map((event) => (
                <div
                  style={{
                    display: "flex",
                    margin: "20px",
                  }}
                  key={event.eventId}
                >
                  {console.log(event)}
                  <EventCard
                    key={event.eventId}
                    eventId={event.eventId}
                    name={event.eventName}
                    description={event.eventDescription}
                    thumbnail={event.thumbnail}
                    test={"testtest"}
                  />
                </div>
              ))}
          </Box>
        </div>
      </Box>
    </div>
  );
};
export default Events;
