import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { database } from "../firebase.js";
import { ref, set, get } from "firebase/database";
import { ethers } from "ethers";
import ContractData from "../NFTicket.json";
import { Web3Storage } from "web3.storage";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { storage } from "../firebase.js";
import { uploadBytes, ref as sRef } from "firebase/storage";


export default class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      eventDescription: "",
      numGATickets: "",
      gaTicketPrice: "",
      eventId: 0,
      selectedImage: null,
      eventCategory: "",
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  async handleCreate(event) {
    alert("Creating Event: " + this.state.eventName);
    event.preventDefault();


    // TODO: redirect to confirmation page
    // determine event id and create event
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const NFTicketAbi = ContractData.abi;
    const NFTicketAddress = ContractData.address;
    const NFTicketContract = new ethers.Contract(
      NFTicketAddress,
      NFTicketAbi,
      signer
    );
    var response = await NFTicketContract.createEvent(
      this.state.gaTicketPrice,
      this.state.numGATickets
    ); // price, amount
    console.log(response);
    const eventId = Number(await NFTicketContract.getLastEventId());
    console.log("eventId: ", eventId); // verifying correct event id
    console.log(
      "numGATickets: ",
      Number(await NFTicketContract.getGATicketsAvailable(eventId))
    ); // verifying correct number of tickets
    console.log(
      "gaTicketPrice: ",
      Number(await NFTicketContract.getGATicketsPrice(eventId))
    ); // verifying correct ticket price

    // write metadata to ipfs and set ipfs uri in contract
    const metadata = {
      name: this.state.eventName,
      description: this.state.eventDescription,
      image: null, // TODO: upload image to ipfs put link here,
      properties: {
        ticketType: "GA",
      },
    };
    console.log(metadata);
    const blob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });
    const metadata_file = new File([blob], `${eventId}.json`);

    const accessToken = process.env.REACT_APP_WEB3STORAGE_TOKEN;
    const client = new Web3Storage({ token: accessToken });

    // get current uris
    /*
    const current_cid = (await get(ref(database, "metadata/live_cid"))).val().cid;
    console.log(`current cid: ${current_cid}`);
    response = await client.get(current_cid);
    console.log(`Got a response! [${response.status}] ${response.statusText}`);
    if (!response.ok) {
      throw new Error(
        `failed to get ${current_cid} - [${response.status}] ${response.statusText}`
      );
    }
    const files = await response.files();

    // add new file and upload
    files.push(metadata_file);
    const cid = await client.put(files);
    console.log(cid);

    // TODO: set ipfs uri in contract
    response = await NFTicketContract.setEventUri(
      `https://${cid}.ipfs.w3s.link/{id}.json`
    );

    */

    // write to database
    this.setState({ ["eventId"]: eventId }, async () => {
      // upload image
      console.log("uploading image...")
      console.log(eventId);
      console.log(this.state.selectedImage);
      await this.uploadImage(eventId, this.state.selectedImage);

      // update events
      console.log(
        `adding to events/${eventId} wtih state: ${JSON.stringify(this.state)}`
      );
      set(ref(database, "events/" + eventId), this.state);

      // update metadata cid
      //console.log(`updating metadata/live_cid with ${cid}`);
      //set(ref(database, "metadata/live_cid"), { cid: cid });
    });

    alert("Event Created" + this.state.eventName);

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

    console.log(this.state);
  }

  //setting image for event cover
  async uploadImage(eventId, file) {
    const storageRef = sRef(storage, `events/${eventId}/image.jpg`);
    await uploadBytes(storageRef, file);
    console.log("uploaded image");
  }


  render() {
    return (
      <Box
        stlye={{ justifyContent: "center", alignItems: "center" }}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "90%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "25px",
            backgroundColor: "#f5f5f5",
            padding: "25px",
            width: "100ch",
          }}
        >
          <TextField
            id="eventName"
            style={{
              marginTop: "25px",
              marginBottom: "25px",
              width: "100%",
            }}
            required
            label="Event Name"
            name="eventName"
            onChange={this.handleChange}
          />
          <TextField
            id="eventDescription"
            style={{
              marginTop: "25px",
              marginBottom: "25px",
              width: "100%",
            }}
            required
            multiline
            minRows={3}
            maxRows={10}
            label="Description"
            name="eventDescription"
            onChange={this.handleChange}
          />
          <TextField
            id="numGATickets"
            style={{
              marginTop: "25px",
              marginBottom: "25px",
              width: "100%",
            }}
            required
            label="Number of GA Tickets"
            name="numGATickets"
            type="number"
            onChange={this.handleChange}
          />
          <TextField
            id="gaTicketPrice"
            style={{
              marginTop: "25px",
              marginBottom: "25px", 
              width: "100%",
              }}
            required
            label="GA Ticket Price"
            name="gaTicketPrice"
            type="number"
            onChange={this.handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              style={{
                marginTop: "25px",
                marginBottom: "25px",
                alignItems: "center",

              }}
              required
              label="category"
              name="eventCategory"
              onChange={this.handleChange}
            >
              <MenuItem value={"Restaurants"}>Restaurants</MenuItem>
              <MenuItem value={"Festivals"}>Festivals</MenuItem>
              <MenuItem value={"Sports"}>Sports</MenuItem>
              <MenuItem value={"Travel"}>Travel</MenuItem>
              <MenuItem value={"Charity"}>Charity</MenuItem>
              <MenuItem value={"Virtual"}>Virtual</MenuItem>
              <MenuItem value={"Health"}>Health</MenuItem>
            </Select>
          </FormControl>
          {this.state.selectedImage && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(this.state.selectedImage)}
              />
              <br />
              <IconButton
                color="primary"
                component="label"
                onClick={() => {
                  this.setState({ selectedImage: null });
                  this.fileInput.value = "";
                }}
              >
                <AttachFileIcon fontSize="medium" /> Remove Image
              </IconButton>
            </div>
          )}
          {!this.state.selectedImage && (
            <IconButton color="primary" component="label">
              <input
                ref={(ref) => (this.fileInput = ref)}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  this.setState({ selectedImage: e.target.files[0] });
                }}
              />
              <AttachFileIcon fontSize="medium" /> Upload Image
            </IconButton>
          )}
          <Button
            id="createEventButton"
            style={{
              marginTop: "25px",
              marginBottom: "25px",
              width: "50ch",
            }}
            variant="contained"
            onClick={this.handleCreate}

          >
            Create
          </Button>
        </div>
      </Box>
    );
  }
}
