import { useEffect, useState, useContext } from "react";
import "./Blog.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Url } from "../config/constants";
import { ThemeContext } from "../App";

const Blog = () => {

  const { theme } = useContext(ThemeContext);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { url } = useParams();

  const fetchBlogContent = async () => {
    const res = await axios.get(`${Url}/${url}`);
    setTitle(res.data.title);
    const text = res.data.text.toString();
    setText(text);
  };
  
  useEffect(() => {
    if (!title || !text) {
      fetchBlogContent();
    }
  }, [text, title]);
 
  return (
    <div id={theme}>
    <div className="singleBlog">
      <div className="singleBlogWrapper">
        <div className="singleBlogContent">
          <h1 className="singleBlogTitle">{title}</h1>
          <p className="singleBlogText">{text}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Blog;
