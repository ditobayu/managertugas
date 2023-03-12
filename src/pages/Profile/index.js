import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import Sidebar from "../../components/Sidebar";
import { GlobalContext } from "../../contex/GlobalContext";

const Profile = () => {
  const {
    userData,
    isSidebarFull,
    months,
    setAllUser,
    allUser,
    handleLogout,
    coloredTheme,
    handleThemeColor,
    setCurrentColor,
  } = useContext(GlobalContext);
  useEffect(() => {
    const contactss = JSON.parse(localStorage.getItem("contacts"));
    if (contactss) {
      setAllUser(contactss);
    }
  }, [userData, setAllUser]);
  const [theme, setTheme] = useContext(ThemeContext);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const colors = [
    {
      color: "blue",
      style: "bg-blue-300",
    },
    {
      color: "red",
      style: "bg-red-300",
    },
    {
      color: "emerald",
      style: "bg-emerald-300",
    },
    {
      color: "yellow",
      style: "bg-yellow-300",
    },
    {
      color: "orange",
      style: "bg-orange-300",
    },
    {
      color: "cyan",
      style: "bg-cyan-300",
    },
    {
      color: "purple",
      style: "bg-purple-300",
    },
    {
      color: "default",
      style: "bg-slate-500",
    },
  ];
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div
        className={`flex duration-300 flex-row bg-slate-100 pb-8 gap-1 dark:bg-slate-900 sm:pr-4 sm:pt-4 pt-2
        ${isSidebarFull ? " sm:pl-64" : "sm:pl-40 sm:pr-40"}
        px-1
          w-screen`}
      >
        <div className="flex flex-col w-full lg:w-7/12 sm:pr-2">
          <div className="bg-gradient-to-r from-cyan-100 dark:from-cyan-800 to-blue-100 dark:to-blue-800 h-60 relative rounded-2xl">
            <div className="bg-white dark:bg-slate-800 p-4 absolute flex justify-center items-center -bottom-12 sm:-bottom-16 left-4 sm:left-8 rounded-full h-24 sm:h-36 w-24 sm:w-36 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#DADADA"
                className="bi bi-person-fill h-full w-full"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center flex-row-reverse mt-2">
            <button
              onClick={() => {
                setIsOpenSetting((prev) => !prev);
              }}
              className={` rounded-full h-10 w-10 mr-4 p-2 duration-200 hover:bg-slate-200 dark:hover:bg-slate-700`}
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-gear h-full w-full"
                viewBox="0 0 16 16"
              >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col px-8 mt-8">
            <div className="font-bold text-xl">
              {userData.user.firstName + " " + userData.user.lastName}
            </div>
            <div className="">{userData?.user?.profileDesc}</div>
            <div className="flex fleex-row text-md text-slate-400 items-center flex-wrap">
              <div className=" flex flex-row gap-1 mr-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                {userData.user.location}
              </div>
              <div className=" flex flex-row gap-1 mr-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-workspace"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" />
                </svg>
                {userData.user.occupation}
              </div>
              <div className=" flex flex-row gap-1 mr-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-calendar-week"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
                {"Bergabung " +
                  userData.user.createdAt.slice(8, 10) +
                  " " +
                  months[parseInt(userData.user.createdAt.slice(5, 7)) - 1] +
                  " " +
                  userData.user.createdAt.slice(0, 4)}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex hidden w-5/12 h-full">
          <div
            className={` ${coloredTheme.first} border-slate-300 border dark:border-slate-700 w-full rounded-3xl overflow-y-scroll noScrollbar flex flex-col shadow-md h-full`}
          >
            <div className="p-4 text-lg font-bold pb-2"> Pengguna Lainnya</div>
            {allUser
              ?.filter((val) => val._id !== userData.user._id)
              .map((val, i) => (
                <div
                  key={i}
                  className={`
                    duration-300 flex flex-row items-center w-full font-bold text-xs gap-2 p-2 mr-4 border-t border-slate-300 dark:border-slate-700`}
                >
                  <div
                    className={`pointer-events-none h-16 w-16 p-2 rounded-full flex justify-center items-center bg-white dark:bg-slate-800 ${coloredTheme.first} `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#DADADA"
                      className="bi bi-person-fill h-full w-full pointer-events-none "
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col pointer-events-none ">
                    {val.firstName + " " + val.lastName}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div
        className={`fixed ${
          isOpenSetting ? "flex" : "hidden"
        } justify-center scale-100 z-20 items-center h-screen w-screen`}
      >
        <div className="flex gap-4 flex-col h-64 w-[500px] scale-75 md:scale-100 bg-white shadow-md dark:bg-slate-800 rounded-2xl p-4">
          <div className="flex items-center flex-row">
            <button
              onClick={() => {
                setIsOpenSetting(false);
              }}
              className="h-8 w-8 shadow-md hover:scale-105 duration-200 flex items-center justify-center rounded-full mr-4 bg-slate-100 dark:bg-slate-700"
            >
              {"<"}
            </button>
            Pengaturan
          </div>
          <div className="flex flex-row">
            <button
              onClick={handleTheme}
              className="hover:bg-blue-100 h-10 w-10 hover:text-blue-800 font-medium duration-200 rounded-full p-2"
            >
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="h-full w-full bi bi-brightness-high"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="h-full w-full bi bi-moon-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => {
                handleLogout();
                window.location.reload();
              }}
              className="hover:bg-blue-100 h-10 w-10 sm:ml-0 hover:text-blue-800 font-medium duration-200 rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="h-full w-full bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
            </button>
          </div>
          <div className="">Warna Tema</div>
          <div className="flex flex-row">
            {colors.map((val, i) => (
              <div className="w-full" key={i}>
                <button
                  onClick={() => {
                    handleThemeColor(val.color);
                    setCurrentColor(val.color);
                  }}
                  className={`h-10 sm:h-12 w-10 sm:w-12 rounded-full border border-slate-200 ${val.style} `}
                ></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
