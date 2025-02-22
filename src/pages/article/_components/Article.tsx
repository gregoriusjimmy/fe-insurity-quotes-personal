import Button from "@components/react/Button";
import {
  AlternateCalendarIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TagsIcon,
  TwitterIcon,
  UserIcon,
} from "@components/react/icons";
import axios from "axios";
import dayjs from "dayjs";
import { marked } from "marked";
import { useEffect, useState } from "react";
import type { TCommonAPIRes, TArticle } from "src/api/articles/types";
import { API_URL } from "src/config";
import DOMPurify from "dompurify";
import styles from "./Article.module.css";
import cn from "@lib/cn";
import Skeleton from "@components/react/Skeleton";

const Article = () => {
  const [article, setArticle] = useState<TArticle>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const search = new URLSearchParams(window.location.search).get("s");
        const id = new URLSearchParams(window.location.search).get("id");
        const res = await axios.post<TCommonAPIRes<TArticle[]>>(
          `${API_URL}/articles/search`,
          {
            id: id,
            title: search,
          },
        );
        const sanitizedContent = DOMPurify.sanitize(
          marked(res.data.data[0].content) as string,
        );

        setArticle({ ...res.data.data[0], content: sanitizedContent });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, []);

  return (
    <div className="mt-14 flex flex-col lg:layout">
      <div className="shadow-[0px_4px_100px_0px_rgba(62,75,130,0.1)] rounded-tr-[6.25rem] rounded-br-md rounded-bl-[6.25rem] rounded tl-md bg-white p-5">
        {isLoading ? (
          <Skeleton className=" w-full h-[14.375rem] lg:h-[38.6875rem]  rounded-tr-[6.25rem] rounded-br-md rounded-bl-[6.25rem]" />
        ) : (
          <img
            src={article?.image}
            className="object-cover object-center w-full h-[14.375rem] lg:h-[38.6875rem] rounded-tr-[6.25rem] rounded-br-md rounded-bl-[6.25rem]"
            width={400}
            height={230}
            alt=""
          />
        )}
      </div>
      <div className="layout lg:de-layout mt-10 flex flex-col">
        <div className="flex flex-col lg:flex-row lg:gap-x-12">
          <div className="flex items-center mb-2.5 lg:mb-0">
            {isLoading ? (
              <SkeletonField />
            ) : (
              <>
                <AlternateCalendarIcon className="w-5 h-5 mr-2.5" />
                <span className="text-primary-400 text-[1.375rem]">
                  {dayjs(article?.updateAt).format("DD MMM, YYYY")}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-2.5 lg:mr-12">
              {isLoading ? (
                <SkeletonField />
              ) : (
                <>
                  <UserIcon className="w-5 h-5 mr-2.5" />
                  <span className="text-primary-400 text-[1.375rem]">
                    {article?.authorName}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center">
              {isLoading ? (
                <SkeletonField />
              ) : (
                <>
                  <TagsIcon className="w-5 h-5 mr-2.5" />
                  <span className="text-primary-400 text-[1.375rem]">
                    {article?.tags[0]}
                  </span>
                </>
              )}
            </div>
          </div>
          <Button className="w-[80%] lg:w-[16.8rem] mt-8 lg:ml-auto" isFunnel>
            GET A QUOTE
          </Button>
        </div>
        <div className="border-b border-b-[#679DDD] mt-6 border-opacity-40 relative">
          <div className="absolute w-[20%] left-0 top-0 h-[2px] bg-[radial-gradient(119.17%_304.47%_at_67.78%_-61.67%,_#22C6C6_0%,_#353572_100%)]" />
        </div>
        {isLoading ? (
          <ArticleContentSkeleton />
        ) : (
          <>
            <h1 className="font-black text-3xl lg:text-[2.5rem] mt-10 pb-[1.875rem] lg:mt-[4.375rem] text-gradient-primary">
              {article?.title}
            </h1>
            <div
              className={cn("flex flex-col gap-y-10", styles.markdown)}
              dangerouslySetInnerHTML={{ __html: article?.content || "" }}
            />
          </>
        )}

        <Button className="w-[80%] lg:w-[16.8rem] mt-8 mb-[4.375rem]" isFunnel>
          GET A QUOTE
        </Button>

        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="flex flex-col lg:w-[80%]">
            <h2 className="tracking-[0.3rem] font-extrabold text-secondary-500 mb-5">
              TAG:
            </h2>
            <div className="flex flex-col space-y-7 lg:space-y-0 lg:space-x-7 lg:flex-row lg:flex-wrap ">
              {article?.tags.map((tag, idx) => (
                <Button variant="outlined" className="shrink-0" key={idx}>
                  {tag.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center mt-12 lg:mt-0">
            <h2 className="tracking-[0.3rem] font-extrabold text-secondary-500 whitespace-pre">
              SHARE :
            </h2>
            <div className="flex space-x-2.5 ml-5 items-center">
              <button className="flex items-center justify-center w-[3.125rem] h-[3.125rem] border-2 border-[#3E4B822E] rounded-full bg-[#F4F6FF]">
                <FacebookIcon />
              </button>
              <button className="flex items-center justify-center w-[3.125rem] h-[3.125rem] border-2 border-[#3E4B822E] rounded-full bg-[#F4F6FF]">
                <TwitterIcon />
              </button>
              <button className="flex items-center justify-center w-[3.125rem] h-[3.125rem] border-2 border-[#3E4B822E] rounded-full bg-[#F4F6FF]">
                <PinterestIcon />
              </button>
              <button className="flex items-center justify-center w-[3.125rem] h-[3.125rem] border-2 border-[#3E4B822E] rounded-full bg-[#F4F6FF]">
                <LinkedinIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;

const SkeletonField = () => (
  <>
    <Skeleton className="w-5 h-5 mr-2.5 rounded-full" />
    <Skeleton className="h-[1.375rem] w-24 rounded-md" />
  </>
);

const ArticleContentSkeleton = () => {
  const randomHeights = Array.from(
    { length: 5 },
    () => Math.random() * (10 - 2) + 1, // Random height between 1rem and 1.5rem
  );

  return (
    <div>
      {/* Title Skeleton */}
      <Skeleton className="font-black h-10 w-3/4 lg:h-[2.5rem] lg:w-2/3 mt-10 mb-[1.875rem] lg:mt-[4.375rem] bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />

      {/* Content Skeleton */}
      <div className="flex flex-col gap-y-10">
        {randomHeights.map((height, index) => (
          <Skeleton
            key={index}
            className={`w-full rounded-md`}
            style={{ height: `${height}rem` }}
          />
        ))}
      </div>
    </div>
  );
};
