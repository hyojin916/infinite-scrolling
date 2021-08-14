import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { URL, LIMIT, ERROR_MESSAGE } from "utils/userData";
import CommentBox from "components/commentBox/CommentBox";
import "components/comment/comment.css";

function Comment() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [target, setTarget] = useState(null);

  function addPage() {
    setPage((page) => page + 1);
  }

  const fetchData = useCallback(() => {
    async function getUsers() {
      try {
        const axiosData = await axios.get(
          `${URL}_page=${page}&_limit=${LIMIT}`
        );
        const joinCommentList = commentList.concat(axiosData.data);
        setCommentList(joinCommentList);
      } catch {
        alert(`${ERROR_MESSAGE}`);
      }
    }
    getUsers();
  }, [commentList, page]);

  useEffect(() => {
    if (loading === true) {
      addPage();
    } else {
      fetchData();
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
    <ul className="infinie_box">
      {commentList.map((el, idx) => {
        return <CommentBox commentList={el} key={idx} />;
      })}
      <div ref={setTarget}></div>
    </ul>
  );
}

export default Comment;
