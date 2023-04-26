import * as React from "react";
import "../styles/dashboard.css";
import ConnectWalletButton from "./ConnectWalletButton";
import Button from "@mui/material/Button";

const Dashboard = (props) => {
  return (
    <nav className={`dashboard-1 ${props.className || ""}`}>
      <p>NFTicket</p>

      <Button variant="text" href="/">
        Home
      </Button>
      <Button variant="text" href="/events">
        Events
      </Button>
      <Button variant="text" href="/tickets">
        My Tickets
      </Button>

      <Button variant="text" className="button" href="/create">
        Create
      </Button>

      <ConnectWalletButton />
    </nav>
  );
};
export default Dashboard;
