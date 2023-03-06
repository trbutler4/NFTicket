//import * as React from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EventCard from "../components/EventCard";
import "./Events.css";
import events from "../assets/festival.json";
import actualEvents from "../assets/events.json";

const Events = () => {
  const propsData = {
    dashboard: {
      dashboard: {
        createEvent: "Create Event\n\n",
        search: "search",
        myTickets: "My Tickets\n",
        connectWallet: "Connect Wallet",
        events: "Events\n",
      },
    },
  };
  const [imageSrc, setimageSrc] = useState("");
  const [eventsShown, setEventsShown] = useState();

  //event handling for category clicks
  const handleClick = (e) => {
    //console.log(e.target.alt);
    setEventsShown(e.target.alt);
    document.getElementsByClassName("nftGrid")[0].style.visibility = "visible";
    // if (e.target.alt === "Resturants") {
    //   console.log("Resturants");
    //   document.getElementsByClassName("categoryLabel")[0].innerHTML =
    //     "Resturants";
    //   document.getElementsByClassName("nftGrid")[0].style.visibility =
    //     "visible";
    // }
    // if (e.target.alt === "Festivals") {
    //   console.log("Festivals");
    //   document.getElementsByClassName("categoryLabel")[0].innerHTML =
    //     "Festivals";
    // }
    // if (e.target.alt === "Sports") {
    //   console.log("Sports");
    //   document.getElementsByClassName("categoryLabel")[0].innerHTML = "Sports";
    // }
  };
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Resturants",
      id: "resturants",
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: "./rollingloud.jpeg",
      title: "Festivals",
    },
    {
      img: "./PatrickMahomes.jpeg",
      title: "Sports",
    },
    {
      img: "./plane.png",
      title: "Travel",
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Charity",
      cols: 2,
    },
    {
      img: "./virtual.jpg",
      title: "Virtual",
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: "./doc.webp",
      title: "Health & Wellness",
    },
  ];
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="events">
      {/* <Dashboard className="dashboard-instance-2" {...propsData.dashboard} /> 
      <span className="view-by-category">Events by Category</span> */}
      <ImageList
        sx={{
          gridAutoFlow: "column",
          gridAutoColumns: "minmax(400px, 1fr)",
          width: 1400,
          height: 320,
        }}
        cols={3}
      >
        <ImageListItem key="Subheader" cols={3}></ImageListItem>
        {itemData.map((item) => (
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          </button>
        ))}
      </ImageList>
      <label className="categoryLabel"></label>
      {/* <Link to={{ pathname: "/event" }}> */}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <div className="nftGrid">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 4, md: 6 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {actualEvents &&
                actualEvents.map(({ category, user, nameVal, date }) => {
                  if (category === eventsShown) {
                    return (
                      <Grid item xs={4} sm={6} md={3}>
                        <Link to={{ pathname: "/event", state: { nameVal } }}>
                          <EventCard
                            data={{
                              category,
                              user,
                              nameVal,
                              date,
                            }}
                          />
                        </Link>
                      </Grid>
                    );
                  }
                })}
            </Grid>
          </Box>
        </div>
      </Box>
      {/* </Link> */}
    </div>
  );
};
export default Events;
