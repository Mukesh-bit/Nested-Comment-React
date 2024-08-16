import React, { useRef, useState } from "react";

const Comment = ({ comment, addReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState()

  const inputRef = useRef(null);

  const handleReply = () => {
    setShowReplyBox(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 1);

  };

  const handleCancleReply = () => {
    setShowReplyBox(false);
    setReplyText('')
  };

  const handleSaveReply = (commentId) => {
    addReply(commentId,replyText)
    setShowReplyBox(false)
    setReplyText('')
  }

  const handleKeyDown = (e,commentId) => {
    if(e.key === 'Enter') {
      handleSaveReply(commentId)
    } else if (e.key === 'Escape'){
      handleCancleReply()
    }
  }



  return (
    <li key={comment.id} className="comment-line">
      {comment.display}
      {!showReplyBox && (
        <button className="reply-btn" onClick={handleReply}>
          Reply
        </button>
      )}

      {showReplyBox ? (
        <>
          <br />
          <input type="text" ref={inputRef} style={{padding:'5px'}} value={replyText} onChange={(e) => setReplyText(e.target.value)} onKeyDown={(e) => handleKeyDown(e, comment.id)}/>
          <br />
          <button className="reply-btn" onClick={() => handleSaveReply(comment.id)}>Save</button>
          <button className="reply-btn" onClick={handleCancleReply}>
            Cancle
          </button>
        </>
      ) : null}

      {comment.children.length ? (
        <ul className="nested-comment">
          {comment.children.map((item) => (
            <Comment comment={item} key={item.id} addReply={addReply} />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default Comment;
