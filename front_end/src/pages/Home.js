import React, { useState, useEffect } from "react";
import "./Home.css";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Home = () => {

  return (
    <div className="home" style={{ backgroundImage: "url(https://www.billboard.com/wp-content/uploads/2022/03/UMF2022_0327_190211-9411_ALIVECOVERAGE.jpg?w=1024)" }}>

      <br />
      <br />

      <div className="nf-ticket">NFTicket</div>
      <br />



      <div className="rectangle-4">
        <span className="website-description">
          <p>Welcome to NFTicket, your ultimate source for all your nft ticketing needs. We are a team of dedicated professionals who specialize in providing a comprehensive platform for the transfer, creation, and viewing of NFT tickets. Our platform makes it easy and simple to manage your upcoming events </p>
        </span>
      </div>
    <div className="mediaButtons">

      <Stack id="mediaButtonsStack" direction="row" spacing={2}>
        <IconButton id="twitterButton" aria-label="Twitter" size="large">
          <TwitterIcon/>
        </IconButton>
        <IconButton id="instaButton"aria-label="Instagram" size="large">
          <InstagramIcon/>
        </IconButton>
        <IconButton id="facebookButton" aria-label="Facebook" size="large">
          <FacebookIcon/>
        </IconButton>
        <IconButton id="youtubeButton" aria-label="YouTube" size="large">
          <YouTubeIcon/>
        </IconButton>
      </Stack>
    </div>
    </div>
  );
};
export default Home;
