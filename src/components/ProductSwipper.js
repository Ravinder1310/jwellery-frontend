import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const baseURL = process.env.REACT_APP_API;

export default function ProductSwipper({prd}) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
       }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      > 
        {
            prd?.map((p) => {
                <SwiperSlide><img src={`${baseURL}/${p.photo1}`} />Hello</SwiperSlide>
            })
        }
      </Swiper>
    </>
  );
}



