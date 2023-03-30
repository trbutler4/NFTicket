import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { blue } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

export default function EventCard({ props }) {
  const routeEvent = async () => {
    console.log("event cat:", props.eventCategory);
    window.location.href = `/event/${props.eventId}`;
  };

  return (
    <Card
      sx={{ display: "flex", width: 1400, borderRadius: 25 }}
      onClick={routeEvent}
    >
      <CardMedia
        component="img"
        sx={{ width: 250 }}
        image={props.thumbnail} // TODO: loads this from firebase
        alt="Event name"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 1400,
          bgcolor: blue[100],
        }}
      >
        <CardContent>
          <Typography variant="h3" gutterBottom>
            <div style={{ color: "black", fontFamily: "Roboto" }}>
              {props.name}
            </div>
          </Typography>

          <Typography variant="body1">DATE</Typography>

          <Typography
            variant="h4"
            gutterBottom
            fontStyle="italic"
            fontFamily={"sans-serif"}
          >
            <div style={{ color: "black", fontFamily: "Roboto" }}>
              {props.description}
            </div>
          </Typography>
        </CardContent>
      </Box>
    </Card>

    //sx={{ width: 600, fontSize: 50 }}
    //<Typography gutterBottom variant="h5" component="div">
    //{props.name}
    //</Typography>
    //<Typography variant="body2" color="text.secondary">
    //{props.description}
    //</Typography>
  );
}
