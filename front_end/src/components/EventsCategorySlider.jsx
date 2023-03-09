import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function EventsCategorySlider() {

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Resturants",
      id: "resturants",
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: "./rollingloud.jpeg",
      title: "Festivals",
      rows: 2,
      cols: 2,
    },
    {
      img: "./PatrickMahomes.jpeg",
      title: "Sports",
      rows: 2,
      cols: 2,
    },
    {
      img: "./plane.png",
      title: "Travel",
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Charity",
      cols: 2,
    },
    {
      img: "./virtual.jpg",
      title: "Virtual",
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: "./doc.webp",
      title: "Health & Wellness",
    },
  ];

  const handleClick = (e) => {
      console.log(e.target);
  }

  return (
      <ImageList
        sx={{
          gridAutoFlow: "column",
          gridAutoColumns: "minmax(400px, 1fr)",
          width: 1400,
          height: 320,
        }}
        cols={3}
      >
        <ImageListItem key="Subheader" cols={3}></ImageListItem>
        {itemData.map((item) => (
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          </button>
        ))}
      </ImageList>
  );


}
