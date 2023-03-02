import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LineItem from './LineItem';

const TicketCard = ({eventName}) => {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={eventName}
        subheader="Date"
      />
      <CardMedia
        component="img"
        height="194"
        image="N/A"
        alt="NFT name"
      />
      <CardContent>

      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to cart">
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}