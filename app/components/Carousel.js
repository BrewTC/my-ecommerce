"use client";

import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  // slick 設定
  const settings = {
    infinite: true, // 無限循環
    speed: 500, // 滑動速度
    slidesToShow: 1, // 顯示一張圖片
    slidesToScroll: 1, // 每次滑動一張圖片
    autoplay: true, // 啟用自動播放
    autoplaySpeed: 3000, // 每 3 秒切換一張
    nextArrow: <div className="slick-next">Next</div>, // 設定下一張的按鈕
    prevArrow: <div className="slick-prev">Prev</div>, // 設定上一張的按鈕
  };

  return (
    <div className="carousel-container">
      <Slider  {...settings}>
        <div><img src="https://img.shoplineapp.com/media/image_clips/66fa4fd2f4ec27000ed66680/original.png?1727680461" alt="slide1" /></div>
        <div><img src="https://shoplineimg.com/62d43627545586001513ac71/66d6c7fcd288d70013f3ca6b/375x.webp?source_format=jpg%20375w" alt="slide2" /></div>
      </Slider >
    </div>
  );
};

export default Carousel;
