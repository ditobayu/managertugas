import React, { useContext } from "react";
import Content from "../../components/Content.js";
import Sidebar from "../../components/Sidebar.js";
import Topbar from "../../components/Topbar.js";
import { GlobalContext } from "../../contex/GlobalContext.js";

const Dashboard = () => {
  const { isSidebarFull } = useContext(GlobalContext);
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
