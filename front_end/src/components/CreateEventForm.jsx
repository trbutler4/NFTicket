import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
export default class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      eventDescription: '',
      numGATickets: '',
      gaTicketPrice: '',
      category: null

    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeCategory = this.changeCategory.bind(this)
  }

  changeCategory = (event) => {
    this.setState({ category: event.target.value })
  };

  handleCreate(event) {
    alert('Creating Event: ' + this.state.eventName);
    event.preventDefault();

    // TODO: redirect to confirmation page
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name

    this.setState({
      [name]: value
    });
  }




  render() {
    return (
      <Box
        stlye={{ justifyContent: 'center', alignItems: 'center' }}
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            backgroundColor: '#f5f5f5',
            padding: '25px',
            width: '80ch',
            borderRadius: '50px',

          }}
        >
          <TextField id="eventName"
            style={{
              marginTop: '25px',
              marginBottom: '25px',
              width: '80ch',

            }}
            required
            label="Event Name"
            name="eventName"
            onChange={this.handleChange}
          />
          <TextField id="eventDescription"
            style={{
              marginTop: '25px',
              marginBottom: '25px',
              width: '80ch'
            }}
            required
            multiline
            minRows={3}
            maxRows={10}
            label="Description"
            name='eventDescription'
            onChange={this.handleChange}
          />
          <TextField id="numGATickets"
            style={{
              marginTop: '25px',
              marginBottom: '25px',
              width: '80ch'
            }}
            required
            label="Number of GA Tickets"
            name='numGATickets'
            onChange={this.handleChange}
          />
          <TextField id="gaTicketPrice"
            style={{
              marginTop: '25px',
              marginBottom: '25px',
              width: '80ch',
            }}
            required
            label="GA Ticket Price"
            name='gaTicketPrice'
            onChange={this.handleChange}
          />
          <FormControl fullWidth>

            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              style={{
                marginTop: '25px',
                marginBottom: '25px',
              }}
              required
              value={this.state.category}
              label="category"
              onChange={this.changeCategory}
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


          <IconButton color="primary" component="label" >
            <input type="file" accept="image/*" hidden />
            <AttachFileIcon fontSize="medium" /> Upload Image
          </IconButton>

          <Button id="createEventButton"
            style={{
              marginTop: '25px',
              marginBottom: '25px',
              width: '50ch'
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
