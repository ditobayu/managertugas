import React, { useContext } from "react";
import { GlobalProvider } from "../GlobalContext";

const NewProjectForm = () => {
  const {
    project,
    handleInputProject,
    handleIncrementProgress,
    handleDecrementProgress,
    postProjects,
    isLoading,
  } = useContext(GlobalProvider);
  return (
    <div>
      <form
        className="flex flex-col text-xs sm:text-sm text-slate-500 bg-white dark:bg-slate-800 p-4 sm:px-8 rounded-3xl shadow-lg dark:text-slate-100 "
        onSubmit={postProjects}
      >
        <div className="text-slate-900 flex flex-row items-center dark:text-slate-100 text-lg font-bold">
          <div>Buat Project</div>
          {isLoading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-clockwise animate-spin"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
          )}
        </div>
        <div className="flex flex-col sm:gap-4 sm:flex-row">
          <div className="flex flex-col w-full">
            <div className="mt-2 text-md"> Nama Project </div>
            <input
              type="text"
              onChange={handleInputProject}
              value={project.name}
              required
              name="name"
              placeholder="name"
              className=" p-3 px-4 border-2 h-12 rounded-xl bg-transparent dark:border-slate-600 border-slate-300 "
            />
            <div className="mt-3 text-md"> Progress</div>
            <div className="p-3 px-4 rounded-xl bg-orange-100 dark:bg-indigo-900 h-12 flex items-center justify-between">
              <div>{project.progress < 12 ? project.progress * 8 : "100"}%</div>
              <div className="flex flex-row gap-4">
                <div
                  className="flex items-center rounded-full bg-white dark:bg-slate-700 border border-slate-400 p-2 justify-center h-8 w-8 hover:scale-110 shadow-md duration-300"
                  onClick={handleDecrementProgress}
                >
                  <div className="pointer-events-none">-</div>
                </div>
                <div
                  className="flex items-center rounded-full bg-white dark:bg-slate-700 border border-slate-400 p-2 justify-center h-8 w-8 hover:scale-110 shadow-md duration-300"
                  onClick={handleIncrementProgress}
                >
                  <div className="pointer-events-none">+</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="mt-2 text-md"> Deskripsi</div>
            <textarea
              style={{ resize: "none" }}
              type="text"
              onChange={handleInputProject}
              value={project.desc}
              required
              name="desc"
              placeholder="desc"
              className=" p-3 px-4 border-2 noScrollbar h-32 rounded-xl bg-transparent dark:border-slate-600 border-slate-300 "
            />
          </div>
        </div>
        <div className="flex-row flex gap-4 pr-2">
          <div className="mt-2 text-md w-1/2 ">
            Mulai Project
            <input
              type="date"
              onChange={handleInputProject}
              value={project.startDate}
              required
              name="startDate"
              className=" p-3 px-4 border-2 h-12 rounded-xl bg-transparent dark:border-slate-600 border-slate-300 w-full "
            />
          </div>
          <div className="mt-2 text-md w-1/2 ">
            Deadline Project
            <input
              type="date"
              onChange={handleInputProject}
              value={project.deadline}
              required
              name="deadline"
              className=" p-3 px-4 border-2 h-12 rounded-xl bg-transparent dark:border-slate-600 border-slate-300 w-full "
            />
          </div>
        </div>
        <div className="mt-2 flex flex-row-reverse">
          <button
            type="submit"
            className="bg-orange-400 text-white p-3 px-4 hover:scale-110 shadow-md duration-300 rounded-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProjectForm;
