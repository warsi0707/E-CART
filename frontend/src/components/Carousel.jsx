import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Carousel() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="h-96 w-full object-cover rounded-md"
      >
        <SwiperSlide className="text-center text-2xl object-center">
          <img
            className="h-full w-full object-fill"
            src="/carousel/shoes.png"
            alt=""
            loading="lazy"
          />
        </SwiperSlide>
        <SwiperSlide className="text-center text-2xl bg-red-400 flex justify-center items-center">
          <img
            src="/carousel/jacket.png"
            className="h-full w-full object-fill"
            alt=""
            loading="lazy"
          />
        </SwiperSlide>
        <SwiperSlide className="text-center text-2xl bg-red-400 flex justify-center items-center">
          <img
            src="/carousel/headphone.png"
            className="h-full w-full object-fill"
            loading="lazy"
          />
        </SwiperSlide>
        <SwiperSlide className="text-center text-2xl bg-red-400 flex justify-center items-center">
          <img
            src="/carousel/bags.png"
            className="h-full w-full object-fill"
            alt=""
            loading="lazy"
          />
        </SwiperSlide>
        <SwiperSlide className="text-center text-2xl bg-red-400 flex justify-center items-center">
          <img
            src="/carousel/tshirt.png"
            className="h-full w-full object-fill"
            alt=""
            loading="lazy"
          />
        </SwiperSlide>
        <SwiperSlide className="text-center text-2xl bg-red-400 flex justify-center items-center">
          <img
            src="/carousel/bags.png"
            className="h-full w-full object-fill"
            alt=""
            loading="lazy"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
