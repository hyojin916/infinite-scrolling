import React from "react";

function CommentBox({ commentList }) {
  return (
    <li className="comment_box">
      <div className="comment_id">
        <div className="id_title">Comment</div>
        <div className="id">{commentList.id}</div>
      </div>
      <div className="comment_email">
        <div className="email_title">Email</div>
        <div className="email">{commentList.email}</div>
      </div>
      <div className="comment_main">
        <div className="comment_title">Comment</div>
        <div className="comment_mseeage">{commentList.body}</div>
      </div>
    </li>
  );
}

export default CommentBox;
