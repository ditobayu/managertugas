import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Project from "./scenes/project";
import TaskPage from "./scenes/taskPage";
import { createContext, useState, useEffect } from "react";
import LandingPage from "./scenes/landingPage";
import Cookies from "js-cookie";
import { GlobalContext } from "./GlobalContext";
import NotFound from "./scenes/notFound";
import Profile from "./scenes/Profile";
import Messages from "./scenes/Messages";

export const ThemeContext = createContext();
export const StateManager = createContext();
function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const [token, setToken] = useState(useState(Cookies.get("token")));
  return (
    <div className="app text-slate-800 dark:text-white duration-300">
      <ThemeContext.Provider value={[theme, setTheme]}>
        <StateManager.Provider
          value={{
            token,
            setToken,
          }}
        >
          <BrowserRouter>
            <GlobalContext>
              <Routes>
                <>
                  <Route path="*" element={<NotFound />} />
                  <Route
                    path="/dashboard"
                    element={
                      Cookies.get("token") ? <Dashboard /> : <Navigate to="/" />
                    }
                  />
                  <Route
                    path="/project"
                    element={
                      Cookies.get("token") ? <Project /> : <Navigate to="/" />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      Cookies.get("token") ? <Profile /> : <Navigate to="/" />
                    }
                  />
                  <Route
                    path="/task"
                    element={
                      Cookies.get("token") ? <TaskPage /> : <Navigate to="/" />
                    }
                  />
                  <Route
                    path="/messages"
                    element={
                      Cookies.get("token") ? <Messages /> : <Navigate to="/" />
                    }
                  />
                  <Route
                    path="/"
                    element={
                      Cookies.get("token") ? (
                        <Navigate to="/dashboard" />
                      ) : (
                        <LandingPage />
                      )
                    }
                  />
                </>
              </Routes>
            </GlobalContext>
          </BrowserRouter>
        </StateManager.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
