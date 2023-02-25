import React, { useContext, useEffect } from "react";
import Content from "../../components/Content.js";
import Sidebar from "../../components/Sidebar.js";
import Topbar from "../../components/Topbar.js";
import { GlobalContext } from "../../contex/GlobalContext.js";

const Dashboard = () => {
  const { isSidebarFull } = useContext(GlobalContext);

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
      localStorage.setItem("contacts", JSON.stringify(qwe2));
    };
    const getAllChallenge = async () => {
      try {
        const challenges = await fetch(
          "https://asdasdasd-ditobayu.vercel.app/challenge/getallchallenge",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        ).then((res) => res.json());

        localStorage.setItem("challenges", JSON.stringify(challenges));
        console.log(challenges);
      } catch (error) {}
    };
    getAllChallenge();
    fetchData();
  }, []);
  return (
    <div className="flex flex-row noScrollbar ">
      <Sidebar />

      <div
        className={`flex duration-300 flex-col bg-slate-100 pb-32 dark:bg-slate-900 
        ${isSidebarFull ? "sm:pl-64" : "sm:pl-24"}
        pl-4
          w-screen`}
      >
        <div className="hidden sm:flex">
          <Topbar />
        </div>
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
