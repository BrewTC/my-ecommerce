"use client";

import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="Grid-row">
          <div className="Grid-item">
            <img 
              src="https://img.shoplineapp.com/media/image_clips/66fa4fd2f4ec27000ed66680/original.png?1727680461" 
              alt="slide1" 
              style={{ width: '100%' }} 
            />
          </div>
        </div>
        <div className="Grid-row">
          <div className="Grid-item">
            <img 
              src="https://shoplineimg.com/62d43627545586001513ac71/66d6c7fcd288d70013f3ca6b/375x.webp?source_format=jpg%20375w" 
              alt="slide2" 
              style={{ width: '100%' }} 
            />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
