import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-cyan-300 to-blue-300 dark:from-cyan-700 dark:to-blue-700 flex flex-col items-center ">
      <div className="sm:text-9xl text-8xl font-bold scale-150 mt-64 flex justify-center animate-pulse">
        404
      </div>
      <div className="text-3xl font-bold mt-12 flex justify-center">
        {"OOPS :("}
      </div>
      <div className="text-md flex justify-center">
        Halaman yang kamu cari ngga ada!
      </div>
      <button
        onClick={() => navigate("/")}
        className="p-2 px-4 sm:text-3xl text-lg font-bold hover:shadow-lg hover:bg-green-200 duration-300 mt-8 rounded-xl bg-pink-100"
      >
        Kembali ke Halaman Utama
      </button>
    </div>
  );
};

export default NotFound;
