import * as React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import ConnectWalletButton from './ConnectWalletButton'
import Button from '@mui/material/Button';
import SearchEvent from "./SearchEvent";

const Dashboard = (props) => {
  return (
    <nav className={`dashboard-1 ${props.className || ""}`}>
      <p >NFTicket</p>
      <SearchEvent />
      <Button variant="contained" class="button" href="/">Home
        </Button>
        <Button variant="contained" class="button" href="/events">Events
        </Button>
        <Button variant="contained" class="button" href="/tickets">My Tickets
        </Button>
      <Button variant="contained" class="button" href="/create">Create
        </Button>      
      <ConnectWalletButton />
    </nav>
  );
};
export default Dashboard;
