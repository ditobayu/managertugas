import React, { useContext } from "react";
import Content from "../../components/Content.js";
import Sidebar from "../../components/Sidebar.js";
import Topbar from "../../components/Topbar.js";
import { GlobalProvider } from "../../GlobalContext/index.js";

const Dashboard = () => {
  const { isSidebarFull } = useContext(GlobalProvider);
  return (
    <div className="flex flex-row noScrollbar ">
      <Sidebar />

      <div
        className={`flex duration-300 flex-col bg-slate-100 pb-32 dark:bg-slate-900 
        ${isSidebarFull ? "sm:pl-64" : "sm:pl-24"}
        pl-14
          w-screen`}
      >
        <Topbar />
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
