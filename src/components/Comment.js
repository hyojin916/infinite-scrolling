import React, { useState, useEffect } from "react";
import CommentBox from "./CommentBox";
import "./comment.css";
import axios from "axios";

function Comment() {
  const [commentList, setCommentList] = useState([]);
  const [page, setPage] = useState(1);
  const [target, setTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  function hihi() {
    setPage(page + 1);
  }

  useEffect(() => {
    if (loading === true) {
      hihi();
    } else {
      async function dataRs() {
        const axiosData = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`
        );
        const abab = commentList.concat(axiosData.data);
        setCommentList(abab);
      }
      dataRs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(_onIntersect, { threshold: 0 });
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target]);

  const _onIntersect = ([entry]) => {
    if (entry.isIntersecting) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  return (
    <div className="infinie_box">
      {commentList.map((el, idx) => {
        return <CommentBox commentList={el} key={idx} />;
      })}
      <div ref={setTarget}></div>
    </div>
  );
}

export default Comment;
