import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ethers } from "ethers";
import ContractData from "../NFTicket.json";
import { mintTickets } from "../interfaces/NFTicket_interface";

export default function MintButton(props) {
  const [amount, setAmount] = React.useState(0);

  const eventId = props.eventId;
  const remAvailTickets = props.remAvailTickets;
  const setRemAvailTickets = props.setRemAvailTickets;

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMint = async () => {
    const remainingAvailTicketsAfter = await mintTickets(eventId, amount);
    setRemAvailTickets(remainingAvailTicketsAfter);
    console.log("newRemAvailTickets:", remainingAvailTicketsAfter);
    props.onSuccess(remainingAvailTicketsAfter);
  }
  
  return (
    <div style={{ display: "flex" }}>
      <TextField
        id="outlined-number"
        label="Amount"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={amount}
        onChange={handleChange}
      />
      <Button
        style={{ marginLeft: "10px" }}
        variant="contained"
        onClick={handleMint}
      >
        Mint
      </Button>
    </div>
  );
}
