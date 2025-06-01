import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleVote } from "../redux/postsSlice";

function Post({ post }) {
  const dispatch = useDispatch();
  const vote = useSelector((state) => state.posts.votes[post.id] || 0);
  const [showComments, setShowComments] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorComments, setErrorComments] = useState(null);

  const toggleComments = () => {
    if (showComments) {
      setShowComments(false);
      setVisibleCount(10);
    } else {
      if (comments.length === 0) {
        fetchComments();
      }
      setShowComments(true);
    }
  };

  const fetchComments = async () => {
    setLoadingComments(true);
    setErrorComments(null);
    try {
      const res = await fetch(`https://www.reddit.com${post.permalink}.json`);
      const data = await res.json();
      setComments(data[1].data.children.map((c) => c.data));
    } catch (error) {
      setErrorComments("Failed to load comments");
      console.log(error);
    }
    setLoadingComments(false);
  };

  const showMoreComments = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const handleUpvote = (e) => {
    e.stopPropagation();
    dispatch(toggleVote({ postId: post.id, vote: 1 }));
  };

  const handleDownvote = (e) => {
    e.stopPropagation();
    dispatch(toggleVote({ postId: post.id, vote: -1 }));
  };

  return (
    <div className="post">
      <h3>{post.title}</h3>
      <img
        src={
          post.thumbnail && post.thumbnail.startsWith("http")
            ? post.thumbnail
            : "https://www.redditstatic.com/avatars/avatar_default_02_24A0ED.png"
        }
        alt="thumbnail"
      />
      <hr />
      <div className="post-votes">
        <div className="votes-left">
          <button
            onClick={handleUpvote}
            className={`vote-button upvote ${vote === 1 ? "active" : ""}`}
            aria-label="Upvote"
          >
            ▲
          </button>
          <span>{post.ups.toLocaleString()}</span>
          <button
            onClick={handleDownvote}
            className={`vote-button downvote ${vote === -1 ? "active" : ""}`}
            aria-label="Downvote"
          >
            ▼
          </button>
        </div>

        <span className="comments-count" onClick={toggleComments}>
          💬 {post.num_comments.toLocaleString()}
        </span>
      </div>

      {showComments && (
        <div className="comments-section">
          {loadingComments && <p>Loading comments...</p>}
          {errorComments && <p className="error">{errorComments}</p>}
          {!loadingComments && !errorComments && comments.length === 0 && (
            <p>No comments found.</p>
          )}

          <ul className="comments-list">
            {comments.slice(0, visibleCount).map((comment) => (
              <li key={comment.id}>
                <p>
                  <strong>{comment.author}</strong>: {comment.body}
                </p>
              </li>
            ))}
          </ul>

          {visibleCount < comments.length && (
            <button onClick={showMoreComments} className="show-more-btn">
              Show More
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;
