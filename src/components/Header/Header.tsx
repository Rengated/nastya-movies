import { FC, useContext } from "react";
import { Theme } from "@/store/theme";
import changeTheme from "../../../public/static/switch.svg";
import changeThemeBlack from "../../../public/static/black-switch.png";
import Image from "next/image";

export const Header: FC = () => {
  const { currentTheme, toggleTheme } = useContext(Theme);

  return (
    <header
      className={`flex items-center py-10 w-full  justify-center items-center  top-0 left-0 px-5 ${
        currentTheme == "black" ? "text-white" : "text-black"
      }`}
      style={{ zIndex: 6 }}>
      <div className="container flex justify-between">
        <h1 className="text-4xl flex  leading-loose ">LordF</h1>
        <div className="flex items-center">
          <Image
            width={40}
            height={40}
            src={currentTheme == "black" ? changeThemeBlack : changeTheme}
            className={`cursor-pointer ml-4 hover:invert`}
            alt="theme switch p-2"
            onClick={toggleTheme}
          />
        </div>
      </div>
    </header>
  );
};
