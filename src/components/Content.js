import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalProvider } from "../GlobalContext";
import Task from "./Task";

const Content = () => {
  const { userData, currentYear, currentMonth, months, days, monthToggle } =
    useContext(GlobalProvider);
  const projects = userData.user.data.projects
    .sort(
      (a, b) =>
        parseInt(a.deadline.slice(8, 10)) - parseInt(b.deadline.slice(8, 10))
    )
    .sort(
      (a, b) =>
        parseInt(a.deadline.slice(5, 7)) - parseInt(b.deadline.slice(5, 7))
    )
    .sort(
      (a, b) =>
        parseInt(a.deadline.slice(0, 4)) - parseInt(b.deadline.slice(0, 4))
    )
    .slice(0, 3);

  let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay();
  let lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let lastDayofMonth = new Date(
    currentYear,
    currentMonth,
    lastDateofMonth
  ).getDay();
  let lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();
  let dateCount = [];
  let todayTask = [];

  for (let i = firstDayofMonth; i > 0; i--) {
    dateCount.push({
      task: [],
      active: false,
      date: lastDateofLastMonth - i + 1,
    });
  }

  for (let index = 1; index <= lastDateofMonth; index++) {
    let tanggal = { tasks: [], active: true, date: index };

    userData.user.data.tasks.forEach((val, i) => {
      if (val.reminder.once !== "") {
        if (currentYear === parseInt(val.reminder.once.slice(0, 4))) {
          if (currentMonth === parseInt(val.reminder.once.slice(5, 7)) - 1) {
            if (parseInt(val.reminder.once.slice(8, 10)) === index) {
              tanggal.tasks.push(val);
            }
          }
        }
      } else {
        val.reminder.weekly.forEach((value, i) => {
          if (new Date(currentYear, currentMonth, index).getDay() === i) {
            if (val.reminder.weekly[i]) {
              tanggal.tasks.push(val);
            }
          }
        });
      }
    });
    if (tanggal.tasks.length < 1) {
      delete tanggal.tasks;
    }
    dateCount.push(tanggal);
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    dateCount.push({ task: [], active: false, date: i - lastDayofMonth + 1 });
  }
  for (let i = 0; i < userData.user.data.projects.length; i++) {
    if (
      currentYear ===
      parseInt(userData.user.data.projects[i].startDate.slice(0, 4))
    ) {
      if (
        currentMonth ===
        parseInt(userData.user.data.projects[i].startDate.slice(5, 7)) - 1
      ) {
        let tanggal = parseInt(
          userData.user.data.projects[i].startDate.slice(8, 10)
        );
        if (dateCount[firstDayofMonth + tanggal - 1].activity) {
          dateCount[firstDayofMonth + tanggal - 1].activity.push({
            startProject: userData.user.data.projects[i],
          });
        } else {
          dateCount[firstDayofMonth + tanggal - 1].activity = [
            { startProject: userData.user.data.projects[i] },
          ];
        }
      }
    }
    if (
      currentYear ===
      parseInt(userData.user.data.projects[i].deadline.slice(0, 4))
    ) {
      if (
        currentMonth ===
        parseInt(userData.user.data.projects[i].deadline.slice(5, 7)) - 1
      ) {
        let tanggal = parseInt(
          userData.user.data.projects[i].deadline.slice(8, 10)
        );
        if (dateCount[firstDayofMonth + tanggal - 1].activity) {
          dateCount[firstDayofMonth + tanggal - 1].activity.push({
            deadlineProject: userData.user.data.projects[i],
          });
        } else {
          dateCount[firstDayofMonth + tanggal - 1].activity = [
            { deadlineProject: userData.user.data.projects[i] },
          ];
        }
      }
    }
  }
  userData.user.data.tasks.forEach((val, i) => {
    if (val.reminder.once !== "") {
      if (
        new Date().getFullYear() === parseInt(val.reminder.once.slice(0, 4))
      ) {
        if (
          new Date().getMonth() ===
          parseInt(val.reminder.once.slice(5, 7)) - 1
        ) {
          if (
            new Date().getDate() === parseInt(val.reminder.once.slice(8, 10))
          ) {
            todayTask.push(val);
          }
        }
      }
    } else {
      val.reminder.weekly.forEach((value, i2) => {
        if (new Date().getDay() === i2) {
          if (val.reminder.weekly[i2]) {
            todayTask.push(val);
          }
        }
      });
    }
  });
  const progress = [];
  projects.forEach((val) => {
    progress.push("w-[" + val.progress * 8 + "%]");
  });
  return (
    <div className="h-full w-full bg-transparent dark:bg-slate-900 flex flex-col sm:flex-row flex-wrap pr-4">
      <div className="sm:w-5/12 flex sm:flex-col flex-col-reverse">
        <div className="w-full h-96 ">
          <Task />
        </div>
        <div className="flex flex-col mb-4 mt-12 w-full">
          <div className="px-4 flex w-full flex-row items-center justify-between">
            <Link to="/task" className="text-semibold">
              Tugas
            </Link>
            <Link to="/task" className="text-xs">
              Semua Tugas
            </Link>
          </div>
          <div className="px-4 text-xs text-slate-400 mb-2">
            {todayTask.length > 0
              ? `Kamu punya ${todayTask.length} tugas hari ini`
              : "Kamu gapunya tugas hari ini"}
          </div>
          <div className="flex flex-col gap-2">
            {todayTask.length > 0 ? (
              todayTask?.map((data, index) => (
                <div
                  key={index}
                  className="bg-white overflow-hidden dark:bg-slate-800 flex rounded-3xl py-2 px-6 shadow-md items-center flex-row justify-between"
                >
                  <div className=" flex flex-col ">
                    <Link to="/task" className="w-fit">
                      {data.title}
                    </Link>
                    <Link to="/task" className="w-fit text-xs text-slate-500">
                      {data.note}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-12 w-full text-slate-600 flex justify-center items-center">
                Hari ini ga ada tugas
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="sm:pl-4 sm:w-7/12">
        <div className="mb-4 w-full">
          <div className=" flex flex-row items-center justify-between">
            <Link to="/project" className="text-semibold">
              Project
            </Link>
            <Link to="/project" className="text-xs">
              Semua Project
            </Link>
          </div>
          <div className=" text-xs text-slate-400 ">Project Terdekat</div>
          <div className="w-full">
            <div className="  flex flex-row gap-4 bg-transparent h-36 pb-4">
              {projects.length > 0 ? (
                projects.map((data, i) => (
                  <Link
                    key={i}
                    to="/project"
                    className=" duration-200 mt-2 bg-white dark:bg-slate-800 flex flex-col justify-between shadow-md hover:shadow-lg rounded-3xl h-full p-4 flex-1"
                  >
                    <div className="flex flex-row ">
                      <div>{data.name}</div>
                    </div>
                    <div className="text-xs flex flex-col gap-1 justify-between">
                      <div className="border flex shadow-md border-slate-300 h-2 rounded-full">
                        <div
                          className={`bg-slate-600 dark:bg-slate-300 rounded-full ${progress[i]}`}
                        ></div>
                      </div>
                      <div className="flex flex-col-reverse">
                        {typeof data.progress == "number" && (
                          <div className="flex flex-row">
                            {data.progress < 12
                              ? data.progress * 8 + "%"
                              : "100%"}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row-reverse text-xs">
                      {data.deadline.slice(8, 10) + " "}
                      {months[parseInt(data.deadline.slice(5, 7)) - 1]}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="h-full w-full text-slate-600 flex justify-center items-center">
                  Kamu belum punya project
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" w-full pb-4 ">
          <div className=" flex flex-col bg-white dark:bg-slate-800 dark:text-white shadow-lg rounded-3xl p-4 pb-6 h-full w-full">
            <div className=" flex flex-row justify-between items-center m-4 mt-2">
              <button
                className="shadow-md rounded-full p-2 flex justify-center items-center h-8 w-8 border font-bold border-slate-200"
                onClick={monthToggle}
                id="prev"
              >
                {"<"}
              </button>
              <div>
                {months[currentMonth]} {currentYear}
              </div>
              <button
                className="shadow-md rounded-full p-2 flex justify-center items-center h-8 w-8 border font-bold border-slate-200"
                onClick={monthToggle}
                id="next"
              >
                {">"}
              </button>
            </div>
            <div className="h-full">
              <div className="  grid h-full grid-cols-7  gap-2 grid-flow-row mt-1  noScrollbar ">
                {days.map((data, i) => (
                  <div key={i} className="relative w-full">
                    <div className="flex-col pointer-events-none overflow-hidden items-center flex ">
                      {data}
                    </div>
                  </div>
                ))}
                {dateCount.map((data, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center relative w-full"
                  >
                    <Link
                      className={`${
                        data.tasks
                          ? "text-blue-500 hover:text-blue-500 dark:hover:text-blue-500 focus:text-slate-800"
                          : ""
                      } ${
                        data.activity ? "bg-green-200" : ""
                      } flex-col h-8 w-8 sm:h-12 sm:w-12 dark:hover:bg-slate-700 overflow-hidden dark:focus:bg-slate-800 dark:focus:text-white focus:pointer-events-none focus:absolute focus:z-50 ${
                        i % 7 !== 0
                          ? i % 7 !== 1
                            ? i % 7 !== 2
                              ? i % 7 !== 3
                                ? i % 7 !== 4
                                  ? i % 7 !== 5
                                    ? "focus:right-0"
                                    : "focus:-right-8"
                                  : "focus:-right-16"
                                : "focus:-left-24"
                              : "focus:-left-16"
                            : "focus:-left-8"
                          : "focus:left-0"
                      } focus:top-0 sm:focus:h-96 focus:h-64 sm:focus:w-96 focus:w-64 focus:scale-110 focus:duration-200 focus:bg-white focus:shadow-lg bg-transparent  hover:dark:text-slate-800 hover:bg-slate-200 hover:duration-300 rounded-full focus:rounded-xl p-1 sm:p-2 focus:justify-start focus:items-start focus:p-4 items-center flex  `}
                    >
                      <div
                        className={
                          data.active
                            ? "mt-0 sm:mt-1 "
                            : "mt-0 sm:mt-1 text-slate-400"
                        }
                      >
                        {data.date}
                      </div>
                      <div className="mt-2 text-md">
                        {data.activity !== undefined &&
                          data.activity.map((val, i) => (
                            <div key={i}>
                              {val.startProject &&
                                "Start Project : " + val.startProject.name}
                              {val.deadlineProject &&
                                "Deadline Project : " +
                                  val.deadlineProject.name}
                            </div>
                          ))}
                        {data.tasks !== undefined &&
                          data.tasks.map((val, i) => (
                            <div key={i}>
                              Tugas: {val.title}, {val.note}
                            </div>
                          ))}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-4 text-xs flex flex-row gap-8 mt-2 text-slate-500">
              <div className="flex flex-row items-center gap-1">
                <div className="h-4 w-4 rounded-full bg-blue-500"></div> Tugas
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="h-4 w-4 rounded-full bg-green-200"></div>{" "}
                Project
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
