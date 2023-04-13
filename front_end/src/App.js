import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import MyTicketsPage from "./pages/MyTicketsPage.jsx";
import CreateEventConfirmation from "./pages/CreateEventConfirmation";
import Event from "./pages/Event.jsx";
import { createBrowserHistory as history } from "history";
import Dashboard from "./components/Dashboard";
import Events from "./pages/Events.jsx";
import MyEvents from "./pages/MyEvents.jsx";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Dashboard />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" exact component={CreateEvent} />
          <Route path="/events" exact component={Events} />
          <Route path="/tickets" exact component={MyTicketsPage} />
          <Route path="/myevents" exact component={MyEvents} />
          <Route
            path="create/confirmation"
            exact
            component={CreateEventConfirmation}
          />
          <Route path="/event/:eventId" exact component={Event} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;