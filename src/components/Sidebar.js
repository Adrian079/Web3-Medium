import "./Sidebar.css";
import { Link, Navigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import Logout from "@mui/icons-material/Logout";
import RateReviewIcon from "@mui/icons-material/RateReview";
import logo from "../images/m.png";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import { useContext, useEffect } from "react";
import { Button } from "web3uikit";
import {Ada} from '@web3uikit/icons';


const Sidebar = () => {
  const { logout } = useMoralis();
  const navigate = useNavigate();
  const { theme, toggleTheme, setTheme } = useContext(ThemeContext)

  useEffect(() => {
    const data = window.localStorage.getItem("Theme");
    if( data !== null) setTheme(JSON.parse(data));
  }, [])

  useEffect(() => {
    window.localStorage.setItem("Theme", JSON.stringify(theme));
  },[theme])

  const logOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
    <div id = {theme} className = "bg">
      <div className="siderContent">
        <img className="logo" src={logo}></img>
        <div className="menu">
          <Link to="/" className="link">
            <div className="menuItems">
              <HomeIcon />
            </div>
          </Link>
          <Link to="/myBlogs" className="link">
            <div className="menuItems">
              <BookIcon />
            </div>
          </Link>
          <Link to="/newStory" className="link">
            <div className="menuItems">
              <RateReviewIcon />
            </div>
          </Link>
        </div>
        <div className="logout" onClick={logOut}>
          <Logout />
        </div>
        <div>
        <Ada className="switch" onClick={toggleTheme} fontSize='50px'/>
        </div>
      </div>
      </div>
    </>
  );
};

export default Sidebar;
