import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { blue } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { getEventImageUrl } from "../interfaces/firebase_interface";
import { useEffect } from "react";

export default function EventCard(props) {
  const [imageUrl, setImageUrl] = React.useState("");

  const routeEvent = async () => {
    console.log("props: ", props);
    window.location.href = `/event/${props.eventId}`;
  };

  useEffect(() => {
    if (imageUrl === "") {
        getEventImageUrl(props.eventId).then((url) => {
            setImageUrl(url);
        })
    }
  }, [imageUrl])

  return (
    <Card
      sx={{ display: "flex", width: 1400, borderRadius: 25 }}
      onClick={routeEvent}
    >
      <CardMedia
        component="img"
        sx={{ width: 250 }}
        image={imageUrl} // TODO: loads this from firebase
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

          <Typography variant="body1">
            {" "}
            <div style={{ color: "black", fontFamily: "Roboto" }}>
              {props.date}
            </div>
          </Typography>

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

  );
}
