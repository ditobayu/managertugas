import React, { useContext } from "react";
import { GlobalProvider } from "../GlobalContext";

const BoxItem = (props) => {
  const { hari, months } = useContext(GlobalProvider);
  const task1 = {
    title: props?.title,
    note: props?.note,
    reminder: props?.reminder,
  };
  const project1 = {
    name: props?.name,
    desc: props?.desc,
    progress: props?.progress,
    startDate: props?.startDate,
    deadline: props?.deadline,
  };
  return (
    <div className=" bg-transparent w-1/2 sm:w-1/3 sm:p-2 p-1 text-xs sm:text-sm">
      <div
        key={props.index}
        className="flex flex-col justify-between bg-white dark:bg-slate-800 shadow-lg sm:p-4 p-2 h-48 sm:h-64 overflow-y-scroll noScrollbar rounded-xl"
      >
        <div>
          <div className="text-lg font-bold">
            {props.title && props.title}
            {props.name && props.name}
          </div>
          {props.reminder && (
            <div>
              {props.reminder?.once !== "" &&
                "Pengingat : " +
                  props.reminder.once.slice(8, 10) +
                  " " +
                  months[parseInt(props.reminder.once.slice(5, 7)) - 1] +
                  " " +
                  props.reminder.once.slice(0, 4)}
              {props.reminder.once === "" && "Setiap hari "}
              {props.reminder.once === "" &&
                props.reminder.weekly.map((val, i) => val && hari[i] + ",")}
            </div>
          )}
          {typeof props.progress == "number" && (
            <div className="flex flex-row">
              Progress :{" "}
              {props.progress < 12 ? props.progress * 8 + "%" : "100%"}
            </div>
          )}
          <div className="">
            {props.note && "Note : " + props.note}
            {props.desc && "Deskripsi : " + props.desc}
          </div>
          <div>
            {props.startDate &&
              props.startDate.slice(8, 10) +
                " " +
                months[parseInt(props.startDate.slice(5, 7))] +
                " " +
                props.startDate.slice(0, 4) +
                " ~ "}
            {props.deadline &&
              props.deadline.slice(8, 10) +
                " " +
                months[parseInt(props.deadline.slice(5, 7))] +
                " " +
                props.deadline.slice(0, 4)}
          </div>
        </div>
        <div className="flex flex-row-reverse text-xs sm:text-md gap-2">
          <button
            className="bg-red-400 dark:bg-red-700 rounded-full p-1 sm:p-2 sm:px-3 px-2 hover:scale-110 duration-300 shadow-lg"
            onClick={props.deleteTask ? props.deleteTask : props.deleteProjects}
            value={props.index}
          >
            hapus
          </button>
          <a
            href={props.name ? "#projectEdit" : "#taskEdit"}
            className="bg-orange-200 dark:bg-orange-700 rounded-full p-1 sm:p-2 sm:px-3 px-2 hover:scale-110 duration-300 shadow-lg"
            onClick={
              props.editingTask
                ? () => {
                    props.editingTask(props.index, { ...task1 });
                  }
                : () => {
                    props.editingProject(props.index, { ...project1 });
                  }
            }
            value={props.index}
          >
            edit
          </a>
        </div>
      </div>
    </div>
  );
};

export default BoxItem;
