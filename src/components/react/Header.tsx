import {
  HEADER_HEIGHT,
  HEADER_HEIGHT_DESKTOP,
  NAV_MENU,
} from "@components/constants";
import React, {
  useMemo,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { CloseIcon, HamburgerIcon, SearchIcon } from "./icons";
import cn from "@lib/cn";

const Input = () => {
  const [input, setInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      window.open("/inquiry", "_blank");
      window.location.href = `/article?s=${encodeURIComponent(input)}`;
    }
  };

  return (
    <div className={cn("rounded-lg max-w-[55%]  lg:max-w-max lg:ml-[3.5rem]")}>
      <div className="relative z-50 ">
        <div
          className={cn(
            "absolute -z-10 w-full h-full inset-0 flex -top-[0.4375rem] -left-[0.4375rem] rounded-[2.1875rem] box-content bg-[rgba(34,198,198,0.3)] p-1.75",
          )}
        />
        <input
          value={input}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className={cn(
            "transition-colors bg-white rounded-[2.1875rem]  text-lg lg:text-xl  text-primary-500 w-full focus:outline-none lg:min-w-[21.8rem]",
            "py-1 lg:py-3 px-4 lg:px-7 pr-10 lg:pr-14 text-primary-500",
          )}
        />

        <div className="absolute right-4 lg:right-7 inset-y-0 flex items-center">
          {!input && (
            <span className="text-lg lg:text-xl text-primaryLight-500 mr-1 lg:mr-2.5">
              Search
            </span>
          )}
          <SearchIcon className="w-5 h-5 lg:w-6 lg:h-6" />
        </div>
      </div>
    </div>
  );
};

type HeaderProps = {
  currentPath: string;
};

const DARK_LOGO_PATHS = ["/inquiry", "/article"];

const Header = ({ currentPath }: HeaderProps) => {
  const [isOpen, setIsOPen] = useState(false);

  const isDark = useMemo(
    () => DARK_LOGO_PATHS.includes(currentPath),
    [currentPath],
  );

  return (
    <>
      <header
        style={{ height: HEADER_HEIGHT_DESKTOP }}
        className={cn(
          "hidden lg:flex absolute top-0 z-30 inset-x-0 items-center bg-transparent ",
          isDark && "border-b border-b-[#679DDD] border-opacity-30",
        )}
      >
        <div className="layout-header flex justify-between items-center">
          <a href="/">
            <img
              src={
                isDark
                  ? "/images/logos/logo-dark.svg"
                  : "/images/logos/logo-white.svg"
              }
              width={67}
              height={35}
              className="w-[12.9375rem] h-[6.8125rem]"
            />
          </a>
          <nav className="flex items-center">
            <div className="flex space-x-[3.75rem]">
              {NAV_MENU.map((menu, key) => (
                <a
                  onClick={() => window.open("/inquiry", "_blank")}
                  href="/rates" //TODO: adjust
                  className={cn(
                    "uppercase text-white font-extrabold",
                    isDark && "text-primary-500",
                  )}
                  key={key}
                >
                  {menu.label}
                </a>
              ))}
            </div>
            <Input />
          </nav>
        </div>
      </header>
      {/* mobile */}
      <header className="absolute lg:hidden top0 z-30 inset-x-0 flex items-center bg-transparent  ">
        <div
          className={cn(
            "flex flex-col w-full pt-5 transition-all rounded-b-3xl",
            isOpen && "bg-white ",
          )}
        >
          <div
            style={{ height: HEADER_HEIGHT }}
            className={cn(
              "layout flex justify-between items-center pb-4",
              isOpen && "border-b border-[#679DDD54]",
            )}
          >
            <a href="/">
              <img
                src={
                  isDark
                    ? "/images/logos/logo-dark.svg"
                    : `/images/logos/logo-${isOpen ? "dark" : "white"}.svg`
                }
                width={67}
                height={35}
                className="w-[4.875rem] h-auto shrink-0"
              />
            </a>
            <Input />
            <div className="bg-[#679DDD1A] p-2 rounded-xl">
              <button
                className="bg-custom-radial p-2.5 rounded-md"
                onClick={() => {
                  setIsOPen((prev) => !prev);
                }}
              >
                {isOpen ? (
                  <CloseIcon className="w-3.5 h-3.5 " />
                ) : (
                  <HamburgerIcon className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
          <nav className={cn("pb-12 invisible mt-9", isOpen && "visible  ")}>
            <div className="flex flex-col space-y-7 items-center">
              {NAV_MENU.map((menu, key) => (
                <a
                  className="uppercase text-primary-500 font-bold"
                  onClick={() => window.open("/inquiry", "_blank")}
                  href="/rates" //TODO: adjust
                  key={key}
                >
                  {menu.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
