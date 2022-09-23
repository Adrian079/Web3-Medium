import "./Rightbar.css";
import { Input } from "web3uikit";
import { useContext } from "react";
import { ThemeContext } from "../App";

const Rightbar = () => {

  const { theme } = useContext(ThemeContext);

  const trends = [
    {
      text: "Real Performance Paradox",
    },
    {
      text: "The Email Scam That Nearly Worked On Me",
    },
    {
      text: "The forgotten benefits of “low tech” user interfaces",
    },
    {
      text: "Become a Web3 Developer with just simple JS...",
    },
  ];

  return (
    <>
    <div id={theme}>
      <div className="rightbarContent">
        {theme == "dark" ? (
          <Input className = "search" labelBgColor="#181818" label="Search" name="Search" prefixIcon="search"></Input>
        ) : (
          <Input className = "search" labelBgColor="#ffff" label="Search" name="Search" prefixIcon="search"></Input>
        )}

        <div className="trends">
          What are we reading Today
          {trends.map((e, i) => {
            return (
              <div key={i} className="trend">
                <div className="trendText">{e.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default Rightbar;
