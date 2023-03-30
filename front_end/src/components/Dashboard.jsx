import * as React from "react";
import "../styles/dashboard.css";
import ConnectWalletButton from "./ConnectWalletButton";
import Button from "@mui/material/Button";

const Dashboard = (props) => {
  return (
    <nav className={`dashboard-1 ${props.className || ""}`}>
      <p>NFTicket</p>
      {/* <input type="text" placeholder="Search" className="rectangle-3" /> */}

      <Button variant="contained" class="button" href="/">
        Home
      </Button>
      <Button variant="contained" class="button" href="/events">
        Events
      </Button>
      <Button variant="contained" class="button" href="/tickets">
        My Tickets
      </Button>

      <Button variant="contained" class="button" href="/create">
        Create
      </Button>

      <ConnectWalletButton />
    </nav>
  );
};
export default Dashboard;
