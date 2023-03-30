import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

export default function EventsCategorySlider(props) {

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      category: "Resturants",
    },
    {
      img: "./rollingloud.jpeg",
      category: "Festivals",
    },
    {
      img: "./PatrickMahomes.jpeg",
      category: "Sports",
    },
    {
      img: "./plane.png",
      category: "Travel",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      category: "Charity",
    },
    {
      img: "./virtual.jpg",
      category: "Virtual",
    },
    {
      img: "./doc.webp",
      category: "Health & Wellness",
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  const handleCategoryClick = (itemData) => {
    setSelectedCategory(itemData.category);
    const db = firebase.firestore();
    db.collection("events")
      .where("eventCategory", "==", itemData.category)
      .get()
      .then((querySnapshot) => {
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push(doc.data());
        });
        setFilteredEvents(events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

return (
  <><ImageList
    sx={{
      gridAutoFlow: "column",
      gridAutoColumns: "minmax(400px, 1fr)",
      width: 1400,
      height: 320,
    }}
    cols={3}
  >
    <ImageListItem key="Subheader" cols={3}></ImageListItem>
    {itemData.map((itemData) => (
      <button
        key={itemData.category}
        onClick={() => {
          handleCategoryClick(itemData);
        } }
      >
        <ImageListItem key={itemData.img}>
          <img
            src={`${itemData.img}?w=248&fit=crop&auto=format`}
            srcSet={`${itemData.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={itemData.category}
            loading="lazy" />
          <ImageListItemBar
            category={itemData.category}
            subtitle={itemData.category}
            actionIcon={<IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${itemData.category}`}
            >
              <InfoIcon />
            </IconButton>} />
        </ImageListItem>
      </button>
    ))}
  </ImageList><ul>
      {filteredEvents.map((event) => (
        <li key={event.id}>{event.name}</li>
      ))}
    </ul></>
);
}
