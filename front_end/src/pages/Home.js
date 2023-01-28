import * as React from "react";
import "./Home.css";
import Dashboard from "./components/dashboard.js";

const Home = () => {
  const propsData = {
    dashboard: {
      dashboard: {
        search: "search",
        events: "Events\n",
        myTickets: "My Tickets\n",
        connectWallet: "Connect Wallet",
        createEvent: "Create Event\n\n",
      },
    },
  };
  return (
    <div className="home">
      <Dashboard className="dashboard-instance-1" {...propsData.dashboard} />
      <span className="nf-ticket">NFTicket</span>
      <span className="create-events-view-a">
        Create Events, View and Transfer tickets{" "}
      </span>
      <div className="rectangle-4">
        <span className="website-description">website description</span>
      </div>
    </div>
  );
};
export default Home;