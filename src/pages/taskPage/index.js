import React, { useContext, useState } from "react";
import BoxItem from "../../components/BoxItem";
import EditProjectForm from "../../components/EditProjectForm";
import NewProjectForm from "../../components/NewProjectForm";
import Sidebar from "../../components/Sidebar";
import Task from "../../components/Task.js";
import TaskEdit from "../../components/TaskEdit";
import { GlobalContext } from "../../contex/GlobalContext";

const TaskPage = () => {
  const {
    deleteTask,
    editingTask,
    isEditingTask,
    userData,
    isEditingProject,
    deleteProjects,
    isSidebarFull,
    editingProject,
  } = useContext(GlobalContext);
  const [selectedSide, setSelectedSide] = useState("task");
  return (
    <div className="flex flex-row noScrollbar">
      <Sidebar />
      <div
        className={`flex duration-300 flex-col bg-slate-100 ${
          userData.user.data.tasks.length === 0 ? "pb-96" : "pb-48"
        } gap-1 dark:bg-slate-900 sm:pr-4 pt-4
        ${isSidebarFull ? " sm:pl-64" : " sm:pl-24"}
        px-1
          w-screen`}
      >
        <div className="gap-4 flex flex-row mb-2">
          <button
            onClick={() => setSelectedSide("task")}
            className={`${
              selectedSide === "task"
                ? "bg-green-200 dark:bg-green-500"
                : "bg-white dark:bg-slate-800"
            } w-full hover:bg-green-200 hover:dark:bg-green-500 shadow-md duration-200 flex items-center justify-center h-12 rounded-xl`}
          >
            Task
          </button>
          <button
            onClick={() => setSelectedSide("project")}
            className={`${
              selectedSide === "project"
                ? "bg-green-200 dark:bg-green-500"
                : "bg-white dark:bg-slate-800"
            } w-full hover:bg-green-200 hover:dark:bg-green-500 shadow-md duration-200 flex items-center justify-center h-12 rounded-xl`}
          >
            Project
          </button>
        </div>
        <div
          className={` ${selectedSide === "task" ? "flex" : "hidden"} flex-col`}
        >
          <div className="text-lg font-semibold px-4">Tugas</div>
          <div className="px-4 text-sm text-slate-500">
            {userData.user.data.tasks.length > 4
              ? "Banyak bgt tugasnya, Semangat!!!"
              : "Tugasnya kurang banyak"}
          </div>
          <div className="flex flex-row flex-wrap ">
            {userData.user.data.tasks.map((val, index) => (
              <BoxItem
                key={index}
                title={val?.title}
                note={val?.note}
                reminder={val?.reminder}
                index={index}
                deleteTask={deleteTask}
                editingTask={editingTask}
              />
            ))}
          </div>
          <div
            className={`${
              userData.user.data.tasks.length <= 2 && "pb-48"
            } px-1`}
          >
            {isEditingTask ? <TaskEdit /> : <Task />}
          </div>
        </div>
        <div
          className={` ${
            selectedSide === "project" ? "flex" : "hidden"
          } flex-col`}
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
          <div className="px-1">
            {isEditingProject ? <EditProjectForm /> : <NewProjectForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
