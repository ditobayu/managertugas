import React, { useContext, useEffect } from "react";
// import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { GlobalContext } from "../../contex/GlobalContext";
// import io from "socket.io-client";

const Messages = () => {
  const {
    userData,
    isSidebarFull,
    currentReceiver,
    currentChat,
    allUser,
    setAllUser,
    chooseChat,
    chat,
    handleInputChat,
    sendChat,
    isChatOpened,
    setIsChatOpened,
    // setCurrentChat,
    // socket,
    // setSocket,
  } = useContext(GlobalContext);
  // const id = userData.user._id;
  useEffect(() => {
    const fetchData = async () => {
      const qwe = await fetch(
        "https://asdasdasd-ditobayu.vercel.app/users/alluser",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const qwe2 = await qwe.json();
      setAllUser([...qwe2]);
    };
    fetchData();

    // const newSocket = io("http://localhost:3002", { query: { id } });
    // setSocket(newSocket);

    // return () => newSocket.close();
  }, [userData, setAllUser]);

  // useEffect(() => {
  //   if (socket == null) return;

  //   socket.on("receive-message", ({ chat, sender }) => {
  //     setCurrentChat([
  //       ...currentChat,
  //       {
  //         message: chat,
  //         userID1: sender,
  //         userID2: id,
  //       },
  //     ]);
  //   });

  //   return () => socket.off("receive-message");
  // }, [socket, currentChat]);

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div
        className={`flex duration-300 text-slate-700 flex-row bg-slate-100 gap-1 dark:bg-slate-900 sm:pr-4 sm:pt-4 pt-2
        ${isSidebarFull ? " sm:pl-64" : " sm:pl-24"}
        pl-4
          w-screen`}
      >
        <div
          className={`${
            isChatOpened ? "hidden" : "flex"
          } md:flex w-full md:w-3/12 flex-col overflow-y-scroll noScrollbar h-full mr-2`}
        >
          <div>
            <div className="h-20 flex flex-row gap-2 bg-gradient-to-r from-cyan-100 dark:from-cyan-800  to-blue-100 dark:to-blue-800 px-2 rounded-xl mt-4 items-center noScrollbar overflow-x-scroll">
              {allUser
                ?.filter((val) => val._id !== userData.user._id)
                .map((val, i) => (
                  <button
                    onClick={chooseChat}
                    key={i}
                    value={val._id}
                    name={val.firstName + " " + val.lastName}
                    className=""
                  >
                    <div className="pointer-events-none h-10 w-10 p-2 mb-1 rounded-full flex justify-center items-center bg-white dark:bg-slate-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#DADADA"
                        className="bi bi-person-fill h-full w-full rounded-full pointer-events-none"
                        viewBox="0 0 16 16"
                        key={i}
                        value={val._id}
                        name={val.firstName + " " + val.lastName}
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      </svg>
                    </div>
                    <div className="pointer-events-none text-xs text-center dark:text-white text-slate-600">
                      {val.firstName}
                    </div>
                  </button>
                ))}
            </div>
          </div>
          <div className="bg-white dark:text-slate-100 rounded-2xl noScrollbar border border-slate-300 dark:bg-slate-800 dark:border-slate-600 overflow-y-scroll h-full my-4">
            <div className="text-xl bg-slate-100 p-4 py-3 border-b dark:bg-slate-700 border-slate-300 dark:border-slate-600">
              Messages
            </div>
            {allUser
              ?.filter((val) => val._id !== userData.user._id)
              .map((val, i) => (
                <button
                  onClick={chooseChat}
                  key={i}
                  value={val._id}
                  name={val.firstName + " " + val.lastName}
                  className={`${
                    currentReceiver.id === val._id
                      ? "border-l-4 border-cyan-400 darkLborder-cyan-200 bg-gradient-to-r from-cyan-50 dark:from-cyan-600 to-cyan-100 dark:to-cyan-800"
                      : "bg-slate-50 dark:bg-slate-800 dark:border-slate-700 border-slate-300"
                  }  duration-300 flex flex-row items-center w-full font-bold text-xs gap-2 p-2 border-b `}
                >
                  <div className="pointer-events-none h-10 w-10 p-2 rounded-full flex justify-center items-center bg-white dark:bg-slate-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#DADADA"
                      className="bi bi-person-fill h-full w-full pointer-events-none "
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col pointer-events-none ">
                    {val.firstName + " " + val.lastName}
                  </div>
                </button>
              ))}
          </div>
        </div>
        <div
          className={`${
            isChatOpened ? "flex" : "hidden"
          } md:flex flex-col w-full h-full md:w-9/12 pr-2 mr-1 sm:mt-0 mt-1 sm:mr-0 bg-gradient-to-r from-purple-200 dark:from-purple-800 to-pink-200 dark:to-pink-800 overflow-hidden rounded-t-3xl relative`}
        >
          <div className="absolute bg-white dark:bg-slate-700  h-12 w-full px-4 flex items-center">
            <button
              onClick={() => setIsChatOpened(false)}
              className="bg-white dark:bg-slate-500 dark:text-slate-100 rounded-full flex items-center justify-center p-2 mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </button>
            <div className="dark:text-slate-100">
              Chat dengan {currentReceiver?.name}
            </div>
          </div>
          <div className="bg-transparent px-4 py-4 pt-16 pb-16 overflow-y-scroll noScrollbar">
            {currentChat.map((data, index) => (
              <div
                key={index}
                className={
                  data.userID1 === userData.user._id
                    ? "flex mb-2 flex-row-reverse"
                    : "flex mb-2 flex-row"
                }
              >
                <div
                  className={
                    data.userID1 === userData.user._id
                      ? "rounded-xl rounded-tr-sm w-fit p-2 text-sm text-white bg-blue-500"
                      : "rounded-xl rounded-tl-sm w-fit p-2 text-sm text-white bg-gray-800"
                  }
                >
                  {data.message}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={sendChat}
            className="w-full h-16 flex flex-row items-center gap-2 absolute bottom-0 mb-2 px-4"
          >
            <input
              required
              type="text"
              placeholder="Message"
              name="message"
              value={chat}
              onChange={handleInputChat}
              className="w-full h-12 rounded-xl dark:text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 bg-gray-100 dark:bg-slate-700 py-1 px-4 "
            />
            <button
              className="rounded-full bg-slate-100 dark:bg-slate-700 dark:text-slate-100 flex justify-center items-center h-12 w-12"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-send"
                viewBox="0 0 16 16"
              >
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
