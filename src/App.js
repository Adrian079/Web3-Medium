import { Routes, Route } from "react-router-dom";
import NewStory from "./pages/NewStory";
import MyBlogs from "./pages/MyBlogs";
import Blog from "./components/Blog";
import Sidebar from "./components/Sidebar";
import HomeAuth from "./pages/HomeAuth";
import Rightbar from "./components/Rightbar";
import "./App.css";
import logo from "./images/medium.png";
import { useMoralis } from "react-moralis";
import { Button } from "web3uikit";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const ThemeContext = createContext(null);

const App = () => {
  const { isAuthenticated, authenticate } = useMoralis();
  const {ethereum} = window;
  const [theme, setTheme] = useState("light");
  const { logout } = useMoralis();
  const navigate = useNavigate();

 const logOut = async () => {
    await logout();
  };

const toggleTheme = () => {
  setTheme((curr) => (curr === "light" ? "dark" : "light" ))
  window.localStorage.setItem("Theme", JSON.stringify(theme));
};

useEffect(() => {
  const data = window.localStorage.getItem("Theme");
  if( data !== null) setTheme(JSON.parse(data));
}, [])

async function Login() {
  authenticate();
  navigate("/login");
}

async function CheckLogOut() {
  const accounts = await ethereum.request({method: 'eth_accounts'});
      if (accounts && accounts.length <= 0 && window.location.pathname !== "/login") {
        logOut();
        navigate("/login")
      }
}

useEffect(() => {
  const interval = setInterval(() => {
    CheckLogOut();
  }, 1000);
  return () => clearInterval(interval);
}, []);

  return (
  <ThemeContext.Provider value={{ theme, toggleTheme , setTheme}}>
    {isAuthenticated ? (
        <div className="App" id={theme}>
          <div className="sideBar">
            <Sidebar />
          </div>
          <div className="mainWindow">
            <Routes>
              <Route path="/" element={<HomeAuth />} />
              <Route path="/newStory" element={<NewStory />} />
              <Route path="/myBlogs" element={<MyBlogs />} />
              <Route path="/blog/:url" element={<Blog />} />
            </Routes>
          </div>
          <div className="rightBar">
            <Rightbar />
          </div>
        </div>
    ) : (
      <div className="unAuth">
          <img src={logo} alt= "logo" height="200px"/>
          <Button size="large" text="Connect Wallet" onClick={Login}/>
      </div>

    )}
    </ThemeContext.Provider>
  );
};

export default App;
