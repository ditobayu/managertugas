import React, { useContext } from "react";
import BoxItem from "../../components/BoxItem";
import EditProjectForm from "../../components/EditProjectForm";
import NewProjectForm from "../../components/NewProjectForm";
import Sidebar from "../../components/Sidebar";
import { GlobalProvider } from "../../GlobalContext";

const Project = () => {
  const {
    userData,
    isEditingProject,
    deleteProjects,
    isSidebarFull,
    editingProject,
  } = useContext(GlobalProvider);
  return (
    <div className="flex flex-row noScrollbar ">
      <Sidebar />
      <div
        className={`flex duration-300 flex-col bg-slate-100 ${
          userData.user.data.projects.length === 0 ? "pb-96" : "pb-8"
        } gap-1 dark:bg-slate-900 sm:pr-4 sm:pt-4
        ${isSidebarFull ? " sm:pl-64" : " sm:pl-24"}
        pl-14
          w-screen`}
      >
        <div className="text-lg font-semibold px-4">Project</div>
        <div className="px-4 text-sm text-slate-500">
          {userData.user.data.projects.length > 2
            ? "Banyak bgt projectnya, Semangat!!!"
            : "Tambahin lagi projectnya"}
        </div>
        <div className="flex flex-row flex-wrap ">
          {userData.user.data.projects.map((val, index) => (
            <BoxItem
              key={index}
              name={val.name}
              desc={val.desc}
              progress={val.progress}
              deadline={val.deadline}
              startDate={val.startDate}
              index={index}
              editingProject={editingProject}
              deleteProjects={deleteProjects}
            />
          ))}
        </div>
        <div>{isEditingProject ? <EditProjectForm /> : <NewProjectForm />}</div>
      </div>
    </div>
  );
};

export default Project;
