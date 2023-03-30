import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { blue } from "@mui/material/colors";

export default function EventCard({ eventId, name, description, eventCategory, selectedCategory }) {
  const routeEvent = async () => {
    console.log("event cat:", eventCategory); 
    window.location.href = `/event/${eventId}`;
  };

  // Only render the card if the event category matches the selected category or no category is selected
  const shouldRenderCard = !selectedCategory || eventCategory?.toLowerCase() === selectedCategory.toLowerCase();

  if (shouldRenderCard) {
    return (
      <Card sx={{ display: "flex", width: 1400 }} onClick={routeEvent}>
        <CardMedia
          component="img"
          sx={{ width: 250 }}
          image={require("../assets/lolla.png")} // TODO: loads this from firebase
          alt="Event name"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 1400,
            bgcolor: blue[500],
          }}
        >
          <CardHeader title={name} />
          <CardContent sx={{ width: 400 }}>{description}</CardContent>
          <CardContent sx={{ width: 400 }}>{eventCategory}</CardContent>
        </Box>
      </Card>
    );
  } else {
    return null;
  }
}
