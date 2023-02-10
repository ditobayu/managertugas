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
    isLoading,
    // setCurrentChat,
    // socket,
    // setSocket,
  } = useContext(GlobalContext);
  // const id = userData.user._id;
  useEffect(() => {
    const contactss = JSON.parse(localStorage.getItem("contacts"));
    if (contactss) {
      setAllUser(contactss);
    }

    // const newSocket = io("http://localhost:3002", { query: { id } });
    // setSocket(newSocket);

    // return () => newSocket.close();
  }, [userData, setAllUser]);

  useEffect(() => {
    if (currentReceiver) {
      document.getElementById("lastChat")?.scrollIntoView();
    }
  }, [currentChat, currentReceiver]);
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
        className={`flex duration-300 text-slate-700 flex-row bg-slate-100 gap-1 dark:bg-slate-900 sm:pr-4 sm:pt-4
        ${isSidebarFull ? " sm:pl-64" : " sm:pl-24"}
        
          w-screen`}
      >
        <div
          className={`${
            isChatOpened ? "hidden" : "flex"
          } md:flex w-full md:w-3/12 flex-col overflow-y-scroll noScrollbar h-full sm:mr-2`}
        >
          <div>
            <div className="h-20 hidden sm:flex flex-row gap-2 bg-gradient-to-r from-cyan-100 dark:from-cyan-800  to-blue-100 dark:to-blue-800 px-2 rounded-xl items-center noScrollbar overflow-x-scroll">
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
          <div className="bg-white sm:pb-0 pb-16 dark:text-slate-100 sm:rounded-2xl noScrollbar border border-slate-300 dark:bg-slate-800 dark:border-slate-600 overflow-y-scroll h-full sm:my-4">
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
                      ? "sm:border-l-4 sm:border-cyan-400 sm:dark:border-cyan-200 sm:bg-gradient-to-r sm:from-cyan-50 sm:dark:from-cyan-600 sm:to-cyan-100 sm:dark:to-cyan-800"
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
                  <div className="flex flex-row pointer-events-none ">
                    {val.firstName + " " + val.lastName}
                    {isLoading && currentReceiver.id === val._id ? (
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
                    ) : null}
                  </div>
                </button>
              ))}
          </div>
        </div>
        <div
          className={`${
            isChatOpened ? "flex" : "hidden"
          } md:flex flex-col w-full h-full md:w-9/12 pr-2 sm:mt-0 bg-gradient-to-r from-purple-200 dark:from-blue-900 to-pink-200 dark:to-indigo-900 overflow-hidden sm:rounded-t-3xl relative`}
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
          <div className="bg-transparent px-4 py-4 pt-16 pb-32 scroll-smooth sm:pb-16 overflow-y-scroll noScrollbar">
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
                  id={index === currentChat.length - 1 ? "lastChat" : null}
                  className={
                    data.userID1 === userData.user._id
                      ? "rounded-xl rounded-tr-sm w-fit p-2 text-sm text-white bg-purple-700"
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
            className="w-full h-16 flex flex-row items-center gap-2 absolute bottom-14 sm:bottom-0 mb-2 px-4"
          >
            <input
              required
              type="text"
              placeholder="Message"
              name="message"
              value={chat}
              onChange={handleInputChat}
              className="flex-1 h-12 rounded-xl dark:text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 bg-gray-100 dark:bg-slate-700 py-1 px-4 "
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
