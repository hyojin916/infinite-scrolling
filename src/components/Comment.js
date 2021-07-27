import React, { useState, useEffect, useRef } from "react";
import CommentBox from "./CommentBox";
import "./comment.css";

function Comment() {
  const [page, setPage] = useState(1);
  const [commentList, setCommentList] = useState([]);
  const [addList, setAddList] = useState([]);

  // 처음 랜더링
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?_page=1&_limit=10")
      .then((res) => res.json())
      .then((data) => {
        setCommentList(data);
      });
  }, []);

  // 옵저버 만들기
  const fetchMoreTrigger = useRef(null);

  // 옵저버 실행 후 state 변화 랜더링
  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`
    )
      .then((res) => res.json())
      .then((data) => {
        setAddList(data);
        setCommentList(commentList.concat(addList));
      });
    const fetchMoreObserver = new IntersectionObserver((isIntersecting) => {
      if (!isIntersecting) {
        setPage((page) => page + 1);
      }
    });

    fetchMoreObserver.observe(fetchMoreTrigger.current);
    return () => {
      fetchMoreObserver.unobserve(fetchMoreTrigger.current);
    };
  }, [page, commentList, addList]);

  return (
    <div className="infinie_box">
      {commentList.map((el, idx) => {
        return <CommentBox commentList={el} key={idx} />;
      })}
      <div ref={fetchMoreTrigger}>ddd</div>
    </div>
  );
}

export default Comment;
