import * as React from "react";
import "./MyTicketsPage.css";
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PersonIcon from '@mui/icons-material/Person';
import BrushIcon from '@mui/icons-material/Brush';
import { useState, useEffect } from 'react';
import TicketContent from "../components/ticketComponents/TicketContent";
import SearchEvent from "../components/SearchEvent";

function MyTicketsPage() {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const API_URL = 'http://localhost:3500/tickets';
  const [tickets, setTickets ] = useState([]);
  const[search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json();
        setTickets(listItems);
        setFetchError(null);
      } catch(err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
    (async () => await fetchItems())();
    }, 2000)
  }, [])

  return (
    <div className="tickets">
      <div className="tabs">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab id="tab1" icon={<PersonIcon />}label="OWNED" value="1" />
                <Tab id="tab2" icon={<BrushIcon />}label="CREATED" value="2" />
                <SearchEvent search={search} setSearch={setSearch} />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="ownedNFTS">
                <Box sx={{ flexGrow: 1 }}>
                  <br></br>
                  <br></br>
                  <Grid container spacing={{ xs: 4, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(Array(12)).map((_, index) => (
                      <Grid item xs={4} sm={6} md={3} key={index}> {/* This is where the user owned ticket content will go */}
                        {isLoading && <p>Loading Items...</p>}
                        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
                        {!fetchError && !isLoading && <TicketContent 
                        tickets={tickets.filter(ticketName => ((ticketName.ticketName).toLowerCase()).includes
                          (search.toLowerCase()))}
                        />}
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="createdNFTS">
                <Box sx={{ flexGrow: 1 }}>
                  <br></br>
                  <br></br>
                  <Grid container spacing={{ xs: 4, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(Array(12)).map((_, index) => (
                      <Grid item xs={4} sm={6} md={3} key={index}> {/* This is where the user owned ticket content will go */}
                        {isLoading && <p>Loading Items...</p>}
                        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
                        {!fetchError && !isLoading && <TicketContent 
                        tickets={tickets.filter(ticketName => ((ticketName.ticketName).toLowerCase()).includes
                          (search.toLowerCase()))}
                        />}
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default MyTicketsPage;