import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { StateManager } from "../App";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();
export const GlobalProvider = (props) => {
  const navigate = useNavigate();
  const { setToken } = useContext(StateManager);
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const [userData, setUserData] = useState({
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  });
  const [userToken, setUserToken] = useState(Cookies.get("token"));
  const [isSidebarFull, setIsSidebarFull] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
  };
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [months, setMonth] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [days, setDays] = useState([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);
  const monthToggle = (e) => {
    if (e.target.id === "prev") {
      setCurrentMonth((state) => state - 1);
      if (currentMonth === 0) {
        setCurrentMonth(months.length - 1);
        setCurrentYear((state) => state - 1);
      }
    } else {
      setCurrentMonth((state) => state + 1);
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((state) => state + 1);
      }
    }
  };
  const [task, setTask] = useState({
    title: "",
    note: "",
    reminder: {
      weekly: [true, true, true, true, true, true, true],
      once: "",
    },
  });
  const handleInputTaskNew = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "title") {
      setTask({ ...task, title: value });
    } else if (name === "note") {
      setTask({ ...task, note: value });
    } else if (name === "once") {
      setTask({
        ...task,
        reminder: {
          weekly: task.reminder.weekly,
          once: value,
        },
      });
    }
  };
  const postTasks = async (values, onSubmitProps) => {
    values.preventDefault();
    setIsLoading(true);
    const loggedInResponse = await fetch(
      "https://asdasdasd-blgmkqiko-ditobayu.vercel.app/note/addTask",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
        body: JSON.stringify({ id: userData?.user?._id, task }),
      }
    );
    setIsLoading(false);
    setTask({
      title: "",
      note: "",
      reminder: {
        weekly: [true, true, true, true, true, true, true],
        once: "",
      },
    });
    setDisabledRadio(["hidden", "hidden", "hidden"]);
    const loggedIn = await loggedInResponse.json();
    setUserData({ user: loggedIn });
    Cookies.set("user", JSON.stringify(loggedIn), { expires: 1 });
  };
  const [disabledRadio, setDisabledRadio] = useState([
    "hidden",
    "hidden",
    "hidden",
  ]);
  const deleteTask = async (values) => {
    setIsLoading(true);
    const loggedInResponse = await fetch(
      "https://asdasdasd-blgmkqiko-ditobayu.vercel.app/note/removeTask",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
        body: JSON.stringify({
          id: userData?.user?._id,
          index: values.target.value,
        }),
      }
    );
    setIsLoading(false);
    const loggedIn = await loggedInResponse.json();
    setUserData({ user: loggedIn });
    Cookies.set("user", JSON.stringify(loggedIn), { expires: 1 });
  };
  const editingTask = (index, val) => {
    setIsEditingTask(true);
    setEditedTask({
      ...editedTask,
      index,
      task: {
        title: val.title,
        note: val.note,
        reminder: val.reminder,
      },
    });
  };
  const editingProject = (index, val) => {
    setIsEditingProject(true);
    setEditedProject({
      ...editedProject,
      index,
      project: {
        name: val.name,
        desc: val.desc,
        progress: val.progress,
        startDate: val.startDate,
        deadline: val.deadline,
      },
    });
  };
  const [editedTask, setEditedTask] = useState({
    id: userData?.user?._id,
    index: null,
    task: {
      title: "",
      note: "",
      reminder: {
        weekly: [true, true, true, true, true, true, true],
        once: "",
      },
    },
  });
  const [editedProject, setEditedProject] = useState({
    id: userData?.user?._id,
    index: null,
    project: {
      name: "",
      desc: "",
      progress: 0,
      startDate: "",
      deadline: "",
    },
  });
  const handleInputTaskEdit = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "title") {
      setEditedTask({
        ...editedTask,
        task: { ...editedTask.task, title: value },
      });
    } else if (name === "note") {
      setEditedTask({
        ...editedTask,
        task: { ...editedTask.task, note: value },
      });
    } else if (name === "once") {
      setEditedTask({
        ...editedTask,
        task: {
          ...editedTask.task,
          reminder: {
            weekly: editedTask.reminder.weekly,
            once: value,
          },
        },
      });
    }
  };
  const handleInputProjectEdit = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "name") {
      setEditedProject({
        ...editedProject,
        project: { ...editedProject.project, name: value },
      });
    } else if (name === "desc") {
      setEditedProject({
        ...editedProject,
        project: { ...editedProject.project, desc: value },
      });
    } else if (name === "startDate") {
      setEditedProject({
        ...editedProject,
        project: { ...editedProject.project, startDate: value },
      });
    } else if (name === "deadline") {
      setEditedProject({
        ...editedProject,
        project: { ...editedProject.project, deadline: value },
      });
    } else if (name === "progress") {
      setEditedProject({
        ...editedProject,
        project: { ...editedProject.project, progress: value },
      });
    }
  };
  const editTask = async (task) => {
    task.preventDefault();
    setIsLoading(true);
    const loggedInResponse = await fetch(
      "https://asdasdasd-blgmkqiko-ditobayu.vercel.app/note/editTask",

      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
        body: JSON.stringify({ ...editedTask }),
      }
    );
    setIsLoading(false);
    setEditedTask({
      id: userData?.user?._id,
      index: null,
      task: {
        title: "",
        note: "",
        reminder: {
          weekly: [true, true, true, true, true, true, true],
          once: "",
        },
      },
    });
    const loggedIn = await loggedInResponse.json();
    Cookies.set("user", JSON.stringify(loggedIn), { expires: 1 });
    setUserData({ user: loggedIn });
    setIsEditingTask(false);
  };
  const editProject = async (task) => {
    task.preventDefault();
    setIsLoading(true);
    const loggedInResponse = await fetch(
      "https://asdasdasd-blgmkqiko-ditobayu.vercel.app/note/editProject",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
        body: JSON.stringify({ ...editedProject }),
      }
    );
    setIsLoading(false);
    setEditedProject({
      id: userData?.user?._id,
      index: null,
      project: {
        name: "",
        desc: "",
        progress: 0,
        startDate: "",
        deadline: "",
      },
    });
    const loggedIn = await loggedInResponse.json();
    Cookies.set("user", JSON.stringify(loggedIn), { expires: 1 });
    setUserData({ user: loggedIn });
    setIsEditingProject(false);
  };
  const [hari, setHari] = useState([
    " Minggu",
    " Senin",
    " Selasa",
    " Rabu",
    " Kamis",
    " Jumat",
    " Sabtu",
  ]);
  const [project, setProject] = useState({
    name: "",
    desc: "",
    progress: 0,
    startDate: "",
    deadline: "",
  });
  const handleInputProject = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "name") {
      setProject({ ...project, name: value });
    } else if (name === "desc") {
      setProject({ ...project, desc: value });
    } else if (name === "progress") {
      setProject({ ...project, progress: value });
    } else if (name === "startDate") {
      setProject({ ...project, startDate: value });
    } else if (name === "deadline") {
      setProject({ ...project, deadline: value });
    }
  };
  const postProjects = async (values, onSubmitProps) => {
    values.preventDefault();
    setIsLoading(true);
    const loggedInResponse = await fetch(
      "https://asdasdasd-blgmkqiko-ditobayu.vercel.app/note/addproject",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
        body: JSON.stringify({ id: userData?.user?._id, project }),
      }
    );
    setIsLoading(false);
    setProject({
      name: "",
      desc: "",
      progress: 0,
      startDate: "",
      deadline: "",
    });
    const loggedIn = await loggedInResponse.json();
    setUserData({ user: loggedIn });
    Cookies.set("user", JSON.stringify(loggedIn), { expires: 1 });
  };
  const deleteProjects = async (values) => {
    setIsLoading(true);
    const loggedInResponse = await fetch(
      "https://asdasdasd-blgmkqiko-ditobayu.vercel.app/note/removeProject",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
        body: JSON.stringify({
          id: userData?.user?._id,
          index: values.target.value,
        }),
      }
    );
    setIsLoading(false);
    const loggedIn = await loggedInResponse.json();
    setUserData({ user: loggedIn });
    Cookies.set("user", JSON.stringify(loggedIn), { expires: 1 });
  };
  const handleEditIncrementProgress = () => {
    setEditedProject({
      ...editedProject,
      project: {
        ...editedProject.project,
        progress:
          editedProject.project.progress < 12
            ? editedProject.project.progress + 1
            : editedProject.project.progress,
      },
    });
  };
  const handleEditDecrementProgress = () => {
    setEditedProject({
      ...editedProject,
      progress:
        editedProject.project.progress > 0
          ? editedProject.project.progress - 1
          : editedProject.project.progress,
    });
  };
  const handleIncrementProgress = () => {
    setProject({
      ...project,
      progress: project.progress < 12 ? project.progress + 1 : project.progress,
    });
  };
  const handleDecrementProgress = () => {
    setProject({
      ...project,
      progress: project.progress > 0 ? project.progress - 1 : project.progress,
    });
  };
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [dataRegister, setDataRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picturePath: "",
    friends: [],
    data: {
      balance: [],
      projects: [],
      tasks: [],
    },
    location: "",
    occupation: "",
  });
  const [isLoginPage, setIsLoginPage] = useState(true);
  const handleInputLogin = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "email") {
      setDataLogin({ ...dataLogin, email: value });
    } else if (name === "password") {
      setDataLogin({ ...dataLogin, password: value });
    }
  };
  const handleInputRegister = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "email") {
      setDataRegister({ ...dataRegister, email: value });
    } else if (name === "password") {
      setDataRegister({ ...dataRegister, password: value });
    } else if (name === "firstName") {
      setDataRegister({ ...dataRegister, firstName: value });
    } else if (name === "lastName") {
      setDataRegister({ ...dataRegister, lastName: value });
    } else if (name === "picturePath") {
      setDataRegister({ ...dataRegister, picturePath: value });
    } else if (name === "occupation") {
      setDataRegister({ ...dataRegister, occupation: value });
    } else if (name === "friends") {
      setDataRegister({ ...dataRegister, friends: value });
    } else if (name === "location") {
      setDataRegister({ ...dataRegister, location: value });
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const login = async (values, onSubmitProps) => {
    values.preventDefault();
    setIsLoading(true);
    const loggedInResponse = await fetch(
      "https://asdasdasd-blgmkqiko-ditobayu.vercel.app/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataLogin),
      }
    );
    setIsLoading(false);
    const loggedIn = await loggedInResponse.json();
    if (loggedIn.user) {
      setDataLogin({
        email: "",
        password: "",
      });
      setUserData({ user: loggedIn.user });
      setUserToken(loggedIn.token);
      setToken(loggedIn.token);
      Cookies.set("token", loggedIn.token, { expires: 1 });
      Cookies.set("user", JSON.stringify(loggedIn.user), { expires: 1 });
      setEditedTask({ ...editedTask, id: loggedIn.user._id });
      setEditedProject({ ...editedProject, id: loggedIn.user._id });
      navigate("/dashboard");
    } else {
      setFailedLogin(loggedIn);
    }
  };
  const [failedLogin, setFailedLogin] = useState(null);
  const register = async (values, onSubmitProps) => {
    values.preventDefault();
    setIsLoading(true);
    const savedUserResponse = await fetch(
      "https://asdasdasd-blgmkqiko-ditobayu.vercel.app/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataRegister),
      }
    );
    const savedUser = await savedUserResponse.json();
    if (savedUser) {
      setDataRegister({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        picturePath: "",
        friends: [],
        data: {
          balance: [],
          projects: [],
          tasks: [],
        },
        location: "",
        occupation: "",
      });

      setIsLoading(false);
      setIsLoginPage(true);
    }
  };
  const [currentReceiver, setCurrentReceiver] = useState({
    id: null,
    name: null,
  });
  const [currentChat, setCurrentChat] = useState([]);
  const [allUser, setAllUser] = useState(null);
  const chooseChat = async (e) => {
    setIsLoading(true);
    const userID1 = userData.user._id;
    const userID2 = e.target.value;
    setCurrentReceiver({ id: userID2, name: e.target.name });
    const chat = await fetch(
      "https://asdasdasd-ditobayu.vercel.app/users/getchat",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID1, userID2 }),
      }
    );
    const savedChat = await chat.json();
    setCurrentChat([...savedChat]);
    setIsLoading(false);
    setIsChatOpened(true);
  };
  const [chat, setChat] = useState("");
  const handleInputChat = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "message") {
      setChat(value);
    }
  };
  const sendChat = async (e) => {
    e.preventDefault();
    // socket.emit("send-message", { currentReceiver: currentReceiver.id, chat });
    // setCurrentChat([
    //   ...currentChat,
    //   {
    //     userID1: userData.user._id,
    //     userID2: currentReceiver.id,
    //     message: chat,
    //   },
    // ]);
    const chatResponse = await fetch(
      "https://asdasdasd-ditobayu.vercel.app/users/sendchat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID1: userData.user._id,
          userID2: currentReceiver.id,
          message: chat,
        }),
      }
    );
    const chatResponseJson = await chatResponse.json();
    setCurrentChat([...currentChat, chatResponseJson]);
    setChat("");
  };
  const [isChatOpened, setIsChatOpened] = useState(false);

  const [socket, setSocket] = useState();

  const [selectedMenu, setSelectedMenu] = useState("");
  return (
    <GlobalContext.Provider
      value={{
        handleTheme,
        selectedMenu,
        setSelectedMenu,
        socket,
        setSocket,
        currentReceiver,
        setCurrentReceiver,
        currentChat,
        setCurrentChat,
        allUser,
        setAllUser,
        chooseChat,
        chat,
        setChat,
        handleInputChat,
        sendChat,
        isChatOpened,
        setIsChatOpened,
        isLoading,
        setIsLoading,
        failedLogin,
        setFailedLogin,
        handleEditDecrementProgress,
        handleEditIncrementProgress,
        editingProject,
        editProject,
        isEditingProject,
        setIsEditingProject,
        handleDecrementProgress,
        handleIncrementProgress,
        editedProject,
        setEditedProject,
        handleInputProjectEdit,
        editedTask,
        setEditedTask,
        handleInputTaskEdit,
        isEditingTask,
        setIsEditingTask,
        dataLogin,
        setDataLogin,
        dataRegister,
        setDataRegister,
        isLoginPage,
        setIsLoginPage,
        handleInputLogin,
        handleInputRegister,
        login,
        register,
        userData,
        days,
        setDays,
        setUserData,
        monthToggle,
        months,
        setMonth,
        userToken,
        setUserToken,
        isSidebarFull,
        setIsSidebarFull,
        handleLogout,
        currentYear,
        setCurrentYear,
        currentMonth,
        setCurrentMonth,
        task,
        setTask,
        handleInputTaskNew,
        postTasks,
        disabledRadio,
        setDisabledRadio,
        deleteTask,
        editingTask,
        editTask,
        hari,
        setHari,
        project,
        setProject,
        handleInputProject,
        postProjects,
        deleteProjects,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
