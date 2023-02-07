import React, { useContext } from "react";
import { ThemeContext } from "../../App.js";
import { GlobalProvider } from "../../GlobalContext/index.js";

const LandingPage = () => {
  const [theme] = useContext(ThemeContext);
  const {
    dataLogin,
    dataRegister,
    isLoginPage,
    setIsLoginPage,
    handleInputLogin,
    handleInputRegister,
    register,
    handleTheme,
    failedLogin,
    login,
    isLoading,
  } = useContext(GlobalProvider);
  return (
    <div className="h-screen bg-purple-400 dark:bg-slate-600 w-screen p-4 md:p-8">
      <div className="bg-slate-200 dark:bg-slate-800 h-full rounded-3xl p-12 px-8 sm:px-20 text-xs sm:text-sm">
        <div className="flex justify-between items-center">
          <div className="md:pl-8 pl-4 md:text-3xl text-xl font-normal ">
            Task Manager
          </div>
          <div className="flex items-center">
            <button
              onClick={handleTheme}
              className="hover:bg-blue-100 hover:text-blue-800 mr-4 font-medium duration-200 rounded-full p-2"
            >
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-brightness-high"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-moon-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => {
                setIsLoginPage(true);
              }}
              className=" mr-4 md:flex hidden rounded-lg hover:scale-110 text-white duration-300 shadow-md dark:bg-purple-700 bg-purple-500 px-3 p-2"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsLoginPage(false);
              }}
              className=" md:flex hidden rounded-lg hover:scale-110 text-white duration-300 shadow-md dark:bg-purple-700 bg-purple-500 px-3 p-2"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="flex flex-row-reverse h-full">
          {isLoginPage ? (
            <div className="bg-white  dark:bg-slate-600 rounded-3xl p-8 py-6 h-96 mt-12 w-full my-auto md:w-4/12 text-slate-800 dark:text-white">
              <div className="text-xl">Sign In</div>
              <div className="mb-4 text-slate-400 text-xs">
                Tugasmu udah kangen sama kamu
              </div>
              <div>
                <form
                  className="flex flex-col gap-2 dark:text-slate-100 text-slate-800"
                  onSubmit={login}
                >
                  <div className="relative createInput mb-2">
                    <input
                      type="text"
                      onChange={handleInputLogin}
                      value={dataLogin.email}
                      required
                      name="email"
                      className="relative focus:outline-none bg-transparent h-10 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:font-semibold text-sm border border-gray-400 rounded-md py-1 px-4 w-full"
                    />
                    <span className="absolute bg-white md:text-xs dark:bg-slate-600 dark:text-slate-100 left-0 mt-3 md:ml-2 lg:ml-4 ml-4 text-sm duration-300  text-gray-500 font-normal">
                      Email
                    </span>
                  </div>
                  <div className="relative createInput">
                    <input
                      type="password"
                      onChange={handleInputLogin}
                      value={dataLogin.password}
                      required
                      name="password"
                      className="relative focus:outline-none bg-transparent h-10 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:font-semibold text-sm border border-gray-400 rounded-md py-1 px-4 w-full"
                    />
                    <span className="absolute bg-white md:text-xs dark:bg-slate-600 dark:text-slate-100 left-0 mt-3 md:ml-2 lg:ml-4 ml-4 text-sm duration-300 text-gray-500 font-normal">
                      Password
                    </span>
                  </div>
                  {failedLogin?.msg && (
                    <div className="text-slate-700">{failedLogin?.msg}</div>
                  )}
                  {isLoading && (
                    <div className="flex flex-row items-center">
                      <div className="text-slate-700">Loading...</div>
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
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      className=" hover:scale-105 w-full duration-300 shadow-md bg-blue-500 text-white p-3 px-4 rounded-lg"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="flex justify-center text-xs">
                    <div className="text-slate-400">Kamu belum punya akun?</div>
                    <button
                      onClick={() => {
                        setIsLoginPage(false);
                      }}
                      className="text-blue-500"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white z-50 dark:bg-slate-600 rounded-3xl px-8 lg:px-8 md:px-4 py-6 h-96 mt-12 w-full md:w-4/12 dark:text-slate-100 text-slate-900">
              <div className="text-xl ">Sign Up</div>
              <div className="mb-4 text-slate-400 text-xs">
                Apaaa?? Kamu belum ngatur tugasmu?
              </div>
              <div>
                <form
                  className="flex flex-col gap-2 dark:text-slate-100 text-slate-900"
                  onSubmit={register}
                >
                  <div className="flex flex-row justify-between w-full gap-2">
                    <div className="relative createInput mb-1">
                      <input
                        type="text"
                        onChange={handleInputRegister}
                        value={dataRegister.firstName}
                        required
                        name="firstName"
                        className="relative focus:outline-none bg-transparent h-10 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:font-semibold text-sm border border-gray-400 rounded-md py-1 px-4 w-full"
                      />
                      <span className="absolute truncate bg-white md:text-xs dark:bg-slate-600 dark:text-slate-100 left-0 mt-3 md:ml-2 lg:ml-4 ml-4 text-sm duration-300 text-gray-500 font-normal">
                        First Name
                      </span>
                    </div>
                    <div className="relative createInput mb-1">
                      <input
                        type="text"
                        onChange={handleInputRegister}
                        value={dataRegister.lastName}
                        required
                        name="lastName"
                        className="relative focus:outline-none bg-transparent h-10 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:font-semibold text-sm border border-gray-400 rounded-md py-1 px-4 w-full"
                      />
                      <span className="absolute truncate bg-white md:text-xs dark:bg-slate-600 dark:text-slate-100 left-0 mt-3 md:ml-2 lg:ml-4 ml-4 text-sm duration-300 text-gray-500 font-normal">
                        Last Name
                      </span>
                    </div>
                  </div>
                  <div className="relative createInput mb-1">
                    <input
                      type="text"
                      onChange={handleInputRegister}
                      value={dataRegister.email}
                      required
                      name="email"
                      className="relative focus:outline-none bg-transparent h-10 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:font-semibold text-sm border border-gray-400 rounded-md py-1 px-4 w-full"
                    />
                    <span className="absolute bg-white md:text-xs dark:bg-slate-600 dark:text-slate-100 left-0 mt-3 md:ml-2 lg:ml-4 ml-4 text-sm duration-300 text-gray-500 font-normal">
                      Email
                    </span>
                  </div>
                  <div className="relative createInput mb-1">
                    <input
                      type="password"
                      onChange={handleInputRegister}
                      value={dataRegister.password}
                      required
                      name="password"
                      className="relative focus:outline-none bg-transparent h-10 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:font-semibold text-sm border border-gray-400 rounded-md py-1 px-4 w-full"
                    />
                    <span className="absolute bg-white md:text-xs dark:bg-slate-600 dark:text-slate-100 left-0 mt-3 md:ml-2 lg:ml-4 ml-4 text-sm duration-300 text-gray-500 font-normal">
                      Password
                    </span>
                  </div>
                  <div className="flex flex-row justify-between w-full gap-2">
                    <div className="relative createInput mb-1">
                      <input
                        type="text"
                        onChange={handleInputRegister}
                        value={dataRegister.location}
                        required
                        name="location"
                        className="relative focus:outline-none bg-transparent h-10 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:font-semibold text-sm border border-gray-400 rounded-md py-1 px-4 w-full"
                      />
                      <span className="absolute bg-white md:text-xs dark:bg-slate-600 dark:text-slate-100 left-0 mt-3 md:ml-2 lg:ml-4 ml-4 text-sm duration-300 text-gray-500 font-normal">
                        Location
                      </span>
                    </div>
                    <div className="relative createInput mb-1">
                      <input
                        type="text"
                        onChange={handleInputRegister}
                        value={dataRegister.occupation}
                        required
                        name="occupation"
                        className="relative focus:outline-none bg-transparent h-10 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:font-semibold text-sm border border-gray-400 rounded-md py-1 px-4 w-full"
                      />
                      <span className="absolute bg-white md:text-xs dark:bg-slate-600 dark:text-slate-100 left-0 mt-3 md:ml-2 lg:ml-4 ml-4 text-sm duration-300 text-gray-500 font-normal">
                        Occupation
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className=" hover:scale-105 w-full duration-300 shadow-md bg-blue-500 p-3 px-4 text-slate-100 rounded-lg"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="flex justify-center text-xs">
                    <div className="text-slate-400">Kamu udah punya akun?</div>
                    <button
                      onClick={() => {
                        setIsLoginPage(true);
                      }}
                      className="text-blue-500"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="hidden md:flex w-8/12 relative">
            <div className="floating bg-white dark:bg-pink-900 absolute top-0 left-8 lg:left-20 overflow-hidden h-1/2 w-8/12 lg:w-[400px] mt-12 rounded-xl">
              <div className="h-8 bg-purple-400 px-4 gap-2 dark:bg-slate-400 flex flex-row items-center">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <div className="h-2 w-2 rounded-full bg-white"></div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="font-bold text-lg">Dashboard</div>
                <div className="flex items-center dark:text-slate-300 text-purple-400">
                  Student
                </div>
              </div>
              <div className="h-1/2 gap-4 flex flex-row px-4">
                <div className="bg-slate-100 dark:bg-slate-600 p-2 flex flex-row gap-2 rounded-xl w-2/3">
                  <div className="h-full bg-white dark:bg-slate-500 w-1/2 rounded-xl"></div>
                  <div className="h-full bg-white dark:bg-slate-500 w-1/2 rounded-xl"></div>
                </div>
                <div className="w-1/3 flex gap-2 flex-col">
                  <div className="bg-slate-100 dark:bg-slate-600 h-1/3 rounded-xl"></div>
                  <div className="bg-slate-100 dark:bg-slate-600 h-1/3 rounded-xl"></div>
                  <div className="bg-slate-100 dark:bg-slate-600 h-1/3 rounded-xl"></div>
                </div>
              </div>
            </div>
            <div className="floating2 bg-white dark:bg-pink-900 absolute top-40 lg:top-40 left-36 lg:left-64 overflow-hidden h-2/6 w-1/2 mt-12 rounded-xl">
              <div className="h-8 bg-purple-400 px-4 gap-2 dark:bg-slate-400 flex flex-row items-center">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <div className="h-2 w-2 rounded-full bg-white"></div>
              </div>
              <div className="h-4/5 gap-4 flex flex-row p-4">
                <div className="w-1/3 flex gap-2 flex-col">
                  <div className="bg-slate-100 dark:bg-slate-600 h-1/2 rounded-xl"></div>
                  <div className="bg-slate-100 dark:bg-slate-600 h-1/2 rounded-xl"></div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-600 p-2 flex flex-row gap-2 rounded-xl w-2/3">
                  <div className="h-full bg-white dark:bg-slate-500 w-1/2 rounded-xl"></div>
                  <div className="h-full bg-white dark:bg-slate-500 w-1/2 rounded-xl"></div>
                </div>
              </div>
              <div className="bg-purple-400 hiding h-24 w-16 overflow-hidden rounded-full absolute left-24 -bottom-28">
                <div className="w-full flex justify-between flex-row p-2 pt-8">
                  <div className="flex justify-center items-center bg-white h-4 w-4 rounded-full">
                    <div className="h-2 w-2 bg-slate-700 rounded-full"></div>
                  </div>
                  <div className="flex justify-center items-center bg-white h-4 w-4 rounded-full">
                    <div className="h-2 w-2 bg-slate-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-lg absolute bottom-12 left-0">
              <div className="font-bold">Atur tugas dan kehidupanmu.</div>
              <div>
                Menjadi fokus, terorganisir, dan tenang dengan Task Manager.
                Tambahkan tugasmu. Atur hidupmu. Berkembang lebih banyak setiap
                hari.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
