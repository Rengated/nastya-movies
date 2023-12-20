import { FC, useContext } from "react";
import { Theme } from "@/store/theme";
import phone from "../../../public/static/phone.svg";
import tg from "../../../public/static/tg.svg";
import Image from "next/image";

export const Footer: FC = () => {
  const { currentTheme } = useContext(Theme);
  return (
    <footer
      className={`flex justify-center py-10 ${
        currentTheme == "black" ? "text-white" : "text-black"
      }`}>
      <div className="container">
        <p className="mb-5 text-4xl font-light">Contacts</p>
        <div className="flex items-center mb-4">
          <Image
            src={phone}
            alt="phone"
            className={`mr-2 ${currentTheme == "black" ? "invert" : ""}`}
          />
          <span
            className={`text-xl font-light ${
              currentTheme == "black" ? "text-gray-300" : "text-gray-500"
            }`}>
            +7 (951) 462-08-98
          </span>
        </div>
        <div className="flex items-center">
          <Image
            className={`mr-2 ${currentTheme == "black" ? "invert" : ""}`}
            src={tg}
            alt="tg"
          />
          <span
            className={`text-xl font-light ${
              currentTheme == "black" ? "text-gray-300" : "text-gray-500"
            }`}>
            @anasteshha1
          </span>
        </div>
      </div>
    </footer>
  );
};
