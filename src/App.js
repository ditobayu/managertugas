import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Project from "./pages/project";
import TaskPage from "./pages/taskPage";
import { createContext, useState, useEffect } from "react";
import LandingPage from "./pages/landingPage";
import Cookies from "js-cookie";
import { GlobalProvider } from "./contex/GlobalContext";
import NotFound from "./pages/notFound";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";

export const ThemeContext = createContext();
export const StateManager = createContext();
function App() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const [token, setToken] = useState(useState(Cookies.get("token")));
  return (
    <div className="app text-slate-800 dark:text-white bg-slate-200 dark:bg-slate-800 duration-300">
      <ThemeContext.Provider value={[theme, setTheme]}>
        <StateManager.Provider
          value={{
            token,
            setToken,
          }}
        >
          <BrowserRouter>
            <GlobalProvider>
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
            </GlobalProvider>
          </BrowserRouter>
        </StateManager.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
