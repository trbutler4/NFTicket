import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function EventsCategoryCar() {


    return (

        <div className="events">
            <Carousel

                showArrows={true}
                showThumbs={true}
                thumbWidth={50}

                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
                transitionTime={1000}
                stopOnHover={true}
                swipeable={true}
                dynamicHeight={true}
                emulateTouch={true}
                useKeyboardArrows={true}
                centerMode={true}
                centerSlidePercentage={25}
                className="demo-carousel"
                focusOnSelect={true}

            >
                <div style={{ fontSize: "50px" }}>
                    <img src="./wineDinner.jpg" />
                    <p className="legend" >Resturants</p>

                </div>
                <div>
                    <img src="./edm.jpg" />
                    <p className="legend">Festivals</p>
                </div>
                <div>
                    <img src="./sports.jpg" />
                    <p className="legend">Sports</p>
                </div>
                <div>
                    <img src="./travel.jpg" />
                    <p className="legend">Travel</p>
                </div>
                <div>
                    <img src="./charity.jpg" />
                    <p className="legend">Charity</p>
                </div>
                <div>
                    <img src="./virtual.jpg" />
                    <p className="legend">Virtual</p>
                </div>
                <div>
                    <img src="./fitness.jpg" />
                    <p className="legend">Health & Wellness</p>
                </div>

            </Carousel>
        </div>

    );


}
