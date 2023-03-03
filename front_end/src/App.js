import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import Events from "./pages/Events";
import MyTicketsPage from "./pages/MyTicketsPage";
import CreateEventConfirmation from "./pages/CreateEventConfirmation";
import { createBrowserHistory as history } from "history";
import Dashboard from "./components/dashboard";
import { useState, useEffect } from 'react';

function App() {

  const API_URL = 'http://localhost:3500/events';

  const [ events, setEvents ] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const[search, setSearch] = useState('');

  return (
    <Router history={history}>
      <div className="App">
        <Dashboard
          search={search}
          setSearch={setSearch}
          />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" exact component={CreateEvent} />
          <Route path="/events" exact component={Events} />
          <Route path="/tickets" exact component={MyTicketsPage} />
          <Route path="create/confirmation" exact component={CreateEventConfirmation} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
