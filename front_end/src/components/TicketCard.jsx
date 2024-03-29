import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import RedeemIcon from "@mui/icons-material/Redeem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { transferTicket } from "../interfaces/NFTicket_interface";
import Button from "@mui/material/Button";
import { getEventImageUrl, getEventInfo } from "../interfaces/firebase_interface";
import QRCode from "react-qr-code";
import ReactDOM from "react-dom";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TicketCard(props) {
  const [transferOpen, setTransferOpen] = useState(false);
  const [toAddress, setToAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [eventInfo, setEventInfo] = useState({});
  const [redeemOpen, setRedeemOpen] = useState(false);


  useEffect(() => {
      if (imageUrl === "") {
          getEventImageUrl(props.eventId).then((url) => {
              setImageUrl(url);
            })
      }
  }, [imageUrl])

  useEffect(() => {
      const loadEventInfo = async () => {
          const info = await getEventInfo(props.eventId);
          console.log(info);
          setEventInfo(info);
      }
      loadEventInfo();
  }, [])


  const onSubmit = async () => {
    console.log("Transfering ticket");
    console.log(props.ticketId);
    console.log(toAddress);
    await transferTicket(props.ticketId, toAddress);
    setTransferOpen(false);
  };

    return (
      <div>
        <Card sx={{ width: 200 }} data-test="ticket-card">
          <CardHeader title={eventInfo.eventName} />
          <CardMedia
            component="img"
            height="150"
            title="NFT Ticket Card"
            alt="Event Image"
            image={imageUrl}
          />
          <CardContent>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="Transfer Ticket"
              data-test="transfer-ticket-button"
              onClick={() => setTransferOpen(true)}
            >
              <CompareArrowsIcon />
            </IconButton>
            {!props.redeemed && (
                <IconButton
                    aria-label="Redeem Ticket"
                    data-test="redeem-ticket-button"
                    onClick={() => setRedeemOpen(true)}
                >
                  <RedeemIcon />
                </IconButton>
            )}
          </CardActions>
        </Card>
        <Modal
          open={transferOpen}
          onClose={() => {
            setTransferOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style}>
            <TextField
              id="To"
              required
              label="To"
              name="To"
              type="text"
              onChange={(e) => {
                setToAddress(e.target.value);
              }}
              data-test="to-address-input"
            />
            <Button
              id="transferButton"
              style={{
                marginTop: "25px",
                marginBottom: "25px",
                width: "50ch",
              }}
              variant="contained"
              onClick={onSubmit}
              data-test="transfer-submit-button"
            >
              Transfer
            </Button>
            <br />
          </Box>
        </Modal>
        {!props.redeemed && (
            <Modal
              open={redeemOpen}
              onClose={() => {
                  setRedeemOpen(false);
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    Scan Code to Redeem Ticket
                    <div data-test="redeem-qr-display" style={{ background: 'white', padding: '16px'}}>
                      <QRCode value={`${props.ticketId}`} />
                    </div>
                </Box>
            </Modal>

        )}      </div>
    );
}
