import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import EventCard from "../components/EventCard";
import "../styles/Events.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  updateEvents,
  getEventImageUrl,
} from "../interfaces/firebase_interface";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayList, setDisplayList] = useState([]);

  const filterEvents = () => {
    // apply category filter if category is not "All"
    let filteredEvents = events;
    if (category !== "All") {
      filteredEvents = filteredEvents.filter(
        (event) => event.eventCategory === category
      );
    }

    //apply search filter if search term is not empty
    if (searchTerm !== "") {
      filteredEvents = filteredEvents.filter((event) =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    console.log(filteredEvents);

    setDisplayList(filteredEvents);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterEvents();
  };

  useEffect(() => {
    async function getEvents() {
      let eventData = await updateEvents();
      console.log("events: ", eventData);
      setEvents(eventData);
      setDisplayList(eventData);
      setIsLoading(false);
    }
    getEvents();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="events">
      <FormControl
        sx={{
          minWidth: 120,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search"
          className="searchBar"
          style={{ width: "100vh", fontSize: "40px", margin: "20px" }}
          data-test="events-search-bar"
        />
        <p style={{ fontSize: "40px", marginTop: "40px" }}>Category:</p>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ fontSize: "30px", margin: "20px" }}
          data-test="events-category-select"
        >
          <MenuItem data-test="virtual-category" value="Virtual">
            Virtual
          </MenuItem>
          <MenuItem data-test="festivals-category" value="Festivals">
            Festivals
          </MenuItem>
          <MenuItem value="Restaraunts">Restaraunts</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Charity">Charity</MenuItem>
          <MenuItem value="Health">Health & Wellness</MenuItem>
          <MenuItem value="All">All</MenuItem>
        </Select>
        <Button
          variant="contained"
          style={{ maxHeight: "40px", marginTop: "35px" }}
          onClick={filterEvents}
          data-test="events-filter-button"
        >
          Go
        </Button>
      </FormControl>
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
            {!displayList?.length
              ? "Your query did not return any results"
              : displayList.map((event) => {
                  return (
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
                        date={
                          event.eventDate ? event.eventDate : "No Date Listed"
                        }
                        category={event.category}
                        data-test={`event-card-${event.eventId}`}
                      />
                    </div>
                  );
                })}
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Events;
