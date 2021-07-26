import React, { useState, useEffect } from "react";
import CommentBox from "./CommentBox";
import axios from "axios";
import "./comment.css";

function Comment() {
  const [comment, setComment] = useState([]);
  useEffect(() => {
    async function dataRs() {
      const axiosData = await axios.get(
        "https://jsonplaceholder.typicode.com/comments?_page=1&_limit=10"
      );
      setComment(axiosData.data);
      // console.log(axiosData.data);
    }
    dataRs();
    // fetch("https://jsonplaceholder.typicode.com/comments?_page=1&_limit=10")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //     // setCommend(res);
    //   });
  }, []);

  return (
    <div className="infinie_box">
      {comment.map((el, idx) => {
        return <CommentBox comment={el} key={idx} />;
      })}
    </div>
  );
}

export default Comment;
