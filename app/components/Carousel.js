"use client";

import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Carousel = () => {
  return (
    <OwlCarousel
      className="owl-theme"
      loop
      margin={10}
      nav
      items={1}
      autoplay
      autoplayTimeout={3000}
    >
      <div className="item">
        <img
          src="https://img.shoplineapp.com/media/image_clips/66fa4fd2f4ec27000ed66680/original.png?1727680461"
          alt="Carousel Image"
        />
      </div>
      <div className="item">
        <img
          src="https://shoplineimg.com/62d43627545586001513ac71/66d6c7fcd288d70013f3ca6b/375x.webp?source_format=jpg%20375w,%20https://shoplineimg.com/62d43627545586001513ac71/66d6c7fcd288d70013f3ca6b/540x.webp?source_format=jpg%20540w,%20https://shoplineimg.com/62d43627545586001513ac71/66d6c7fcd288d70013f3ca6b/720x.webp?source_format=jpg%20720w,%20https://shoplineimg.com/62d43627545586001513ac71/66d6c7fcd288d70013f3ca6b/900x.webp?source_format=jpg%20900w,%20https://shoplineimg.com/62d43627545586001513ac71/66d6c7fcd288d70013f3ca6b/1080x.webp?source_format=jpg%201080w,%20https://shoplineimg.com/62d43627545586001513ac71/66d6c7fcd288d70013f3ca6b/1296x.webp?source_format=jpg%201296w,%20https://shoplineimg.com/62d43627545586001513ac71/66d6c7fcd288d70013f3ca6b/1512x.webp?source_format=jpg%201512w,%20https://shoplineimg.com/62d43627545586001513ac71/66d6c7fcd288d70013f3ca6b/2160x.webp?source_format=jpg%202160w,%20https://shoplineimg.com/62d43627545586001513ac71/66d6c7fcd288d70013f3ca6b/2960x.webp?source_format=jpg%202960w,%20https://shoplineimg.com/62d43627545586001513ac71/66d6c7fcd288d70013f3ca6b/3260x.webp?source_format=jpg%203260w,%20https://shoplineimg.com/62d43627545586001513ac71/66d6c7fcd288d70013f3ca6b/3860x.webp?source_format=jpg%203860w"
          alt="Placeholder Image"
        />
      </div>
    </OwlCarousel>
  );
};

export default Carousel;
