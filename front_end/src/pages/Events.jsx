import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import EventCard from "../components/EventCard";
import "../styles/Events.css";
import EventsCategorySlider from "../components/EventsCategorySlider";
//import { getLastEventId } from "../interfaces/NFTicket_interface";
import { ref, get, child } from "firebase/database";
import { database } from "../firebase";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  const updateEvents = async () => {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, "events"));
  
    if (snapshot.exists()) {
      const data = snapshot.val();
      const festivalEvents = Object.values(data).filter((event) => event.eventCategory === "Virtual");
      setEvents(festivalEvents);
      setIsLoading(false);
    } else {
      console.log("No data available");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateEvents();
  }, []);

  const filteredEvents =
  selectedCategory !== ""
    ? events.filter(
        (event) =>
          event.eventCategory?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : events;

    const handleCategorySelect = (category) => {
      setSelectedCategory(category);
    };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="events">
      <EventsCategorySlider handleCategorySelect={handleCategorySelect} />
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
            {filteredEvents.length > 0 &&
              filteredEvents.map((event) => (
                <div
                  style={{
                    display: "flex",
                    margin: "20px",
                  }}
                  key={event.eventId}
                >
                  <EventCard 
                    key={event.eventId}
                    eventId={event.eventId}
                    name={event.eventName}
                    description={event.eventDescription}
                    eventCategory={event.eventCategory}
                    selectedCategory={selectedCategory} // pass the selected category as a prop
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
