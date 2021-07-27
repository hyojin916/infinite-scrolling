import React, { useState, useEffect, useRef } from "react";
import CommentBox from "./CommentBox";
import axios from "axios";
import "./comment.css";

function Comment() {
  const [page, setPage] = useState(0);
  const [comment, setComment] = useState([]);
  const [loading, setloading] = useState(false);

  // 제일 처음 컨디업 되었을 때
  useEffect(() => {
    if (page === 0) {
      async function dataRs() {
        const axiosData = await axios.get(
          "https://jsonplaceholder.typicode.com/comments?_page=1&_limit=10"
        );
        setComment(axiosData.data);
      }
      dataRs();
    } else {
      const fetchMore = (page) => {};
      fetchMore();
      setloading(true);
      async function dataRs() {
        const axiosData = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${
            page * 10
          }`
        );
        setComment(axiosData.data);
      }
      dataRs();
      setComment((prev) => [...prev, ...comment]);
      setloading(false);
    }
  }, []);

  // observer 객체에 의해 동작
  const fetchMoreTrigger = useRef(null);
  useEffect(() => {
    const fetchMoreObserver = new IntersectionObserver(() => {
      setPage((page) => page + 1);
    });
    fetchMoreObserver.observe(fetchMoreTrigger.current);
    return () => {
      fetchMoreObserver.unobserve(fetchMoreTrigger.current);
    };
  }, [comment, page]);

  return (
    <div className="infinie_box" ref={fetchMoreTrigger}>
      {comment.map((el, idx) => {
        return <CommentBox comment={el} key={idx} setPage={setPage} />;
      })}
    </div>
  );
}

export default Comment;
