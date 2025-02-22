import { Swiper, SwiperSlide } from "swiper/react";

import { Swiper as SwiperType } from "swiper";

import { Controller, Autoplay } from "swiper/modules";

import "swiper/css";
import { useState, type ReactNode } from "react";
import { CarouselLeftIcon, CarouselRightIcon } from "@components/react/icons";

const TestimonialCarousel = () => {
  const [controlledSwiper, setControlledSwiper] = useState<SwiperType>();

  return (
    <div className="layout pt-[5.81rem] lg:pt-[6.3rem] pb-[7.56rem] lg:[pb-9.75rem]">
      <div className="mb-12 lg:mb-[5.56rem] flex flex-col">
        <h1 className="text-secondary-500 tracking-[0.3rem] text-lg font-extrabold  mb-3 uppercase ">
          Hear from Our Clients
        </h1>
        <h2 className="text-3xl text-white font-extrabold lg:font-bold lg:text-[2.5rem]">
          Insurity Quotes
        </h2>
      </div>
      <Swiper
        autoplay
        slidesPerView={1}
        centeredSlides
        onSwiper={setControlledSwiper}
        modules={[Controller, Autoplay]}
        controller={{ control: controlledSwiper }}
      >
        <SwiperSlide>
          <Testimonial
            content={
              <>
                “<strong className="font-extrabold">Insurity</strong> Quotes
                have become a part of our family”
              </>
            }
            location="Florida"
            name="Pam W."
          />
        </SwiperSlide>

        <SwiperSlide>
          <Testimonial
            content={
              <>
                “
                <strong className="font-extrabold">
                  We trust Insurity Quotes
                </strong>{" "}
                like family—it’s our go-to for reliable insurance solutions.”
              </>
            }
            location="HR Manager"
            name="Sarah Mitchell"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Testimonial
            content={
              <>
                “<strong className="font-extrabold">Insurity Quotes</strong>{" "}
                understands our needs like no one else. Their support feels
                personal and genuine.”
              </>
            }
            location="Homeowner"
            name="Emma Thompson"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Testimonial
            content={
              <>
                “
                <strong className="font-extrabold">
                  Choosing Insurity Quotes{" "}
                </strong>{" "}
                was the best decision for our family. Their care and service are
                unmatched!”
              </>
            }
            location="IT Specialist"
            name="Michael Brooks"
          />
        </SwiperSlide>
      </Swiper>
      <div className="flex mt-12 lg:mt-[5.5rem] space-x-4 ">
        <CarouselLeftIcon
          className="w-12 h-12 lg:w-[5rem] lg:h-[5rem] cursor-pointer"
          onClick={() => {
            if (controlledSwiper?.isBeginning) {
              controlledSwiper.slideTo(controlledSwiper.slides.length - 1);
              return;
            }
            controlledSwiper?.slidePrev();
          }}
        />
        <CarouselRightIcon
          className="w-12 h-12 lg:w-[5rem] lg:h-[5rem] cursor-pointer"
          onClick={() => {
            if (controlledSwiper?.isEnd) {
              controlledSwiper.slideTo(0);
              return;
            }
            controlledSwiper?.slideNext();
          }}
        />
      </div>
    </div>
  );
};

export default TestimonialCarousel;

type TestimonialProps = {
  name: string;
  location: string;
  content: ReactNode;
};

const Testimonial = ({ content, location, name }: TestimonialProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-3xl font-light mb-7 text-white lg:text-[5.6rem] leading-[1.2] lg:max-w-[80%]">
        {content}
      </p>
      <div className="flex flex-col">
        <h3 className="font-extrabold text-xl text-white lg:text-2xl">
          {name}
        </h3>
        <p className="text-white">{location}</p>
      </div>
    </div>
  );
};
