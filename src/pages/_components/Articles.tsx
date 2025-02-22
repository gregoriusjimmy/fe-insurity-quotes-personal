import type { TArticle } from "@api/articles/types";
import {
  AlternateCalendarIcon,
  ArrowRightIcon,
  CarouselLeftIcon,
  CarouselRightIcon,
  UserIcon,
} from "@components/react/icons";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Controller } from "swiper/modules";
import cn from "@lib/cn";
import ButtonLink from "@components/react/ButtonLink";

interface ArticlesProps {
  articles: TArticle[];
}

const Articles = ({ articles }: ArticlesProps) => {
  const [controlledSwiper, setControlledSwiper] = useState<SwiperType>();
  const [controlledSwiperDesktop, setControlledSwiperDesktop] =
    useState<SwiperType>();
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);

  const articlesPer4 = useMemo(() => {
    return articles.reduce<TArticle[][]>((acc, article, index) => {
      const groupIndex = Math.floor(index / 4);
      if (!acc[groupIndex]) acc[groupIndex] = [];
      acc[groupIndex].push(article);
      return acc;
    }, []);
  }, [articles]);

  return (
    <>
      {/* lg */}
      <div className="hidden lg:flex lg:flex-col">
        <div className=" lg:align-start 2xl:ml-[17.7vw] ">
          <Swiper
            style={{ width: "100%" }}
            spaceBetween={27}
            slidesPerGroup={4}
            slidesPerView={4}
            onSlideChange={(swiper) => {
              setCurrentSwipeIndex(swiper.activeIndex);
            }}
            onSwiper={setControlledSwiperDesktop}
            modules={[Controller]}
            controller={{ control: controlledSwiper }}
          >
            {articles.map((article, idx) => (
              <SwiperSlide key={idx}>
                <a
                  href={`article?id=${article.id}`}
                  className="flex flex-col cursor-pointer "
                  key={article.id}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className={cn(
                      "w-full object-cover object-center mb-6",
                      idx % 2 === 0 ? "max-h-[17.375rem]" : "max-h-[20.937rem]",
                    )}
                  />
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center mr-2">
                      <AlternateCalendarIcon className="w-5 h-5 mr-2.5" />
                      <p className="text-primary-500">
                        {dayjs(article.updateAt).format("DD MMM, YYYY")}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <UserIcon className="w-5 h-5 mr-2.5" />
                      <p className="text-primary-500">{article.authorName}</p>
                    </div>
                  </div>
                  <div className="border-b border-b-[#679DDD] border-opacity-40 relative">
                    <div className="absolute w-[10%] left-0 top-0 h-[2px] bg-[radial-gradient(119.17%_304.47%_at_67.78%_-61.67%,_#22C6C6_0%,_#353572_100%)]" />
                  </div>
                  <h2 className="text-primary-500 mt-7 font-bold text-[1.375rem]">
                    {article.title}
                  </h2>
                  {idx === 0 && (
                    <ButtonLink
                      href={`article?id=${article.id}`}
                      size="md"
                      className="flex items-center w-fit mt-7 lg:mt-14"
                    >
                      <span>READ MORE </span>
                      <ArrowRightIcon className="w-4 h-4 ml-11" />
                    </ButtonLink>
                  )}
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex items-center mt-14 layout">
          <div className="border-b border-b-[#679DDD] border-opacity-40 relative w-full mr-3">
            <div
              style={{
                width: `${((currentSwipeIndex ?? 0) / (controlledSwiperDesktop?.slides.length ?? 1) + 0.5) * 100}%`,
              }}
              className="absolute transition-[width]  left-0 -top-1 h-[8px] bg-[radial-gradient(119.17%_304.47%_at_67.78%_-61.67%,_#22C6C6_0%,_#353572_100%)]"
            />
          </div>
          <CarouselLeftIcon
            onClick={() => {
              if (controlledSwiperDesktop?.isBeginning) {
                controlledSwiperDesktop.slideTo(
                  controlledSwiperDesktop.slides.length - 1,
                );
                return;
              }
              controlledSwiperDesktop?.slideTo(0);
            }}
            className="w-[5rem] h-[5rem] mr-5 shrink-0 cursor-pointer"
          />
          <CarouselRightIcon
            onClick={() => {
              if (controlledSwiperDesktop?.isEnd) {
                controlledSwiperDesktop.slideTo(0);
                return;
              }
              controlledSwiperDesktop?.slideTo(
                controlledSwiperDesktop.slides.length - 1,
              );
            }}
            className="w-[5rem] h-[5rem] shrink-0 cursor-pointer"
          />
        </div>
      </div>
      {/* mobile */}
      <div className="flex flex-col lg:hidden">
        <Swiper
          style={{ width: "100%" }}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides
          onSlideChange={(swiper) => {
            setCurrentSwipeIndex(swiper.activeIndex);
          }}
          onSwiper={setControlledSwiper}
          modules={[Controller]}
          controller={{ control: controlledSwiper }}
        >
          {articlesPer4.map((articlesParent, idxParent) => (
            <SwiperSlide key={idxParent}>
              <div className="flex flex-col gap-y-7">
                {articlesParent.map((article, idx) => (
                  <a
                    href={`article?id=${article.id}`}
                    className="flex flex-col "
                    key={article.id}
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full max-h-[21rem] object-cover mb-6"
                    />
                    <div className="flex items-center gap-x-12 mb-3.5">
                      <div className="flex items-center ">
                        <AlternateCalendarIcon
                          id="calendar2"
                          className="w-5 h-5 mr-2.5 shrink-0"
                        />
                        <p className="text-primary-500">
                          {dayjs(article.updateAt).format("DD MMM, YYYY")}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <UserIcon
                          id="user2"
                          className="w-5 h-5 mr-2.5 shrink-0"
                        />
                        <p className="text-primary-500">{article.authorName}</p>
                      </div>
                    </div>
                    <div className="border-b border-b-[#679DDD] border-opacity-40 relative">
                      <div className="absolute w-[10%] left-0 top-0 h-[2px] bg-[radial-gradient(119.17%_304.47%_at_67.78%_-61.67%,_#22C6C6_0%,_#353572_100%)]" />
                    </div>
                    <h2 className="text-primary-500 mt-7 font-bold text-xl">
                      {article.title}
                    </h2>
                    {idx === 0 && (
                      <ButtonLink
                        size="md"
                        className="flex items-center w-fit mt-7"
                        href={`article?id=${article.id}`}
                      >
                        <span>READ MORE </span>
                        <ArrowRightIcon className="w-4 h-4 ml-11" />
                      </ButtonLink>
                    )}
                  </a>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center mt-9">
          <div className="border-b border-b-[#679DDD] border-opacity-40 relative w-full mr-3">
            <div
              style={{
                width: `${((currentSwipeIndex ?? 0) / (controlledSwiper?.slides.length ?? 1) + 0.5) * 100}%`,
              }}
              className="absolute transition-[width]  left-0 -top-1 h-[8px] bg-[radial-gradient(119.17%_304.47%_at_67.78%_-61.67%,_#22C6C6_0%,_#353572_100%)]"
            />
          </div>
          <CarouselLeftIcon
            onClick={() => {
              if (controlledSwiper?.isBeginning) {
                // If at the beginning, go to the last slide (loop)
                controlledSwiper.slideTo(controlledSwiper.slides.length - 1);
              } else {
                // Otherwise, go to the previous slide
                controlledSwiper?.slidePrev();
              }
            }}
            className="w-12 h-12 mr-2 shrink-0 cursor-pointer"
          />
          <CarouselRightIcon
            onClick={() => {
              if (controlledSwiper?.isEnd) {
                // If at the end, go to the first slide (loop)
                controlledSwiper.slideTo(0);
              } else {
                // Otherwise, go to the next slide
                controlledSwiper?.slideNext();
              }
            }}
            className="w-12 h-12 shrink-0 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Articles;
