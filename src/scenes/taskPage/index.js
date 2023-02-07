import React, { useContext } from "react";
import BoxItem from "../../components/BoxItem";
import Sidebar from "../../components/Sidebar";
import Task from "../../components/Task.js";
import TaskEdit from "../../components/TaskEdit";
import { GlobalProvider } from "../../GlobalContext";

const TaskPage = () => {
  const { userData, isSidebarFull, deleteTask, editingTask, isEditingTask } =
    useContext(GlobalProvider);
  return (
    <div className="flex flex-row noScrollbar">
      <Sidebar />
      <div
        className={`flex duration-300 flex-col bg-slate-100 ${
          userData.user.data.tasks.length === 0 ? "pb-96" : "pb-48"
        } gap-1 dark:bg-slate-900 sm:pr-4 pt-4
        ${isSidebarFull ? " sm:pl-64" : " sm:pl-24"}
        pl-14
          w-screen`}
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
        <div className={`${userData.user.data.tasks.length <= 1 && "pb-48"}`}>
          {isEditingTask ? <TaskEdit /> : <Task />}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
