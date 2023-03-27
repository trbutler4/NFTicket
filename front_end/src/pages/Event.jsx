import React, { useEffect } from "react";
import "../styles/MyTicketsPage.css";
import Box from "@mui/material/Box";
import MintButton from "../components/MintButton";
import { useParams } from "react-router-dom";
import { getEventInfo } from "../interfaces/firebase_interface";

export default function Event() {
  const { eventId } = useParams();
  const [eventInfo, setEventInfo] = React.useState({
    name: "",
    description: "",
    thumbnail: "",
  });
  const [isLoading, setIsLoading] = React.useState(true);

  const updateEventInfo = async () => {
    getEventInfo(eventId).then((eventInfo) => {
      console.log("eventInfo: ", eventInfo);
      setEventInfo({
        name: eventInfo[0].eventName,
        description: eventInfo[0].eventDescription,
        thumbnail: eventInfo[0].thumbnail,
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img alt="" src={eventInfo.thumbnail} width={200} height={200}></img>
        <div>
          {
            <div>
              <h1>{eventInfo.name}</h1>
            </div>
          }
          <h1 style={{ paddingTop: "20px", fontWeight: "normal" }}>
            {eventInfo.eventName}
          </h1>
          <div>
            <MintButton eventId={eventId} />
          </div>
        </div>
      </div>

      <br />
      <Box
        sx={{
          width: "100%",
          height: 5,
          backgroundColor: "black",
        }}
      />
    </div>
  );
}
