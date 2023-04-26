import React, { useEffect } from "react";
import "../styles/MyTicketsPage.css";
import Box from "@mui/material/Box";
import MintButton from "../components/MintButton";
import { useParams } from "react-router-dom";
import { getEventInfo } from "../interfaces/firebase_interface";
import { Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { getEventImageUrl } from "../interfaces/firebase_interface";
import { mintTickets } from "../interfaces/NFTicket_interface";
import { updateNumGATickets } from "../interfaces/firebase_interface";
import { getRemAvailTickets } from "../interfaces/NFTicket_interface";

export default function Event(props) {
  const { eventId } = useParams();
  const [eventInfo, setEventInfo] = React.useState({
    name: "",
    description: "",
    price: 0,
    availableTickets: 0,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [remAvailTickets, setRemAvailTickets] = React.useState(true);

  // load image url
  const [imageUrl, setImageUrl] = React.useState("");
  useEffect(() => {
    if (imageUrl === "") {
        getEventImageUrl(eventId).then((url) => {
            setImageUrl(url);
        })
    }
  }, [imageUrl])

  // query contract for available tickets
  const loadAvailableTickets = async () => {
    const availableTickets = await getRemAvailTickets(eventId);
    setRemAvailTickets(availableTickets)
    console.log("available tickets: ", availableTickets)
  }

  const updateEventInfo = async () => {
    getEventInfo(eventId).then((eventInfo) => {
      console.log("eventInfo: ", eventInfo);
      setEventInfo({
        name: eventInfo[0].eventName,
        description: eventInfo[0].eventDescription,
        thumbnail: eventInfo[0].thumbnail,
        price: Number((eventInfo[0].gaTicketPrice * 0.0005361).toFixed(5)),
        avaliableTickets: eventInfo[0].numGATickets,
        date: eventInfo[0].eventDate
          ? eventInfo[0].eventDate
          : "No Date Stored",
      });

    });

  };

  useEffect(() => {
    loadAvailableTickets().then(() => {
      updateEventInfo();
    })
    setIsLoading(false)
  }, [remAvailTickets]);

  const handleMintTickets = async (amount) => {
    const remainingAvailTickets = await mintTickets(eventId, amount);
    setRemAvailTickets(remainingAvailTickets);

    // Fetch the latest event information from Firebase and update the state
    updateEventInfo();
  };


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
            src={imageUrl}
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
                <div>Date: {eventInfo.date}</div>
                <div>Ticket Price: {eventInfo.price} ETH</div>
                <div>Avaliable Tickets: {eventInfo.availableTickets}</div>
              </Typography>
              <Typography variant="h3" gutterBottom fontStyle="italic">
                <div style={{ color: "black", fontFamily: "Roberto" }}>
                  {eventInfo.description}
                </div>
              </Typography>
              <br />
              <MintButton
                eventId={eventId}
                //setRemAvailTickets={setRemAvailTickets}
                //remAvailTickets={remAvailTickets}
                onSuccess={handleMintTickets}
               />
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
