import React, { useContext, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { GlobalProvider } from "../../GlobalContext";

const Profile = () => {
  const { userData, isSidebarFull, months, setAllUser, allUser } =
    useContext(GlobalProvider);
  useEffect(() => {
    const fetchData = async () => {
      const qwe = await fetch(
        "https://asdasdasd-ditobayu.vercel.app/users/alluser",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const qwe2 = await qwe.json();
      setAllUser([...qwe2]);
    };
    fetchData();
  }, [userData, setAllUser]);
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div
        className={`flex duration-300 flex-row bg-slate-100 pb-8 gap-1 dark:bg-slate-900 sm:pr-4 sm:pt-4 pt-2
        ${isSidebarFull ? " sm:pl-64" : " sm:pl-24"}
        pl-14
          w-screen`}
      >
        <div className="flex flex-col w-full lg:w-7/12 pr-2">
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
          <div className="flex flex-row-reverse mt-2">
            <button
              disabled
              className="p-2 px-3 rounded-full border border-slate-200"
            >
              Edit profil
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
          <div className="bg-slate-50 dark:bg-slate-900 border-slate-300 border dark:border-slate-700 w-full rounded-3xl overflow-y-scroll noScrollbar flex flex-col shadow-md h-full">
            <div className="p-4 text-lg font-bold pb-2"> Pengguna Lainnya</div>
            {allUser
              ?.filter((val) => val._id !== userData.user._id)
              .map((val, i) => (
                <div
                  key={i}
                  className={`
                    duration-300 flex flex-row items-center w-full font-bold text-xs gap-2 p-2 mr-4 border-t border-slate-300 dark:border-slate-700`}
                >
                  <div className="pointer-events-none h-16 w-16 p-2 rounded-full flex justify-center items-center bg-white dark:bg-slate-800">
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
    </div>
  );
};

export default Profile;
