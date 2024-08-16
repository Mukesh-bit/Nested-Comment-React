import React, { Children, useState } from "react";
import Comment from "./components/Comment";

const App = () => {
  const [input, setInput] = useState();
  const [comments, setComments] = useState([
   
  ]);

  const handleInputBox = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const newComment = (text) => {
    return {
      id: new Date().getTime(),
      display: text,
      children: [],
    };
  };

  const handleCommentBtn = () => {
    if (input) {
      setComments([...comments, newComment(input)]);
      setInput("");
    }
  };

  const handleCommentAdd = (e) => {
    if(e.key === "Enter") {
      handleCommentBtn()
    }
  }

  const addReply = (parentId, replyText) => {
    const copyComment = [...comments];
    addComments(copyComment, parentId, replyText);
  };

  const addComments = (comments, parentId, replyText) => {
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      if (comment.id === parentId) {
        comment.children.unshift(newComment(replyText));
      }
    }

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      addComments(comment.children, parentId, replyText);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Nested Comments</h1>

        <div className="input-container">
          {/* Input Box */}
          <div>
            <input
              type="text"
              className="input-box"
              value={input}
              onChange={handleInputBox}
              placeholder="Your Comment..."
              onKeyDown={(e) => handleCommentAdd(e)}
            />
          </div>

          {/* Handle Button */}
          <div>
            <button onClick={handleCommentBtn} className="comment-btn">
              Comment
            </button>
          </div>
        </div>

        {/* Nested Comments */}
        <div className="comments">
          {comments.map((item) => (
            <Comment key={item.id} comment={item} addReply={addReply} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
