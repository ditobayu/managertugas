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
    months,
  } = useContext(GlobalContext);
  const [selectedSide, setSelectedSide] = useState("note");
  const [selectedSide2, setSelectedSide2] = useState("note");
  const navData = [
    {
      title: "Note",
      lowercase: "note",
    },
    {
      title: "Task",
      lowercase: "task",
    },
    {
      title: "Project",
      lowercase: "project",
    },
    {
      title: "Ebook",
      lowercase: "ebook",
    },
  ];
  const [layout, setLayout] = useState(["layout1"]);
  return (
    <div className="flex flex-row noScrollbar">
      <Sidebar />
      <div
        className={`flex duration-300 flex-row bg-slate-100 ${
          userData.user.data.tasks.length === 0 ? "pb-96" : "pb-48"
        } gap-1 dark:bg-slate-900 sm:pr-4 pt-4
        ${
          isSidebarFull
            ? " sm:pl-64"
            : layout.length < 2
            ? "sm:pl-40 sm:pr-40"
            : "sm:pl-4 sm:pr-4"
        }
        px-1
          w-screen`}
      >
        {layout?.map((val, i) => (
          <div
            className={`${
              val === "layout2" ? "hidden sm:flex" : "flex"
            } flex-col w-full`}
          >
            <div className="gap-4 flex duration-200 flex-row mb-2">
              {navData?.map((val2, i) => (
                <button
                  onClick={() => {
                    if (val === "layout1") {
                      setSelectedSide(val2.lowercase);
                    } else {
                      setSelectedSide2(val2.lowercase);
                    }
                  }}
                  className={` ${
                    val === "layout1"
                      ? selectedSide === val2.lowercase
                        ? "dark:border-green-500 border-green-500"
                        : ""
                      : selectedSide2 === val2.lowercase
                      ? " dark:border-green-500 border-green-500"
                      : ""
                  } w-full opacity-30 hover:opacity-100 border-b-2 border-transparent hover:border-green-500 dark:hover:border-green-500 shadow-md duration-200 flex items-center justify-center h-12 `}
                >
                  {val2.title}
                </button>
              ))}
            </div>
            <div
              className={` ${
                val === "layout1"
                  ? selectedSide === "task"
                    ? "flex"
                    : "hidden"
                  : selectedSide2 === "task"
                  ? "flex"
                  : "hidden"
              } flex-col`}
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
                val === "layout1"
                  ? selectedSide === "project"
                    ? "flex"
                    : "hidden"
                  : selectedSide2 === "project"
                  ? "flex"
                  : "hidden"
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
            <div
              className={` ${
                val === "layout1"
                  ? selectedSide === "note"
                    ? "flex"
                    : "hidden"
                  : selectedSide2 === "note"
                  ? "flex"
                  : "hidden"
              } flex-col ${layout.length > 1 ? "sm:p-12" : "sm:p-32"} p-8 pb-0`}
            >
              <input
                type="text"
                // onChange={handleInputTaskNew}
                // value={task.title}
                required
                name="title"
                placeholder="Judul ..."
                className="w-full text-4xl focus:outline-0 bg-transparent"
              />
              <div className="flex flex-row">
                <span className="w-52 duration-100 flex items-center pl-4 py-2 mr-4 cursor-pointer dark:text-slate-300 hover:dark:bg-slate-800">
                  Date Created
                </span>
                <span className="flex items-center justify-center cursor-pointer dark:text-slate-300 ">
                  {new Date().getHours() +
                    "." +
                    new Date().getMinutes() +
                    " - " +
                    new Date().getDate() +
                    " " +
                    months[new Date().getMonth()] +
                    " " +
                    new Date().getFullYear()}
                </span>
              </div>
              <hr className="opacity-50" />
              <textarea
                style={{ resize: "none" }}
                type="text-area"
                // onChange={handleInputTaskNew}
                // value={task.note}
                required
                name="note"
                placeholder="Tulis catatan ..."
                className="styledScrollbar rounded-lg px-4 py-3 bg-transparent w-full h-96 focus:outline-0"
              />
            </div>
            <div
              className={` ${
                val === "layout1"
                  ? selectedSide === "ebook"
                    ? "flex"
                    : "hidden"
                  : selectedSide2 === "ebook"
                  ? "flex"
                  : "hidden"
              } flex-col p-32 pb-0`}
            ></div>
          </div>
        ))}
        <button
          onClick={() => {
            if (layout.length === 1) {
              setLayout((prev) => [...prev, "layout2"]);
            } else {
              setLayout((prev) => ["layout1"]);
            }
          }}
          className="hidden sm:flex hover:dark:bg-slate-800 hover:bg-slate-300 duration-200 rounded-full h-12 w-12 p-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className=""
            viewBox="0 0 16 16"
          >
            <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm8.5-1v12H14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H8.5zm-1 0H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h5.5V2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskPage;
