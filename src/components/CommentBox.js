import React from "react";

function CommentBox({ comment }) {
  console.log(comment);
  const id = comment.id;
  const email = comment.email;
  const comment_body = comment.body;

  return (
    <div className="comment_box">
      <div className="comment_id">
        <div className="id_title">Comment</div>
        <div className="id">{id}</div>
      </div>
      <div className="comment_email">
        <div className="email_title">Email</div>
        <div className="email">{email}</div>
      </div>
      <div className="comment_main">
        <div className="comment_title">Comment</div>
        <div className="comment_mseeage">{comment_body}</div>
      </div>
    </div>
  );
}

export default CommentBox;
