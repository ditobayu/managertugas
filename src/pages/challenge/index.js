import React, { useContext, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { GlobalContext } from "../../contex/GlobalContext";

const Challenge = () => {
  const { isSidebarFull, userData, userToken } = useContext(GlobalContext);
  const challenges = JSON.parse(localStorage.getItem("challenges"));
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(
    selectedChallenge ? selectedChallenge.data[0].video : null
  );
  const [challengePage, setChallengePage] = useState("materi");
  const joinChallenge = async (param) => {
    const challenge = await fetch(
      "https://asdasdasd-ditobayu.vercel.app/challenge/joinChallenge",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
        body: JSON.stringify({ userId: userData.user._id, challengeId: param }),
      }
    ).then((res) => res.json());

    challenges[challenges.findIndex((val) => val._id === challenge._id)] =
      challenge;
    localStorage.setItem("challenges", JSON.stringify(challenges));
    setSelectedChallenge(challenge);
  };
  return (
    <div className="flex flex-row noScrollbar ">
      <Sidebar />

      <div
        className={`flex duration-300 flex-col bg-slate-100 gap-1 dark:bg-slate-900 sm:pr-4 pt-4
          ${isSidebarFull ? " sm:pl-64" : " sm:pl-24"}
          px-1
            w-screen h-full`}
      >
        <div className={`${!selectedChallenge ? "flex" : "hidden"} flex-col`}>
          <div className="text-xl md:text-3xl font-bold p-4">
            Challenge yang Tersedia
          </div>
          {challenges?.map((val, i) => (
            <div
              className="flex flex-row w-full h-40 md:h-64 mb-4 p-4 "
              key={i}
            >
              <button
                onClick={() => setSelectedChallenge(val)}
                disabled={
                  !val.participant.find((val) => val.id === userData.user._id)
                    ? true
                    : false
                }
                className={`${
                  val.participant.find((val) => val.id === userData.user._id)
                    ? "hover:scale-105"
                    : ""
                } h-full w-64 md:w-96 rounded-3xl bg-white shadow-md dark:bg-slate-800 duration-200`}
              ></button>
              <div className="flex flex-col pt-4 px-8 flex-1 justify-between">
                <div className="text-lg md:text-3xl ">{val.title}</div>
                <div className="flex flex-row gap-4">
                  <button
                    onClick={() => joinChallenge(val._id)}
                    className={`${
                      !val.participant.find(
                        (val) => val.id === userData.user._id
                      )
                        ? "flex"
                        : "hidden"
                    } justify-center dark:bg-slate-800 bg-slate-100 p-2 w-24 md:w-36 md:text-md text-sm rounded-xl hover:scale-105 duration-200`}
                  >
                    Join Kelas
                  </button>
                  <button
                    onClick={() => setSelectedChallenge(val)}
                    className={`${
                      val.participant.find(
                        (val) => val.id === userData.user._id
                      )
                        ? "flex"
                        : "hidden"
                    } justify-center dark:bg-slate-800 bg-slate-100 p-2 w-24 md:w-36 md:text-md text-sm rounded-xl hover:scale-105 duration-200`}
                  >
                    Masuk Kelas
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`${
            selectedChallenge
              ? challengePage === "materi"
                ? "flex"
                : "hidden"
              : "hidden"
          } flex-col`}
        >
          <div className="flex justify-between flex-row items-center">
            <div className="m-4 flex items-center flex-row">
              <button
                onClick={() => setSelectedChallenge("")}
                className="h-8 w-8 flex items-center justify-center rounded-full mr-4 bg-white shadow-md dark:bg-slate-800"
              >
                {"<"}
              </button>
              <h3 className="text-xl flex items-center">
                {selectedChallenge.title}
              </h3>
            </div>
            <button
              onClick={() => setChallengePage("leaderboard")}
              className="flex flex-col overflow-hidden mr-8 rounded-xl justify-center hover:scale-105 duration-200 items-center h-full bg-white shadow-md dark:bg-slate-800"
            >
              <div className="mx-4 my-2">Leaderboard</div>
              <div className="h-1 w-full bg-cyan-400"></div>
            </button>
          </div>
          <div className="flex flex-col md:flex-row h-full overflow-hidden noScrollbar overflow-y-scroll">
            <div className="w-full md:w-8/12">
              <iframe
                className="rounded-lg md:rounded-[40px] h-52 sm:h-80 md:h-[400px]"
                width="100%"
                height="100%"
                src={
                  !selectedVideo
                    ? selectedChallenge
                      ? selectedChallenge?.data[0]?.video
                      : null
                    : selectedVideo.video
                }
                title="YouTube video player"
                // frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                // allowFullScreen="true"
                allowFullScreen={true}
              ></iframe>
              <div className="p-4 md:p-8 text-xl ">
                {!selectedVideo
                  ? selectedChallenge
                    ? selectedChallenge?.data[0]?.title
                    : null
                  : selectedVideo.title}
              </div>
              <div className="rounded-3xl h-52 md:h-96 bg-white dark:bg-slate-800 p-4 md:p-8 mb-4">
                <div>Catatan</div>
                {/* <div className=" h-full"> */}
                <textarea
                  style={{ resize: "none" }}
                  className="mt-2 p-4 noScrollbar h-28 md:h-64 w-full bg-transparent border rounded-xl border-slate-600"
                ></textarea>
                <div className="flex flex-row-reverse">
                  <button className="rounded-xl text-sm md:text-md bg-slate-200 dark:bg-slate-600 py-1 md:py-2 hover:bg-green-300 duration-200 px-4">
                    Save
                  </button>
                </div>
                {/* </div> */}
              </div>
            </div>
            <div className="w-full md:w-4/12 md:px-4 mb-16">
              {selectedChallenge?.data?.map((val, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVideo(val)}
                  className="hover:scale-105 duration-200 mb-2 md:mb-4 w-full h-24 bg-white dark:bg-slate-800 shadow-md rounded-3xl p-4 px-8 flex flex-row items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="h-8 w-8 bi bi-play-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                  </svg>
                  <div className="ml-4">
                    <p>
                      {i + 1 + ". "}
                      {val.title}
                    </p>
                    {/* <p>{val.totalMinutes} Minutes</p> */}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`${
            selectedChallenge
              ? challengePage === "leaderboard"
                ? "flex"
                : "hidden"
              : "hidden"
          } flex-col`}
        >
          <div className="flex justify-between flex-row items-center">
            <div className="m-4 flex items-center flex-row">
              <button
                onClick={() => {
                  setSelectedChallenge("");
                  setChallengePage("materi");
                }}
                className="h-8 w-8 flex items-center justify-center rounded-full mr-4 bg-white shadow-md dark:bg-slate-800"
              >
                {"<"}
              </button>
              <h3 className="text-xl flex items-center">Leaderboard</h3>
            </div>
            <button
              onClick={() => setChallengePage("materi")}
              className="flex flex-col overflow-hidden mr-8 rounded-xl justify-center hover:scale-105 duration-200 items-center h-full bg-white shadow-md dark:bg-slate-800"
            >
              <div className="mx-4 my-2">Materi</div>
              <div className="h-1 w-full bg-cyan-400"></div>
            </button>
          </div>
          <div className="flex flex-col-reverse gap-2 md:gap-0 md:flex-row">
            <div className="w-full md:w-8/12 flex flex-col rounded-2xl mb-16 sm:mb-4 bg-white dark:bg-slate-800 shadow-md mr-4">
              <div className="flex flex-row w-full p-4">
                <div className="w-2/12 px-4">Rank</div>
                <div className="w-7/12 px-4">Nama</div>
                <div className="w-3/12 px-4">Score</div>
              </div>
              {selectedChallenge?.participant?.map((val, i) => (
                <div className="flex flex-row w-full p-4" key={i}>
                  <div className="w-2/12 px-4">{i + 1 + "."}</div>
                  <div className="w-7/12 px-4">{val.name}</div>
                  <div className="w-3/12 px-4">{val.name}</div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-4/12">
              <div className="flex flex-col rounded-xl shadow-md bg-white dark:bg-slate-800 p-4">
                <div className="text-xl border-b dark:border-slate-700 mb-2">
                  Statistik Kamu
                </div>
                <div>Materi yang dieselesaikan : 1</div>
                <div>Score : 85</div>
                <div className="flex justify-center">Rangkingmu</div>
                <div className="flex justify-center text-8xl">1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
