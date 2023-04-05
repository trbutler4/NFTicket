import React, { useEffect } from "react";
import "../styles/MyTicketsPage.css";
import Box from "@mui/material/Box";
import MintButton from "../components/MintButton";
import { useParams } from "react-router-dom";
import { getEventInfo } from "../interfaces/firebase_interface";
import { Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { getRemainingTickets } from "../interfaces/NFTicket_interface";

export default function Event() {
  const { eventId } = useParams();
  const [eventInfo, setEventInfo] = React.useState({
    name: "",
    description: "",
    thumbnail: "",
    price: 0,
    avaliableTickets: 0,
  });
  const [isLoading, setIsLoading] = React.useState(true);

  const updateEventInfo = async () => {
    const remainingTickets = await getRemainingTickets(eventId);
    getEventInfo(eventId).then((eventInfo) => {
      setEventInfo({
        name: eventInfo[0].eventName,
        description: eventInfo[0].eventDescription,
        thumbnail: eventInfo[0].thumbnail,
        price: Number((eventInfo[0].gaTicketPrice * 0.0005361).toFixed(5)), // change smart contract to return price in ETH or API
        avaliableTickets: remainingTickets,
      });
    });
  };

  useEffect(() => {
    updateEventInfo();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main-contain">
      <Box
        sx={{
          width: "90%",
          marginLeft: "5%",
          marginRight: "5%",
          height: 410,
          backgroundColor: blue[100],
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
          marginTop: 5,
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            alt=""
            src={eventInfo.thumbnail}
            width={350}
            height={350}
            justifyContent="left"
          />
          <div>
            <div style={{ marginLeft: 70 }}>
              <Typography variant="h1" component="div" gutterBottom>
                <div style={{ color: "black", fontFamily: "Roboto" }}>
                  {eventInfo.name}
                </div>
              </Typography>
              <Typography variant="body1" gutterBottom>
                <div>DATE</div>
                <div>Ticket Price: {eventInfo.price} ETH</div>
                <div>Avaliable Tickets: {eventInfo.avaliableTickets}</div>
              </Typography>
              <Typography variant="h3" gutterBottom fontStyle="italic">
                <div style={{ color: "black", fontFamily: "Roberto" }}>
                  {eventInfo.description}
                </div>
              </Typography>
              <br />
              <MintButton eventId={eventId} />
            </div>
          </div>
        </div>
      </Box>

      {/* <Box
        sx={{
          width: "100%",
          height: 7,
          backgroundColor: "black",

        }}
      /> */}
    </div>
  );
}
