import React, { useContext } from "react";
import { GlobalContext } from "../contex/GlobalContext";

const Topbar = () => {
  const { userData, coloredTheme } = useContext(GlobalContext);
  const quotes = [
    `“Kegigihan itu penting. Kamu tidak boleh menyerah kecuali terpaksa” – Elon Musk`,
    `“Jangan pernah takut dengan medan perang baru!” – Elon Musk`,
    `“Kesabaran adalah kunci kesuksesan” – Bill Gates`,
    `“Segala sesuatu pasti ada hambatannya” – Jeff Bezos`,
    `“Tetaplah lapar, tetaplah bodoh” – Steve Jobs`,
    `“Fokuskan bisnismu pada solusi” – Nadiem Makarim`,
  ];
  const randomNum = Math.floor(Math.random() * 6);
  return (
    <div
      className={`bg-transparent  duration-300 w-full
       `}
    >
      <div
        className={
          "flex flex-row  m-4 ml-0 text-xs rounded-2xl justify-between items-center px-2 sm:px-8 shadow-md h-auto p-2 sm:h-16 " +
          coloredTheme?.first
        }
      >
        <div className="flex-1">
          <div className="text-xs">{quotes[randomNum]}</div>
        </div>
        <div
          className="w-3/12 flex flex-row-reverse
        "
        >
          {userData.user.firstName + " " + userData.user.lastName}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
